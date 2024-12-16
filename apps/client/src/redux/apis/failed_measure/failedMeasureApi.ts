import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const failedMeasureApi = createApi({
  reducerPath: "failed-measureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/failed-measures`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllFailedMeasures: builder.query<FailedMeasure[], null>({
      query: () => "listFailedMeasures",
    }),

    createFailedMeasure: builder.mutation({
      query: (newFailedMeasure) => ({
        url: "createFailedMeasure/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newFailedMeasure,
      }),
    }),

    updateFailedMeasure: builder.mutation<any, { id: number; updateFailedMeasure: Partial<FailedMeasure> }>({
      query: ({ id, updateFailedMeasure }) => ({
        url: `updateFailedMeasure/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateFailedMeasure,
      }),
    }),

    deleteFailedMeasure: builder.mutation({
      query: (id) => ({
        url: `deleteFailedMeasure/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllFailedMeasuresQuery,
  useCreateFailedMeasureMutation,
  useUpdateFailedMeasureMutation,
  useDeleteFailedMeasureMutation,
} = failedMeasureApi;
