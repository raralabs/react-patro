---
sidebar_position: 2
---

# Range Calendar

```jsx live
function PlayGround(props) {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: "",
    to: "",
  });
  return (
    <div>
      <h1>Ad Date Range</h1>
      <p>
        Selected Range: {selectedDateRange.from} - {selectedDateRange.to}
      </p>
      <div style={{ marginBottom: 100 }}>
        <RangeCalendar
          calendarType="AD"
          onChange={(from, to) => {
            setSelectedDateRange({ from, to });
          }}
        />
      </div>
    </div>
  );
}
```

AD Date Picker

```jsx live
function PlayGround(props) {
  const [selectedDateRangeBs, setSelectedDateRangeBs] = useState({
    from: "",
    to: "",
  });

  return (
    <div>
      BS DAte RAnge
      <RangeCalendar
        onChange={(from, to) => {
          setSelectedDateRangeBs({ from, to });
        }}
        calendarType="BS"
      />
      <p>
        Selected Range: {selectedDateRangeBs.from} - {selectedDateRangeBs.to}
      </p>
    </div>
  );
}
```
