export interface GetPointByMonthDTO {
  id: string;
  entryOne: string | null;
  exitOne: string | null;
  entryTwo: string | null;
  exitTwo: string | null;
  isHoliday: boolean;
  datetime: Date;
}
