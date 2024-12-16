import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/event`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], null>({
      query: () => "listEvents",
    }),

    getAllEventsByEventTypeId: builder.query<Event[], number>({
      query: (eventTypeId) => `findEventsByEventTypeId/${eventTypeId}`,
    }),

    getAllEventsByEventTypeIdAndUnitId: builder.query<
      Event[],
      { eventTypeId: number; unitId?: number }
    >({
      query: ({ eventTypeId, unitId }) => {
        const unitQuery = unitId ? `${unitId}` : "";

        return `findEventsByEventTypeIdAndUnitId/${eventTypeId}/${unitQuery}`;
      },
    }),

    createEvent: builder.mutation<any, Partial<Event>>({
      query: (newEvent) => ({
        url: "createEvent/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newEvent,
      }),
    }),

    updateEvent: builder.mutation<
      any,
      { id: number; updateEvent: Partial<Event> }
    >({
      query: ({ id, updateEvent }) => ({
        url: `updateEvent/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateEvent,
      }),
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `deleteEvent/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetAllEventsByEventTypeIdQuery,
  useGetAllEventsByEventTypeIdAndUnitIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
