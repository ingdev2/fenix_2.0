import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const unsafeActionApi = createApi({
  reducerPath: "unsafeActionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/unsafe-action`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllUnsafeActions: builder.query<UnsafeAction[], null>({
      query: () => "listUnsafeActions",
    }),

    createUnsafeAction: builder.mutation<any, Partial<UnsafeAction>>({
      query: (newUnsafeAction) => ({
        url: "createUnsafeAction/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newUnsafeAction,
      }),
    }),

    updateUnsafeAction: builder.mutation<any, { id: number; updateUnsafeAction: Partial<UnsafeAction> }>({
      query: ({ id, updateUnsafeAction }) => ({
        url: `updateUnsafeAction/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateUnsafeAction,
      }),
    }),

    deleteUnsafeAction: builder.mutation({
      query: (id) => ({
        url: `deleteUnsafeAction/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllUnsafeActionsQuery,
  useCreateUnsafeActionMutation,
  useUpdateUnsafeActionMutation,
  useDeleteUnsafeActionMutation,
} = unsafeActionApi;
