// ~/data/driverLogs.ts
export type EventType = "Driving" | "On Duty" | "Off Duty" | "Sleeper";

export interface EventLog {
  id: number;
  start: string; // ISO
  end: string;   // ISO
  type: EventType;
  miles?: number;
  speed?: number;
  location?: string;
  status: string
}

export const driverLogs: EventLog[] = [
  { id: 1, start: "2025-08-28T00:00:00", end: "2025-08-28T04:30:00", status: "off", type: "Off Duty" },
  { id: 2, start: "2025-08-28T04:30:00", end: "2025-08-28T06:15:00", status: "on", type: "On Duty" },
  { id: 3, start: "2025-08-28T06:15:00", end: "2025-08-28T10:30:00", status: "drive", type: "Driving", miles: 210, speed: 58 },
  { id: 4, start: "2025-08-28T10:30:00", end: "2025-08-28T12:00:00", status: "on", type: "On Duty" },
  { id: 5, start: "2025-08-28T12:00:00", end: "2025-08-28T20:00:00", status: "sleep", type: "Sleeper" },
  { id: 6, start: "2025-08-29T00:00:00", end: "2025-08-29T07:01:03", status: "off", type: "Off Duty" },
  { id: 7, start: "2025-08-29T07:01:03", end: "2025-08-29T07:05:27", status: "on", type: "On Duty" },
  { id: 8, start: "2025-08-29T07:05:27", end: "2025-08-29T07:06:27", status: "drive", type: "Driving", miles: 2, speed: 40 },
  { id: 9, start: "2025-08-29T07:06:27", end: "2025-08-29T07:20:45", status: "off", type: "Off Duty" },
  { id: 10, start: "2025-08-29T07:20:45", end: "2025-08-29T09:37:54", status: "drive", type: "Driving", miles: 137, speed: 59.93 },
  { id: 11, start: "2025-08-30T00:00:00", end: "2025-08-30T03:30:00", status: "off", type: "Off Duty" },
  { id: 12, start: "2025-08-30T03:30:00", end: "2025-08-30T07:30:00", status: "drive", type: "Driving", miles: 220, speed: 62 },
  { id: 13, start: "2025-08-30T07:30:00", end: "2025-08-30T08:00:00", status: "on", type: "On Duty" },
  { id: 14, start: "2025-08-30T08:00:00", end: "2025-08-30T23:59:59", status: "sleep", type: "Sleeper" }
];

const mockData = ref([
  { id: 1, time: 'Aug 28, 2025 11:45 PM', duration: '15m', type: 'Off Duty', location: '5.0 mi W from Suffolk, VA', system: 'Driver', odometer: 170000, events: '', notice: 'None', duration2: 'Pending' },
  { id: 2, time: 'Aug 29, 2025 12:01 AM', duration: '4m 23s', type: 'On Duty', location: '5.0 mi W from Suffolk, VA', system: 'Driver', odometer: 170037, events: '', notice: 'MILES', duration2: '137 miles' },
  { id: 3, time: 'Aug 29, 2025 12:05 AM', duration: '1m', type: 'Driving', location: '5.0 mi W from Suffolk, VA', system: 'ELD', odometer: 170037, events: '6278.9', notice: 'SPEED', duration2: '50.93m/h' },
  { id: 4, time: 'Aug 29, 2025 12:06 AM', duration: '14m 18s', type: 'Off Duty', location: '4.9 mi W from Suffolk, VA', system: 'Driver', odometer: 170037, events: '6278.9', notice: 'None', duration2: 'Pending' },
  { id: 5, time: 'Aug 29, 2025 12:20 AM', duration: '2h 17m 9s', type: 'Driving', location: '4.9 mi W from Suffolk, VA', system: 'ELD', odometer: 170037, events: '6279.1', notice: '', duration2: 'Pending' },
  { id: 6, time: 'Aug 29, 2025 02:37 AM', duration: '', type: 'Intermediate w/ CLP', location: '4.5 mi NW from Emporia, VA', system: 'ELD', odometer: 170364, events: '6280.1', notice: '', duration2: 'Pending' },
  { id: 7, time: 'Aug 29, 2025 02:37 AM', duration: '', type: 'Intermediate w/ CLP', location: '2.9 mi NE from Henderson, NC', system: 'ELD', odometer: 170425, events: '6281.1', notice: '', duration2: 'Pending' },
  { id: 8, time: 'Aug 29, 2025 03:37 AM', duration: '49m 9s', type: 'Off Duty', location: '5.8 mi SSW from Oxford, NC', system: 'Driver', odometer: 170444, events: '6281.3', notice: '', duration2: 'Pending' },
  { id: 9, time: 'Aug 29, 2025 04:26 AM', duration: '30m', type: 'Sleeper Berth', location: '5.8 mi SSW from Oxford, NC', system: 'Driver', odometer: 170444, events: '', notice: 'REST', duration2: 'Pending' },
  { id: 10, time: 'Aug 29, 2025 04:56 AM', duration: '1h 10m', type: 'Driving', location: '6.0 mi S from Durham, NC', system: 'ELD', odometer: 170500, events: '6300.0', notice: 'SPEED', duration2: '65 mph' },
  { id: 11, time: 'Aug 29, 2025 06:06 AM', duration: '20m', type: 'On Duty', location: '3.2 mi E from Raleigh, NC', system: 'Driver', odometer: 170550, events: '', notice: 'INSPECT', duration2: 'Pending' },
  { id: 12, time: 'Aug 29, 2025 06:26 AM', duration: '45m', type: 'Off Duty', location: '3.2 mi E from Raleigh, NC', system: 'Driver', odometer: 170550, events: '', notice: 'BREAK', duration2: 'Pending' },
  { id: 13, time: 'Aug 29, 2025 07:11 AM', duration: '2h 30m', type: 'Driving', location: '4.0 mi W from Fayetteville, NC', system: 'ELD', odometer: 170700, events: '6350.0', notice: '', duration2: 'Pending' },
  { id: 14, time: 'Aug 29, 2025 09:41 AM', duration: '10m', type: 'Intermediate w/ CLP', location: '2.5 mi N from Lumberton, NC', system: 'ELD', odometer: 170750, events: '', notice: '', duration2: 'Pending' },
  { id: 15, time: 'Aug 29, 2025 09:51 AM', duration: '1h 15m', type: 'Sleeper Berth', location: '2.5 mi N from Lumberton, NC', system: 'Driver', odometer: 170750, events: '', notice: 'REST', duration2: 'Pending' },
  { id: 16, time: 'Aug 29, 2025 11:06 AM', duration: '3h', type: 'Driving', location: '5.1 mi SW from Florence, SC', system: 'ELD', odometer: 170950, events: '6400.0', notice: 'SPEED', duration2: '70 mph' },
  { id: 17, time: 'Aug 29, 2025 02:06 PM', duration: '30m', type: 'Off Duty', location: '5.1 mi SW from Florence, SC', system: 'Driver', odometer: 170950, events: '', notice: 'LUNCH', duration2: 'Pending' },
  { id: 18, time: 'Aug 29, 2025 02:36 PM', duration: '1h 45m', type: 'On Duty', location: '4.3 mi E from Manning, SC', system: 'Driver', odometer: 171000, events: '', notice: 'LOAD', duration2: 'Pending' },
  { id: 19, time: 'Aug 29, 2025 04:21 PM', duration: '2h 20m', type: 'Driving', location: '3.7 mi N from Charleston, SC', system: 'ELD', odometer: 171200, events: '6450.0', notice: '', duration2: 'Pending' },
  { id: 20, time: 'Aug 29, 2025 06:41 PM', duration: '15m', type: 'Intermediate w/ CLP', location: '3.7 mi N from Charleston, SC', system: 'ELD', odometer: 171200, events: '', notice: '', duration2: 'Pending' },
  { id: 21, time: 'Aug 29, 2025 06:56 PM', duration: '4h', type: 'Off Duty', location: '2.8 mi W from Savannah, GA', system: 'Driver', odometer: 171300, events: '', notice: 'REST', duration2: 'Pending' },
  { id: 22, time: 'Aug 29, 2025 10:56 PM', duration: '1h 30m', type: 'Sleeper Berth', location: '2.8 mi W from Savannah, GA', system: 'Driver', odometer: 171300, events: '', notice: '', duration2: 'Pending' },
  { id: 23, time: 'Aug 30, 2025 12:26 AM', duration: '5h 10m', type: 'Driving', location: '6.2 mi S from Brunswick, GA', system: 'ELD', odometer: 171600, events: '6500.0', notice: 'NIGHT', duration2: 'Pending' },
  { id: 24, time: 'Aug 30, 2025 05:36 AM', duration: '20m', type: 'On Duty', location: '6.2 mi S from Brunswick, GA', system: 'Driver', odometer: 171600, events: '', notice: 'CHECK', duration2: 'Pending' },
  { id: 25, time: 'Aug 30, 2025 05:56 AM', duration: '3h 40m', type: 'Driving', location: '4.4 mi E from Jacksonville, FL', system: 'ELD', odometer: 171900, events: '6550.0', notice: '', duration2: 'Pending' },
  { id: 26, time: 'Aug 30, 2025 09:36 AM', duration: '45m', type: 'Off Duty', location: '4.4 mi E from Jacksonville, FL', system: 'Driver', odometer: 171900, events: '', notice: 'BREAK', duration2: 'Pending' },
  { id: 27, time: 'Aug 30, 2025 10:21 AM', duration: '2h', type: 'On Duty', location: '3.1 mi S from St. Augustine, FL', system: 'Driver', odometer: 172000, events: '', notice: 'LOAD', duration2: 'Pending' },
  { id: 28, time: 'Aug 30, 2025 12:21 PM', duration: '1h 50m', type: 'Driving', location: '5.5 mi W from Daytona Beach, FL', system: 'ELD', odometer: 172150, events: '6600.0', notice: 'SPEED', duration2: '68 mph' },
  { id: 29, time: 'Aug 30, 2025 02:11 PM', duration: '30m', type: 'Sleeper Berth', location: '5.5 mi W from Daytona Beach, FL', system: 'Driver', odometer: 172150, events: '', notice: 'REST', duration2: 'Pending' },
  { id: 30, time: 'Aug 30, 2025 02:41 PM', duration: '4h 20m', type: 'Driving', location: '2.6 mi N from Orlando, FL', system: 'ELD', odometer: 172450, events: '6650.0', notice: '', duration2: 'Pending' },
  { id: 31, time: 'Aug 30, 2025 07:01 PM', duration: '1h', type: 'Off Duty', location: '2.6 mi N from Orlando, FL', system: 'Driver', odometer: 172450, events: '', notice: 'DINNER', duration2: 'Pending' },
  { id: 32, time: 'Aug 30, 2025 08:01 PM', duration: '2h 30m', type: 'Driving', location: '4.8 mi E from Lakeland, FL', system: 'ELD', odometer: 172600, events: '6700.0', notice: 'NIGHT', duration2: 'Pending' },
  { id: 33, time: 'Aug 30, 2025 10:31 PM', duration: '8h', type: 'Sleeper Berth', location: '4.8 mi E from Lakeland, FL', system: 'Driver', odometer: 172600, events: '', notice: 'SLEEP', duration2: 'Pending' },
  { id: 34, time: 'Aug 31, 2025 06:31 AM', duration: '30m', type: 'On Duty', location: '4.8 mi E from Lakeland, FL', system: 'Driver', odometer: 172600, events: '', notice: 'INSPECT', duration2: 'Pending' },
  { id: 35, time: 'Aug 31, 2025 07:01 AM', duration: '3h 15m', type: 'Driving', location: '3.9 mi S from Tampa, FL', system: 'ELD', odometer: 172850, events: '6750.0', notice: '', duration2: 'Pending' },
  { id: 36, time: 'Aug 31, 2025 10:16 AM', duration: '20m', type: 'Intermediate w/ CLP', location: '3.9 mi S from Tampa, FL', system: 'ELD', odometer: 172850, events: '', notice: '', duration2: 'Pending' },
  { id: 37, time: 'Aug 31, 2025 10:36 AM', duration: '1h 40m', type: 'Off Duty', location: '5.2 mi W from Sarasota, FL', system: 'Driver', odometer: 172950, events: '', notice: 'BREAK', duration2: 'Pending' },
  { id: 38, time: 'Aug 31, 2025 12:16 PM', duration: '2h 45m', type: 'Driving', location: '4.1 mi N from Fort Myers, FL', system: 'ELD', odometer: 173150, events: '6800.0', notice: 'SPEED', duration2: '72 mph' },
  { id: 39, time: 'Aug 31, 2025 03:01 PM', duration: '45m', type: 'On Duty', location: '4.1 mi N from Fort Myers, FL', system: 'Driver', odometer: 173150, events: '', notice: 'UNLOAD', duration2: 'Pending' },
  { id: 40, time: 'Aug 31, 2025 03:46 PM', duration: '4h 10m', type: 'Driving', location: '6.3 mi E from Naples, FL', system: 'ELD', odometer: 173400, events: '6850.0', notice: '', duration2: 'Pending' },
  { id: 41, time: 'Aug 31, 2025 07:56 PM', duration: '30m', type: 'Off Duty', location: '6.3 mi E from Naples, FL', system: 'Driver', odometer: 173400, events: '', notice: 'REST', duration2: 'Pending' },
  { id: 42, time: 'Aug 31, 2025 08:26 PM', duration: '2h', type: 'Sleeper Berth', location: '3.4 mi S from Miami, FL', system: 'Driver', odometer: 173500, events: '', notice: 'SLEEP', duration2: 'Pending' },
  { id: 43, time: 'Aug 31, 2025 10:26 PM', duration: '1h 20m', type: 'Driving', location: '3.4 mi S from Miami, FL', system: 'ELD', odometer: 173600, events: '6900.0', notice: 'NIGHT', duration2: 'Pending' },
  { id: 44, time: 'Aug 31, 2025 11:46 PM', duration: '7h', type: 'Off Duty', location: '2.7 mi W from Homestead, FL', system: 'Driver', odometer: 173600, events: '', notice: 'SLEEP', duration2: 'Pending' },
  { id: 45, time: 'Sep 01, 2025 06:46 AM', duration: '25m', type: 'On Duty', location: '2.7 mi W from Homestead, FL', system: 'Driver', odometer: 173600, events: '', notice: 'CHECK', duration2: 'Pending' },
  { id: 46, time: 'Sep 01, 2025 07:11 AM', duration: '5h 30m', type: 'Driving', location: '4.5 mi N from Key Largo, FL', system: 'ELD', odometer: 173950, events: '6950.0', notice: '', duration2: 'Pending' },
  { id: 47, time: 'Sep 01, 2025 12:41 PM', duration: '1h', type: 'Intermediate w/ CLP', location: '4.5 mi N from Key Largo, FL', system: 'ELD', odometer: 173950, events: '', notice: '', duration2: 'Pending' },
  { id: 48, time: 'Sep 01, 2025 01:41 PM', duration: '3h 20m', type: 'Driving', location: '5.9 mi E from Marathon, FL', system: 'ELD', odometer: 174200, events: '7000.0', notice: 'SPEED', duration2: '60 mph' },
  { id: 49, time: 'Sep 01, 2025 05:01 PM', duration: '40m', type: 'Off Duty', location: '5.9 mi E from Marathon, FL', system: 'Driver', odometer: 174200, events: '', notice: 'REST', duration2: 'Pending' },
  { id: 50, time: 'Sep 01, 2025 05:41 PM', duration: '2h 10m', type: 'Driving', location: '3.2 mi S from Key West, FL', system: 'ELD', odometer: 174350, events: '7050.0', notice: '', duration2: 'Pending' },
]);
