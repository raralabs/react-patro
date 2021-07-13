## TODO LIST

- [x] Prepare Basic UI
- [x] Month Next Previous
- [x] Year Next Previous
- [x] Date select and selected date in view
- [x] Select date for next or previous month
- [x] Dropdown for year select
- [x] Implement calendar in date picker
- [x] AD/BS switcher
- [x] AD/BS accept both value (AD as primary)
- [x] AD/BS sends both value
- [x] Implement date format usage
- [ ] Month => displaying, full , short, min based on params
- [ ] year => displaying based on range provided
- [ ] defaultValue => allow for Date String if no dateFormat is passed

<br/>

# [Demo](https://ad-bs-datepicker.firebaseapp.com/)

# React AD BS Date picker

`Available Variants as of now:`

    1. Calendar -> Renders Calendar Layout (The basic building block);
    2. DatePicker -> Input field with Calendar on popup
    3. RangePicker -> Two Calendar Layout side by side for range selection
    4. RangePicker With defined lables -> TODO
    5. //TODO

## On Data passed (Value) -Input

The Calendar component can be both controlled and uncontrolled. If value is passed, defaultValue is ignored.

- **value** : string (formatted according to dateFormat)
- **defaultValue**: string (formatted according to dateFormat)

---

## Calendar Configuration

- **calendarType** - "AD"| "BS" default= //TODO

Though all inner operations are done in AD format, this configuration differentiates the rendering date value. If AD is passed then AD calendar is rendered and if BS is passed then BS calendar is rendered.

> Based on this props, the input and ouput values also differ.

---

<br/>

## On Data Selection - Output

For calendarLayout
**onSelect** (formattedDate: string,adDate: DateType,bsDate: DateType, dateString:Date)=>void;

1. The **formattedDate** will be string formatted according to the **dateFormat** provided and **calendarType**. If **calendarType** is BS then the output will be tha formatted string of BS Date and if it is AD then the output will the formatted string of AD Date.
2. The **adDate** //TODO for now object with property date,year,month is sent
3. The **bsDate** //TODO for now object with property date,year, month is sent

<br/>

**onChange** (formattedDate: string,adDate: DateType,bsDate: DateType, dateString:Date)=>void;

> All the arguments are same for both onSelect and onChange. onSelect is available in Calendar while onChange is avaliale in DatePicker

---

## Formatting

**dateFormat**: string combination of y,m and d

default: "" //TODO

y - Year, m - Month, d- Day

Acceptable format are the permutation of "yyyy", "mm","m","d","dd"
Internally the date format is lowercased so any case is acceptable. All the date received from the library will eventually be formatted according to this props.

> Also make sure to send all the dates **defaultValue**,**maxDate**,**minDate**, **value** to be in the format passed in **dateFormat** props

---

## Disable Configuration

1. ### maxDate:string

> The maximum Date allowed. Beyond this date, everything is disabled. Make sure to pass the date formatted according to the dateFormat Props

<br/>

2. ### minDate:string

> The minimum Date allowed. All Dates before the date are disabled. Make sure to pass the date formatted according to the dateFormat props

<br/>
3. ### disablePast:boolean

> Disables all the dates before today's date;

<br/>

4. ### disableFuture:boolean

> Disables all the dates after today's date;

<br/>
5. ### disableDate: (formattedDate: string,adDate: DateType,bsDate: DateType, dateString:Date) => boolean;

> Use your own custom function to disable The date. All the arguments received on the callback are same as that of **onSelect** props

---

## DropDown

1. ### showMonthDropdown : boolean | "full" | "short" | "min"

**default** = false

passing full, short and min is still not supported

2. ### showYearDropdown : boolean | [min:number , max:number]

   **default** = false
   passing min and max array is sitll not supported

---

Range
