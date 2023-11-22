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

    const { query, key } = req.query;

    if (!query) {
      return res.status(400);
    }

    let endpoint = "http://dataservice.accuweather.com";

    if (key) {
      endpoint += `/locations/v1/${key}?apikey=${process.env.API_KEY}`;
    } else {
      endpoint += `/locations/v1/cities/autocomplete?apikey=${process.env.API_KEY}&q=${query}`;
    }

    const response = await fetch(endpoint);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (e) {
    console.error("An error has occurred in weather/location route", e);
    return res.status(401);
  }
}
