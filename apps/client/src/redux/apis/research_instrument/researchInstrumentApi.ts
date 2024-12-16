import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const researchInstrumentApi = createApi({
  reducerPath: "ResearchInstrumentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/research-instrument`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllResearchInstruments: builder.query<ResearchInstrument[], null>({
      query: () => "listResearchInstruments",
    }),

    createResearchInstrument: builder.mutation({
      query: (newResearchInstrument) => ({
        url: "createResearchInstrument/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newResearchInstrument,
      }),
    }),

    updateResearchInstrument: builder.mutation<any, { id: number; updateResearchInstrument: Partial<ResearchInstrument> }>({
      query: ({ id, updateResearchInstrument }) => ({
        url: `updateResearchInstrument/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateResearchInstrument,
      }),
    }),

    deleteResearchInstrument: builder.mutation({
      query: (id) => ({
        url: `deleteResearchInstrument/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllResearchInstrumentsQuery,
  useCreateResearchInstrumentMutation,
  useUpdateResearchInstrumentMutation,
  useDeleteResearchInstrumentMutation,
} = researchInstrumentApi;
