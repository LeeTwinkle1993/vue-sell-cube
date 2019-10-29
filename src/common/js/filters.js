import moment from 'moment'

export function format (value) {
  return moment(value).format('YYYY-MM-DD hh:mm')
}
