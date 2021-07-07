import React from "react";
import { DateType } from "./types";

//TODO
interface RenderReferenceProps {
  referenceDate: string; // TODO,
  rangeReference: number[];
  onChangeDate: (date: DateType) => void;
  zeroDayName: string;
}
const RenderReference: React.FC<RenderReferenceProps> = ({
  referenceDate,
  rangeReference,
  onChangeDate,
  zeroDayName,
}) => {
  const _referenceRenderer = (referenceDate: string, ranges: number[] = []) => {
    const options = ranges.map((day_diff = 0) => {
      // let _refDate = moment(referenceDate, "DD-MM-YYYY").isValid()
      //   ? moment(referenceDate, "DD-MM-YYYY")
      //   : moment();
      // if (isNaN(day_diff)) {
      //   day_diff = 0;
      // }
      // let new_date = _refDate.add("day", day_diff);

      return (
        <div
          className="reference-item"
          onClick={() => {
            onChangeDate({
              year: 2054,
              month: 2,
              day: 1,
            });
          }}
        >
          {day_diff === 0 ? zeroDayName || "Today" : `Within ${day_diff} Days`}
        </div>
      );
    });
    return options;
  };
  return (
    <div className="rl-nepali-date-referenc-list">
      {_referenceRenderer(referenceDate, rangeReference)}
    </div>
  );
};
export default RenderReference;
