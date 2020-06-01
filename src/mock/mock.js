const Mock = require('mockjs') // 获取mock对象

const domain = 'http://localhost:8080/mock' // 定义默认域名，随便写

import login from './login'
import answerlist from './answerlist'
import searchlist from './searchList'
import receivedList from './receivedList'

Mock.mock(`${domain}/users/login`, 'post', login)
Mock.mock(`${domain}/users/register`, 'post', login)
Mock.mock(`${domain}/index/getAnswerlist`, 'post', answerlist)
Mock.mock(`${domain}/index/getSystemlist`, 'post', answerlist)
Mock.mock(`${domain}/index/search`, 'post', searchlist)
Mock.mock(`${domain}/received/getReceivedList`, 'post', receivedList)