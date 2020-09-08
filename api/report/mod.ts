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
import { toHTML } from "../toHTML/mod.ts";
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

interface TransformedReport {
  closestDistanceInKm: string;
  minDia: string;
  maxDia: string;
  kmPerSecond: string;
  kmPerHour: string;
  closeApproachDate: string;
  scandinavanMiles: string;
  timesSwedensLength: string;
  hazardous: boolean;
  noHazardous: string;
  noObjects: string;
}

type HTMLGenerator = (report: TransformedReport) => string;

/** 
takes a response from the NEO WS API and returns a report
@param {any} response - the API Response
@returns {[string, NearEarthObject]} - the report 
*/
export const createHTMLReport = (
  response: any,
): string => {
  return pipe(constructReport, transformReport, formatHTMLReport)(response);
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

const formatNumberString = (n: number): string => {
  return n.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
};

const transformReport = (report: Report): TransformedReport => ({
  closestDistanceInKm: formatNumberString(report.closestDistanceInKm),
  minDia: report.minDia.toString(),
  maxDia: report.maxDia.toString(),
  kmPerSecond: formatNumberString(report.kmPerSecond),
  kmPerHour: formatNumberString(report.kmPerHour),
  closeApproachDate: report.closeApproachDate,
  scandinavanMiles: formatNumberString(report.scandinavanMiles),
  timesSwedensLength: formatNumberString(report.timesSwedensLength),
  hazardous: report.hazardous,
  noHazardous: report.noHazardous.toString(),
  noObjects: report.noObjects.toString(),
});

const createHTMLFromReport = (...HTMLGenerators: HTMLGenerator[]) => (
  report: TransformedReport,
): string => HTMLGenerators.reduce((acc, currentGeneratorFn) => `${acc}${currentGeneratorFn(report)}`, '');

const toParagraph = (content: string) => toHTML('p', content);
const toBold = (content: string) => toHTML('span', content, ['style', 'font-weight:600']);
const toBoldWithColor = (content: string, color: string) => toHTML('span', content, ['style', `font-weight:600;color:${color}`]);

const generateParagraph1 = ({ noObjects, noHazardous }: TransformedReport): string => toParagraph(
  `In total ${toBold(noObjects)} near earth objects (Asteroids...) were found and ${toBold(noHazardous)} were considered hazardous.`
);
const generateParagraph2 = ({ closestDistanceInKm, scandinavanMiles, timesSwedensLength }: TransformedReport) => toParagraph(
  `The closest one passed/will pass just ${toBold(closestDistanceInKm)} km from earth (${toBold(scandinavanMiles)} scandinavian miles) 
  thats like driving thru Sweden ${toBold(timesSwedensLength)} times.`
);
const generateParagraph3 = ({ closeApproachDate }: TransformedReport) => toParagraph(
  `Date and time for this close approach is ${toBold(closeApproachDate)}`
);
const generateParagraph4 = ({ minDia, maxDia, kmPerSecond, kmPerHour }: TransformedReport) => toParagraph(
  `This object is estimated to be between ${toBold(minDia)} and ${toBold(maxDia)} meters in diameter 
  travelling at a speed of ${toBold(kmPerSecond)} km per second (${toBold(kmPerHour)} km per hour)`
);
const generateParagraph5 = ({ hazardous }: TransformedReport) => toParagraph(
  `This object is ${hazardous ? toBoldWithColor('(!)', 'red') : toBoldWithColor('NOT', 'green')} considered potentially hazardous`
);

const formatHTMLReport = createHTMLFromReport(
  generateParagraph1,
  generateParagraph2,
  generateParagraph3,
  generateParagraph4,
  generateParagraph5
);
