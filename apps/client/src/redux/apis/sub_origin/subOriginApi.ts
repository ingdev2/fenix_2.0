import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subOriginApi = createApi({
  reducerPath: "subOriginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-origin`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllSubOrigins: builder.query<SubOrigin[], null>({
      query: () => "listSubOrigins",
    }),

    getAllSubOriginsByOriginId: builder.query<SubOrigin[], number>({
      query: (originId) => `findSubOriginByOriginId/${originId}`,
    }),

    createSubOrigin: builder.mutation<any, Partial<SubOrigin>>({
      query: (newSubOrigin) => ({
        url: "createSubOrigin/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newSubOrigin,
      }),
    }),

    updateSubOrigin: builder.mutation<
      any,
      { id: number; updateSubOrigin: Partial<SubOrigin> }
    >({
      query: ({ id, updateSubOrigin }) => ({
        url: `updateSubOrigin/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateSubOrigin,
      }),
    }),

    deleteSubOrigin: builder.mutation({
      query: (id) => ({
        url: `deleteSubOrigin/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllSubOriginsQuery,
  useGetAllSubOriginsByOriginIdQuery,
  useCreateSubOriginMutation,
  useUpdateSubOriginMutation,
  useDeleteSubOriginMutation,
} = subOriginApi;
