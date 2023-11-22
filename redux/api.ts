import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/weather",
  }),
  endpoints: (builder) => ({
    getCityCondition: builder.query({
      query: (key) => `/conditions?key=${key}`,
    }),
    getCityForecast: builder.query({
      query: ({ key, isMetric }) => `/forecast?key=${key}&isMetric=${isMetric}`,
    }),
  }),
});

export const { useGetCityConditionQuery, useGetCityForecastQuery } = api;
