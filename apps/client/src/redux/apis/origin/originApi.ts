import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const originApi = createApi({
  reducerPath: "originApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/origin`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllOrigins: builder.query<Origin[], null>({
      query: () => "listOrigins",
    }),

    createOrigin: builder.mutation({
      query: (newOrigin) => ({
        url: "createOrigin/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newOrigin,
      }),
    }),

    updateOrigin: builder.mutation<any, { id: number; updateOrigin: Partial<Origin> }>({
      query: ({ id, updateOrigin }) => ({
        url: `updateOrigin/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateOrigin,
      }),
    }),

    deleteOrigin: builder.mutation({
      query: (id) => ({
        url: `deleteOrigin/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllOriginsQuery,
  useCreateOriginMutation,
  useUpdateOriginMutation,
  useDeleteOriginMutation,
} = originApi;
