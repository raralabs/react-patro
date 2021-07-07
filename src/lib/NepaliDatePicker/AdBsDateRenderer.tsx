import moment from "moment";
import { calendarFunctions } from "./helper_bs";
import { useCalendarType } from "./hooks";
import { padDateMonth } from "./utils";

type AdBsDateRendererProps = {
  adDate: string;
  adDateFormat: string;
};
const AdBsDateRenderer = ({
  adDate,
  adDateFormat = "DD-MM-YYYY",
}: AdBsDateRendererProps) => {
  let adDateObj = moment(adDate, adDateFormat);
  let bsDateObj = calendarFunctions.getBsDateByAdDate(
    adDateObj.year(),
    adDateObj.month() + 1,
    adDateObj.date()
  );
  const calendarType = useCalendarType("BS");
  if (adDate == null || adDate === "") {
    return "";
  }
  if (adDateObj.isValid()) {
    return calendarType === "AD"
      ? adDate
      : `${padDateMonth(bsDateObj.bsDate)}-${padDateMonth(bsDateObj.bsMonth)}-${
          bsDateObj.bsYear
        }`;
  } else {
    return "Invalid Date";
  }
};

export default AdBsDateRenderer;
