import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const reportAnalystAssignmentApi = createApi({
  reducerPath: "reportAnalystAssignment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/report-analyst-assignment`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getInfoAnalystByCodePosition: builder.query<Analyst, number>({
      query: (Id) =>
        `findInfoAnalystByCode/${Id}/`,
    }),

    getReportsForAssignCases: builder.query<any, string>({
      query: (idAnalyst) =>
        `summaryReportsForAssignCases/${idAnalyst}/`,
    }),

    assignAnalyst: builder.mutation<
      any,
      {
        idValidator: string;
        idNumberAnalist: string;
        newAnalystAssigned: Partial<ReportAnalystAssignment>;
      }
    >({
      query: ({ idValidator, idNumberAnalist, newAnalystAssigned }) => ({
        url: `assignAnalyst/${idValidator}/${idNumberAnalist}/`,
        method: "POST",
        body: newAnalystAssigned,
      }),
    }),
  }),
});

export const {
  useGetInfoAnalystByCodePositionQuery,
  useGetReportsForAssignCasesQuery,
  useAssignAnalystMutation,
} = reportAnalystAssignmentApi;
