import moment from "moment";

var ad_bs_listener = {};

var calendarType = "AD";

var ad_bs_sub_pub = Object.seal({
  key: 0,
  subscribers: {},
  subscribe: function (subscriber) {
    this.subscribers[this.key] = subscriber;
    return this.key++;
  },
  publish: function (dateType) {
    console.log("publishing", { dateType });
    setCalendarType(dateType);
    for (var sub in this.subscribers) {
      // console.log("publishing for key",sub)
      try {
        this.subscribers[sub](dateType);
      } catch (ignore) {
        console.log("running subs  error", ignore);
      }
    }
  },
  unsubscribe: function (key) {
    delete this.subscribers[key];
  },
});

ad_bs_listener["ad_bs"] = Object.create(ad_bs_sub_pub);

function get_ad_bs_listener() {
  return ad_bs_listener;
}

function getCalendarType() {
  return calendarType;
}
function setCalendarType(val) {
  calendarType = val;
}

const padDateMonth = (val) => {
  return `${val}`.padStart(2, "0");
};

const dateObjectToString = (dt) => {
  return `${padDateMonth(dt.day)}-${padDateMonth(dt.month)}-${dt.year}`;
};
const adDateStringToObject = (ad_string, _format = "DD-MM-YYYY") => {
  let dtObj = moment(ad_string, _format);
  return {
    day: dtObj.date(),
    month: dtObj.month() + 1,
    year: dtObj.year(),
  };
};
const adDateObjectToMoment = (dt) => {
  return moment(dateObjectToString(dt), "DD-MM-YYYY");
};

export {
  get_ad_bs_listener,
  getCalendarType,
  setCalendarType,
  padDateMonth,
  dateObjectToString,
  adDateStringToObject,
  adDateObjectToMoment,
};
