import React from 'react';
import { Container } from "react-bootstrap"
import MaterialList from './components/MaterialList';
import MaterialForm from "./components/MaterialForm";
import MaterialHeader from './components/MaterialHeader';
import { useAppSelector } from './app/hooks';

function App() {
  const selectedMaterial = useAppSelector((state) => state.materials.selectedMaterial);
  return (
    <Container className="p-5" style={{width: "75%"}}>
      <div className="row">
        <MaterialHeader />
      </div>
      <div className="row" style={{minHeight: "300px"}}>
        <div className="col-3">
          <MaterialList />
          <div className="pt-3 d-flex justify-content-between">
            <div>Total Cost:</div>
            <div>{(selectedMaterial && selectedMaterial.totalCost) || "$0.00"}</div>
          </div>
        </div>
        <div className="col-9">
          <MaterialForm />
        </div>
      </div>
    </Container>
  );
}

export default App;
