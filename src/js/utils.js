import dayjs from 'dayjs';

export function formatMyData(date, format = "DD, MMM - YYYY, hh:mma") {
    return dayjs(date).format(format);
}
