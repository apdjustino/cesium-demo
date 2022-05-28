import React, { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Alert, Button } from "react-bootstrap";
import { useAddMaterialMutation, useDeleteMaterialMutation, useLazyGetMaterialsQuery } from "../api/api";
import { Material } from "../types/material";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setMaterials, setSelectedMaterial } from "../api/materialSlice";

const MaterialHeader = () => {
  const selectedMaterial = useAppSelector((state) => state.materials.selectedMaterial);
  const [addNewMaterial] = useAddMaterialMutation({});
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [getMaterials, { data: reFetchData }] = useLazyGetMaterialsQuery();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (reFetchData && reFetchData.data) {
      dispatch(setMaterials(reFetchData.data));
    }
  }, [reFetchData, dispatch])
  
  const addClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const defaultNewMaterial: Material = {
      id: uuidv4(),
      name: "New Material",
      volume: 0,
      cost: 0,
      color: "#000000"
    }

    addNewMaterial(defaultNewMaterial).then(() => {
      getMaterials({}).then(() => {
        dispatch(setSelectedMaterial(defaultNewMaterial));
      });      
    })
  }

  const deleteClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (selectedMaterial) {
      deleteMaterial({id: selectedMaterial.id}).then(() => {
        getMaterials({});
        dispatch(setSelectedMaterial(null));
      })
    }
    else {
      setErrorMessage("No material selected to delete");
    }
  }

  return (
    <div className="d-flex flex-column">
      <div>
        <h3 className="fw-bold">Materials</h3>
      </div>
      <div className="d-flex pb-3">
        <div className="pe-2">
          <Button className="rounded-pill" variant="primary" onClick={addClickHandler}>Add</Button>
        </div>
        <div className="ps-2">
          <Button className="rounded-pill" variant="danger" onClick={deleteClickHandler}>Delete</Button>
        </div>        
        <div className="ps-3 w-100">
          {!!errorMessage ? (
            <Alert variant="danger">{errorMessage}</Alert>
          ): null}          
        </div>
      </div>      
    </div>
  )
}

export default MaterialHeader;