import react from "react";
import { Button } from "react-bootstrap";

const MaterialHeader = () => {
  return (
    <div className="d-flex flex-column">
      <div>
        <h3 className="fw-bold">Materials</h3>
      </div>
      <div className="d-flex pb-3">
        <div className="pe-2">
          <Button className="rounded-pill" variant="primary" >Add</Button>
        </div>
        <div className="ps-2">
          <Button className="rounded-pill" variant="danger">Delete</Button>
        </div>        
      </div>
    </div>
  )
}

export default MaterialHeader;