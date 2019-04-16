const getCookie = function (name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const deleteCookie = function () {
  document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

const formatDate = function (date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-GB', options)
}

const helpers = {}
helpers.getCookie = getCookie
helpers.deleteCookie = deleteCookie
helpers.formatDate = formatDate

export default helpers
