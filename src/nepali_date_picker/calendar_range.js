import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nepali_date_picker.css'
import { calendarData, calendarFunctions } from './helper_bs';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { get_ad_bs_listener, getCalendarType } from './ad_bs_date_render';
import NepaliCalendarForRange from './calendar_for_range';

class NepaliCalendarRange extends Component {



    render() {

        // console.log("selected data", selected_data)



        return (<div className='rl-range-calendar'>
            <NepaliCalendarForRange showToday={false} />
            <NepaliCalendarForRange showToday={false}/>
        </div>
        )
    }




}

export default NepaliCalendarRange
