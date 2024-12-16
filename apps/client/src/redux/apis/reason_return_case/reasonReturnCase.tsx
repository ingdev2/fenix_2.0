import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reasonReturnCaseApi = createApi({
  reducerPath: "reasonReturnCaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/reason-return-case`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllReasonReturnCases: builder.query<ReasonReturnCase[], null>({
      query: () => "listReasonReturnCases",
    }),

    createReasonReturnCase: builder.mutation<any, Partial<ReasonReturnCase>>({
      query: (newReasonReturnCase) => ({
        url: "createReasonReturnCase/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newReasonReturnCase,
      }),
    }),

    updateReasonReturnCase: builder.mutation<any, { id: number; updateReasonReturnCase: Partial<ReasonReturnCase> }>({
      query: ({ id, updateReasonReturnCase }) => ({
        url: `updateReasonReturnCase/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateReasonReturnCase,
      }),
    }),

    deleteReasonReturnCase: builder.mutation({
      query: (id) => ({
        url: `deleteReasonReturnCase/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllReasonReturnCasesQuery,
  useCreateReasonReturnCaseMutation,
  useUpdateReasonReturnCaseMutation,
  useDeleteReasonReturnCaseMutation,
} = reasonReturnCaseApi;
