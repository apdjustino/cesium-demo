import React from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useUpdateMaterialMutation, useLazyGetMaterialsQuery } from "../api/api";
import { Material } from "../types/material";
import { setMaterials } from "../api/materialSlice";

const MaterialForm = () => {
  const selectedMaterial = useAppSelector((state) => state.materials.selectedMaterial);
  const [updateMaterial] = useUpdateMaterialMutation();
  const [getMaterials, { data }] = useLazyGetMaterialsQuery();
  const dispatch = useAppDispatch();

  const initialValues: Material = selectedMaterial || {
    id: "",
    name: "",
    volume: 0,
    cost: 0,
    color: "#000000",
    deliverDate: ""
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      updateMaterial(values).then(() => {
        getMaterials({})
      });
    },
    enableReinitialize: true
  });

  React.useEffect(() => {
    if (!!data && !!data.data) {
      dispatch(setMaterials(data.data));
    }
  }, [data, dispatch])

  return (
    <div className="border border-dark p-4 h-100">
      <Form>
        <div className="row">
          <div className="col-6">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
                name="name"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.submitForm();
                }}
                value={formik.values.name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Volume (m<sup>3</sup>)</Form.Label>
              <Form.Control 
                name="volume"
                type="number"
                min={0}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.submitForm();
                }}
                value={formik.values.volume}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Delivery Date</Form.Label>
              <Form.Control 
                name="deliverDate"
                type="date"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.submitForm();
                }}
                value={formik.values.deliverDate}
              />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group className="pb-2">
              <Form.Label>Color</Form.Label>
              <Form.Control
                name="color" 
                type="color"
                className="color-picker"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.submitForm();
                }}
                value={formik.values.color}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost (USD per m<sup>3</sup></Form.Label>
              <Form.Control
                name="cost"
                type="number"
                min={0}
                step={0.01}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.submitForm();
                }}
                value={formik.values.cost}
              />
            </Form.Group>
          </div>
        </div>
      </Form>      
    </div>
  )
}

export default MaterialForm;