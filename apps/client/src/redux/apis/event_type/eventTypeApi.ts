import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventTypeApi = createApi({
  reducerPath: "eventTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/event-type`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllEventTypes: builder.query<EventType[], null>({
      query: () => "listEventTypes",
    }),

    getEventTypeById: builder.query<EventType, number>({
      query: (Id) => `findEventType/${Id}`
    }),

    getEventTypeByCaseTypeId: builder.query<EventType[], number>({
      query: (caseTypeId) => `findEvenTypeByCaseType/${caseTypeId}`
    }),

    createEventType: builder.mutation<any, Partial<EventType>>({
      query: (newEventType) => ({
        url: "createEventType/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newEventType,
      }),
    }),

    updateEventType: builder.mutation<any, { id: number; updateEventType: Partial<EventType> }>({
      query: ({ id, updateEventType }) => ({
        url: `updateEventType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateEventType,
      }),
    }),

    deleteEventType: builder.mutation({
      query: (id) => ({
        url: `deleteEventType/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllEventTypesQuery,
  useGetEventTypeByIdQuery,
  useGetEventTypeByCaseTypeIdQuery,
  useCreateEventTypeMutation,
  useUpdateEventTypeMutation,
  useDeleteEventTypeMutation,
} = eventTypeApi;
