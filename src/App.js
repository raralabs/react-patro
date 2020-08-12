import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NepaliDatePicker } from './nepali_date_picker/index.js'
import moment from 'moment';
import NepaliCalendarRange from './nepali_date_picker/calendar_range';
import { getCalendarType, get_ad_bs_listener } from './nepali_date_picker/ad_bs_date_render';
import { Switch } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: '01-09-2020',
      checked: getCalendarType() == "BS"
    }
  }
  render() {

    return (
      <div >
        <Switch checked={this.state.checked}
          unCheckedChildren="AD"
          checkedChildren="BS"
          onChange={(checked) => {
            if (checked) {
              // to bs
              let ad_bs_listener = get_ad_bs_listener();
              ad_bs_listener.ad_bs.publish("BS")
            } else {
              // to ad
              let ad_bs_listener = get_ad_bs_listener();
              ad_bs_listener.ad_bs.publish("AD")
            };
            this.setState({
              checked: checked
            })
          }}></Switch>
        <br></br>
        <br></br>
        <NepaliDatePicker
          value={this.state.date}
          onChange={(val) => {
            this.setState({
              date: val
            })
          }}
        // disableDate={(d) => {
        //   if (d <= moment()) {
        //     return true
        //   }
        // }} 
        />
        <br></br>
        <NepaliCalendarRange />
        <br></br>
        {/* <NepaliDatePicker /> */}


      </div>
    );
  }
}

export default App;
