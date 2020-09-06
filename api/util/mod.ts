import { NearEarthObject } from "../_types/nearEarthObject.ts";

/** 
takes a list of functions to pipe and returns a function that executes the pipe
@param {any[]} fns - list of functions
@returns {any} - the pipe function 
*/
export const pipe = (...fns: any[]) => {
  return (result: any) => {
    return [...fns].reduce((result, fn) => {
      return fn(result);
    }, result);
  };
};
/** 
extracts a list of near earth objects from an API response
@param {any} apiResponseObject - the response object from the NASA NEO API
@returns {NearEarthObject[]} - the near earth objects 
*/
export const extractNeos = (apiResponseObject: any): NearEarthObject[] => {
  return apiResponseObject
    ? Object.values(apiResponseObject).flat() as NearEarthObject[]
    : [] as NearEarthObject[];
};
