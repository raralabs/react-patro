---
sidebar_position: 2
---

# DatePicker

```jsx live
function PlayGround(props) {
  const [dateBS, setDateBS] = useState("");

  return (
    <div>
      <h1>BS Date Picker</h1>
      <p>Selected Date: {JSON.stringify(dateBS)}</p>
      New Date Picker
      <div style={{ marginBottom: 150 }}>
        <div style={{ width: 250 }}>
          <DatePicker
            // value={dateBS}
            onChange={(val) => {
              console.log("val", val);
              setDateBS(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

AD Date Picker

```jsx live
function PlayGround(props) {
  const [date, setDate] = useState("");

  return (
    <div>
      <h1>AD Date Picker</h1>
      <p>Selected Date: {JSON.stringify(date)}</p>
      New Date Picker
      <div style={{ marginBottom: 150 }}>
        <div style={{ width: 250 }}>
          <DatePicker
            value={date}
            calendarType="AD"
            onChange={(val) => {
              setDate(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
```
