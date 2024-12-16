import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const protocolApi = createApi({
  reducerPath: "protocolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/protocol`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllProtocols: builder.query<Protocol[], null>({
      query: () => "listProtocols",
    }),

    createProtocol: builder.mutation<any, Partial<Protocol>>({
      query: (newProtocol) => ({
        url: "createProtocol/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newProtocol,
      }),
    }),

    updateProtocol: builder.mutation<
      any,
      { id: number; updateProtocol: Partial<Protocol> }
    >({
      query: ({ id, updateProtocol }) => ({
        url: `updateProtocol/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateProtocol,
      }),
    }),

    deleteProtocol: builder.mutation({
      query: (id) => ({
        url: `deleteProtocol/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllProtocolsQuery,
  useCreateProtocolMutation,
  useUpdateProtocolMutation,
  useDeleteProtocolMutation,
} = protocolApi;
