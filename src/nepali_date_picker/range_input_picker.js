import React, { Component } from 'react';
import { Input, Popover } from 'antd';
import { dateObjectToString, adDateObjectToMoment, getCalendarType, padDateMonth, adDateStringToObject } from './ad_bs_date_render';
import moment from 'moment';
import { calendarFunctions, calendarData } from './helper_bs';
import CalendarIcon from './assets/calendar.svg';
import NepaliCalendarForRange from './calendar_for_range';


/**
 * @constructor
 * @augments {Component<Props, State>}

 */


class NepaliRangeInputPicker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected_date_1: '4-9-2020',
            selected_date_2: '8-10-2020',
            focused1: false,
            focused2: false,
            temp_value1: "",
            temp_value2: "",
            calendarVisible: false,
            calendarType: props.calendarType
        }

        this.separator = props.separator || " ";
        // this.size=props.size||""
        let ad_date = moment();
        this.ad_extras = {
            day: ad_date.date(),
            month: ad_date.month() + 1,
            year: ad_date.year(),
        };
        let bs_date = calendarFunctions.getBsDateByAdDate(ad_date.year(), ad_date.month() + 1, ad_date.date())
        this.bs_extras = {
            day: bs_date.bsDate,
            month: bs_date.bsMonth,
            year: bs_date.bsYear,
        }
    }


    onDateSelect = (ad_date) => {
        if (this.state.selected_date_2 && this.state.selected_date_1) {
            // Both date selected, so set to date 1 
            this.setState({
                selected_date_1: dateObjectToString(ad_date),
                selected_date_2: null
            })
        }
        else
            if (this.state.selected_date_1) {
                // Date 1 selected, so select date 2
                let dt_1_m = moment(this.state.selected_date_1, "DD-MM-YYYY");
                let dt_2_m = adDateObjectToMoment(ad_date);
                let new_dt_group = {
                    selected_date_1: this.state.selected_date_1,
                    selected_date_2: null
                }
                if (dt_1_m == dt_2_m) {
                    new_dt_group.selected_date_2 = this.state.selected_date_1
                    // same date selected
                } else if (dt_1_m < dt_2_m) {
                    new_dt_group.selected_date_2 = dateObjectToString(ad_date)
                    // selected  date is greater than 

                } else {
                    //selected date is less than date 1
                    new_dt_group.selected_date_1 = dateObjectToString(ad_date);
                    new_dt_group.selected_date_2 = this.state.selected_date_1
                }

                this.setState({
                    ...new_dt_group
                })

            } else {
                this.setState({
                    selected_date_1: dateObjectToString(ad_date),
                    selected_date_2: null
                })

            }
    }
    render() {

        const { selected_date_1, selected_date_2, calendarType, focused1, focused2, temp_value1, temp_value2, calendarVisible } = this.state;

        let rendering_val_1 = selected_date_1;
        let rendering_val_2 = selected_date_2;
        if (focused1) {
            rendering_val_1 = temp_value1
        }
        if (focused2) {
            rendering_val_2 = temp_value2
        }
        if (calendarType == "BS" && moment(selected_date_1, "DD-MM-YYYY").isValid() && !focused1) {
            let adDateObj = moment(selected_date_1, "DD-MM-YYYY");
            let bsDateObj = calendarFunctions.getBsDateByAdDate(adDateObj.year(), adDateObj.month() + 1, adDateObj.date());
            rendering_val_1 = (`${padDateMonth(bsDateObj.bsDate)}-${padDateMonth(bsDateObj.bsMonth)}-${(bsDateObj.bsYear)}`)
        }
        if (calendarType == "BS" && moment(selected_date_2, "DD-MM-YYYY").isValid() && !focused2) {
            let adDateObj = moment(selected_date_2, "DD-MM-YYYY");
            let bsDateObj = calendarFunctions.getBsDateByAdDate(adDateObj.year(), adDateObj.month() + 1, adDateObj.date());
            rendering_val_2 = (`${padDateMonth(bsDateObj.bsDate)}-${padDateMonth(bsDateObj.bsMonth)}-${(bsDateObj.bsYear)}`)
        }



        return (
            <>
                <div>{JSON.stringify(this.state)}</div>
                <div className='rl-nepali-rangepicker-wrapper'>
                    <Input.Group compact style={{
                        display: 'flex'
                    }}>
                        <Input
                            ref={(r) => {
                                this.left_inp = r;
                            }}
                            onFocus={() => {
                                this.setState({
                                    focused1: true
                                })
                            }}
                            onBlur={() => {
                                this.setState({
                                    focused1: false
                                })
                            }}
                            value={rendering_val_1}
                            className='input-left'
                            placeholder="Date From"
                            onChange={(e) => {
                                this.setState({
                                    temp_value1: e.target.value
                                })
                            }}
                            onKeyDown={(e) => {
                                console.log("key down", e.key)
                                if (e.key == 'Enter' || e.key == 'Tab') {
                                    let _temp_value = this.state.temp_value1;

                                    // _temp_value.split("-");
                                    const temp_value = _temp_value.split(this.separator).map((it) => parseInt(it))
                                    console.log("temp", temp_value, this.ad_extras, this.bs_extras)
                                    // temp_value=temp_value
                                    let _day = (temp_value[0] && temp_value[0] > 0 && temp_value[0] <= (calendarType == "AD" ? 31 : 32)) ? temp_value[0] : calendarType == "AD" ? this.ad_extras.day : this.bs_extras.day;
                                    let _month = (temp_value[1] && temp_value[1] > 0 && temp_value[1] <= 12) ? temp_value[1] : calendarType == "AD" ? this.ad_extras.month : this.bs_extras.month;
                                    let _year = (temp_value[2] && temp_value[2] > (calendarData.minBsYear - (calendarType == "AD" ? 57 : 0)) && temp_value[2] <= (calendarData.maxBsYear - (calendarType == "AD" ? 57 : 0))) ? temp_value[2] : calendarType == "AD" ? this.ad_extras.year : this.bs_extras.year;
                                    console.log("new temp should be", {
                                        _day, _month, _year, calendarType
                                    })
                                    let _new_selected_date = ""
                                    if (calendarType == "AD") {
                                        let new_date = moment().date(_day).month(_month - 1).year(_year);
                                        _new_selected_date = new_date.format("DD-MM-YYYY");
                                        this.onDateSelect(adDateStringToObject(_new_selected_date))
                                    } else {
                                        let respectiveADObject = calendarFunctions.getAdDateObjectByBsDate(_year, _month, _day);
                                        let new_date = moment().date(respectiveADObject.adDate).month(respectiveADObject.adMonth - 1).year(respectiveADObject.adYear);
                                        _new_selected_date = new_date.format("DD-MM-YYYY");
                                        this.onDateSelect(adDateStringToObject(_new_selected_date))
                                    }

                                    this.left_inp.blur();
                                    this.right_inp.focus()
                                    this.setState({
                                        temp_value1: "",
                                        // selected_date: _new_selected_date
                                    }, () => {
                                        // typeof this.props.onChange === 'function' && this.props.onChange(_new_selected_date)
                                    })
                                }
                            }}
                        />
                        <Input
                            className="input-split"
                            style={{
                                width: 50,
                                borderLeft: 0,
                                borderRight: 0,
                                pointerEvents: 'none',
                            }}
                            placeholder="~"
                            disabled
                        />
                        <Input
                            ref={(r) => {
                                this.right_inp = r;
                            }}
                            onFocus={() => {
                                this.setState({
                                    focused2: true
                                })
                            }}
                            onBlur={() => {
                                this.setState({
                                    focused2: false
                                })
                            }}
                            value={rendering_val_2}
                            onChange={(e) => {
                                this.setState({
                                    temp_value2: e.target.value
                                })
                            }}
                            onKeyDown={(e) => {
                                console.log("key down", e.key)
                                if (e.key == 'Enter' || e.key == 'Tab') {
                                    let _temp_value = this.state.temp_value2;

                                    // _temp_value.split("-");
                                    const temp_value = _temp_value.split(this.separator).map((it) => parseInt(it))
                                    console.log("temp", temp_value, this.ad_extras, this.bs_extras)
                                    // temp_value=temp_value
                                    let _day = (temp_value[0] && temp_value[0] > 0 && temp_value[0] <= (calendarType == "AD" ? 31 : 32)) ? temp_value[0] : calendarType == "AD" ? this.ad_extras.day : this.bs_extras.day;
                                    let _month = (temp_value[1] && temp_value[1] > 0 && temp_value[1] <= 12) ? temp_value[1] : calendarType == "AD" ? this.ad_extras.month : this.bs_extras.month;
                                    let _year = (temp_value[2] && temp_value[2] > (calendarData.minBsYear - (calendarType == "AD" ? 57 : 0)) && temp_value[2] <= (calendarData.maxBsYear - (calendarType == "AD" ? 57 : 0))) ? temp_value[2] : calendarType == "AD" ? this.ad_extras.year : this.bs_extras.year;
                                    console.log("new temp should be", {
                                        _day, _month, _year, calendarType
                                    })
                                    let _new_selected_date = ""
                                    if (calendarType == "AD") {
                                        let new_date = moment().date(_day).month(_month - 1).year(_year);
                                        _new_selected_date = new_date.format("DD-MM-YYYY");
                                        this.onDateSelect(adDateStringToObject(_new_selected_date))
                                    } else {
                                        let respectiveADObject = calendarFunctions.getAdDateObjectByBsDate(_year, _month, _day);
                                        let new_date = moment().date(respectiveADObject.adDate).month(respectiveADObject.adMonth - 1).year(respectiveADObject.adYear);
                                        _new_selected_date = new_date.format("DD-MM-YYYY");
                                        this.onDateSelect(adDateStringToObject(_new_selected_date))
                                    }

                                    this.right_inp.blur();
                                    this.setState({
                                        temp_value2: "",
                                        // selected_date: _new_selected_date
                                    }, () => {
                                        // typeof this.props.onChange === 'function' && this.props.onChange(_new_selected_date)
                                    })
                                }
                            }}
                            className='input-right'
                            placeholder="Date To"

                            suffix={<Popover overlayClassName='popovercalendar'
                                visible={calendarVisible}
                                onVisibleChange={(visible) => {
                                    this.setState({ calendarVisible: visible })
                                }}
                                trigger='click' placement='bottomRight'
                                content={<div className='rl-range-calendar'>
                                    <NepaliCalendarForRange
                                        selected_date_1={this.state.selected_date_1}
                                        initialDate={this.state.selected_date_1}
                                        // disableDate={(d)=>{
                                        //     return this.state.selected_date_1&&d<moment(this.state.selected_date_1,"DD-MM-YYYY")
                                        // }}
                                        selected_date_2={this.state.selected_date_2}
                                        onSelect={(ad_date) => {
                                            this.onDateSelect(ad_date)
                                        }}
                                        calendarFor={1}
                                        showToday={false} />
                                    <NepaliCalendarForRange
                                        selected_date_1={this.state.selected_date_1}
                                        initialDate={this.state.selected_date_2 == null ? this.state.selected_date_1 : this.state.selected_date_2}
                                        // disableDate={(d)=>{
                                        //     return this.state.selected_date_1&&d<moment(this.state.selected_date_1,"DD-MM-YYYY")
                                        // }}
                                        selected_date_2={this.state.selected_date_2}
                                        onSelect={(ad_date) => {
                                            this.onDateSelect(ad_date)
                                        }}
                                        calendarFor={2}
                                        showToday={false} />
                                </div>}>
                                <img alt='calendar' onClick={() => {
                                    this.setState({
                                        calendarVisible: true
                                    })
                                }} className='rl-nepali-datepicker-icon hand-cursor' src={CalendarIcon} />
                            </Popover>}
                        />
                    </Input.Group>
                </div>
            </>
        );
    }
}
NepaliRangeInputPicker.defaultProps = {
    separator: ' ',
    size: 'small',
    calendarType: getCalendarType()
}

export default NepaliRangeInputPicker;
