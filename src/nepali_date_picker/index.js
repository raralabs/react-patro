import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'antd/lib/input/style/css'
import 'antd/lib/popover/style/css'
import './nepali_date_picker.css'
import NepaliCalendar from './calendar.js'
import { calendarFunctions, calendarData } from './helper_bs.js'
import { Input, Popover } from 'antd';

import moment from 'moment';
import { getCalendarType, get_ad_bs_listener, padDateMonth } from './ad_bs_date_render'
import CalendarIcon from './assets/calendar.svg';
import CrossIcon from './assets/cross_icon'


/**
 * @constructor
 * @augments {Component<Props, State>}

 */



class NepaliDatePicker extends Component {
    static propTypes = {
        /** Date Value in AD DD-MM-YYYY */
        value: PropTypes.string,
        /** Size of input */
        size: PropTypes.oneOf(['large', 'small']),
        /** Separator for input suggestion */
        separator: PropTypes.oneOf([' ', '-', '/']),

        /** Override calendar type initially  "AD" or "BS" */
        calendarType: PropTypes.oneOf(['AD', 'BS']),

        /** Gives AD date as params */
        onChange: PropTypes.func,

        /** Logic to disable date, arguement is current date moment, return true or false */
        disableDate: PropTypes.func


    }



    constructor(props) {
        super(props)

        this.state = {
            selected_date: this.props.value,
            temp_value: "",
            focused: false,
            calendarVisible: false,
            calendarType: props.calendarType
        }

        this.random_id = `rl-nepali-${Math.random()}`
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

    render() {
        const { selected_date, calendarType, focused, temp_value, calendarVisible } = this.state
        // console.log("today data", this.ad_extras, this.bs_extras, selected_date, calendarType)

        let rendering_value = selected_date;
        if (focused) {
            rendering_value = temp_value
        }

        if (calendarType == "BS" && moment(selected_date, "DD-MM-YYYY").isValid() && !focused) {
            let adDateObj = moment(selected_date, "DD-MM-YYYY");
            let bsDateObj = calendarFunctions.getBsDateByAdDate(adDateObj.year(), adDateObj.month() + 1, adDateObj.date());
            rendering_value = (`${padDateMonth(bsDateObj.bsDate)}-${padDateMonth(bsDateObj.bsMonth)}-${(bsDateObj.bsYear)}`)
        }
        // let selected_ad_date=moment(selected_date,"YYYY-MM-DD");

        // let val=<AD_BS_RENDERER adDate={selected_date}/>
        // console.log("cal", rendering_value)
        return (
            <div id={this.random_id} className='rl-nepali-datepicker-wrapper'>
                <CrossIcon 
                visible={selected_date}
                onClick={() => {
                    console.log("clearing date")
                    typeof this.props.onChange === 'function' && this.props.onChange(null)

                }} />
                <Input
                    style={{
                        width: '100%'
                    }}
                    ref={(ref) => {
                        this.inp = ref;
                    }}
                    // disabled
                    onFocus={() => {
                        this.setState({ focused: true })
                    }}
                    onBlur={() => {
                        this.setState({ focused: false })
                    }}
                    suffix={<Popover overlayClassName='popovercalendar'
                        visible={calendarVisible}
                        onVisibleChange={(visible) => {
                            this.setState({ calendarVisible: visible })
                        }}
                        trigger='click' placement='bottomRight' content={<NepaliCalendar
                            initialDate={selected_date}
                            showExtra={true}
                            disableDate={this.props.disableDate}
                            shouldPressOK={true}
                            initialDateType="BS"
                            calendarType={this.state.calendarType}
                            dateFormat="DD-MM-YYYY"
                            onSelect={(ad_date, bs_date) => {
                                console.log("Ad date", ad_date)
                                let _ad = moment().date(ad_date.day).month(ad_date.month - 1).year(ad_date.year);
                                this.setState({
                                    selected_date: _ad.format("DD-MM-YYYY"),
                                    calendarVisible: false
                                })
                                typeof this.props.onChange === 'function' && this.props.onChange(_ad.format("DD-MM-YYYY"))
                                // this.setState({
                                //     selected_date:`${date.day}-${date.month}-${date.year}`
                                // })
                                // console.log("date is",date)
                            }} />}>
                        <img alt='calendar' onClick={() => {
                            this.setState({
                                calendarVisible: true
                            })
                        }} className='rl-nepali-datepicker-icon hand-cursor' src={CalendarIcon} />
                    </Popover>}

                    value={rendering_value}
                    placeholder={`DD-MM-YYYY (${calendarType})`}
                    onChange={(e) => {
                        this.setState({
                            temp_value: e.target.value
                        })
                    }}
                    onKeyDown={(e) => {
                        console.log("key down", e.key)
                        if (e.key == 'Enter' || e.key == 'Tab') {
                            let _temp_value = this.state.temp_value;

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
                            } else {
                                let respectiveADObject = calendarFunctions.getAdDateObjectByBsDate(_year, _month, _day);
                                let new_date = moment().date(respectiveADObject.adDate).month(respectiveADObject.adMonth - 1).year(respectiveADObject.adYear);
                                _new_selected_date = new_date.format("DD-MM-YYYY");
                            }
                            this.inp.blur();
                            this.setState({
                                temp_value: "",
                                selected_date: _new_selected_date
                            }, () => {
                                typeof this.props.onChange === 'function' && this.props.onChange(_new_selected_date)
                            })
                        }
                    }}

                    className={`rl-nepali-datepicker-input ${this.props.size}`} />
                {/* {focused && <div className='rl-nepali-datepicker-content'>
                        <NepaliCalendar 
                        showExtra={true} 
                        shouldPressOK={true}
                        initialDateType="BS"
                        dateFormat="DD/MM/YYYY"
                        onSelect={(date)=>{
                            console.log("date is",date)
                        }} />
                    </div>
                } */}
            </div>
        )
    }


    componentDidMount() {

        let ctx = this;
        let ad_bs_app = get_ad_bs_listener();
        this.ad_bs_sub_key = ad_bs_app.ad_bs.subscribe((dateType) => {
            ctx.setState({
                calendarType: dateType || "AD"
            })
        })




        // this.calender_picker.addEventListener('focusout',this.onFocusedOut)

    }

    componentWillUnmount() {
        let ad_bs_app = get_ad_bs_listener();
        ad_bs_app.ad_bs.unsubscribe(this.ad_bs_sub_key)
    }

    componentDidUpdate(prevProps) {
        if (this.props.value != prevProps.value) {
            this.setState({
                selected_date: this.props.value
            })
        }
    }



}

NepaliDatePicker.defaultProps = {
    separator: ' ',
    size: 'small',
    calendarType: getCalendarType()
};


class NepaliDateRangePicker extends Component {

    static propTypes = {
        /** Date Value in AD DD-MM-YYYY */
        value: PropTypes.string,
        /** Size of input */
        size: PropTypes.oneOf(['large', 'small']),
        /** Separator for input suggestion */
        separator: PropTypes.oneOf([' ', '-', '/']),

        /** Override calendar type initially  "AD" or "BS" */
        calendarType: PropTypes.oneOf(['AD', 'BS']),

        /** Gives [AD DATE FROM, AD DATE TO] as params */
        onChange: PropTypes.func,

        /** Logic to disable date, arguement is current date moment, return true or false */
        disableDate: PropTypes.func


    }
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return <div>Date Range Picker</div>
    }
}

export { NepaliDatePicker, NepaliDateRangePicker }
