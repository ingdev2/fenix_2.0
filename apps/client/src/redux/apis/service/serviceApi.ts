import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/service`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], null>({
      query: () => "listServices",
    }),

    createService: builder.mutation<any, Partial<Service>>({
      query: (newService) => ({
        url: "createService/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newService,
      }),
    }),

    updateService: builder.mutation<
      any,
      { id: number; updateService: Partial<Service> }
    >({
      query: ({ id, updateService }) => ({
        url: `updateService/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateService,
      }),
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `deleteService/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
