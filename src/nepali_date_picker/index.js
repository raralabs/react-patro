import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nepali_date_picker.css'
import NepaliCalendar from './calendar.js'
import { calendarFunctions, calendarData } from './helper_bs.js'
import { Input, Popover } from 'antd';
import 'antd/lib/input/style/css'
import 'antd/lib/popover/style/css'
import moment from 'moment';
import { AD_BS_RENDERER, getCalendarType, get_ad_bs_listener, padDateMonth } from './ad_bs_date_render'
import CalendarIcon from './assets/calendar.svg';
let a
class NepaliDatePicker extends Component {
    static propTypes = {
        value: "2076-01-12",
        size: "small"
    }
    constructor(props) {
        super(props)

        this.state = {
            selected_date: "01-11-2020",
            temp_value: "",
            focused: false,
            calendarVisible:false,
            calendarType: getCalendarType()
        }

        this.random_id = `rl-nepali-${Math.random()}`

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
        const { selected_date, calendarType, focused, temp_value ,calendarVisible} = this.state
        console.log("today data", this.ad_extras, this.bs_extras, selected_date, calendarType)
        let separator=this.props.separator||" "

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
        console.log("cal", rendering_value)
        return (
            <div id={this.random_id} className='rl-nepali-datepicker-wrapper'>
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
                        onVisibleChange={(visible)=>{
                            this.setState({calendarVisible:visible})
                        }}
                        trigger='click' placement='bottomRight' content={<NepaliCalendar
                            initialDate={selected_date}
                            showExtra={true}
                            shouldPressOK={true}
                            initialDateType="BS"
                            dateFormat="DD-MM-YYYY"
                            onSelect={(ad_date, bs_date) => {
                                console.log("Ad date", ad_date)
                                let _ad = moment().date(ad_date.day).month(ad_date.month - 1).year(ad_date.year);
                                this.setState({
                                    selected_date: _ad.format("DD-MM-YYYY"),
                                    calendarVisible:false
                                })
                                // this.setState({
                                //     selected_date:`${date.day}-${date.month}-${date.year}`
                                // })
                                // console.log("date is",date)
                            }} />}>
                        <img onClick={()=>{
                            this.setState({
                                calendarVisible:true
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
                            const temp_value = _temp_value.split(separator).map((it) => parseInt(it))
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
    onDivClick = ({ target }) => {
        var specifiedElement = document.getElementById(this.random_id);
        console.log("specified element", specifiedElement)

        console.log("div clicked", target)
        var isClickInside = specifiedElement && specifiedElement.contains(target);

        console.log("is clicked inside", isClickInside)
        if (!isClickInside) {
            //the click was outside the specifiedElement, do something
            this.setState({ focused: false })
        }

        // typeof this.props.onClose==='function'&&this.props.onClose()
    }

    componentDidMount() {

        let ctx = this;
        let ad_bs_app = get_ad_bs_listener();
        this.ad_bs_sub_key = ad_bs_app.ad_bs.subscribe((dateType) => {
            ctx.setState({
                calendarType: dateType || "AD"
            })
        })
        setTimeout(() => {
            // document.addEventListener('click', this.onDivClick)
        }, 200)



        // this.calender_picker.addEventListener('focusout',this.onFocusedOut)

    }

    componentWillUnmount() {
        let ad_bs_app = get_ad_bs_listener();
        ad_bs_app.ad_bs.unsubscribe(this.ad_bs_sub_key)
        document.removeEventListener('click', this.onDivClick)
    }

}

export default NepaliDatePicker
