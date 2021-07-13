//TODO remove this entirely

const ad_bs_listener = {};

let calendarType = "AD";

let ad_bs_sub_pub = Object.seal({
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

export { get_ad_bs_listener, getCalendarType, setCalendarType };
