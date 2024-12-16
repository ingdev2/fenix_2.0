import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const compressionConceptReportApi = createApi({
  reducerPath: "compressionConceptReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/compression-concept-report`,
  }),

  //   refetchOnMountOrArgChange: true,

  //   refetchOnFocus: true,

  //   refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllCompressionConceptReports: builder.query<
      CompressionConceptReport[],
      null
    >({
      query: () => "listCompressionConceptReports",
    }),

    createCompressionConceptReport: builder.mutation({
      query: (newCompressionConceptReport) => ({
        url: "createCompressionConceptReport",
        method: "POST",
        body: newCompressionConceptReport,
      }),
    }),
  }),
});

export const {
  useGetAllCompressionConceptReportsQuery,
  useCreateCompressionConceptReportMutation,
} = compressionConceptReportApi;
