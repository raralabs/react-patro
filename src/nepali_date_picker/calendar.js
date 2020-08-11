import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nepali_date_picker.css'
import { calendarData, calendarFunctions } from './helper_bs';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { get_ad_bs_listener, getCalendarType } from './ad_bs_date_render';

class NepaliCalendar extends Component {
    static propTypes = {
        value: "2076-01-12",
        closeOnDateSelect: true,
        dateFormat:"DD/MM/YYYY",
        initialDateType:"BS",
        defaultDate: "",
        minDate: null,
        maxDate: null,
        yearStart: calendarData.minBsYear,
        yearEnd: calendarData.maxBsYear
    }

    constructor(props) {
        super(props)

        this.state = {

            // always in ad
            selected_data: {
                day: null,
                month: null,
                year: null
            },
            calendarRenderingData: {
                adMonth: null,
                adYear: null,
                adStartingDayOfWeek: null,
                adTotalDaysInMonth: null,
                adDayValue: null,
                adPrevMonth: null,
                adPrevYear: null,
                adPrevMonthDays: null,
                adNextMonth: null,
                adNextYear: null,


                bsMonth: null,
                bsYear: null,
                bsStartingDayOfWeek: null,
                bsTotalDaysInMonth: null,
                bsDayValue: null,
                bsPrevMonth: null,
                bsPrevYear: null,
                bsPrevMonthDays: null,
                bsNextMonth: null,
                bsNextYear: null,

                bsMonthFirstAdDate: null

            },
            todayDate: {
                day: null,
                month: null,
                year: null
            },

            calendarDataBS: {
                date: null,
                month: null,
                year: null,
                daysInMonth: 0,
                weekDay: 0,
                dayValue: null
            },

            todayDateAD: {
                day: null,
                month: null,
                year: null,
            },
            todayDateBS: {
                day: null,
                month: null,
                year: null,
            },

            calendarType:getCalendarType(),
            isLoaded: false

        };


    };



    getPreviousBSMonthData = (currentMonthData) => {
        console.log("gettinng", currentMonthData)
        var datePickerData = currentMonthData;
        var prevMonth = (datePickerData.month - 1 > 0) ? datePickerData.month - 1 : 12;
        var prevYear = (prevMonth !== 12) ? datePickerData.year : datePickerData.year - 1;
        if (prevYear < calendarData.minBsYear || prevYear > calendarData.maxBsYear) {
            return null;
        }
        let monthData = calendarFunctions.getBsMonthInfoByBsDate(prevYear, prevMonth, 1);
        console.log(monthData)
        return monthData
    }
    getNextBSMonthData = () => {

    }
    renderNextBSMonth = () => {
        let calendarDataBS = this.state.calendarDataBS;
        var nextMonth = (calendarDataBS.month + 1 <= 12) ? calendarDataBS.month + 1 : 1;
        var nextYear = (nextMonth !== 1) ? calendarDataBS.year : calendarDataBS.year + 1;
        var nextDate = calendarDataBS.dayValue;
        if (nextYear < calendarData.minBsYear || nextYear > calendarData.maxBsYear) {
            return null;
        }
        console.log("setting next for", nextYear, nextMonth, nextDate)

        this.setCalendarBSData(nextYear, nextMonth, nextDate)
    }

    onChangeDate=(ad_date)=>{
        let initialDateType=this.props.initialDateType||"BS";
        let bs_dt=calendarFunctions.getBsDateByAdDate(ad_date.year,ad_date.month,ad_date.day);
        let  bs_date={
            day:bs_dt.bsDate,
            month:bs_dt.bsMonth,
            year:bs_dt.bsYear
        }
        typeof this.props.onSelect==='function'&&this.props.onSelect(ad_date,bs_date)

    }

    renderPreviousBSMonth = () => {
        let calendarDataBS = this.state.calendarDataBS;
        var prevMonth = (calendarDataBS.month - 1 > 0) ? calendarDataBS.month - 1 : 12;
        var prevYear = (prevMonth !== 12) ? calendarDataBS.year : calendarDataBS.year - 1;
        var prevDate = calendarDataBS.dayValue;
        if (prevYear < calendarData.minBsYear || prevYear > calendarData.maxBsYear) {
            return null;
        }
        this.setCalendarBSData(prevYear, prevMonth, prevDate)

    }

    renderADCalendarFor = (adYear, adMonth) => {

    }

    renderBSCalendarFor = (bsYear, bsMonth) => {

    }

    renderCurrentMonth = () => {

        let initialDate=this.props.initialDate;
        var currentDate = new Date();
        var todayDate=new Date();
        let selected_data= {
            day: null,
            month: null,
            year: null
        }
        if(initialDate&&moment(initialDate,"DD-MM-YYYY").isValid()){
            currentDate=moment(initialDate,"DD-MM-YYYY").toDate()
            selected_data={
                day:currentDate.getDate(),
                month:currentDate.getMonth()+1,
                year:currentDate.getFullYear()
            }

        }
        var currentBsDate = calendarFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        var todayBsDate = calendarFunctions.getBsDateByAdDate(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate());

        console.log("current DAta", currentDate, currentBsDate)

        var bsYear = currentBsDate.bsYear;
        var bsMonth = currentBsDate.bsMonth;
        var bsDay = currentBsDate.bsDate;
        this.setState({
            todayDateAD: {
                day: todayDate.getDate(),
                month: todayDate.getMonth() + 1,
                year: todayDate.getFullYear()
            },
            todayDateBS: {
                day: todayBsDate.bsDate,
                month: todayBsDate.bsMonth,
                year: todayBsDate.bsYear
            },
            selected_data
            
        })
        this.setCalendarBSData(bsYear, bsMonth, bsDay)
    }
    renderBSYear = (bsYear) => {
        console.log("rendering  for", bsYear)
        let calendarDataBS = this.state.calendarDataBS;
        var prevMonth = (calendarDataBS.month);
        var prevYear = bsYear;
        var prevDate = calendarDataBS.dayValue;
        if (prevYear < calendarData.minBsYear || prevYear > calendarData.maxBsYear) {
            return null;
        }
        this.setCalendarBSData(prevYear, prevMonth, prevDate)
    }

    setCalendarBSData = (bsYear, bsMonth, bsDay) => {
        // bsYear=2074;
        // bsMonth=2;
        // bsDay=31;
        let _data = calendarFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, bsDay);
        console.log("nep data", _data)
        this.setState({
            calendarRenderingData: {
                adMonth: _data.adMonth,
                adYear: _data.adYear,
                adStartingDayOfWeek: _data.adStartingDayOfWeek,
                adTotalDaysInMonth: _data.adMonthsDay,
                adDayValue: _data.adDay,
                adPrevMonth: _data.adPrevMonth,
                adPrevYear: _data.adPrevYear,
                adPrevMonthDays: _data.adDaysInPrevMonth,
                adNextMonth: _data.adNextMonth,
                adNextYear: _data.adNextYear,


                bsMonth: _data.bsMonth,
                bsYear: _data.bsYear,
                bsStartingDayOfWeek: _data.bsStartingDayOfWeek,
                bsTotalDaysInMonth: _data.bsMonthDays,
                bsDayValue: _data.bsDay,
                bsPrevMonth: _data.bsPrevMonth,
                bsPrevYear: _data.bsPrevYear,
                bsPrevMonthDays: _data.bsDaysInPrevMonth,
                bsNextMonth: _data.bsNextMonth,
                bsNextYear: _data.bsNextYear,

                bsMonthFirstAdDate: _data.bsMonthFirstAdDate
            },
            calendarDataBS: {
                date: _data.adDate,
                month: _data.bsMonth,
                year: _data.bsYear,
                daysInMonth: _data.bsMonthDays,
                weekDay: _data.weekDay,
                dayValue: bsDay,
                bsMonthFirstAdDate: _data.bsMonthFirstAdDate
            },
            isLoaded: true
        })
    }


    getMonthValue = (month, type = "BS") => {
        return type == "BS" ? calendarData.bsMonths[month - 1] : calendarData.adMonth[month - 1]
    }



    onSelectBS = (bsYear, bsMonth, bsDay) => {
        console.log("onSelectBS", bsYear, bsMonth, bsDay)
        this.setState({
            selected_data: {
                day: bsDay,
                month: bsMonth,
                year: bsYear
            },
        })
    }

    toggleCalendarType = () => {
        let calendarType = this.state.calendarType;
        // let selected_data = this.state.selected_data;
        // if (selected_data.day) {
        //     // selected  day, so render for given day  of  month
        //     let bs_d_obj = calendarFunctions.getBsDateByAdDate(selected_data.year, selected_data.month, selected_data.day);
        //     console.log("rendering  for", bs_d_obj)
        //     // this.setCalendarBSData(bs_d_obj.bsYear, bs_d_obj.bsMonth, bs_d_obj.bsDate);
        // };

        switch (calendarType) {
            case "AD":
                this.setState({
                    calendarType: "BS"
                });
                break;
            // initially in AD,switch all information and selected temp data to BS
            case "BS":
                this.setState({
                    calendarType: "AD"
                })
                // initially in BS,switch all information and selected temp data to AD
                break;
            default:
                break;
        }




    }




    componentDidMount() {
        this.renderCurrentMonth();


          let ctx=this;
        let ad_bs_app=get_ad_bs_listener();
        this.ad_bs_sub_key=ad_bs_app.ad_bs.subscribe((dateType)=>{
            ctx.setState({
                calendarType:dateType||"AD"
            })
        })

        console.log("AD DATE FOR", calendarFunctions.getAdDateObjectByBsDate(2077, 4, 22))
        // this.calender_picker.addEventListener('focusout',this.onFocusedOut)

    }

    componentWillUnmount(){
        let ad_bs_app=get_ad_bs_listener();
        ad_bs_app.ad_bs.unsubscribe(this.ad_bs_sub_key)
    }

    componentDidUpdate(prevProps){
        if(this.props.initialDate!=prevProps.initialDate){
            this.renderCurrentMonth()
        }
    }





    render() {
        const { calendarDataBS, calendarRenderingData, calendarType, selected_data, todayDateAD, todayDateBS } = this.state;
        let is_AD = calendarType == "AD";
        let shouldPressOK=this.props.shouldPressOK;

        let _month = is_AD ? calendarRenderingData.adMonth : calendarRenderingData.bsMonth;
        let _year = is_AD ? calendarRenderingData.adYear : calendarRenderingData.bsYear;
        let _startingDayOfWeek = is_AD ? calendarRenderingData.adStartingDayOfWeek : calendarRenderingData.bsStartingDayOfWeek;
        let _totalDaysInMonth = is_AD ? calendarRenderingData.adTotalDaysInMonth : calendarRenderingData.bsTotalDaysInMonth;
        let _dayValue = is_AD ? calendarRenderingData.adDayValue : calendarRenderingData.bsDayValue;
        let _prevMonth = is_AD ? calendarRenderingData.adPrevMonth : calendarRenderingData.bsPrevMonth;
        let _prevYear = is_AD ? calendarRenderingData.adPrevYear : calendarRenderingData.bsPrevYear;
        let _nextMonth = is_AD ? calendarRenderingData.adNextMonth : calendarRenderingData.bsNextMonth;
        let _nextYear = is_AD ? calendarRenderingData.adNextYear : calendarRenderingData.bsNextYear;

        let _prevMonthDays = is_AD ? calendarRenderingData.adPrevMonthDays : calendarRenderingData.bsPrevMonthDays


        console.log("date for", { calendarType, _month, _year, _startingDayOfWeek, _totalDaysInMonth, _dayValue, _prevMonth, _prevYear, _prevMonthDays })

        const { showAnother = true } = this.props;

        // showAnother enables to show another date in cell 
        // TODO to be implemented


        if (!this.state.isLoaded) {
            return <div></div>
        }
        let _calendarData = calendarDataBS;

        let days_array = calendarType == "BS" ? calendarData.bsDays : calendarData.adDays;


        var preMonth = (_calendarData.month - 1 !== 0) ? _calendarData.month - 1 : 12;
        var preYear = preMonth === 12 ? _calendarData.year - 1 : _calendarData.year;
        var preMonthDays = preYear >= calendarData.minBsYear ? calendarFunctions.getBsMonthDays(preYear, preMonth) : 30;


        // console.log("selected data", selected_data)



        return (
            <div className='rl-nepali-date-panel'>
                <div className="month-header">
                    <div className='left-actions'>
                        <div title="Previous Year"
                            onClick={() => {
                                this.renderBSYear(_calendarData.year - 1)
                            }}
                            className='prev-year hand-cursor'>&#10094;&#10094;</div>
                        <div title="Previous Month" onClick={() => {
                            this.renderPreviousBSMonth()
                        }} className='prev-month hand-cursor'>&#10094;</div>
                    </div>
                    <div className='month-header-content'>
                        {this.getMonthValue(_month, calendarType)} &nbsp;
                        <div key={`${_calendarData.year}--`} tabIndex={0} className='inline-dropdown'>
                            {is_AD ? <div className='value'>{(_year || 0)}</div> : <div className='value'>{calendarFunctions.getNepaliNumber(_year || 0)}</div>}

                            {/* <div className='value'>{calendarFunctions.getNepaliNumber(_calendarData.year || 0)}</div> */}
                            {/* <div className='inline-dropdown-container'>
                                {Array(20).fill("").map((val, _selection_index) => {
                                    let yr = _calendarData.year || 0;
                                    let max_yr_to_show = yr + 5;
                                    let max_options_to_show = 20;

                                    let yr_item = max_yr_to_show - (max_options_to_show - _selection_index);
                                    return yr != 0 ? <div onClick={() => {
                                        this.renderBSYear(yr_item)
                                    }} className={`inline-dropdown-item ${yr_item == _calendarData.year ? 'selected' : ''}`}>{calendarFunctions.getNepaliNumber(yr_item)}</div> : null
                                })}
                            </div> */}
                        </div>



                    </div>
                    <div className='right-actions'>
                        <div title="Next Month" onClick={() => {
                            this.renderNextBSMonth()
                        }} className='next-month hand-cursor'>&#10095;</div>
                        <div onClick={() => {
                            this.renderBSYear(_calendarData.year + 1)
                        }} title="Next Year" className='next-year hand-cursor'>&#10095;&#10095;</div>
                    </div>

                </div>
                <div className='rl-nepali-date-body'>
                    <table className='rl-nepali-date-content'>
                        <thead>
                            <tr>
                                {days_array.map((val, ind) => {
                                    return <th key={`${ind}-m`}>{val}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {Array(6).fill("").map((it1, index1) => {
                                return <tr>
                                    {Array(7).fill("").map((it2, index2) => {

                                        let cell_date = (index1 * 7) + index2 - _startingDayOfWeek + 1;
                                        console.log("cell date",cell_date)
                                        let isCurrentMonth = true;
                                        let main_date = {
                                            day: cell_date,
                                            month: _month,
                                            year: _year
                                        }


                                        if (cell_date <= 0) {
                                            cell_date = _prevMonthDays + cell_date;
                                            isCurrentMonth = false;
                                            main_date = {
                                                day: cell_date,
                                                month: _prevMonth,
                                                year: _prevYear
                                            }
                                        } else if (cell_date > _totalDaysInMonth) {
                                            cell_date = cell_date - _totalDaysInMonth;
                                            isCurrentMonth = false;
                                            main_date = {
                                                day: cell_date,
                                                month: _nextMonth,
                                                year: _nextYear
                                            }
                                        }
                                        let next_date_obj = is_AD ?
                                            calendarFunctions.getBsDateByAdDate(main_date.year, main_date.month, main_date.day) :
                                            calendarFunctions.getAdDateObjectByBsDate(main_date.year, main_date.month, main_date.day)
                                            ;

                                        let sub_main_date = {
                                            day: is_AD ? next_date_obj.bsDate : next_date_obj.adDate,
                                            month: is_AD ? next_date_obj.bsMonth : next_date_obj.adMonth,
                                            year: is_AD ? next_date_obj.bsYear : next_date_obj.adYear
                                        };

                                        let ad_date = is_AD ? main_date : sub_main_date;



                                        let isSelected = false;
                                        let isToday = false;
                                        // console.log("checking for", ad_date, selected_data)
                                        if (selected_data.day && ad_date.day == selected_data.day &&
                                            ad_date.year == selected_data.year &&
                                            ad_date.month == selected_data.month && isCurrentMonth) {
                                            isSelected = true
                                        }

                                        if (todayDateAD.day == ad_date.day && todayDateAD.month == ad_date.month && todayDateAD.year == ad_date.year) {
                                            isToday = true
                                        }




                                        return <td
                                            title={`${main_date.day}-${main_date.month}-${main_date.year}`}
                                            onClick={(e) => {
                                                if (isCurrentMonth) {
                                                    this.setState({
                                                        selected_data: ad_date
                                                    })
                                                    {shouldPressOK&&this.onChangeDate(ad_date)}
                                                    // this.onSelectBS(_calendarData.year, _calendarData.month, calendarDate)

                                                } else if (index1 == 0) {
                                                    // previous month date selected
                                                    this.renderPreviousBSMonth()
                                                } else {
                                                    // next month date selected
                                                    this.renderNextBSMonth()
                                                }
                                                console.log("clicked value is")
                                            }}
                                            className={`rl-picker-cell 
                                        
                                        ${isToday ? 'today' : ''}
                                        ${isSelected ? 'active' : ''}
                                        ${!isCurrentMonth ? 'other-month' : ''}`

                                            }>
                                            <div className={`rl-picker-cell-inner `}>
                                                {is_AD ? <>
                                                    <div className="BS">{(cell_date || 0)}</div>
                                                    {this.props.showExtra&&
                                                    <div className="AD">{calendarFunctions.getNepaliNumber(sub_main_date.day)}</div>
                                                    }
                                                </> : <>
                                                        <div className="BS">{calendarFunctions.getNepaliNumber(cell_date || 0)}</div>
                                                        {this.props.showExtra&&
                                                        <div className="AD">{sub_main_date.day}</div>
                                                        }
                                                    </>}

                                            </div>
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding:8,
                        paddingBottom:0
                    }}>
                        <div className='today-btn hand-cursor' onClick={() => {

                            this.setCalendarBSData(todayDateBS.year, todayDateBS.month, todayDateBS.day);
                            this.onChangeDate(todayDateAD)
                        }}>Today</div>

                        {/* <button onClick={() => {
                            this.toggleCalendarType()
                        }}>TYPE : {calendarType}</button> */}
                    </div>
                </div>
            </div>
        )
    }




}

export default NepaliCalendar
