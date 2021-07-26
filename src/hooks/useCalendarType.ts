import { useState } from "react";
import { CalendarType } from "../types/main";

//TODO generalize for global cases.
// Maybe used in future for global context.. Maybe...
function useCalendarType(calendarTypeFromProps: CalendarType): CalendarType {
  const [calendarType] = useState(calendarTypeFromProps ?? "BS");

  return calendarType;
}

export default useCalendarType;
