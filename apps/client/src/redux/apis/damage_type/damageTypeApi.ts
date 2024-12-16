import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const damageTypeApi = createApi({
  reducerPath: "damageTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/damage-type`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllDamageTypes: builder.query<DamageType[], null>({
      query: () => "listDamageTypes",
    }),

    createDamageType: builder.mutation({
      query: (newDamageType) => ({
        url: "createDamageType/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newDamageType,
      }),
    }),

    updateDamageType: builder.mutation<any, { id: number; updateDamageType: Partial<DamageType> }>({
      query: ({ id, updateDamageType }) => ({
        url: `updateDamageType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateDamageType,
      }),
    }),

    deleteDamageType: builder.mutation({
      query: (id) => ({
        url: `deleteDamageType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllDamageTypesQuery,
  useCreateDamageTypeMutation,
  useUpdateDamageTypeMutation,
  useDeleteDamageTypeMutation,
} = damageTypeApi;
