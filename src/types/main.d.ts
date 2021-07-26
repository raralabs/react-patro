export interface DateType {
  day?: number | null;
  month?: number | null;
  year?: number | null;
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
  dayValue?: number;
};

export type ShowYearDropdownType = boolean | number[]; // TODO allow for only two values in number array;

export type DateRange = {
  from: string | null;
  to: string | null;
  format?: string;
};

export type onSelectProps = (
  formattedDate: string,
  adDate: IDateObject,
  bsDate: IDateObject,
  dateString: Date
) => void;

export type onChangeProps = (
  formattedDate: string,
  adDate?: IDateObject,
  bsDate?: IDateObject,
  dateString?: Date
) => void;

export interface IDateObject {
  year: number;
  month: number;
  date: number;
}
export interface IDateOffset {
  year?: number;
  month?: number;
  date?: number;
}

export type DisableProps = {
  disableDate?: (
    formattedDate: string,
    adDate: DateType,
    bsDate: DateType,
    dateString: Date
  ) => boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  maxDate?: string;
  minDate?: string;
};

export type RangeProps = {
  range?: DateRange;
};

interface IDatePicker extends INepaliCalendar {
  size: "small" | "large"; // TODO,
  onChange: onChangeProps;
  isClearable: boolean;
  value: string;
  placehoder?: string;
  dateFormat: string;
  hideOnSelect: boolean;
}

export interface INepaliCalendar extends DisableProps, RangeProps {
  showToday?: boolean;
  zeroDayName?: string;
  defaultValue?: string | null;
  dateFormat: string;
  value?: string | null;
  showMonthDropdown?: ShowDropdownType;
  showYearDropdown?: ShowYearDropdownType;
  onSelect: onSelectProps;
  shouldPressOK?: boolean;
  showExtra?: boolean;
  withReference?: boolean;
  reference_date?: string;
  rangeReference?: number[];
  calendarType: CalendarType;
}

export interface ICalendarRange {
  from: string;
  to: string;
  onChange: (dateFrom: string | null, dateTo: string | null) => void;
  dateFormat: string;
  calendarType: CalendarType;
}

export interface IDateFormat {
  yyyy?: number;
  mm?: number;
  m?: number;
  dd?: number;
  d?: number;
}
