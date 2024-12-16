import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const riskFactorApi = createApi({
  reducerPath: "riskFactorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-factor`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskFactors: builder.query<RiskFactor[], null>({
      query: () => "listRiskFactors",
    }),

    createRiskFactor: builder.mutation<any, Partial<RiskFactor>>({
      query: (newRiskFactor) => ({
        url: "createRiskFactor/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newRiskFactor,
      }),
    }),

    updateRiskFactor: builder.mutation<any, { id: number; updateRiskFactor: Partial<RiskFactor> }>({
      query: ({ id, updateRiskFactor }) => ({
        url: `updateRiskFactor/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateRiskFactor,
      }),
    }),

    deleteRiskFactor: builder.mutation({
      query: (id) => ({
        url: `deleteRiskFactor/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRiskFactorsQuery,
  useCreateRiskFactorMutation,
  useUpdateRiskFactorMutation,
  useDeleteRiskFactorMutation,
} = riskFactorApi;
