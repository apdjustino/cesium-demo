import react from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";

const MaterialForm = () => {
  return (
    <div className="border border-dark p-4 h-100">
      <Form>
        <div className="row">
          <div className="col-6">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Volume (m<sup>3</sup>)</Form.Label>
              <Form.Control 
                type="number"
                min={0}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Delivery Date</Form.Label>
              <Form.Control 
                type="date"
              />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group className="pb-2">
              <Form.Label>Color</Form.Label>
              <Form.Control 
                type="color"
                className="color-picker"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost (USD per m<sup>3</sup></Form.Label>
              <Form.Control 
                type="number"
                min={0}
                step={0.01}
              />
            </Form.Group>
          </div>
        </div>
      </Form>      
    </div>
  )
}

export default MaterialForm;