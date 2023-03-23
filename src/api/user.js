import request from '../utils/request'

/**
 * 账号密码登录
 */
export const Login = ({ mail, passwd }) => {
  return request({
    method: 'GET',
    url: `/user/login?mail=${mail}&passwd=${passwd}`
  })
}

/**
 * 发送验证码
 */
export const SendCode = (data) => {
  return request({
    method: 'GET',
    url: `/mail/send/?mail=${data}`
  })
}

/**
 * 用户注册
 */
export const CheckCode = (data) => {
  return request({
    method: 'GET',
    url: `/mail/register?code=${data.code}&mail=${data.mail}`
  })
}
export const Register = ({ mail, nickname, passwd }) => {
  return request({
    method: 'POST',
    url: `/user/register?mail=${mail}&nickname=${nickname}&passwd=${passwd}`,
  })
}

/**
 * 修改密码
 */
export const ModifyPasswd = ({mail,passwd}) => {
  return request({
    method: 'POST',
    url: `/user/passwd?mail=${mail}&pwd=${passwd}`,
  })
}
export const ModifyNickName = ({mail,nickname}) => {
  return request({
    method: 'POST',
    url: `/user/nickname?mail=${mail}&nickname=${nickname}`,
  })
}

/**
 * 注销账号
 */
export const DelUser = ({mail,nickname,passwd}) => {
    return request({
        method: 'DELETE',
        url: `/user/del?mail=${mail}&nickname=${nickname}&passwd=${passwd}`
    })
}