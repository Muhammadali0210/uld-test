// ~/data/driverLogs.ts
export type EventType = "Driving" | "On Duty" | "Off Duty" | "Sleeper";

export interface EventLog {
  id: number;
  start: string;
  end: string;
  status: string;
  type: string;
  location: string;
  system: string;
  odometer: number;
  events?: string;
  notice?: string;
  miles?: number;
  speed?: number;
  duration?: string;
  duration2?: string;
}

export const driverLogs: EventLog[] = [
  { id: 1, start: "2025-08-28T00:00:00", end: "2025-08-28T04:30:00", status: "off", type: "Off Duty", location: "5.0 mi W from Suffolk, VA", system: "Driver", odometer: 170000, duration: "4h 30m 0s" },
  { id: 2, start: "2025-08-28T04:30:00", end: "2025-08-28T06:15:00", status: "on", type: "On Duty", location: "5.0 mi W from Suffolk, VA", system: "Driver", odometer: 170037, duration: "1h 45m 0s" },
  { id: 3, start: "2025-08-28T06:15:00", end: "2025-08-28T10:30:00", status: "drive", type: "Driving", miles: 210, speed: 58, location: "5.0 mi W from Suffolk, VA", system: "ELD", odometer: 170037, duration: "4h 15m 0s" },
  { id: 4, start: "2025-08-28T10:30:00", end: "2025-08-28T12:00:00", status: "on", type: "On Duty", location: "4.9 mi W from Suffolk, VA", system: "Driver", odometer: 170037, duration: "1h 30m 0s" },
  { id: 5, start: "2025-08-28T12:00:00", end: "2025-08-29T00:00:00", status: "sleep", type: "Sleeper", location: "5.8 mi SSW from Oxford, NC", system: "Driver", odometer: 170444, duration: "8h 0m 0s" },
  { id: 6, start: "2025-08-29T00:00:00", end: "2025-08-29T07:01:03", status: "off", type: "Off Duty", location: "5.8 mi SSW from Oxford, NC", system: "Driver", odometer: 170444, duration: "7h 1m 3s" },
  { id: 7, start: "2025-08-29T07:01:03", end: "2025-08-29T07:05:27", status: "on", type: "On Duty", location: "3.2 mi E from Raleigh, NC", system: "Driver", odometer: 170550, duration: "0h 4m 24s" },
  { id: 8, start: "2025-08-29T07:05:27", end: "2025-08-29T07:06:27", status: "drive", type: "Driving", miles: 2, speed: 40, location: "6.0 mi S from Durham, NC", system: "ELD", odometer: 170500, duration: "0h 1m 0s" },
  { id: 9, start: "2025-08-29T07:06:27", end: "2025-08-29T07:20:45", status: "off", type: "Off Duty", location: "3.2 mi E from Raleigh, NC", system: "Driver", odometer: 170550, duration: "0h 14m 18s" },
  { id: 10, start: "2025-08-29T07:20:45", end: "2025-08-29T09:37:54", status: "drive", type: "Driving", miles: 137, speed: 59.93, location: "4.0 mi W from Fayetteville, NC", system: "ELD", odometer: 170700, duration: "2h 17m 9s" },
  { id: 11, start: "2025-08-29T09:37:54", end: "2025-08-29T11:00:00", status: "on", type: "On Duty", location: "2.0 mi E from Lumberton, NC", system: "Driver", odometer: 170850, duration: "1h 22m 6s" },
  { id: 12, start: "2025-08-29T11:00:00", end: "2025-08-29T16:00:00", status: "sleep", type: "Sleeper", location: "2.0 mi E from Lumberton, NC", system: "Driver", odometer: 170900, duration: "5h 0m 0s" },
  { id: 13, start: "2025-08-29T16:00:00", end: "2025-08-29T18:30:00", status: "drive", type: "Driving", miles: 140, speed: 62, location: "5.0 mi N from Charleston, SC", system: "ELD", odometer: 171050, duration: "2h 30m 0s" },
  { id: 14, start: "2025-08-29T18:30:00", end: "2025-08-29T20:00:00", status: "on", type: "On Duty", location: "5.0 mi N from Charleston, SC", system: "Driver", odometer: 171180, duration: "1h 30m 0s" },
  { id: 15, start: "2025-08-29T20:00:00", end: "2025-08-30T04:00:00", status: "off", type: "Off Duty", location: "5.0 mi N from Charleston, SC", system: "Driver", odometer: 171200, duration: "8h 0m 0s" },
  { id: 16, start: "2025-08-30T04:00:00", end: "2025-08-30T08:00:00", status: "drive", type: "Driving", miles: 220, speed: 61, location: "7.0 mi E from Savannah, GA", system: "ELD", odometer: 171420, duration: "4h 0m 0s" },
  { id: 17, start: "2025-08-30T08:00:00", end: "2025-08-30T09:30:00", status: "on", type: "On Duty", location: "7.0 mi E from Savannah, GA", system: "Driver", odometer: 171600, duration: "1h 30m 0s" },
  { id: 18, start: "2025-08-30T09:30:00", end: "2025-08-30T15:30:00", status: "sleep", type: "Sleeper", location: "7.0 mi E from Savannah, GA", system: "Driver", odometer: 171610, duration: "6h 0m 0s" },
  { id: 19, start: "2025-08-30T15:30:00", end: "2025-08-30T17:00:00", status: "off", type: "Off Duty", location: "10 mi N from Jacksonville, FL", system: "Driver", odometer: 171700, duration: "1h 30m 0s" },
  { id: 20, start: "2025-08-30T17:00:00", end: "2025-08-30T21:30:00", status: "drive", type: "Driving", miles: 180, speed: 60, location: "15 mi N from Orlando, FL", system: "ELD", odometer: 171850, duration: "4h 30m 0s" },
  { id: 21, start: "2025-08-30T21:30:00", end: "2025-08-31T04:00:00", status: "sleep", type: "Sleeper", location: "Orlando, FL", system: "Driver", odometer: 171900, duration: "6h 30m 0s" },
  { id: 22, start: "2025-08-31T04:00:00", end: "2025-08-31T06:30:00", status: "on", type: "On Duty", location: "Orlando, FL", system: "Driver", odometer: 171920, duration: "2h 30m 0s" },
  { id: 23, start: "2025-08-31T06:30:00", end: "2025-08-31T10:00:00", status: "drive", type: "Driving", miles: 200, speed: 63, location: "10 mi S from Tampa, FL", system: "ELD", odometer: 172100, duration: "3h 30m 0s" },
  { id: 24, start: "2025-08-31T10:00:00", end: "2025-08-31T12:00:00", status: "on", type: "On Duty", location: "Tampa, FL", system: "Driver", odometer: 172300, duration: "2h 0m 0s" },
  { id: 25, start: "2025-08-31T12:00:00", end: "2025-08-31T18:00:00", status: "off", type: "Off Duty", location: "Tampa, FL", system: "Driver", odometer: 172320, duration: "6h 0m 0s" },
  { id: 26, start: "2025-08-31T18:00:00", end: "2025-09-01T00:00:00", status: "drive", type: "Driving", miles: 240, speed: 65, location: "Naples, FL", system: "ELD", odometer: 172560, duration: "6h 0m 0s" },
  { id: 27, start: "2025-09-01T00:00:00", end: "2025-09-01T08:00:00", status: "sleep", type: "Sleeper", location: "Naples, FL", system: "Driver", odometer: 172800, duration: "8h 0m 0s" },
  { id: 28, start: "2025-09-01T08:00:00", end: "2025-09-01T09:30:00", status: "on", type: "On Duty", location: "Naples, FL", system: "Driver", odometer: 172820, duration: "1h 30m 0s" },
  { id: 29, start: "2025-09-01T09:30:00", end: "2025-09-01T12:00:00", status: "drive", type: "Driving", miles: 120, speed: 60, location: "Miami, FL", system: "ELD", odometer: 172940, duration: "2h 30m 0s" },
  { id: 30, start: "2025-09-01T12:00:00", end: "2025-09-01T23:59:59", status: "off", type: "Off Duty", location: "Miami, FL", system: "Driver", odometer: 173060, duration: "11h 59m 59s" },
];


