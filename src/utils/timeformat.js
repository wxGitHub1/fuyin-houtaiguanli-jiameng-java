//处理日期格式
export const timeFormat = (date) => {
    if (date) {
        let newDate = date;
        let y = newDate.getFullYear();
        let m = newDate.getMonth() + 1;
        let d = newDate.getDate();

        if (m < 10) { 
            m = '0' + m;
        }

        if (d < 10) { 
            d = '0' + d;
        }

        return (y + '-' + m + '-' + d);
    } else { 
        return
    }
}

//处理传输层时间格式
export const dateFormat = (begin = null, end = null) => {
    if(begin && end) {
        let beginTime = begin;
        let endTime = end;

        let beginYear = begin.getFullYear();
        let beginMonth = begin.getMonth() + 1;
        let beginDate = begin.getDate();

        if(beginMonth < 10) {
            beginMonth = '0' + beginMonth;
        }

        if(beginDate < 10) {
            beginDate = '0' + beginDate;
        }

        let endYear = end.getFullYear();
        let endMonth = end.getMonth() + 1;
        let endDate = end.getDate();

        if(endMonth < 10) {
            endMonth = '0' + endMonth;
        }

        if(endDate < 10) {
            endDate = '0' + endDate;
        }

        let beginResult = [beginYear, beginMonth, beginDate].join('-');
        let endResult = [endYear, endMonth, endDate].join('-');

        let resultSet = {
            beginTimes: beginResult,
            endTimes: endResult,
        }

        return resultSet;
    }
}