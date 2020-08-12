import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nepali_date_picker.css'
import { calendarData, calendarFunctions } from './helper_bs';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { get_ad_bs_listener, getCalendarType, dateObjectToString, adDateObjectToMoment } from './ad_bs_date_render';
import NepaliCalendarForRange from './calendar_for_range';

class NepaliCalendarRange extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selected_date_1: null,
            selected_date_2: null
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
                    selected_date_2:null
                }
                if (dt_1_m == dt_2_m) {
                    new_dt_group.selected_date_2=this.state.selected_date_1
                    // same date selected
                } else if (dt_1_m < dt_2_m) {
                    new_dt_group.selected_date_2=dateObjectToString(ad_date)
                    // selected  date is greater than 

                }else{
                    //selected date is less than date 1
                    new_dt_group.selected_date_1=dateObjectToString(ad_date);
                    new_dt_group.selected_date_2=this.state.selected_date_1
                }

                typeof this.props.onChange==='function'&&this.props.onChange(new_dt_group.selected_date_1,new_dt_group.selected_date_2)

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

        // console.log("selected data", selected_data)



        return (<>
            <div className='rl-range-calendar'>
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
                    initialDate={this.state.selected_date_2==null?this.state.selected_date_1:this.state.selected_date_2}
                    // disableDate={(d)=>{
                    //     return this.state.selected_date_1&&d<moment(this.state.selected_date_1,"DD-MM-YYYY")
                    // }}
                    selected_date_2={this.state.selected_date_2}
                    onSelect={(ad_date) => {
                        this.onDateSelect(ad_date)
                    }}
                    calendarFor={2}
                    showToday={false} />
            </div></>
        )
    }

    componentDidUpdate(prevProps) {
        if (this.props.dateFrom != prevProps.dateFrom) {
            this.setState({
                selected_date_1: this.props.dateFrom
            })
        }
        if (this.props.dateTo != prevProps.dateTo) {
            this.setState({
                selected_date_2: this.props.dateTo
            })
        }
    }



}

export default NepaliCalendarRange
