import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NepaliDatePicker } from './nepali_date_picker/index.js'
import moment from 'moment';
import NepaliCalendarRange from './nepali_date_picker/calendar_range';
import { getCalendarType, get_ad_bs_listener, AD_BS_RENDERER } from './nepali_date_picker/ad_bs_date_render';
import { Switch, Space } from 'antd';
// import 'antd/dist/antd.css';
import NepaliRangeInputPicker from './nepali_date_picker/range_input_picker';
import CustomDateRangeToggler from './nepali_date_picker/custom_daterange_toggler';
import NepaliCalendar from './nepali_date_picker/calendar';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: '',
      checked: getCalendarType() == "BS"
    }
  }
  render() {

    return (
      <Space direction='vertical' size={40} style={{
        width: '100%',
        padding: 80,
        backgroundColor:'tomato'
      }}>
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

        <NepaliCalendar
          initialDate={this.state.selected_date}
          showExtra={true}
          disableDate={this.props.disableDate}
          shouldPressOK={true}
          initialDateType="BS"
          calendarType={"AD"}
          dateFormat="DD-MM-YYYY"
          withReference={true}
          zeroDayName="Receipt Date"
          reference_date={"24-08-2020"}
          rangeReference={[0,5,15,20,30,40,50,60,70,80,90]}
          onSelect={(ad_date, bs_date) => {
            console.log("Ad date", ad_date)
            let _ad = moment().date(ad_date.day).month(ad_date.month - 1).year(ad_date.year);
            this.setState({
              selected_date: _ad.format("DD-MM-YYYY"),
              calendarVisible: false
            })
            // typeof this.props.onChange === 'function' && this.props.onChange(_ad.format("DD-MM-YYYY"))
            // this.setState({
            //     selected_date:`${date.day}-${date.month}-${date.year}`
            // })
            // console.log("date is",date)
          }} />

        <div>For input, type DATE{"<space>"}Month{"<space>"}Year and press ENTER or TAB  to select  date. NOTE: DATE,MONTH,YEAR field can be neglected</div>
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
        <CustomDateRangeToggler />

        <NepaliRangeInputPicker />

        <NepaliCalendarRange />
        <div>RENDERED DATE IN AD/BS</div>
        <div >
          <Space size={40} style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
            {Array(20).fill("").map((it, ind) => {
              return <AD_BS_RENDERER adDate={moment().add('day', ind).format("DD-MM-YYYY")} />
            })}
          </Space>
        </div>
        {/* <NepaliDatePicker /> */}


      </Space>
    );
  }
}

export default App;
