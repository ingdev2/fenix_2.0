import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const safetyBarrierApi = createApi({
  reducerPath: "safetyBarrierApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/safety-barriers`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllSafetyBarriers: builder.query<SafetyBarrier[], null>({
      query: () => "listSafetyBarriers",
    }),

    createSafetyBarrier: builder.mutation({
      query: (newSafetyBarrier) => ({
        url: "createSafetyBarrier/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newSafetyBarrier,
      }),
    }),

    updateSafetyBarrier: builder.mutation<any, { id: number; updateSafetyBarrier: Partial<SafetyBarrier> }>({
      query: ({ id, updateSafetyBarrier }) => ({
        url: `updateSafetyBarrier/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateSafetyBarrier,
      }),
    }),

    deleteSafetyBarrier: builder.mutation({
      query: (id) => ({
        url: `deleteSafetyBarrier/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllSafetyBarriersQuery,
  useCreateSafetyBarrierMutation,
  useUpdateSafetyBarrierMutation,
  useDeleteSafetyBarrierMutation,
} = safetyBarrierApi;
