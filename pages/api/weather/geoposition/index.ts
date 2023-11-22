import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  key: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== "GET") {
      return res.status(405);
    }

    const { lat, long } = req.query;

    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.API_KEY}&q=${lat},${long}`
    );
    const data = await response.json();

    return res.status(200).json(data);
  } catch (e) {
    console.error("An error has occurred in weather/geoposition route", e);
    return res.status(401);
  }
}
