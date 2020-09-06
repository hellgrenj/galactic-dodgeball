import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import { format } from "https://deno.land/std@0.67.0/datetime/mod.ts";
import { createHTMLReport } from "./report/mod.ts";

const API_KEY = Deno.env.get("API_KEY") ? Deno.env.get("API_KEY") : "DEMO_KEY";
console.log(
  `(${
    API_KEY == "DEMO_KEY"
      ? "using demo API key"
      : "using API key from env variable"
  })`,
);
export default async (req: ServerRequest) => {
  const today = format(new Date(), "yyyy-MM-dd");
  console.log(today);
  const response = await fetchNearEarthObjects(today);
  const report = createHTMLReport(response);
  req.respond({ body: JSON.stringify({ text: report, today }) });
};

const fetchNearEarthObjects = async (today: string) => {
  const url =
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`;
  const res = await fetch(url);
  let response = await res.json();

  if (res.status !== 200) {
    console.log(res);
    response = "{error: 'something went wrong'}";
  }
  return response;
};
