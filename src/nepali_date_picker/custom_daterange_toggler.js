import React, { Component } from 'react';
import { getCalendarType, get_ad_bs_listener, padDateMonth } from './ad_bs_date_render';
import { Popover, Button } from 'antd';
import NepaliCalendar from './calendar';
import moment from 'moment';
import { calendarFunctions } from './helper_bs';
import NepaliCalendarRange from './calendar_range';

class TogglerContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected_key: null,
            isCustomClicked: false
        }


    }

    render() {
        let isCustomClicked = this.state.isCustomClicked;
        let isCustom=false;
        let showCustom = this.props.showCustom;
        let options=this.props.options;
        let selected_date_1=this.props.selected_date_1;
        let selected_date_2=this.props.selected_date_2;

        return (
            <div className='selector-content-wrapper'>
                <div className='selector-content'>
                    {options.map((it)=>{
                        let is_selected=it.dateFrom==selected_date_1&&it.dateTo==selected_date_2&&selected_date_1&&selected_date_2;
                        return <Button type={is_selected?'primary':''} onClick={()=>{
                            typeof this.props.onChange==='function'&&this.props.onChange(it.dateFrom,it.dateTo)
                            this.setState({
                                isCustomClicked:false
                            })
                        }}>{it.label}</Button>
                    })}
                    {showCustom && <Button 
                    type={isCustom?'primary':''}
                    onClick={() => {
                        this.setState({ isCustomClicked: true })
                    }}>Custom</Button>
                    }

                </div>
                {(isCustomClicked||isCustom) &&
                    <div className='custom-range-selector-content'>
                        <NepaliCalendarRange 
                        dateFrom={selected_date_1}
                        dateTo={selected_date_2}
                        onChange={(dt1,dt2)=>{
                            this.setState({
                                // isCustomClicked:false
                            })
                            typeof this.props.onChange==='function'&&this.props.onChange(dt1,dt2)
                        }} />
                    </div>
                }
            </div>
        )
    }

}
class CustomDateRangeToggler extends Component {
    constructor(props) {
        super(props)

        this.state = {
            calendarType: props.calendarType,
            selected_date_1:null,
            selected_date_2:null,
            selectorVisible:false
        }
    }

    render() {

        let label = "Last 7"
        const {selected_date_1,selected_date_2,calendarType,selectorVisible}=this.state;
        let rendering_val_1 = selected_date_1;
        let rendering_val_2 = selected_date_2;

        if (calendarType == "BS" && moment(selected_date_1, "DD-MM-YYYY").isValid()) {
            let adDateObj = moment(selected_date_1, "DD-MM-YYYY");
            let bsDateObj = calendarFunctions.getBsDateByAdDate(adDateObj.year(), adDateObj.month() + 1, adDateObj.date());
            rendering_val_1 = (`${padDateMonth(bsDateObj.bsDate)}-${padDateMonth(bsDateObj.bsMonth)}-${(bsDateObj.bsYear)}`)
        }
        if (calendarType == "BS" && moment(selected_date_2, "DD-MM-YYYY").isValid()) {
            let adDateObj = moment(selected_date_2, "DD-MM-YYYY");
            let bsDateObj = calendarFunctions.getBsDateByAdDate(adDateObj.year(), adDateObj.month() + 1, adDateObj.date());
            rendering_val_2 = (`${padDateMonth(bsDateObj.bsDate)}-${padDateMonth(bsDateObj.bsMonth)}-${(bsDateObj.bsYear)}`)
        }

        let is_disabled_left=false;
        let is_disabled_right=false;

        let options=[
            {dateTo:moment().format("DD-MM-YYYY"),dateFrom:moment().subtract('day',6).format("DD-MM-YYYY"),label:"Last 7"},
            {dateTo:moment().format("DD-MM-YYYY"),dateFrom:moment().subtract('day',29).format("DD-MM-YYYY"),label:"Last 30"},
            {dateTo:moment().format("DD-MM-YYYY"),dateFrom:moment().subtract('day',59).format("DD-MM-YYYY"),label:"Last 60"},
            {dateTo:moment().format("DD-MM-YYYY"),dateFrom:moment().subtract('day',179).format("DD-MM-YYYY"),label:"Last 180"},
            {dateTo:moment().format("DD-MM-YYYY"),dateFrom:moment().subtract('day',359).format("DD-MM-YYYY"),label:"Last 360"}
        ]
        return (
            <div className='rl-daterange-toggler'>
                <div className='rl-daterange-toggler-selectors hand-cursor'>
                    <Popover overlayClassName='popovercalendar' trigger='click'
                        placement='bottomRight'
                        visible={selectorVisible}
                        onVisibleChange={(vis)=>{
                            this.setState({
                                selectorVisible:vis
                            })
                        }}
                        content={<TogglerContent 
                            showCustom
                            selected_date_1={selected_date_1}
                            selected_date_2={selected_date_2}
                            options={options}
                            onChange={(dt1,dt2)=>{
                                this.setState({
                                    selected_date_1:dt1,
                                    selected_date_2:dt2,
                                    // selectorVisible:false
                                })
                            }}
                        />}>
                        <div className='selector-main'>
                            <span>{label}</span> <span className='down-arrow'>&#x2304;</span>
                        </div>
                    </Popover>
                </div>
                <div className='rl-daterange-toggler-content'>
                    <div className='switch left-switch hand-cursor' onClick={()=>{
                        if(!is_disabled_left){
                            // not disabled right;
                            let dt_fr=moment(selected_date_1,"DD-MM-YYYY");
                            let dt_to=moment(selected_date_2,"DD-MM-YYYY");
                            let diff_days=dt_to.diff(dt_fr,'day');
                            console.log("diff is",diff_days)
                            if(isNaN(diff_days)){
                                return;
                            }
                            this.setState({
                                selected_date_2:selected_date_1,
                                selected_date_1:dt_fr.subtract('day',diff_days).format("DD-MM-YYYY")
                            })
                        }
                    }}>
                        &#10094;
                </div>
                    <div className='label-body'>
                        {rendering_val_1||"DD-MM-YYYY"} - {rendering_val_2||"DD-MM-YYYY"}
                </div>
                    <div className='switch right-switch hand-cursor' onClick={()=>{
                        if(!is_disabled_right){
                            // not disabled right;
                            let dt_fr=moment(selected_date_1,"DD-MM-YYYY");
                            let dt_to=moment(selected_date_2,"DD-MM-YYYY");
                            let diff_days=dt_to.diff(dt_fr,'day');
                            console.log("diff is",diff_days)
                            if(isNaN(diff_days)){
                                return;
                            }
                            this.setState({
                                selected_date_1:selected_date_2,
                                selected_date_2:dt_to.add('day',diff_days).format("DD-MM-YYYY")
                            })
                        }
                    }}>
                        &#10095;
                </div>
                </div>
            </div>
        );
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
}

CustomDateRangeToggler.defaultProps = {
    calendarType: getCalendarType()
}

export default CustomDateRangeToggler;
