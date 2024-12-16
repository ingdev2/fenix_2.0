import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const influencingFactorApi = createApi({
  reducerPath: "influencingFactorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/influencing-factor`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllInfluencingFactors: builder.query<InfluencingFactor[], null>({
      query: () => "listInfluencingFactors",
    }),

    createInfluencingFactor: builder.mutation({
      query: (newInfluencingFactor) => ({
        url: "createInfluencingFactor/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newInfluencingFactor,
      }),
    }),

    updateInfluencingFactor: builder.mutation<
      any,
      { id: number; updateInfluencingFactor: Partial<InfluencingFactor> }
    >({
      query: ({ id, updateInfluencingFactor }) => ({
        url: `updateInfluencingFactor/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateInfluencingFactor,
      }),
    }),

    deleteInfluencingFactor: builder.mutation({
      query: (id) => ({
        url: `deleteInfluencingFactor/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllInfluencingFactorsQuery,
  useCreateInfluencingFactorMutation,
  useUpdateInfluencingFactorMutation,
  useDeleteInfluencingFactorMutation,
} = influencingFactorApi;
