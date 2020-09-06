import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import {
  kilometersToScandinavianMiles,
  timesThruSweden,
  closestToEarth,
} from "./mod.ts";

Deno.test("kilometersToScandinavianMiles() returns 1 if given 10 kilometers", () => {
  const kilometers = 10;
  const scandinavianMiles = kilometersToScandinavianMiles(kilometers);
  assertEquals(scandinavianMiles, 1);
});

Deno.test("timesThruSweden() returns 127 if given 200 000 kilometers", () => {
  const kilometers = 200000;
  const trips = timesThruSweden(kilometers);
  assertEquals(trips, 127);
});

Deno.test("closesToEarth() returns the near earth object closest to earth in the API Response", () => {
  const apiResponse = {
    "2020-06-28": [
      {
        links: {
          self: "http://www.neowsapp.com/rest/v1/neo/3740494?api_key=DEMO_KEY",
        },
        id: "3740494",
        neo_reference_id: "3740494",
        name: "(2016 AF193)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3740494",
        absolute_magnitude_h: 21.9,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 0.1108038821,
            estimated_diameter_max: 0.2477650126,
          },
          meters: {
            estimated_diameter_min: 110.8038821264,
            estimated_diameter_max: 247.7650126055,
          },
          miles: {
            estimated_diameter_min: 0.068850319,
            estimated_diameter_max: 0.1539539936,
          },
          feet: {
            estimated_diameter_min: 363.5298086356,
            estimated_diameter_max: 812.8773639568,
          },
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
          {
            close_approach_date: "2020-06-28",
            close_approach_date_full: "2020-Jun-28 10:07",
            epoch_date_close_approach: 1593338820000,
            relative_velocity: {
              kilometers_per_second: "13.5099625012",
              kilometers_per_hour: "48635.8650041551",
              miles_per_hour: "30220.4351188318",
            },
            miss_distance: {
              astronomical: "0.3887398667",
              lunar: "151.2198081463",
              kilometers: "58154656.042403929",
              miles: "36135627.6334310602",
            },
            orbiting_body: "Earth",
          },
        ],
        is_sentry_object: false,
      },
      {
        links: {
          self: "http://www.neowsapp.com/rest/v1/neo/54017565?api_key=DEMO_KEY",
        },
        id: "54017565",
        neo_reference_id: "54017565",
        name: "(2020 ME1)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=54017565",
        absolute_magnitude_h: 26.257,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 0.0148989265,
            estimated_diameter_max: 0.0333150124,
          },
          meters: {
            estimated_diameter_min: 14.8989264632,
            estimated_diameter_max: 33.3150123635,
          },
          miles: {
            estimated_diameter_min: 0.0092577608,
            estimated_diameter_max: 0.0207009825,
          },
          feet: {
            estimated_diameter_min: 48.8809938975,
            estimated_diameter_max: 109.3012251627,
          },
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
          {
            close_approach_date: "2020-06-28",
            close_approach_date_full: "2020-Jun-28 06:14",
            epoch_date_close_approach: 1593324840000,
            relative_velocity: {
              kilometers_per_second: "10.9240415705",
              kilometers_per_hour: "39326.5496537042",
              miles_per_hour: "24435.9885889919",
            },
            miss_distance: {
              astronomical: "0.0050740503",
              lunar: "1.9738055667",
              kilometers: "759067.117152861",
              miles: "471662.4353210418",
            },
            orbiting_body: "Earth",
          },
        ],
        is_sentry_object: false,
      },
    ],
  };
  const closestNearEarthObject = closestToEarth(apiResponse);
  assertEquals(
    closestNearEarthObject.close_approach_data[0].miss_distance.kilometers,
    "759067.117152861",
  );
});
