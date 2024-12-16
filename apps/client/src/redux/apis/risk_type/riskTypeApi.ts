import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const riskTypeApi = createApi({
  reducerPath: "riskTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-type`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskTypes: builder.query<RiskType[], null>({
      query: () => "listRiskTypes",
    }),

    createRiskType: builder.mutation({
      query: (newRiskType) => ({
        url: "createRiskType/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newRiskType,
      }),
    }),

    updateRiskType: builder.mutation<any, { id: number; updateRiskType: Partial<RiskType> }>({
      query: ({ id, updateRiskType }) => ({
        url: `updateRiskType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateRiskType,
      }),
    }),

    deleteRiskType: builder.mutation({
      query: (id) => ({
        url: `deleteRiskType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRiskTypesQuery,
  useCreateRiskTypeMutation,
  useUpdateRiskTypeMutation,
  useDeleteRiskTypeMutation,
} = riskTypeApi;
