import moment from 'moment';




export const calendarData = {
    bsMonths: ["बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"],
    adMonth: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    adMonthShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    bsDays: ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"],
    adDays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    nepaliNumbers: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"],
    bsMonthUpperDays: [
        [30, 31],
        [31, 32],
        [31, 32],
        [31, 32],
        [31, 32],
        [30, 31],
        [29, 30],
        [29, 30],
        [29, 30],
        [29, 30],
        [29, 30],
        [30, 31]
    ],
    extractedBsMonthData: [
        [0, 1, 1, 22, 1, 3, 1, 1, 1, 3, 1, 22, 1, 3, 1, 3, 1, 22, 1, 3, 1, 19, 1, 3, 1, 1, 3, 1, 2, 2, 1, 3, 1],
        [1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2],
        [0, 1, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2],
        [1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 2, 2, 1, 3, 1, 2, 2, 2, 1, 2],
        [59, 1, 26, 1, 28, 1, 2, 1, 12],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1, 2, 2, 1, 3, 1, 2, 1, 2],
        [0, 12, 1, 3, 1, 3, 1, 5, 1, 11, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 27, 1, 2],
        [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 15, 2, 4],
        [0, 1, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 15, 2, 4],
        [1, 1, 3, 1, 3, 1, 14, 1, 3, 1, 1, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 3, 1, 14, 1, 3, 15, 1, 2, 1, 1],
        [0, 1, 1, 3, 1, 3, 1, 10, 1, 3, 1, 3, 1, 1, 1, 3, 1, 3, 1, 10, 1, 3, 1, 3, 1, 3, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 3, 1, 10, 1, 20, 1, 1, 1],
        [1, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 20, 3]
    ],
    minBsYear: 1970,
    maxBsYear: 2100,
    minAdDateEqBsDate: {
        "ad": {
            "year": 1913, "month": 3, "date": 13
        },
        "bs": {
            "year": 1970, "month": 1, "date": 1
        }
    }
};

export const validationFunctions = {
    validateRequiredParameters: function (requiredParameters = {}) {
        Object.keys(requiredParameters).map((key) => {
            var value = requiredParameters[key];
            if (typeof value === "undefined" || value === null) {
                throw new ReferenceError("Missing required parameters: " + Object.keys(requiredParameters).join(", "));
            }
        })
        // $.each(requiredParameters, function (key, value) {

        // });
    },
    validateBsYear: function (bsYear) {
        if (typeof bsYear !== "number" || bsYear === null) {
            throw new TypeError("Invalid parameter bsYear value");
        } else if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
            throw new RangeError("Parameter bsYear value should be in range of " + calendarData.minBsYear + " to " + calendarData.maxBsYear);
        }
    },
    validateAdYear: function (adYear) {
        if (typeof adYear !== "number" || adYear === null) {
            throw new TypeError("Invalid parameter adYear value");
        } else if (adYear < calendarData.minBsYear - 57 || adYear > calendarData.maxBsYear - 57) {
            throw new RangeError("Parameter adYear value should be in range of " + (calendarData.minBsYear - 57) + " to " + (calendarData.maxBsYear - 57));
        }
    },
    validateBsMonth: function (bsMonth) {
        if (typeof bsMonth !== "number" || bsMonth === null) {
            throw new TypeError("Invalid parameter bsMonth value");
        } else if (bsMonth < 1 || bsMonth > 12) {
            throw new RangeError("Parameter bsMonth value should be in range of 1 to 12");
        }
    },
    validateAdMonth: function (adMonth) {
        if (typeof adMonth !== "number" || adMonth === null) {
            throw new TypeError("Invalid parameter adMonth value");
        } else if (adMonth < 1 || adMonth > 12) {
            throw new RangeError("Parameter adMonth value should be in range of 1 to 12");
        }
    },
    validateBsDate: function (bsDate) {
        if (typeof bsDate !== "number" || bsDate === null) {
            throw new TypeError("Invalid parameter bsDate value");
        } else if (bsDate < 1 || bsDate > 32) {
            throw new RangeError("Parameter bsDate value should be in range of 1 to 32");
        }
    },
    // adDate range is from 1-12 
    validateAdDate: function (adDate) {
        if (typeof adDate !== "number" || adDate === null) {
            throw new TypeError("Invalid parameter adDate value");
        } else if (adDate < 1 || adDate > 31) {
            throw new RangeError("Parameter adDate value should be in range of 1 to 31");
        }
    },
    validatePositiveNumber: function (numberParameters) {
        // console.log("validate positive number", numberParameters);
        Object.keys(numberParameters).map((key) => {
            let value = numberParameters[key];
            if (typeof value !== "number" || value === null || value < 0) {
                throw new ReferenceError("Invalid parameters: " + Object.keys(numberParameters).join(", "));
            } else if (key === "yearDiff" && value > (calendarData.maxBsYear - calendarData.minBsYear + 1)) {
                throw new RangeError("Parameter yearDiff value should be in range of 0 to " + (calendarData.maxBsYear - calendarData.minBsYear + 1));
            }
        })
        // $.each(numberParameters, function (key, value) {
        //     if (typeof value !== "number" || value === null || value < 0) {
        //         throw new ReferenceError("Invalid parameters: " + Object.keys(numberParameters).join(", "));
        //     } else if (key === "yearDiff" && value > (calendarData.maxBsYear - calendarData.minBsYear + 1)) {
        //         throw new RangeError("Parameter yearDiff value should be in range of 0 to " + (calendarData.maxBsYear - calendarData.minBsYear + 1));
        //     }
        // });
    }
};

export const calendarFunctions = Object.seal({
    /**
        * Return equivalent number in nepaliNumber
        * @param {Number} number
        * @returns {String} nepaliNumber
   */
    changeDateToString: function (date, dateType = "AD", dateFormat) {

    },
    changeDatetToObject: function (dateString, dateType = "AD", dateFormat) {

    },
   
    getNepaliNumber: function (number) {
        if (typeof number === "undefined") {
            throw new Error("Parameter number is required");
        } else if (typeof number != "number" || number < 0) {
            throw new Error("Number should be positive integer");
        }

        var prefixNum = Math.floor(number / 10);
        var suffixNum = number % 10;
        if (prefixNum !== 0) {
            return calendarFunctions.getNepaliNumber(prefixNum) + calendarData.nepaliNumbers[suffixNum];
        } else {
            return calendarData.nepaliNumbers[suffixNum];
        }
    },
    /**
        * Return equivalent number from nepaliNumber
        * @param {String} nepaliNumber
        * @returns {Number} number
        */
    getNumberByNepaliNumber: function (nepaliNumber) {
        if (typeof nepaliNumber === "undefined") {
            throw new Error("Parameter nepaliNumber is required");
        } else if (typeof nepaliNumber !== "string") {
            throw new Error("Parameter nepaliNumber should be in string");
        }

        var number = 0;
        for (var i = 0; i < nepaliNumber.length; i++) {
            var numIndex = calendarData.nepaliNumbers.indexOf(nepaliNumber.charAt(i));
            if (numIndex === -1) {
                throw new Error("Invalid nepali number");
            }
            number = number * 10 + numIndex;
        }

        return number;
    },

    getBsMonthInfoByBsDate: function (bsYear, bsMonth, bsDate) {
        validationFunctions.validateRequiredParameters({ "bsYear": bsYear, "bsMonth": bsMonth, "bsDate": bsDate });
        validationFunctions.validateBsYear(bsYear);
        validationFunctions.validateBsMonth(bsMonth);
        validationFunctions.validateBsDate(bsDate);

        var daysNumFromMinBsYear = calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
        var adDate = new Date(calendarData.minAdDateEqBsDate.ad.year, calendarData.minAdDateEqBsDate.ad.month, calendarData.minAdDateEqBsDate.ad.date - 1);
        adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);

        var bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);

        console.log("ad date", adDate)


        var bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth);
        bsDate = (bsDate > bsMonthDays) ? bsMonthDays : bsDate;
        var eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate);
        let moment_date = moment(eqAdDate);

        var adInitialDateForMonth = moment_date.clone().startOf('month');

        console.log("first ad date for month", adInitialDateForMonth.format('lll'))
        // var formattedDate = calendarFunctions.bsDateFormat(dateFormatPattern, bsYear, bsMonth, bsDate);
        console.log("ad date", eqAdDate, bsDate)

        var prevbsmonth = bsMonth - 1 !== 0 ? bsMonth - 1 : 12;
        var prevbsyear = prevbsmonth == 12 ? bsYear - 1 : bsYear;
        var nextbsmonth = bsMonth == 12 ? 1 : bsMonth + 1;
        var nextbsyear = nextbsmonth == 1 ? bsYear + 1 : bsYear;

        var prevbsmonthdays = calendarFunctions.getBsMonthDays(prevbsyear, prevbsmonth);
        return {
            adYear: moment_date.year(),
            adMonth: moment_date.month() + 1,
            adDay: moment_date.date(),
            adDate: eqAdDate,
            adMonthsDay: moment_date.daysInMonth(),
            adStartingDayOfWeek: adInitialDateForMonth.day() == 0 ? 7 : adInitialDateForMonth.day(),
            adPrevMonth: moment_date.month() - 1 != -1 ? moment_date.month() : 12,
            adPrevYear: moment_date.month() == 11 ? moment_date.year() - 1 : moment_date.year(),
            adNextMonth: moment_date.add('month', 1).month()+1,
            adNextYear: moment_date.add('month', 1).year(),
            adDaysInPrevMonth: moment_date.subtract('month', 1).daysInMonth(),

            bsYear: bsYear,
            bsMonth: bsMonth,
            bsDay: bsDate,//day of month
            bsMonthFirstAdDate: bsMonthFirstAdDate,
            bsMonthDays: bsMonthDays,
            bsStartingDayOfWeek: bsMonthFirstAdDate.getDay(),
            bsPrevMonth: prevbsmonth,
            bsPrevYear: prevbsyear,
            bsNextMonth: nextbsmonth,
            bsNextYear: nextbsyear,
            bsDaysInPrevMonth: prevbsmonthdays,
        };
    },
    getAdDateByBsDate: function (bsYear, bsMonth, bsDate) {
        validationFunctions.validateRequiredParameters({ "bsYear": bsYear, "bsMonth": bsMonth, "bsDate": bsDate });
        validationFunctions.validateBsYear(bsYear);
        validationFunctions.validateBsMonth(bsMonth);
        validationFunctions.validateBsDate(bsDate);
        var daysNumFromMinBsYear = calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
        var adDate = new Date(calendarData.minAdDateEqBsDate.ad.year, calendarData.minAdDateEqBsDate.ad.month, calendarData.minAdDateEqBsDate.ad.date - 1);
        adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
        return adDate;
    },
    getAdDateObjectByBsDate: function (bsYear, bsMonth, bsDate) {
        validationFunctions.validateRequiredParameters({ "bsYear": bsYear, "bsMonth": bsMonth, "bsDate": bsDate });
        validationFunctions.validateBsYear(bsYear);
        validationFunctions.validateBsMonth(bsMonth);
        validationFunctions.validateBsDate(bsDate);
        var daysNumFromMinBsYear = calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
        var adDate = new Date(calendarData.minAdDateEqBsDate.ad.year, calendarData.minAdDateEqBsDate.ad.month, calendarData.minAdDateEqBsDate.ad.date - 1);
        adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);

        return {
            adYear: adDate.getFullYear(),
            adMonth: adDate.getMonth() + 1,
            adDate: adDate.getDate()
        };
    },
    getTotalDaysNumFromMinBsYear: function (bsYear, bsMonth, bsDate) {
        validationFunctions.validateRequiredParameters({ "bsYear": bsYear, "bsMonth": bsMonth, "bsDate": bsDate });
        validationFunctions.validateBsYear(bsYear);
        validationFunctions.validateBsMonth(bsMonth);
        validationFunctions.validateBsDate(bsDate);

        if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
            return null;
        }

        var daysNumFromMinBsYear = 0;
        var diffYears = bsYear - calendarData.minBsYear;
        for (var month = 1; month <= 12; month++) {
            if (month < bsMonth) {
                daysNumFromMinBsYear += calendarFunctions.getMonthDaysNumFormMinBsYear(month, diffYears + 1);
            } else {
                daysNumFromMinBsYear += calendarFunctions.getMonthDaysNumFormMinBsYear(month, diffYears);
            }
        }

        if (bsYear > 2085 && bsYear < 2088) {
            daysNumFromMinBsYear += bsDate - 2;
        } else if (bsYear === 2085 && bsMonth > 5) {
            daysNumFromMinBsYear += bsDate - 2;
        } else if (bsYear > 2088) {
            daysNumFromMinBsYear += bsDate - 4;
        } else if (bsYear === 2088 && bsMonth > 5) {
            daysNumFromMinBsYear += bsDate - 4;
        } else {
            daysNumFromMinBsYear += bsDate;
        }

        return daysNumFromMinBsYear;
    },
    /**
     * Return total number of bsMonth days from minYear
     * @param {int} bsMonth
     * @param {int} yearDiff
     * @returns {int}
     */
    getMonthDaysNumFormMinBsYear: function (bsMonth, yearDiff) {
        validationFunctions.validateRequiredParameters({ "bsMonth": bsMonth, "yearDiff": yearDiff });
        validationFunctions.validateBsMonth(bsMonth);
        validationFunctions.validatePositiveNumber({ "yearDiff": yearDiff });

        var yearCount = 0;
        var monthDaysFromMinBsYear = 0;
        if (yearDiff === 0) {
            return 0;
        }

        var bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1];
        for (var i = 0; i < bsMonthData.length; i++) {
            if (bsMonthData[i] === 0) {
                continue;
            }

            var bsMonthUpperDaysIndex = i % 2;
            if (yearDiff > yearCount + bsMonthData[i]) {
                yearCount += bsMonthData[i];
                monthDaysFromMinBsYear += calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * bsMonthData[i];
            } else {
                monthDaysFromMinBsYear += calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * (yearDiff - yearCount);
                yearCount = yearDiff - yearCount;
                break;
            }
        }

        return monthDaysFromMinBsYear;
    },
    /**
     * Return number of bsMonth days
     * @param {int} bsYear
     * @param {int} bsMonth
     * @returns {int} days
     */
    getBsMonthDays: function (bsYear, bsMonth) {
        validationFunctions.validateRequiredParameters({ "bsYear": bsYear, "bsMonth": bsMonth });
        validationFunctions.validateBsYear(bsYear);
        validationFunctions.validateBsMonth(bsMonth);

        var yearCount = 0;
        var totalYears = (bsYear + 1) - calendarData.minBsYear;
        var bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1];
        for (var i = 0; i < bsMonthData.length; i++) {
            if (bsMonthData[i] === 0) {
                continue;
            }

            var bsMonthUpperDaysIndex = i % 2;
            yearCount += bsMonthData[i];
            if (totalYears <= yearCount) {
                if ((bsYear === 2085 && bsMonth === 5) || (bsYear === 2088 && bsMonth === 5)) {
                    return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 2;
                } else {
                    return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex];
                }
            }
        }

        return null;
    },
    getADMonthDays: function (adYear, adMonth) {
        let date = moment().year(adYear).month(adMonth);
        return date.daysInMonth()
    },
    getBsDateByAdDate: function (adYear, adMonth, adDate) {
        validationFunctions.validateRequiredParameters({ "adYear": adYear, "adMonth": adMonth, "adDate": adDate });
        validationFunctions.validateAdYear(adYear);
        validationFunctions.validateAdMonth(adMonth);
        validationFunctions.validateAdDate(adDate);

        var bsYear = adYear + 57;
        var bsMonth = (adMonth + 9) % 12;
        bsMonth = bsMonth === 0 ? 12 : bsMonth;
        var bsDate = 1;

        if (adMonth < 4) {
            bsYear -= 1;
        } else if (adMonth === 4) {
            var bsYearFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, 1, 1);
            if (adDate < bsYearFirstAdDate.getDate()) {
                bsYear -= 1;
            }
        }

        var bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);
        if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
            bsMonth = (bsMonth !== 1) ? bsMonth - 1 : 12;
            var bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth);
            bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
        } else {
            bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
        }

        return {
            bsYear: bsYear,
            bsMonth: bsMonth,
            bsDate: bsDate
        };
    },
    getBsYearByAdDate: function (adYear, adMonth, adDate) {
        validationFunctions.validateRequiredParameters({ "adYear": adYear, "adMonth": adMonth, "adDate": adDate });
        validationFunctions.validateAdYear(adYear);
        validationFunctions.validateAdMonth(adMonth);
        validationFunctions.validateAdDate(adDate);

        var bsDate = calendarFunctions.getBsDateByAdDate(adYear, adMonth, adDate);
        return bsDate.bsYear;
    },
    getBsMonthByAdDate: function (adYear, adMonth, adDate) {
        validationFunctions.validateRequiredParameters({ "adYear": adYear, "adMonth": adMonth, "adDate": adDate });
        validationFunctions.validateAdYear(adYear);
        validationFunctions.validateAdMonth(adMonth);
        validationFunctions.validateAdDate(adDate);

        var bsDate = calendarFunctions.getBsDateByAdDate(adYear, adMonth, adDate);
        return bsDate.bsMonth;
    },
    // bsDateFormat: function (dateFormatPattern, bsYear, bsMonth, bsDate) {
    //     validationFunctions.validateRequiredParameters({
    //         "dateFormatPattern": dateFormatPattern,
    //         "bsYear": bsYear,
    //         "bsMonth": bsMonth,
    //         "bsDate": bsDate
    //     });
    //     validationFunctions.validateBsYear(bsYear);
    //     validationFunctions.validateBsMonth(bsMonth);
    //     validationFunctions.validateBsDate(bsDate);

    //     var eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate);
    //     var weekDay = eqAdDate.getDay() + 1;
    //     var formattedDate = dateFormatPattern;
    //     formattedDate = formattedDate.replace(/%d/g, calendarFunctions.getNepaliNumber(bsDate));
    //     formattedDate = formattedDate.replace(/%y/g, calendarFunctions.getNepaliNumber(bsYear));
    //     formattedDate = formattedDate.replace(/%m/g, calendarFunctions.getNepaliNumber(bsMonth));
    //     formattedDate = formattedDate.replace(/%M/g, calendarData.bsMonths[bsMonth - 1]);
    //     formattedDate = formattedDate.replace(/%D/g, calendarData.bsDays[weekDay - 1]);
    //     return formattedDate;
    // },
    parseFormattedBsDate: function (dateFormat, dateFormattedText) {
        validationFunctions.validateRequiredParameters({
            "dateFormat": dateFormat,
            "dateFormattedText": dateFormattedText
        });

        var diffTextNum = 0;
        var extractedFormattedBsDate = {
            "bsYear": null,
            "bsMonth": null,
            "bsDate": null,
            "bsDay": null
        };

        for (var i = 0; i < dateFormat.length; i++) {
            if (dateFormat.charAt(i) === '%') {
                var valueOf = dateFormat.substring(i, i + 2);
                var endChar = dateFormat.charAt(i + 2);
                var tempText = dateFormattedText.substring(i + diffTextNum);
                var endIndex = (endChar !== '') ? tempText.indexOf(endChar) : tempText.length;
                var value = tempText.substring(0, endIndex);

                if (valueOf === "%y") {
                    extractedFormattedBsDate.bsYear = calendarFunctions.getNumberByNepaliNumber(value);
                    diffTextNum += value.length - 2;
                } else if (valueOf === "%d") {
                    extractedFormattedBsDate.bsDate = calendarFunctions.getNumberByNepaliNumber(value);
                    diffTextNum += value.length - 2;
                } else if (valueOf === "%D") {
                    extractedFormattedBsDate.bsDay = calendarData.bsDays.indexOf(value) + 1;
                    diffTextNum += value.length - 2;
                } else if (valueOf === "%m") {
                    extractedFormattedBsDate.bsMonth = calendarFunctions.getNumberByNepaliNumber(value);
                    diffTextNum += value.length - 2;
                } else if (valueOf === "%M") {
                    extractedFormattedBsDate.bsMonth = calendarData.bsMonths.indexOf(value) + 1;
                    diffTextNum += value.length - 2;
                }
            }
        }

        if (!extractedFormattedBsDate.bsDay) {
            var eqAdDate = calendarFunctions.getAdDateByBsDate(extractedFormattedBsDate.bsYear, extractedFormattedBsDate.bsMonth, extractedFormattedBsDate.bsDate);
            extractedFormattedBsDate.bsDay = eqAdDate.getDay() + 1;
        }

        return extractedFormattedBsDate;
    }
})
