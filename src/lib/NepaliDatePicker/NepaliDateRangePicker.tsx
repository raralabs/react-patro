import React from "react";

interface RangePickerTypes {
  value: string;
  size: "large" | "small";
  separator: " " | "-" | "/";
  calendarType: "AD" | "BS";
}
const RangePicker: React.FC<RangePickerTypes> = ({
  value,
  size,
  separator,
  calendarType,
}) => {
  return <div>Date Range Picker</div>;
};
export default RangePicker;

// class NepaliDateRangePicker extends Component {

//     static propTypes = {
//         /** Date Value in AD DD-MM-YYYY */
//         value: PropTypes.string,
//         /** Size of input */
//         size: PropTypes.oneOf(['large', 'small']),
//         /** Separator for input suggestion */
//         separator: PropTypes.oneOf([' ', '-', '/']),

//         /** Override calendar type initially  "AD" or "BS" */
//         calendarType: PropTypes.oneOf(['AD', 'BS']),

//         /** Gives [AD DATE FROM, AD DATE TO] as params */
//         onChange: PropTypes.func,

//         /** Logic to disable date, arguement is current date moment, return true or false */
//         disableDate: PropTypes.func

//     }
//     constructor(props) {
//         super(props)

//         this.state = {

//         }
//     }

//     render() {
//         return <div>Date Range Picker</div>
//     }
// }
