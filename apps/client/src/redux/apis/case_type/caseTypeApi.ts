import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const caseTypeApi = createApi({
  reducerPath: "caseTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/case-type`,
  }),

//   refetchOnMountOrArgChange: true,

//   refetchOnFocus: true,

//   refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllCaseTypes: builder.query<CaseType[], null>({
      query: () => "listCaseTypes",
    }),

    createCaseType: builder.mutation({
      query: (newCaseType) => ({
        url: "createCaseType/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newCaseType,
      }),
    }),

    updateCaseType: builder.mutation<any, { id: number; updateCaseType: Partial<CaseType> }>({
      query: ({ id, updateCaseType }) => ({
        url: `updateCaseType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateCaseType,
      }),
    }),

    deleteCaseType: builder.mutation({
      query: (id) => ({
        url: `deleteCaseType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllCaseTypesQuery,
  useCreateCaseTypeMutation,
  useUpdateCaseTypeMutation,
  useDeleteCaseTypeMutation,
} = caseTypeApi;
