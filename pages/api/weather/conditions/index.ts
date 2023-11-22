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

    const { key } = req.query;

    const response = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${process.env.API_KEY}`
    );
    const data = await response.json();

    return res.status(200).json(data);
  } catch (e) {
    console.error("An error has occurred in weather/conditions route", e);
    return res.status(401);
  }
}
