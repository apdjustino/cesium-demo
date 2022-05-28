import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Material } from "../types/material";

/**
 * This file contains the Redux Reducer and "Slice" used to store Material state across the different subcomponents
 */
export type MaterialState = {
  materials: Material[];
  selectedMaterial: Material | null;
}

const initialState: MaterialState = {
  materials: [],
  selectedMaterial: null
};

export const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    setMaterials: (state, action: PayloadAction<Material[]>) => {
      state.materials = action.payload;
    },
    setSelectedMaterial: (state, action: PayloadAction<Material | null>) => {
      state.selectedMaterial = action.payload;
    }
  }
});


export const { setMaterials, setSelectedMaterial } = materialSlice.actions;

export default materialSlice.reducer;