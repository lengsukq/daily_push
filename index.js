const axios = require('axios');
const {readFileSync} = require('fs');
const configs = JSON.parse(readFileSync("configs.json"));
const dayjs = require('dayjs')
const solarlunar = require('solarlunar')
const today = dayjs();

// console.log('configs', configs)
const formatDate = (birthday, isYear = false) => {
    // console.log('isYear---',isYear)
    let inYear = isYear ? today.add(1, 'year') : today
    let BirthdayYear = solarlunar.lunar2solar(inYear.year(), dayjs(birthday).month() + 1, dayjs(birthday).date());
    // console.log('formatDate',birthday,BirthdayYear,dayjs(birthday).month()+1,dayjs(birthday).date())

    let month = BirthdayYear.cMonth;
    let day = BirthdayYear.cDay;
    month = Number(month) < 10 ? '0' + month : month;
    day = Number(day < 10) ? '0' + day : day;
    let formatTime = inYear.year() + '-' + month + '-' + day;
    const formattedDate = today.format("YYYY-MM-DD");
    let diffVal = dayjs(today).diff(formatTime, 'day');

    if (diffVal === 0) {
        diffVal = formattedDate === formatTime ? 0 : -1;
    }
    // console.log(`格式化后的${isYear?'明年':'今年'}生日`,formatTime);
    return diffVal


}

const getDiffVal = (birthday) => {
    let diffVal = formatDate(birthday);
    // console.log('生日差值',diffVal)

    if (diffVal > 0) {
        // console.log('今年生日已经过了',diffVal);
        diffVal = formatDate(birthday, true);
        // console.log('明年的生日还有',Math.abs(diffVal))
    } else if (diffVal < 0) {
        // console.log('距离生日还有',Math.abs(diffVal));
    } else if (diffVal === 0) {
        // console.log('今天就是生日')
    }

    return Math.abs(diffVal);
}

const basicInfo = async () => {
    try {
        // 获取纪念日
        configs.memorialDay = dayjs(today).diff(configs.fullInLoveDate, 'day');
        configs.memorialSecond = dayjs(today).diff(configs.fullInLoveDate, 'second');
        configs.birthdayDiff = getDiffVal(configs.birthday);
        configs.birthdayDiff2 = getDiffVal(configs.birthday2)
    } catch (err) {
        console.log('请检查JSON文件是否填写正确')
    }

}
// 获取城市id
const getCityId = async () => {
    await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${configs.location}&adm=${configs.adm}&key=${configs.key}`)
        .then((res) => {
            let data = res.data;
            //这里获得整个请求响应对象
            // console.log('res',data);
            if (data.code === '200') {
                // console.log('获取城市id', data.location[0].id);
                configs.id = data.location[0].id;
            } else {
                console.log('请检查JSON文件是否填写正确')
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
}
// 获取天气详情
const getWeatherDetails = async (keywords) => {
    await axios.get(`https://devapi.qweather.com/v7/${keywords}/3d?location=${configs.id}&key=${configs.key}&type=0`)
        .then((res) => {
            let data = res.data;
            //这里获得整个请求响应对象
            // console.log('getWeatherDetails---res', data);
            if (data.code === '200') {
                if (keywords === 'weather') {
                    // console.log('获取每日天气信息成功', data.daily[0])
                    configs.weather = data.daily[0];
                } else if (keywords === 'indices') {
                    // console.log('获取天气指数信息成功', data.daily[configs.weatherIndex - 1])
                    configs.indices = data.daily[configs.weatherIndex - 1];
                }

            } else {
                console.log('请检查JSON文件是否填写正确')
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
}

const setData = async (toUser) => {
    return {
        "touser": toUser,
        "template_id": configs.templateId,
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": {
            "date": {
                "value": today.format("YYYY-MM-DD"),
            },
            "region": {
                "value": configs.location,
            },
            "temp": {
                "value": `${configs.weather.tempMin}度~${configs.weather.tempMax}度`
            },
            "textDay": {
                "value": configs.weather.textDay+","+configs.weather.windDirDay,
            },
            "textNight": {
                "value": configs.weather.textNight+","+configs.weather.windDirNight,
            },
            "memorialDay": {
                "value": configs.memorialDay,
            },
            "name":{
                "value" : configs.name,
            },
            "name2":{
                "value" : configs.name2,
            },
            "birthdayDiff":{
                "value" : configs.birthdayDiff,
            },
            "birthdayDiff2":{
                "value" : configs.birthdayDiff2,
            },
            "tip": {
                "value":configs.indices.text
            },
            "note_en": {
                "value": "金句",
            },
            "note_ch": {
                "value": "英文金句",
            }
        }
    }
}
// 获取access_token
const getAccessToken = async ()=>{
    await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${configs.appId}&secret=${configs.appSecret}`)
        .then((res) => {
            let data = res.data;
            //这里获得整个请求响应对象
            // console.log('res',data.access_token);
            configs.accessToken = data.access_token
        })
        .catch(function (error) {
            console.log(error);
            console.log('请检查JSON文件是否填写正确')

        })
        .then(function () {
        });
}
const sendMessage = async (accessToken,upInfo)=>{
    console.log("sendMessage-upInfo",JSON.stringify(upInfo))
    await axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`,JSON.stringify(upInfo),{
        headers: {'Content-Type': 'application/json'}
    })
        .then((res) => {
            let data = res.data;
            //这里获得整个请求响应对象
            console.log('sendMessage---res',data);
        })
        .catch(function (error) {
            console.log(error);
            console.log('请检查JSON文件是否填写正确')
        })
        .then(function () {
        });
}

async function mainFn() {
    await basicInfo();
    await getAccessToken();
    await getCityId();
    await getWeatherDetails('indices');
    await getWeatherDetails('weather');

    for (const item of configs.toUser) {
        let upInfo = await setData(item);
        await sendMessage(configs.accessToken,upInfo)

    }

    return configs
}


mainFn().then(r => {
    console.log('mainFn', r, configs)
})

