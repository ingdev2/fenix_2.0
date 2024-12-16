import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const unitApi = createApi({
  reducerPath: "unitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/unit`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllUnits: builder.query<Unit[], null>({
      query: () => "listUnits",
    }),

    createUnit: builder.mutation({
      query: (newUnit) => ({
        url: "createUnit/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newUnit,
      }),
    }),

    updateUnit: builder.mutation<any, { id: number; updateUnit: Partial<Unit> }>({
      query: ({ id, updateUnit }) => ({
        url: `updateUnit/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateUnit,
      }),
    }),

    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `deleteUnit/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllUnitsQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
