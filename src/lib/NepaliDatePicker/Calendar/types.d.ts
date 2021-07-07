export interface DateType {
  day: number | null;
  month: number | null;
  year: number | null;
}
export interface ADBSDateType {
  ad: DateType;
  bs: DateType;
}

export type CalendarType = "AD" | "BS";

export type ShowDropdownType = boolean | "full" | "short" | "min";

export type CalendarDataType = {
  month: number;
  year: number;
  dayValue: number;
};

export type ShowYearDropdownType = boolean | number[]; // TODO allow for only two values in number array;
