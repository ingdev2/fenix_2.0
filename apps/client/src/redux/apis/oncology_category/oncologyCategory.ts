import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const oncologyCategoryApi = createApi({
  reducerPath: "OncologyCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/oncology-category`,
  }),

//   refetchOnMountOrArgChange: true,

//   refetchOnFocus: true,

//   refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllOncologyCategories: builder.query<OncologyCategory[], null>({
      query: () => "listOncologyCategories",
    }),

    createOncologyCategory: builder.mutation({
      query: (newOncologyCategory) => ({
        url: "createOncologyCategory/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newOncologyCategory,
      }),
    }),

    updateOncologyCategory: builder.mutation<any, { id: number; updateOncologyCategory: Partial<OncologyCategory> }>({
      query: ({ id, updateOncologyCategory }) => ({
        url: `updateOncologyCategory/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateOncologyCategory,
      }),
    }),

    deleteOncologyCategory: builder.mutation({
      query: (id) => ({
        url: `deleteOncologyCategory/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllOncologyCategoriesQuery,
  useCreateOncologyCategoryMutation,
  useUpdateOncologyCategoryMutation,
  useDeleteOncologyCategoryMutation,
} = oncologyCategoryApi;
