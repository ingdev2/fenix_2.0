import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const severityClasificationApi = createApi({
  reducerPath: "severityClasificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/severity-clasification`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllSeverityClasifications: builder.query<SeverityClasification[], null>({
      query: () => "listSeverityClasifications",
    }),

    createSeverityClasification: builder.mutation({
      query: (newSeverityClasification) => ({
        url: "createSeverityClasification/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newSeverityClasification,
      }),
    }),

    updateSeverityClasification: builder.mutation<
      any,
      { id: number; updateSeverityClasification: Partial<SeverityClasification> }
    >({
      query: ({ id, updateSeverityClasification }) => ({
        url: `updateSeverityClasification/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateSeverityClasification,
      }),
    }),

    deleteSeverityClasification: builder.mutation({
      query: (id) => ({
        url: `deleteSeverityClasification/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllSeverityClasificationsQuery,
  useCreateSeverityClasificationMutation,
  useUpdateSeverityClasificationMutation,
  useDeleteSeverityClasificationMutation,
} = severityClasificationApi;
