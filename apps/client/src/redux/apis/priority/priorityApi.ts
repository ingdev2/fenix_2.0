import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const priorityApi = createApi({
  reducerPath: "priorityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/priority`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllPriorities: builder.query<Priority[], null>({
      query: () => "listPriorities",
    }),

    createPriority: builder.mutation<any, Partial<Priority>>({
      query: (newPriority) => ({
        url: "createPriority/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newPriority,
      }),
    }),

    updatePriority: builder.mutation<any, { id: number; updatePriority: Partial<Priority> }>({
      query: ({ id, updatePriority }) => ({
        url: `updatePriority/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updatePriority,
      }),
    }),

    deletePriority: builder.mutation({
      query: (id) => ({
        url: `deletePriority/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllPrioritiesQuery,
  useCreatePriorityMutation,
  useUpdatePriorityMutation,
  useDeletePriorityMutation,
} = priorityApi;
