import { NearEarthObject } from "../_types/nearEarthObject.ts";
import { pipe, extractNeos } from "../util/mod.ts";

/** 
returns the near earth object that passes closest to earth
@param {any} apiResponseObject - the response object from the NASA NEO API
@returns {NearEarthObject} - the near earth object (parsed from the response)
*/
export const closestToEarth = (apiResponseObject: any): NearEarthObject => {
  return pipe(extractNeos, reduceClosest)(apiResponseObject);
};
const reduceClosest = (neos: NearEarthObject[]): NearEarthObject => {
  return neos.reduce((closest: NearEarthObject, current: NearEarthObject) => {
    return (Math.round(
      closest.close_approach_data[0].miss_distance.kilometers,
    )) <
      Math.round(current.close_approach_data[0].miss_distance.kilometers)
      ? closest
      : current;
  });
};
/** 
converts kilometers to scandinavian miles (mil)
@param {number} kilometers
@returns {number} - the scandinavian miles (mil)
*/
export const kilometersToScandinavianMiles = (kilometers: number): number => {
  return Math.round(kilometers / 10);
};
/** 
returns how many times through Sweden one would drive if driving all kilometers
@param {number} kilometers
@returns {number} - number of times through Sweden
*/
export const timesThruSweden = (kilometer: number): number => {
  const lengthOfSwedenInKm = 1572;
  return Math.round(kilometer / lengthOfSwedenInKm);
};
/** 
returns wheter or not current closest neo is closer than the provided highscore neo
@param {NearEarthObject} current
@param {NearEarthObject} highscore
@returns {boolean} - wheter or not current was closer than highscore
*/
export const closerThanHighscore = (
  current: NearEarthObject,
  highscore: NearEarthObject,
): boolean => {
  return Math.round(current.close_approach_data[0].miss_distance.kilometers) <
    Math.round(highscore.close_approach_data[0].miss_distance.kilometers);
};

/** 
returns close approach full date with timezone explanation
@param {NearEarthObject} neo
@returns {string} - close approach full date with timezone explanation
*/
export const closeApproachFullDate = (neo: NearEarthObject): string => {
  return `${
    neo.close_approach_data[0].close_approach_date_full
  } (TDB = UTC + 64 seconds approx)`;
};
