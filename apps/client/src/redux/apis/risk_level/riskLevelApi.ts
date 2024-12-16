import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const riskLevelApi = createApi({
  reducerPath: "riskLevelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-level`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskLevels: builder.query<RiskLevel[], null>({
      query: () => "listRiskLevels",
    }),

    createRiskLevel: builder.mutation({
      query: (newRiskLevel) => ({
        url: "createRiskLevel/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newRiskLevel,
      }),
    }),

    updateRiskLevel: builder.mutation<any, { id: number; updateRiskLevel: Partial<RiskLevel> }>({
      query: ({ id, updateRiskLevel }) => ({
        url: `updateRiskLevel/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateRiskLevel,
      }),
    }),

    deleteRiskLevel: builder.mutation({
      query: (id) => ({
        url: `deleteRiskLevel/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRiskLevelsQuery,
  useCreateRiskLevelMutation,
  useUpdateRiskLevelMutation,
  useDeleteRiskLevelMutation,
} = riskLevelApi;
