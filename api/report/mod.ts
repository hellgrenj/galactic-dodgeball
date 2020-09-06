import {
  kilometersToScandinavianMiles,
  timesThruSweden,
  closestToEarth,
  closeApproachFullDate,
} from "../distance/mod.ts";
import { estimatedDiameterInMeters } from "../size/mod.ts";
import { relativeVelocity } from "../velocity/mod.ts"
import {
  numberOfHazardousObjects,
  consideredPotentiallyHazardous,
} from "../hazard/mod.ts";
import { pipe } from "../util/mod.ts";

interface Report {
  closestDistanceInKm: number;
  minDia: number;
  maxDia: number;
  kmPerSecond: number;
  kmPerHour: number;
  closeApproachDate: string;
  scandinavanMiles: number;
  timesSwedensLength: number;
  hazardous: boolean;
  noHazardous: number;
  noObjects: number;
}
/** 
takes a response from the NEO WS API and returns a report
@param {any} response - the API Response
@returns {[string, NearEarthObject]} - the report 
*/
export const createHTMLReport = (
  response: any,
): string => {
  return pipe(constructReport, formatHTMLReport)(response);
};

const constructReport = (response: any): Report => {
  const closest = closestToEarth(response.near_earth_objects);

  const closestDistanceInKm = Math.round(
    closest.close_approach_data[0].miss_distance.kilometers,
  );
  const [minDia, maxDia] = estimatedDiameterInMeters(
    closest,
  );
  const [kmPerSecond, kmPerHour] = relativeVelocity(
    closest,
  );
  const closeApproachDate = closeApproachFullDate(closest);
  const scandinavanMiles = kilometersToScandinavianMiles(closestDistanceInKm);
  const timesSwedensLength = timesThruSweden(closestDistanceInKm);
  const hazardous = consideredPotentiallyHazardous(closest);
  const noHazardous = numberOfHazardousObjects(response.near_earth_objects);
  const noObjects = response.element_count;

  return {
    closestDistanceInKm,
    minDia,
    maxDia,
    kmPerSecond,
    kmPerHour,
    closeApproachDate,
    scandinavanMiles,
    timesSwedensLength,
    hazardous,
    noHazardous,
    noObjects,
  } as Report;
};
const formatHTMLReport = (
  report: Report,
): string => {
  return `<p> In total <span style='font-weight:600;'>${
     report.noObjects.toString()
  } </span> objects where found and <span style='font-weight:600;'>${
   report.noHazardous.toString()
  } </span> where considered hazardous.</p>
            
<p>The closest one passed/will pass just  <span style='font-weight:600;'>${
   
      formatNumberString(report.closestDistanceInKm)
    
  } </span>km from earth (${
   
      formatNumberString(report.scandinavanMiles)
    
  } scandinavian miles)
thats like driving thru Sweden  <span style='font-weight:600;'>${
   formatNumberString(report.timesSwedensLength)
  } </span> times.</p>

<p>Date and time for this close approach is  <span style='font-weight:600;'><br/>${report.closeApproachDate}</span></p>
            
<p>This object is estimated to be between <span style='font-weight:600;'>${
    report.minDia.toString()
  } </span> and <span style='font-weight:600;'> ${
    report.maxDia.toString()
  } </span> meters in diameter travelling at a speed (relative to us) 
of  <span style='font-weight:600;color:red;'>${formatNumberString(report.kmPerSecond)}</span> km per second (${
    formatNumberString(report.kmPerHour)
  } km per hour)</p>
            
<p>This object is ${
    report.hazardous ? ("<span style='font-weight:600;color:red;'>(!)</span>") : "<span style='font-weight:600;color:green;'>NOT</span>"
  } considered potentially hazardous</p>
            `.trim();
};
const formatNumberString = (n: number): string => {
  return n.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
};
