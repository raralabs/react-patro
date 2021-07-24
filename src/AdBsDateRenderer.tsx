import { ad2bs } from "./CalendarData";
import { isDateValidWithFormat } from "./CalendarData/validator";
import { parseDate } from "./date-fns";
import { useCalendarType } from "./hooks";

type AdBsDateRendererProps = {
  adDate: string;
  adDateFormat: string;
};

const padDateMonth = (val: string | number) => {
  return `${val}`.padStart(2, "0");
};
const AdBsDateRenderer = ({
  adDate,
  adDateFormat = "DD-MM-YYYY",
}: AdBsDateRendererProps) => {
  const adDateObj = parseDate(adDate, adDateFormat);

  const bsDateObj = ad2bs(
    adDateObj.getFullYear(),
    adDateObj.getMonth() + 1,
    adDateObj.getDate()
  );
  const calendarType = useCalendarType("BS");
  if (adDate == null || adDate === "") {
    return "";
  }
  if (isDateValidWithFormat(adDate, adDateFormat)) {
    return calendarType === "AD"
      ? adDate
      : `${padDateMonth(bsDateObj.date)}-${padDateMonth(bsDateObj.month)}-${
          bsDateObj.year
        }`;
  } else {
    return "Invalid Date";
  }
};

export default AdBsDateRenderer;
