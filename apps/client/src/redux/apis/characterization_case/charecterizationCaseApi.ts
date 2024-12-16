import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const characterizationCaseApi = createApi({
  reducerPath: "characterizationCaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/characterization-case`,
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllCharacterizationCases: builder.query<CharacterizationCase[], null>({
      query: () => "listCharacterizationsCase",
    }),

    createCharacterizationCase: builder.mutation({
      query: (newCharacterizationCase) => ({
        url: "createCharacterizationCase/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd",
        method: "POST",
        body: newCharacterizationCase,
      }),
    }),

    updateCharacterizationCase: builder.mutation<any, { id: number; updateCharacterizationCase: Partial<CharacterizationCase> }>({
      query: ({ id, updateCharacterizationCase }) => ({
        url: `updateCharacterizationCase/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "PATCH",
        body: updateCharacterizationCase,
      }),
    }),

    deleteCharacterizationCase: builder.mutation({
      query: (id) => ({
        url: `deleteCharacterizationCase/${id}/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllCharacterizationCasesQuery,
  useCreateCharacterizationCaseMutation,
  useUpdateCharacterizationCaseMutation,
  useDeleteCharacterizationCaseMutation,
} = characterizationCaseApi;
