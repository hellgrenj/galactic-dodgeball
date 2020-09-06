import { NearEarthObject } from "../_types/nearEarthObject.ts";

/** 
returns the estimated min and max diameter in meters
@param {NearEarthObject} neo - the near earth object
@returns {[number, number]} - estimated [min diameter, max diameter]
*/
export const estimatedDiameterInMeters = (
  neo: NearEarthObject,
): [number, number] => {
  return [
    Math.round(neo.estimated_diameter.meters.estimated_diameter_min),
    Math.round(neo.estimated_diameter.meters.estimated_diameter_max),
  ];
};
