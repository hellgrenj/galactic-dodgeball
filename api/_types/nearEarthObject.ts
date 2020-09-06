export interface NearEarthObject {
  estimated_diameter: EstimatedDiameter;
  close_approach_data: [CloseApproachData];
  is_potentially_hazardous_asteroid: boolean;
}
export interface EstimatedDiameter {
  kilometers: {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  };
  meters: {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  };
}
export interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: number;
    kilometers_per_hour: number;
    miles_per_hour: number;
  };
  miss_distance: {
    astronomical: number;
    lunar: number;
    kilometers: number;
    miles: number;
  };
  orbiting_body: string;
}
