import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const reportResearcherAssignmentApi = createApi({
  reducerPath: "reportResearcherAssignment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/report-researchers-assignment`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getReportsAssignedByIdNumberResearcher: builder.query<any, string>({
      query: (idNumberResearcher) =>
        `summaryReportsAsignedByIdNumberResearcher/${idNumberResearcher}/`,
    }),

    getAssignedResearchersByIdNumberAnalyst: builder.query<
      ReportResearcherAssignment[],
      string
    >({
      query: (IdNumberAnalyst) =>
        `findAssignedResearcherByIdNumberAnalyst/${IdNumberAnalyst}/`,
    }),

    assignResearcher: builder.mutation<
      any,
      {
        idNumberAnalist: string;
        idNumberResearcher: string;
        newResearcherAssigned: Partial<ReportResearcherAssignment>;
      }
    >({
      query: ({
        idNumberResearcher,
        idNumberAnalist,
        newResearcherAssigned,
      }) => ({
        url: `assingResearcher/${idNumberAnalist}/${idNumberResearcher}`,
        method: "POST",
        body: newResearcherAssigned,
      }),
    }),
  }),
});

export const {
  useGetReportsAssignedByIdNumberResearcherQuery,
  useGetAssignedResearchersByIdNumberAnalystQuery,
  useAssignResearcherMutation,
} = reportResearcherAssignmentApi;
