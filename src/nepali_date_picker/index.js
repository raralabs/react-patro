import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nepali_date_picker.css'
import NepaliCalendar from './calendar.js'
import { calendarFunctions } from './helper_bs.js'

class NepaliDatePicker extends Component {
    static propTypes = {
        value:"2076-01-12"
    }

    render() {
        return (
            <div className='rl-nepali-datepicker-wrapper'>
                  <NepaliCalendar   />
            </div>
        )
    }

    componentDidMount(){
        console.log(calendarFunctions.getNepaliNumber(2));
    }
}

export default NepaliDatePicker
