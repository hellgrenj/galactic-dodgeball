import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import {
  NearEarthObject,
  CloseApproachData,
  EstimatedDiameter,
} from "../_types/nearEarthObject.ts";
import { relativeVelocity } from "./mod.ts";

Deno.test("relativeVelocity() returns km per second and km per hour", () => {
  const neo = {} as NearEarthObject;
  neo.close_approach_data = [{
    relative_velocity: {
      kilometers_per_hour: 3600,
      kilometers_per_second: 1,
    },
  } as CloseApproachData];
  neo.estimated_diameter = {} as EstimatedDiameter;
  neo.is_potentially_hazardous_asteroid = true;
  const [kmPerSecond, kmPerHour] = relativeVelocity(neo);
  assertEquals(kmPerSecond, 1);
  assertEquals(kmPerHour, 3600);
});
