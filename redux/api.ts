import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/weather",
  }),
  endpoints: (builder) => ({
    getCity: builder.query({
      query: ({ query, key }) =>
        `/location?query=${query}${key ? `&key=${key}` : ""}`,
    }),
    getCityCondition: builder.query({
      query: (key) => `/conditions?key=${key}`,
    }),
    getCityForecast: builder.query({
      query: ({ key, isMetric }) => `/forecast?key=${key}&isMetric=${isMetric}`,
    }),
  }),
});

export const {
  useLazyGetCityQuery,
  useGetCityConditionQuery,
  useGetCityForecastQuery,
} = api;
