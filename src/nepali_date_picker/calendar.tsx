import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nepali_date_picker.css'

class NepaliCalendar extends Component {
    static propTypes = {
        value: "2076-01-12"
    }

    constructor(props: Readonly<{}>) {
        super(props)

        this.state = {
            selected_date: "2020-05-01"
        };
    };

    render() {
        return (
            <div className='rl-nepali-date-panel'>
                <div className="month-header">
                    <div className='left-actions'>
                        <div title="Previous Year" className='prev-year hand-cursor'>&#10094;&#10094;</div>
                        <div title="Previous Month" className='prev-month hand-cursor'>&#10094;</div>
                    </div>
                    <div className='month-header-content'>
                        August 2017</div>
                    <div className='right-actions'>
                        <div title="Next Month" className='next-month hand-cursor'>&#10095;</div>
                        <div title="Next Year" className='next-year hand-cursor'>&#10095;&#10095;</div>
                    </div>

                </div>
                <div className='rl-nepali-date-body'>
                    <table className='rl-nepali-date-content'>
                        <thead>
                            <tr>
                                <th>Mo</th>
                                <th>Tu</th>
                                <th>We</th>
                                <th>Th</th>
                                <th>Fr</th>
                                <th>Sa</th>
                                <th>Su</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(6).fill("").map((it1,index1)=>{
                                return <tr>
                                    {Array(7).fill("").map((it2,index2)=>{
                                        return <td className={`rl-picker-cell 
                                        ${index1*7+index2==20?'active':''}
                                        ${index1*7+index2==13?'today':''}

                                        ${index1*7+index2<6||index1*7+index2>32?'other-month':''}`

                                        }>
                                            <div className='rl-picker-cell-inner'>{index1*7+index2}</div>
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
}

export default NepaliCalendar
