---
sidebar_position: 2
---

# Calendar

```jsx live
function PlayGround(props) {
  const [selectedDate, setSelectedDate] = useState("2021-07-03");

  return (
    <NepaliCalendar
      defaultValue="2021-07-09"
      showExtra={true}
      calendarType={"AD"}
      dateFormat="yyyy-mm-dd"
      value={selectedDate}
      disablePast
      // showMonthDropdown={true}
      // showMonthDropdown={true}
      // showYearDropdown={true}
      // maxDate="2021-07-10"
      // minDate="07-03-2021"
      // disablePast
      // disableDate={(date) => date === "07-03-2021"}
      onSelect={(formattedDate, adDate, bsDate, date) => {
        setSelectedDate(formattedDate);
      }}
    />
  );
}
```
