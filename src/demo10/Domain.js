function getDomain(host) {
  host = host || location.host

  // 匹配域名(分割子域名)
  //const domainRegExp = /^(?:(?:[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})*))*\.([a-zA-Z0-9][-a-zA-Z0-9]{0,62}\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})$/
  const domainRegExp = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}$/
  const match = host.match(domainRegExp)
  console.log(match)
  if (match) {
    return match[1]
  } else {
    return host
  }
}

function getMobUrl(url) {
  const domain = getDomain('www.ssczx98.com')
  const domainRegExp = new RegExp(domain, 'g')
  return url.replace(domainRegExp, 'm.' + domain)
}
var hosts = [
  'www.ssczx98.com',
  'user.ssczx98.com',
  'ssczx98.com',
  'user.m.ssczx98.com',
  'center.user.m.ssczx98.com',
  'localhost',
  'localhost:4006',
  '127.0.0.1',
  '127.0.0.1:4006'
]


for (var key in hosts) {
  console.log(hosts[key], getDomain(hosts[key]))
}
//
// const url = 'http://ssczx98.com/center?url=http://ssczx98.com'
// console.log(getMobUrl(url))
