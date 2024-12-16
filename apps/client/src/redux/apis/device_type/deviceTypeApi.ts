import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deviceTypeApi = createApi({
  reducerPath: "deviceTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/device-type`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllDeviceTypes: builder.query<DeviceType[], null>({
      query: () => "listDeviceTypes",
    }),

    createDeviceType: builder.mutation({
      query: (newDeviceType) => ({
        url: "createDeviceType/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newDeviceType,
      }),
    }),

    updateDeviceType: builder.mutation<any, { id: number; updateDeviceType: Partial<DeviceType> }>({
      query: ({ id, updateDeviceType }) => ({
        url: `updateDeviceType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateDeviceType,
      }),
    }),

    deleteDeviceType: builder.mutation({
      query: (id) => ({
        url: `deleteDeviceType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllDeviceTypesQuery,
  useCreateDeviceTypeMutation,
  useUpdateDeviceTypeMutation,
  useDeleteDeviceTypeMutation,
} = deviceTypeApi;
