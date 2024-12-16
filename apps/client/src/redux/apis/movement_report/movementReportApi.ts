import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movementReportApi = createApi({
  reducerPath: "movementReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/movement-report`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllMovementReports: builder.query<MovementReport[], null>({
      query: () => "listMovementReports",
    }),

    createMovementReport: builder.mutation<any, Partial<MovementReport>>({
      query: (newMovementReport) => ({
        url: "createMovementReport/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newMovementReport,
      }),
    }),

    updateMovementReport: builder.mutation<
      any,
      { id: number; updateMovementReport: Partial<MovementReport> }
    >({
      query: ({ id, updateMovementReport }) => ({
        url: `updateMovementReport/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateMovementReport,
      }),
    }),

    deleteMovementReport: builder.mutation({
      query: (id) => ({
        url: `deleteMovementReport/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllMovementReportsQuery,
  useCreateMovementReportMutation,
  useUpdateMovementReportMutation,
  useDeleteMovementReportMutation,
} = movementReportApi;
