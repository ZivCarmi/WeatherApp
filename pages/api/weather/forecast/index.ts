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

    const { key, isMetric } = req.query;

    const response = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.NEXT_PUBLIC_API_KEY}&metric=${isMetric}`
    );
    const data = await response.json();

    return res.status(200).json(data);
  } catch (e) {
    console.error("An error has occurred in weather/forecast route", e);
    return res.status(401);
  }
}
