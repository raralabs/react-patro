import { useState, useEffect } from "react";
import { CalendarType } from "./../NewCalendar/types.d";
import { get_ad_bs_listener, getCalendarType } from "../ad_bs_date_render";

function useCalendarType(calendarTypeFromProps: CalendarType): CalendarType {
  const [calendarType, setCalendarType] = useState(
    calendarTypeFromProps ?? getCalendarType()
  );
  useEffect(() => {
    let ad_bs_app = get_ad_bs_listener();
    let ad_bs_sub_key = ad_bs_app.ad_bs.subscribe((dateType: CalendarType) => {
      setCalendarType(dateType || "BS");
    });
    return () => {
      let ad_bs_app = get_ad_bs_listener();
      ad_bs_app.ad_bs.unsubscribe(ad_bs_sub_key);
    };
  });
  return calendarType;
}

export default useCalendarType;
