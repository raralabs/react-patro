---
sidebar_position: 2
---

# Range Calendar

```jsx live
function PlayGround(props) {
  const [definedRangeSelector, setDefinedRangeSelector] = useState({
    from: "",
    to: "",
  });
  return (
    <div>
      <h1>Defined Range Selector</h1>
      <p>
        Base Date: 2021-09-14 Selected Range: {definedRangeSelector.from} -{" "}
        {definedRangeSelector.to}
      </p>
      <div style={{ marginBottom: 200 }}>
        <DefinedRangeCalendar
          from={definedRangeSelector.from}
          to={definedRangeSelector.to}
          dateFormat="yyyy-mm-dd"
          calendarType="AD"
          onChange={(dateFrom, dateTo) => {
            setDefinedRangeSelector({ from: dateFrom, to: dateTo });
          }}
        />
      </div>
    </div>
  );
}
```
