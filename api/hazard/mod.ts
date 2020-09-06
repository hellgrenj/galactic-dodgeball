import { NearEarthObject } from "../_types/nearEarthObject.ts";
import { pipe, extractNeos } from "../util/mod.ts";

/** 
returns number of hazardous objects 
@param {any} apiResponseObject - the response object from the NASA NEO API
@returns {number} - number of hazardous objects
*/
export const numberOfHazardousObjects = (apiResponseObject: any): number => {
  return pipe(extractNeos, filterPotentiallyHazardous)(apiResponseObject);
};
const filterPotentiallyHazardous = (neos: NearEarthObject[]): number => {
  return neos.filter((n: any) => consideredPotentiallyHazardous(n)).length;
};
/** 
checks wether or not a near earth object is considered hazardouz
@param {NearEarthObject} nearEarthObject - the near earth object
@returns {boolean} - hazardous or not
*/
export const consideredPotentiallyHazardous = (
  nearEarthObject: NearEarthObject,
): boolean => {
  return nearEarthObject.is_potentially_hazardous_asteroid;
};
