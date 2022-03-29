import dayjs from 'dayjs'

export function formatTime(value, format = 'HH:mm:ss DD/MM/YYYY') {
    return dayjs(value).format(format)
}