import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
//定义CRM的登录名
const CMSLoginName = 'CMSLoginName'

// cookie 的有效时长 为 4个小时
const inFifteenMinutes = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,
    {
      expires: inFifteenMinutes, domain: '.cscse.edu.cn'
    });
}

export function setCMSLoginName(username) {
  //设置本地cookie
  return Cookies.set(CMSLoginName, username, {expires: inFifteenMinutes, domain: '.cscse.edu.cn'});
  // 设置主域cookie
  // return Cookies.set(TokenKey, token,{
  //   domain : '.censoft.com.cn'
  // })
}

export function setTokenByTime(token, expiresTime) {
  return Cookies.set(TokenKey, token, {
    expires: 1 / 24,
  })
}

export function removeToken() {
  //清除本地指定cookie
  return Cookies.remove(TokenKey, {
    domain: '.cscse.edu.cn'
  })
}

export function setCookie(key, value) {
  return Cookies.set(key, value, {expires: inFifteenMinutes, domain: '.cscse.edu.cn'})
}

export function removeCookie(key) {
  return Cookies.remove(key, {
    domain: '.cscse.edu.cn'
  })
}

export function getCookie(key) {
  return Cookies.get(key)
}
