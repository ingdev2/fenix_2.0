import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/role-permission`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRoles: builder.query<Role[], null>({
      query: () => "listRoles",
    }),

    createRole: builder.mutation({
      query: (newRole) => ({
        url: "createRole/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newRole,
      }),
    }),

    updateRole: builder.mutation<any, { id: number; updateRole: Partial<Role> }>({
      query: ({ id, updateRole }) => ({
        url: `updateRole/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateRole,
      }),
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `deleteRole/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
