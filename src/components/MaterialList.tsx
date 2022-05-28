import React from "react";
import { Alert, ListGroup, Spinner } from "react-bootstrap";
import { useGetMaterialsQuery } from "../api/api";
import { setMaterials, setSelectedMaterial } from "../api/materialSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Material } from "../types/material";
import MaterialListItem from "./MaterialListItem";

const MaterialList = () => {
  const { data, error, isLoading } = useGetMaterialsQuery({}); 
  const materials = useAppSelector((state) => state.materials.materials);
  const selectedMaterial = useAppSelector((state) => state.materials.selectedMaterial);
  const dispatch = useAppDispatch();  
  
  
  const itemClickHandler = (item: Material) => {
    dispatch(setSelectedMaterial(item));
  }

  React.useEffect(() => {
    if (data && data.data) {
      dispatch(setMaterials(data.data));
    }
  }, [data, dispatch])

  console.log(data);

  return !error ? (
    <div className="border border-dark overflow-scroll h-100">
      {!isLoading ? (
        <ListGroup>
          {materials.map((material, idx) => (
            <ListGroup.Item key={idx} action onClick={() => {itemClickHandler(material)}} active={material.id === selectedMaterial?.id}>
              <MaterialListItem material={material}/>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Spinner animation="border" />
      )}      
    </div>
  ) : (
    <div >
      <Alert variant="danger">
        There has been an error.
      </Alert>
    </div>
  )
}

export default MaterialList;