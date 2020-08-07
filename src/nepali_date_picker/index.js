import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nepali_date_picker.css'
import NepaliCalendar from './calendar.js'
import { calendarFunctions } from './helper_bs.js'

class NepaliDatePicker extends Component {
    static propTypes = {
        value: "2076-01-12",
        size: "small"
    }
    constructor(props) {
        super(props)

        this.state = {
            selected_date: null,
            focused: true
        }

        this.random_id=`rl-nepali-${Math.random()}`
    }

    render() {
        const { selected_date, focused } = this.state
        return (
            <div id={this.random_id} className='rl-nepali-datepicker-wrapper'>
                <input
                    style={{
                        width: 500
                    }}
                    onFocus={() => {
                        this.setState({ focused: true })
                    }}
                    value={selected_date}
                    placeholder="Date"
                    className={`rl-nepali-datepicker-input ${this.props.size}`} /> 
                    {focused && <div className='rl-nepali-datepicker-content'>
                        <NepaliCalendar />
                    </div>
                }
            </div>
        )
    }
    onDivClick = ({target}) => {
        var specifiedElement = document.getElementById(this.random_id);
        console.log("specified element",specifiedElement)

        console.log("div clicked",target)
        var isClickInside = specifiedElement&&specifiedElement.contains(target);

        console.log("is clicked inside",isClickInside)
        if (!isClickInside) {
            //the click was outside the specifiedElement, do something
            this.setState({focused:false})
        }

        // typeof this.props.onClose==='function'&&this.props.onClose()
    }

    componentDidMount() {

        setTimeout(()=>{
            // document.addEventListener('click', this.onDivClick)
        },200)
        
        // this.calender_picker.addEventListener('focusout',this.onFocusedOut)

    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onDivClick)
    }

}

export default NepaliDatePicker
