import React from "react";
import { Material } from "../types/material";

type OwnTypes = {
  material: Material;
}

const MaterialListItem = ({ material }: OwnTypes) => {
  
  
  return (
    <div className="row">
      <div className="col-2">
        <div style={{borderRadius: "50%", height: "30px", width: "30px", backgroundColor: material.color || "#000000"}} />
      </div>
      <div className="col-10 d-flex flex-column">
        <div className="p-0">
          <div className="fw-bold">{material.name}</div>
        </div>
        <div className="p-0">
          <div>{material.volume} m<sup>3</sup></div>
        </div>
      </div>
    </div>
  )
}

export default MaterialListItem;