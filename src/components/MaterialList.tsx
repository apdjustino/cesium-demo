import react from "react";
import { Alert, ListGroup, Spinner } from "react-bootstrap";
import { useGetMaterialsQuery } from "../api/api";
import MaterialListItem from "./MaterialListItem";

const MaterialList = () => {
  const { data, error } = useGetMaterialsQuery({}); 
  return !error ? (
    <div className="border border-dark overflow-scroll h-100">
      {data && data.data ? (
        <ListGroup>
          {data.data.map((material, idx) => (
            <ListGroup.Item key={idx} action>
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