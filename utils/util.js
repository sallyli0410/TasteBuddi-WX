const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const dateString = date => {
  return formatTime(date).slice(0, 10)
}

const timeString = date => {
  return formatTime(date).slice(-8, -3)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

module.exports = {
  formatTime: formatTime,
  dateString: dateString,
  timeString: timeString,
  getKeyByValue: getKeyByValue
}