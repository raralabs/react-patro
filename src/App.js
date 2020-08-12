import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NepaliDatePicker } from './nepali_date_picker/index.js'
import moment from 'moment';
import NepaliCalendarRange from './nepali_date_picker/calendar_range';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date:'01-09-2020'
    }
  }
  render() {

    return (
      <div >
        <NepaliDatePicker 
        value={this.state.date}
        onChange={(val)=>{
          this.setState({
            date:val
          })
        }}
        // disableDate={(d) => {
        //   if (d <= moment()) {
        //     return true
        //   }
        // }} 
        />
        <br></br>
        <NepaliCalendarRange/>
        <br></br>
        {/* <NepaliDatePicker /> */}


      </div>
    );
  }
}

export default App;
