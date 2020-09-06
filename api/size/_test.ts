import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import {
  NearEarthObject,
  CloseApproachData,
  EstimatedDiameter,
} from "../_types/nearEarthObject.ts";
import { estimatedDiameterInMeters } from "./mod.ts";

Deno.test("estimatedDiameterInMeters() returns min and max estimated diameter", () => {
  const neo = {} as NearEarthObject;
  neo.close_approach_data = [{} as CloseApproachData];
  neo.estimated_diameter = {
    meters: {
      estimated_diameter_max: 12,
      estimated_diameter_min: 5,
    },
  } as EstimatedDiameter;
  neo.is_potentially_hazardous_asteroid = true;
  const [minDia, maxDia] = estimatedDiameterInMeters(neo);
  assertEquals(minDia, 5);
  assertEquals(maxDia, 12);
});
