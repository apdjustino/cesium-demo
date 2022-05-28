import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MaterialResponse, Material, RequestById } from "../types/material";

/**
 * base query object stores information for api's base url.
 * If we were sending auth tokens in the headers or any other type of header we would define it here.
 */

const BaseQuery = fetchBaseQuery({baseUrl: "http://localhost:3001/"});

export const materialApi = createApi({
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    getMaterials: builder.query<MaterialResponse<Material[]>, {}>({
      query: () => ({
        url: "materials",
        method: "GET"
      })
    }),
    getMaterial: builder.query<MaterialResponse<Material>, RequestById>({
      query: ({ id }) => ({
        url: `material/${id}`,
        method: "GET"
      })
    }),
    updateMaterial: builder.mutation<MaterialResponse<boolean>, Material>({
      query: ({ id, color, cost, deliverDate, name, volume }) => ({
        url: `material/${id}`,
        body: {
          color,
          cost,
          deliverDate,
          name,
          volume
        }
      })
    }),
    deleteMaterial: builder.mutation<MaterialResponse<boolean>, RequestById>({
      query: ({ id }) => ({
        url: `material/${id}`,
        method: "DELETE"
      })
    }),
    addMaterial: builder.mutation<MaterialResponse<boolean>, Material>({
      query: ({ id, color, cost, deliverDate, name, volume}) => ({
        url: `material/${id}`,
        method: "POST",
        body: {
          color,
          cost,
          deliverDate,
          name,
          volume
        }
      })
    })
  })
});

export const { useGetMaterialsQuery, useUpdateMaterialMutation, useDeleteMaterialMutation, useAddMaterialMutation } = materialApi;