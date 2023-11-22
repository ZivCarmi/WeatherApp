import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  query: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== "GET") {
      return res.status(405);
    }

    const { query } = req.query;

    if (!query) {
      return res.status(400);
    }

    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.API_KEY}&q=${query}`
    );
    const data = await response.json();

    return res.status(200).json(data);
  } catch (e) {
    console.error("An error has occurred in weather/location route", e);
    return res.status(401);
  }
}
