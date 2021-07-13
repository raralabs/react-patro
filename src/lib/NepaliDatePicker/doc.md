## Value

The Calendar component can be both controlled and uncontrolled. If value is passed, defaultValue is ignored.
**value** string (formatted according to dateFormat)
**defaultValue** string (formatted according to dateFormat)

## Formatting

**dateFormat**: string combination of y,m and d

default: "" //TODO

y - Year, m - Month, d- Day

Internally the date format is lowercased so any case is acceptable. All the date received from the library will eventually be formatted according to this props.

> Also make sure to send all the dates **defaultValue**,**maxDate**,**minDate**, **value** to be in the format passed in **dateFormat** props

## Disable

1. ### maxDate:string

- The maximum Date allowed. Beyond this date, everything is disabled.
- Make sure to pass the date formatted according to the dateFormat Props

2. ### minDate:string

- The minimum Date allowed. All Dates before the date are disabled.
- Make sure to pass the date formatted according to the dateFormat props

3. ### disablePast:boolean

- Disables all the dates before today's date;

4. ### disableFuture:boolean

- Disables all the dates after today's date;

5. ### disableDate: (formattedDate: string,adDate: DateType,bsDate: DateType, dateString:Date) => boolean;

- Use your own custom function to disable The date. All the arguments received on the callback are same as that of **onSelect** props

## DropDown

1. ### showMonthDropdown : boolean | "full" | "short" | "min"

**default** = false

passing full, short and min is still not supported

2. ### showYearDropdown : boolean | [min:number , max:number]

   **default** = false
   passing min and max array is sitll not supported

## TODO

1. Month => displaying, full , short, min based on params
2. year => displaying based on range provided
3. defaultValue => allow for Date String if no dateFormat is passed
4. disabled Date =>> Whattt??
5. Check and redo => function of helper_bs
6. Replace existing data with new data
7. Minimize the states object in Calendar commponent
8. For now both acceptable and return type is in ad, the type should change as per the calendar Type
