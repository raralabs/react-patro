import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nepali_date_picker.css'
import { calendarData, calendarFunctions } from './helper_bs';
import moment from 'moment';

class NepaliCalendar extends Component {
    static propTypes = {
        value: "2076-01-12",
        dateFormat: "%D, %M %d, %y",
        closeOnDateSelect: true,
        defaultDate: "",
        minDate: null,
        maxDate: null,
        yearStart: calendarData.minBsYear,
        yearEnd: calendarData.maxBsYear
    }

    constructor(props) {
        super(props)

        this.state = {
            selected_data: {
                day: null,
                month: null,
                year: null
            },
            selected_data_ad: {
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

            calendarDataAD: {
                date: null,
                month: null,
                year: null,
                daysInMonth: 0,
                weekDay: 0,
                dayValue: null
            },

            currentRenderingDate: moment(),
            todayDataBS: {
                day: null,
                month: null,
                year: null,
            },

            calendarType: "BS",
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
        let monthData = calendarFunctions.getBsMonthInfoByBsDate(prevYear, prevMonth, 1, this.props.dateFormat || "%D, %M %d, %y");
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

    renderCurrentMonth = () => {

        var currentDate = new Date();
        var currentBsDate = calendarFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        console.log("current DAta", currentDate, currentBsDate)

        var bsYear = currentBsDate.bsYear;
        var bsMonth = currentBsDate.bsMonth;
        var bsDate = currentBsDate.bsDate;
        this.setState({
            todayDataBS: {
                day: bsDate,
                month: bsMonth,
                year: bsYear
            }
        })
        this.setCalendarBSData(bsYear, bsMonth, bsDate)
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

    setCalendarBSData = (bsYear, bsMonth, bsDate) => {
        let _data = calendarFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, bsDate, this.props.dateFormat || "%D, %M %d, %y");
        console.log("nep data", _data)
        this.setState({
            calendarDataBS: {
                date: _data.adDate,
                month: _data.bsMonth,
                year: _data.bsYear,
                daysInMonth: _data.bsMonthDays,
                weekDay: _data.weekDay,
                dayValue: bsDate,
                bsMonthFirstAdDate: _data.bsMonthFirstAdDate
            },
            isLoaded: true
        })
    }


    setCalendarADData = (adYear, adMonth, adDate) => {
        let _data = calendarFunctions.getad
    }


    getMonthValue = (month, type = "BS") => {
        return calendarData.bsMonths[month - 1]
    }

    onSelectAD = (adYear, adMonth, adDay) => {
        console.log("onSelectAD", adYear, adMonth, adDay);
        this.setState({
            selected_data_ad: {
                day: adDay,
                month: adMonth,
                year: adYear
            },
        })

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
        switch (calendarType) {
            case "AD":
                // initially in AD,switch all information and selected temp data to BS
                return;
            case "BS":
                // initially in BS,switch all information and selected temp data to AD
                return;
            default:
                return;
        }
    }




    render() {
        const { calendarDataBS, calendarDataAD, calendarType, selected_data, todayDataBS } = this.state;
        if (!this.state.isLoaded) {
            return <div></div>
        }
        let _calendarData = calendarDataBS;

        var preMonth = (_calendarData.month - 1 !== 0) ? _calendarData.month - 1 : 12;
        var preYear = preMonth === 12 ? _calendarData.year - 1 : _calendarData.year;
        var preMonthDays = preYear >= calendarData.minBsYear ? calendarFunctions.getBsMonthDays(preYear, preMonth) : 30;


        console.log("selected data", selected_data)



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
                        {this.getMonthValue(_calendarData.month)} &nbsp;
                        <div key={`${_calendarData.year}--`} tabIndex={0} className='inline-dropdown'>
                            <div className='value'>{calendarFunctions.getNepaliNumber(_calendarData.year || 0)}</div>
                            <div className='inline-dropdown-container'>
                                {Array(20).fill("").map((val, _selection_index) => {
                                    let yr = _calendarData.year || 0;
                                    let max_yr_to_show = yr + 5;
                                    let max_options_to_show = 20;

                                    let yr_item = max_yr_to_show - (max_options_to_show - _selection_index);
                                    return yr != 0 ? <div onClick={() => {
                                        this.renderBSYear(yr_item)
                                    }} className={`inline-dropdown-item ${yr_item == _calendarData.year ? 'selected' : ''}`}>{calendarFunctions.getNepaliNumber(yr_item)}</div> : null
                                })}
                            </div>
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
                                {calendarData.bsDays.map((val, ind) => {
                                    return <th key={`${ind}-m`}>{val}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {Array(6).fill("").map((it1, index1) => {
                                return <tr>
                                    {Array(7).fill("").map((it2, index2) => {
                                        var calendarDate = (index1 * 7) + index2 - (_calendarData.bsMonthFirstAdDate && _calendarData.bsMonthFirstAdDate.getDay()) + 1;

                                        let isCurrentMonthDate = true;
                                        let eng_date = new Date();
                                        console.log("calendarDate", calendarDate)


                                        if (calendarDate <= 0) {
                                            calendarDate = preMonthDays + calendarDate;
                                            var _preMonth = (_calendarData.month - 1 !== 0) ? _calendarData.month - 1 : 12;
                                            var _preYear = _preMonth === 12 ? _calendarData.year - 1 : _calendarData.year;

                                            eng_date = calendarFunctions.getAdDateByBsDate(_preYear,_preMonth, calendarDate)

                                            isCurrentMonthDate = false;
                                        } else if (calendarDate > _calendarData.daysInMonth) {
                                            calendarDate = calendarDate - _calendarData.daysInMonth;
                                            var _posMonth=(_calendarData.month+1>12?1:_calendarData.month+1)
                                            var  _posYear=_posMonth==12?_calendarData.year+1:_calendarData.year

                                            eng_date = calendarFunctions.getAdDateByBsDate(_posYear, _posMonth, calendarDate)
                                            isCurrentMonthDate = false;
                                        } else {
                                            eng_date = calendarFunctions.getAdDateByBsDate(_calendarData.year, _calendarData.month, calendarDate)
                                        }

                                        console.log("calendar date", calendarDate, eng_date)
                                        let isSelected = false;
                                        let isToday = false;
                                        if (selected_data.day && calendarDate == selected_data.day &&
                                            _calendarData.year == selected_data.year &&
                                            _calendarData.month == selected_data.month && isCurrentMonthDate) {
                                            isSelected = true
                                        }

                                        if (todayDataBS.day == calendarDate && todayDataBS.month == _calendarData.month && todayDataBS.year == _calendarData.year) {
                                            isToday = true
                                        }

                                        // console.log("is of this month", isOfThisMonth, indexedItem)

                                        return <td
                                            onClick={(e) => {
                                                if (isCurrentMonthDate) {
                                                    this.onSelectBS(_calendarData.year, _calendarData.month, calendarDate)

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
                                        ${!isCurrentMonthDate ? 'other-month' : ''}`

                                            }>
                                            <div className={`rl-picker-cell-inner `}>
                                                <div className="BS">{calendarFunctions.getNepaliNumber(calendarDate || 0)}</div>
                                                <div className="AD">{moment(eng_date).format("DD")}</div>
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
                        justifyContent: 'center'
                    }}>
                        <button onClick={() => {
                            this.setCalendarBSData(todayDataBS.year, todayDataBS.month, todayDataBS.day);
                            this.setState({
                                selected_data: todayDataBS
                            })
                        }}>Today</button>

                        {/* <button onClick={() => {
                            switch (calendarType) {
                                case 'AD':
                                    this.setState({
                                        calendarType: "BS"
                                    })
                                    return;
                                case 'BS':
                                    this.setState({
                                        calendarType: "AD"
                                    })
                                    return
                                default:
                                    return
                            }
                        }}>TYPE : {calendarType}</button> */}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.renderCurrentMonth()
    }
}

export default NepaliCalendar
