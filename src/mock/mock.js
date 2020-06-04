const Mock = require('mockjs') // 获取mock对象

const domain = 'http://localhost:8080/mock' // 定义默认域名，随便写

import login from './login'
import answerlist from './answerlist'
import searchlist from './searchList'
import receivedList from './receivedList'

const reply = {
    "flag": 0,
    "msg": "dasfasd"
};
const typeColumns = [{"text":"收集中","value":"1"},{"text":"已结束","value":"2"},{"text":"未开始","value":"3"}];
const timelyColumns = [{"text":"是","value":"1"},{"text":"否","value":"2"}];;
const satisfyColumns = [{"text":"满意","value":"1"},{"text":"一般","value":"2"},{"text":"不满意","value":"3"}];
const waitDoList = [
    {
        "id":"1111",
        "applyTime": "2019-09-11",
        "applyGoal": "爱对方水电费角色及分级",
        "applyContent": "dsfhasofwe稍等哈胜多负少大开发好了记得是回复拉黑大V领不是代表什么的超级饿哦文件费",
        "applyState": "处理中"
    },
    {
        "id":"2222",
        "applyTime": "2019-08-11",
        "applyGoal": "大话看电视呢啥的",
        "applyContent": "d是打发士大夫撒地方撒的地方e稍等哈胜多负少大开发好了记得是回复拉黑大V领不是代表什么的超级饿哦文件费",
        "applyState": "处理中"
    }
];
const alreadyDoList = [
    {
        "id":"1111",
        "applyTime": "2019-09-11",
        "applyGoal": "爱对方水电费角色及分级",
        "applyContent": "dsfhasofwe稍等哈胜多负少大开发好了记得是回复拉黑大V领不是代表什么的超级饿哦文件费",
        "dealTime": "2020-01-01"
    },
    {
        "id":"2222",
        "applyTime": "2019-08-11",
        "applyGoal": "大话看电视呢啥的",
        "applyContent": "d是打发士大夫撒地方撒的地方e稍等哈胜多负少大开发好了记得是回复拉黑大V领不是代表什么的超级饿哦文件费",
        "dealTime": "2020-02-02"
    }
];

const alreadyDoDetail= {
    "id": "12323",
    "applyGoal": "大话看电视呢啥的",
    "applyContent": "d是打发士大夫撒地方撒的地方e稍等哈胜多负少大开发好了记得是回复拉黑大V领不是代表什么的超级饿哦文件费",
    "replyContent": "打击违法绝对是发链接安徽的水立方；简单的萨克雷放假啦放假啊",
    "FlowList": [
        {
            "id": "432432",
            "state": "办结",
            "stateDetail":'',
            "time": "2020-01-01"
        },
        {
            "id": "23324",
            "state": "办理",
            "stateDetail":'江苏省分行办理中',
            "time": "2019-12-01"
        },
        {
            "id": "6758",
            "state": "办理",
            "stateDetail":'南京分行办理中',
            "time": "2019-11-01"
        },
        {
            "id": "768696",
            "state": "工单建立",
            "stateDetail":'',
            "time": "2019-10-01"
        }
    ]
};
Mock.mock(`${domain}/users/login`, 'post', login)
Mock.mock(`${domain}/users/register`, 'post', login)
Mock.mock(`${domain}/index/getAnswerlist`, 'post', answerlist)
Mock.mock(`${domain}/index/getSystemlist`, 'post', answerlist)
Mock.mock(`${domain}/index/getApplyAmount`, 'post', 7)
Mock.mock(`${domain}/index/search`, 'post', searchlist)
Mock.mock(`${domain}/received/getReceivedList`, 'post', receivedList)
Mock.mock(`${domain}/received/replyApply`, 'post',reply)
Mock.mock(`${domain}/received/feedbackApply`, 'post',reply)
Mock.mock(`${domain}/forward/getReplyType`, 'post',typeColumns)
Mock.mock(`${domain}/myApply/getMyWaitApply`, 'post',waitDoList)
Mock.mock(`${domain}/myApply/getAlreadyDoList`, 'post',alreadyDoList)
Mock.mock(`${domain}/myApply/getAlreadyDoDetail`, 'post',alreadyDoDetail)
Mock.mock(`${domain}/myApply/getTimelyType`, 'post',timelyColumns)
Mock.mock(`${domain}/myApply/getSatisfyType`, 'post',satisfyColumns)
Mock.mock(`${domain}/forward/submitApply`, 'post',reply)
Mock.mock(`${domain}/myApply/submitReply`, 'post',reply)