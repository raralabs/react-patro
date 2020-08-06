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


            calendarDataBS: {
                date: null,
                month: null,
                year: null,
                daysInMonth: 0,
                weekDay: 0
            },

            calendarDataAD: {
                date: null,
                month: null,
                year: null,
                daysInMonth: 0,
                weekDay: 0
            },

            currentRenderingDate: moment(),

            calendarType: "BS"

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
        var nextDate = calendarDataBS.dateValue;
        if (nextYear < calendarData.minBsYear || nextYear > calendarData.maxBsYear) {
            return null;
        }
        console.log("setting next for", nextYear, nextMonth, nextDate)

        this.setCalendarData(nextYear, nextMonth, nextDate)



    }

    renderPreviousBSMonth = () => {
        let calendarDataBS = this.state.calendarDataBS;
        var prevMonth = (calendarDataBS.month - 1 > 0) ? calendarDataBS.month - 1 : 12;
        var prevYear = (prevMonth !== 12) ? calendarDataBS.year : calendarDataBS.year - 1;
        var prevDate = calendarDataBS.dateValue;
        if (prevYear < calendarData.minBsYear || prevYear > calendarData.maxBsYear) {
            return null;
        }
        this.setCalendarData(prevYear, prevMonth, prevDate)

    }

    renderCurrentMonth = () => {
        let calendarDataBS = this.state.currentRenderingDate;

        var currentDate = new Date();
        var currentBsDate = calendarFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        console.log("current DAta", currentDate, currentBsDate)

        var bsYear = currentBsDate.bsYear;
        var bsMonth = currentBsDate.bsMonth;
        var bsDate = currentBsDate.bsDate;
        this.setCalendarData(bsYear, bsMonth, bsDate)
    }

    setCalendarData = (bsYear, bsMonth, bsDate) => {
        let _data = calendarFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, bsDate, this.props.dateFormat || "%D, %M %d, %y");
        console.log("nep data", _data)
        this.setState({
            calendarDataBS: {
                date: _data.adDate,
                month: _data.bsMonth,
                year: _data.bsYear,
                daysInMonth: _data.bsMonthDays,
                weekDay: _data.weekDay,
                dateValue: bsDate
            }
        })
    }


    getMonthValue = (month, type = "BS") => {
        return calendarData.bsMonths[month - 1]
    }



    render() {
        const { calendarDataBS, calendarDataAD, calendarType } = this.state;

        let _calendarData = calendarType == "BS" ? calendarDataBS : calendarDataAD;
        let _previousCalendarData = this.getPreviousBSMonthData(_calendarData);
        let previouseMonthDays = _previousCalendarData && _previousCalendarData.bsMonthDays || 30;

        console.log("prev", _previousCalendarData)



        return (
            <div className='rl-nepali-date-panel'>
                <div className="month-header">
                    <div className='left-actions'>
                        <div title="Previous Year" className='prev-year hand-cursor'>&#10094;&#10094;</div>
                        <div title="Previous Month" onClick={() => {
                            this.renderPreviousBSMonth()
                        }} className='prev-month hand-cursor'>&#10094;</div>
                    </div>
                    <div className='month-header-content'>
                        {this.getMonthValue(_calendarData.month)} &nbsp; {_calendarData.year}

                    </div>
                    <div className='right-actions'>
                        <div title="Next Month" onClick={() => {
                            this.renderNextBSMonth()
                        }} className='next-month hand-cursor'>&#10095;</div>
                        <div title="Next Year" className='next-year hand-cursor'>&#10095;&#10095;</div>
                    </div>

                </div>
                <div className='rl-nepali-date-body'>
                    <table className='rl-nepali-date-content'>
                        <thead>
                            <tr>
                                <th>Su</th>
                                <th>Mo</th>
                                <th>Tu</th>
                                <th>We</th>
                                <th>Th</th>
                                <th>Fr</th>
                                <th>Sa</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Array(6).fill("").map((it1, index1) => {
                                return <tr>
                                    {Array(7).fill("").map((it2, index2) => {

                                        let indexedItem = index1 * 7 + (index2) + 1;


                                        let isOfThisMonth = index1 == 0 ? indexedItem >= _calendarData.weekDay : indexedItem < (_calendarData.daysInMonth + _calendarData.weekDay);
                                        let value_item = index1 == 0 ?
                                            (!isOfThisMonth) ?
                                                previouseMonthDays - (_calendarData.weekDay - index2 - 2) :
                                                indexedItem + 1 - _calendarData.weekDay
                                            :
                                            (!isOfThisMonth) ?
                                                indexedItem - _calendarData.daysInMonth - _calendarData.weekDay + 1
                                                : indexedItem - _calendarData.weekDay + 1



                                        console.log("is of this month", isOfThisMonth, indexedItem)

                                        return <td
                                            onClick={(e) => {
                                                console.log("clicked value is")
                                            }}
                                            className={`rl-picker-cell 
                                        ${index1 * 7 + index2 == 20 ? 'active' : ''}
                                        ${index1 * 7 + index2 == 13 ? 'today' : ''}

                                        ${!isOfThisMonth ? 'other-month' : ''}`

                                            }>
                                            <div className='rl-picker-cell-inner'>

                                                {value_item}

                                            </div>
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.renderCurrentMonth()
    }
}

export default NepaliCalendar
