import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fluidTypeApi = createApi({
  reducerPath: "fluidTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/fluid-type`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllFluidTypes: builder.query<FluidType[], null>({
      query: () => "listFluidTypes",
    }),

    createFluidType: builder.mutation({
      query: (newFluidType) => ({
        url: "createFluidType/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newFluidType,
      }),
    }),

    updateFluidType: builder.mutation<any, { id: number; updateFluidType: Partial<FluidType> }>({
      query: ({ id, updateFluidType }) => ({
        url: `updateFluidType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateFluidType,
      }),
    }),

    deleteFluidType: builder.mutation({
      query: (id) => ({
        url: `deleteFluidType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllFluidTypesQuery,
  useCreateFluidTypeMutation,
  useUpdateFluidTypeMutation,
  useDeleteFluidTypeMutation,
} = fluidTypeApi;
