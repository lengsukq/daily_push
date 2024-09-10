const axios = require('axios');
const { readFileSync } = require('fs');
const dayjs = require('dayjs');
const solarlunar = require('solarlunar');
const today = dayjs();

// 格式化生日
const formatDate = (birthday, isYear = false) => {
    const currentDay = isYear ? today.add(1, 'year') : today;
    const birthdayDate = dayjs(birthday);
    const BirthdayYear = solarlunar.lunar2solar(currentDay.year(), birthdayDate.month() + 1, birthdayDate.date());

    const formatTime = `${BirthdayYear.cYear}-${String(BirthdayYear.cMonth).padStart(2, '0')}-${String(BirthdayYear.cDay).padStart(2, '0')}`;
    const formattedDate = today.format("YYYY-MM-DD");
    let diffVal = dayjs(today).diff(formatTime, 'day');

    if (diffVal === 0 && formattedDate !== formatTime) {
        diffVal = -1; // 处理如果今天不是生日的情况
    }

    return diffVal;
}

// 获取生日差值
const getDiffVal = (birthday) => {
    let diffVal = formatDate(birthday);

    // 今年生日已过，计算明年生日
    if (diffVal > 0) {
        diffVal = formatDate(birthday, true);
    }

    return Math.abs(diffVal);
}

// 获取基础信息
const basicInfo = async () => {
    try {
        configs.memorialDay = dayjs(today).diff(configs.fullInLoveDate, 'day');
        configs.memorialSecond = dayjs(today).diff(configs.fullInLoveDate, 'second');
        configs.birthdayDiff = getDiffVal(configs.birthday);
        configs.birthdayDiff2 = getDiffVal(configs.birthday2);
    } catch (err) {
        console.log('basicInfo-请检查JSON文件是否填写正确',err);
    }
}

// 获取城市ID
const getCityId = async () => {

    try {
        const { data } = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(configs.location)}&adm=${encodeURIComponent(configs.adm)}&key=${configs.key}`);
        if (data.code === '200') {
            configs.id = data.location[0].id;
        } else {
            console.log('getCityId-请检查JSON文件是否填写正确');
        }
    } catch (error) {
        console.log(error);
    }
}

// 获取天气详情
const getWeatherDetails = async (keywords) => {
    try {
        const { data } = await axios.get(`https://devapi.qweather.com/v7/${keywords}/3d?location=${configs.id}&key=${configs.key}&type=0`);
        if (data.code === '200') {
            if (keywords === 'weather') {
                configs.weather = data.daily[0];
            } else if (keywords === 'indices') {
                configs.indices = data.daily[configs.weatherIndex - 1];
                if (configs.indices.text.length > 20) {
                    configs.indices.text2 = configs.indices.text.slice(20);
                    configs.indices.text = configs.indices.text.slice(0, 20);
                }
            }
        } else {
            console.log('getWeatherDetails.请检查JSON文件是否填写正确');
        }
    } catch (error) {
        console.log(error);
    }
}

// 获取一言
const oneWords = async () => {
    try {
        const { data } = await axios.get(`https://v1.hitokoto.cn/?c=${configs.oneType}&encode=text`);
        configs.oneWords = data.length > 20 ? data.slice(0, 20) : data;
        configs.oneWords2 = data.length > 20 ? data.slice(20) : '';
    } catch (error) {
        console.log(error);
    }
}

// 发送消息所需的数据
const setData = (toUser) => ({
    "touser": toUser,
    "template_id": configs.templateId,
    "url": "http://weixin.qq.com/download",
    "topcolor": "#FF0000",
    "data": {
        "date": { "value": today.format("YYYY-MM-DD") },
        "region": { "value": configs.location },
        "temp": { "value": `${configs.weather.tempMin}度~${configs.weather.tempMax}度` },
        "textDay": { "value": `${configs.weather.textDay},${configs.weather.windDirDay}` },
        "textNight": { "value": `${configs.weather.textNight},${configs.weather.windDirNight}` },
        "memorialDay": { "value": configs.memorialDay },
        "name": { "value": configs.name },
        "name2": { "value": configs.name2 },
        "birthdayDiff": { "value": configs.birthdayDiff },
        "birthdayDiff2": { "value": configs.birthdayDiff2 },
        "tip": { "value": configs.indices.text },
        "tip2": { "value": configs.indices.text2 || "" },
        "oneWords": { "value": configs.oneWords },
        "oneWords2": { "value": configs.oneWords2 || "" },
    }
});

// 获取access_token
const getAccessToken = async () => {
    try {
        const { data } = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${configs.appId}&secret=${configs.appSecret}`);
        configs.accessToken = data.access_token;
    } catch (error) {
        console.log(error);
    }
}

// 发送消息
const sendMessage = async (accessToken, upInfo) => {
    try {
        const { data } = await axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`, JSON.stringify(upInfo), {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('sendMessage---res', data);
    } catch (error) {
        console.log(error);
    }
}
let configs;
// 主函数
async function mainFn() {
    let configsEnv;
    try {
        configsEnv = readFileSync("configs.json", 'utf-8');
    } catch (error) {
        configsEnv = process.env.daliyPushConfigs;
    }

    if (!configsEnv) {
        console.error("No configuration found.");
        return;
    }

    try {
        if (Array.isArray(configsEnv)) {
            for (const config of configsEnv) {
                await processConfig(config);
            }
        } else {
            await processConfig(configsEnv);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
// 执行配置

async function processConfig(config) {
    configs = JSON.parse(config);
    console.log('processConfig', configs);
    await oneWords();
    await basicInfo();
    await getAccessToken();
    await getCityId();

    await Promise.all([
        getWeatherDetails('indices'),
        getWeatherDetails('weather')
    ]);

    for (const user of configs.toUser) {
        const upInfo = setData(user);
        await sendMessage(configs.accessToken, upInfo);
    }
}


module.exports = mainFn;
