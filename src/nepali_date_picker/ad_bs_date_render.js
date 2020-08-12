import React, { useState, useEffect, createContext } from 'react';
import moment from 'moment';
import { calendarFunctions } from './helper_bs';


var ad_bs_listener = {};

var calendarType = "AD";

var ad_bs_sub_pub = Object.seal({
    key: 0,
    subscribers: {},
    subscribe: function (subscriber) {
        console.log("subscribing for", this.key)
        this.subscribers[this.key] = subscriber;
        return this.key++;
    },
    publish: function (dateType) {
        console.log("publishing", { dateType })
        setCalendarType(dateType)
        for (var sub in this.subscribers) {
            // console.log("publishing for key",sub)
            try {
                this.subscribers[sub](dateType);
            } catch (ignore) {
                console.log("running subs  error", ignore)
            }
        }
    },
    unsubscribe: function (key) {
        console.log("unsubscribing", key)
        delete this.subscribers[key];
    },
});

ad_bs_listener['ad_bs'] = Object.create(ad_bs_sub_pub);

function get_ad_bs_listener() {
    return ad_bs_listener;
}

function getCalendarType() {
    return calendarType
}
function setCalendarType(val) {
    calendarType = val
}

const AD_BS_RENDERER = ({ adDate, adDateFormat = "DD-MM-YYYY" }) => {


    let adDateObj = moment(adDate, adDateFormat);
    let bsDateObj = calendarFunctions.getBsDateByAdDate(adDateObj.year(), adDateObj.month() + 1, adDateObj.date());
    // const [_key, _setKey] = useState(1);
    const [calendarType, setCalendarType] = useState(getCalendarType())
    let new_key = null;
    useEffect(() => {
        let _k = ad_bs_listener.ad_bs.subscribe((dateType) => {
            setCalendarType(dateType || "AD")
        })
        console.log("subscrr", _k)
        new_key = _k
        // _setKey(_k)
        // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
    }, []);

    useEffect(() => {
        return function cleanup() {
            console.log("key is", new_key, calendarType)
            ad_bs_listener.ad_bs.unsubscribe(new_key)
            // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    }, []);

    if (adDate == null || adDate == "") {
        return ""
    }
    if (adDateObj.isValid()) {
        return calendarType == "AD" ? adDate : (`${padDateMonth(bsDateObj.bsDate)}-${padDateMonth(bsDateObj.bsMonth)}-${(bsDateObj.bsYear)}`)

    } else {
        return "Invalid Date"
    }
}

const padDateMonth = (val) => {
    return `${val}`.padStart(2, "0")
}

const dateObjectToString = (dt) => {
    return `${dt.day}-${dt.month}-${dt.year}`
}
const adDateStringToObject=(ad_string,_format="DD-MM-YYYY")=>{
        let dtObj=moment(ad_string,_format);
        return {
            day:dtObj.date(),
            month:dtObj.month()+1,
            year:dtObj.year()
        }
}
const adDateObjectToMoment=(dt)=>{
    return moment(dateObjectToString(dt),"DD-MM-YYYY")
}

export { get_ad_bs_listener, AD_BS_RENDERER, getCalendarType, setCalendarType, padDateMonth,dateObjectToString,adDateStringToObject,adDateObjectToMoment}
