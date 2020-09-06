import { NearEarthObject } from "../_types/nearEarthObject.ts";

/** 
returns the velocity (relative travelling speed) in kilometers per second and kilometers per hour
@param {NearEarthObject} neo - the near earth object
@returns {[number, number]} - [km per second, km per hour]
*/
export const relativeVelocity = (neo: NearEarthObject): [number, number] => {
  return [
    Math.round(
      neo.close_approach_data[0].relative_velocity.kilometers_per_second,
    ),
    Math.round(
      neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
    ),
  ];
};
