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
