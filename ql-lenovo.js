/**
 * cron: 30 7 * * *
 *
 * 微信每日推送
 *
 * 环境变量定义:
 *  - foo: 其含义
 *  - bar: 其含义
 */
const $ = new Env('联想延保每日签到');
// 读取环境变量: process.env[ENV]
// 读取存储文件: const data = $.getdata($.name) || {};
// 写入存储文件: $.setdata(data, $.name);

!(async () => {
    const notify = require("./sendNotify");

    const lenovoInfo = JSON.parse(process.env.lenovoInfo);
    if (!lenovoInfo){
        console.log("请检查环境变量lenovoInfo是否设置正确")
        await notify.sendNotify('联想自动签到:请检查环境变量lenovoInfo是否设置正确')

        return
    }
    // 代码开始
    const CryptoJS= require('crypto-js');
    const baseinfo ="eyJpbWVpIjoiODY1MzE1MDMxOTg1ODc4IiwicGhvbmVicmFuZCI6Imhvbm9yIiwicGhvbmVNb2RlbCI6IkZSRC1BTDEwIiwiYXBwVmVyc2lvbiI6IlY0LjIuNSIsInBob25laW5jcmVtZW50YWwiOiI1NTYoQzAwKSIsIlBhZ2VJbmZvIjoiTXlJbmZvcm1hdGlvbkFjdGlvbkltcGwiLCJwaG9uZWRpc3BsYXkiOiJGUkQtQUwxMCA4LjAuMC41NTYoQzAwKSIsInBob25lTWFudWZhY3R1cmVyIjoiSFVBV0VJIiwibGVub3ZvQ2x1YkNoYW5uZWwiOiJ5aW5neW9uZ2JhbyIsImxvZ2luTmFtZSI6IjE3NjQwNDA4NTM3IiwicGhvbmVwcm9kdWN0IjoiRlJELUFMMTAiLCJzeXN0ZW1WZXJzaW9uIjoiOC4wLjAiLCJhbmRyb2lkc2RrdmVyc2lvbiI6IjI2In0="
    const $http=require("axios")
    let result = "【联想延保每日签到】："
    const account = lenovoInfo.account
    const password =   lenovoInfo.password
    const parsedWordArray = CryptoJS.enc.Base64.parse(baseinfo);
    const info=JSON.parse(parsedWordArray.toString(CryptoJS.enc.Utf8))
    let deviceid = info.imei
    const url = {
        "login": `https://uss.lenovomm.com/authen/1.2/tgt/user/get?msisdn=${account}`,
        "session": "https://api.club.lenovo.cn/users/getSessionID",
        "sign1": "https://api.club.lenovo.cn/common/signin/add",
        "sign2": "https://api.club.lenovo.cn/signin/v2/add"
    }
    let lpsutgt = ""
    headers = {
        baseinfo: baseinfo,
        unique: deviceid,
        "User-Agent": "LenovoClub/4.1.2 (iPad; iOS 13.6; Scale/2.00)",
        token: "",
        //"User-Agent":"Apache-HttpClient/UNAVAILABLE (java 1.5)",
        Authorization: "",
        "itemid":"1",
        "sversion": "0",
        "X-Lenovo-APPID": "1",
        "versionCode":"1000082"
    }

    function lxlogin() {
        return new Promise(async (resolve) => {
            try {
                let data = `lang=zh-CN-%23Hans&source=android%3Acom.lenovo.club.app-V4.2.5&deviceidtype=mac&deviceid=${deviceid}&devicecategory=unknown&devicevendor=${info.phoneManufacturer}&devicefamily=unknown&devicemodel=${info.phoneModel}&osversion=${info.systemVersion}&osname=Android&password=${password}`
                let res = await $http.post(url["login"], data);
                let lpsutgt = res.data.match(/<Value>(.+?)<\/Value>/)
                if (lpsutgt) {
                    let res2 = await $http.get(`https://uss.lenovomm.com/authen/1.2/st/get?lpsutgt=${lpsutgt[1]}&source=ios%3Alenovo%3Aclub%3A4.1.0&lang=zh-CN&realm=club.lenovo.com.cn`)
                    let lpsutgt2 = res2.data.match(/<Value>(.+?)<\/Value>/)
                    lpsutgt = lpsutgt2 ? lpsutgt2[1] : null
                }
                //预约游戏id
                result += "登陆成功！|| "
                console.log("login：" + lpsutgt)
                resolve(lpsutgt);
            } catch (err) {
                console.log(err.response);
                lpsutgt = null
                result += "登陆失败！ ||  "
            }
            resolve();
        });
    }

    function getsession(lpsutgt) {
        return new Promise(async (resolve) => {
            //  let json =""
            try {
                headers.Authorization = "Lenovosso " + lpsutgt
                headers["token"] = lpsutgt
                let s = aesEncrypto(`{"sessionid":"Lenovosso ${lpsutgt}","time":"${new Date().getTime()}"}`)
                url["session"] = url["session"] + `?s=${s}`
                let res3 = await $http.get(url["session"], {
                    headers
                })
                let json = {
                    lenovoid: res3.data.res.lenovoid,
                    sessionid: res3.data.res.sessionid,
                    token: res3.data.res.token
                }
                resolve(json)
            } catch (err) {
                console.log(err)
                console.log(decodeURI(err.response.data.res.error_CN))
                result += "获取token失败" + decodeURI(err.response.data.res.error_CN) + "\n"
            }
            resolve();
        });
    }

    function addsign(session) {
        return new Promise(async (resolve) => {
            try {
                headers.Authorization = "Lenovo " + session.sessionid
                headers["token"] = session.token
                headers["User-Agent"] = "Apache-HttpClient/UNAVAILABLE (java 1.5)"
                headers["Content-Type"] = "text/json"
                data = aesEncrypto(`{"uid":"${session.lenovoid}","imei":"${deviceid}","source":"0","sessionid":"Lenovo ${session.sessionid}","time":"${new Date().getTime()}"}`)
                let res = await $http.post(url["sign2"], data, {
                    headers
                })
                console.log(res.data)

                if (typeof(res.data) === "object" & res.data.status == 0) {
                    //  msg+=res.data.res.add_yb_tip
                    if (!res.data.res.success) {
                        result += "今天已经签到过啦！  "
                        console.log("今天已经签到过啦")
                    } else {
                        result += "签到成功||" + res.data.res.rewardTips.replace(/\\n/g," || ") + " || 连续签到" + res.data.res.continueCount + "天"
                        console.log("签到成功    " + res.data.res.rewardTips + "连续签到" + res.data.res.continueCount + "天")


                    }

                }
                //  console.log(res.data)
                // console.log(typeof(res.data)=="object"&&res.data.status==0)
            } catch (err) {
                //    console.log(err)
                //    console.log(decodeURI(err.response.data.res.error_CN))
                result += "签到失败" + decodeURI(err.response.data.res.error_CN)
            }
            resolve();
        });
    }

    function aesEncrypto(text) {
        key = CryptoJS.enc.Utf8.parse('nihao_liu#zh*9@7');
        iv = CryptoJS.enc.Utf8.parse('A*8@Stii_jin)*%6');
        var encrypto =  CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        return encrypto.ciphertext.toString()
    }

    async function lxyb() {
        console.log("任务开始")
        lpsutgt = await lxlogin()

        let session = await getsession(lpsutgt)
        if (session) {
            console.log(session)
            await addsign(session)
        }
        return result
    }
    lxyb().then(res => {
        console.log("联想自动签到", res)
        notify.sendNotify('联想自动签到',res)

    })
// module.exports=lxyb


})()
    .catch((e) => {
        $.logErr(e);
    })
    .finally(() => {
        $.done();
    });

// prettier-ignore
function Env(t,s){return new class{constructor(t,s){this.name=t,this.data=null,this.dataFile="box.dat",this.logs=[],this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}getScript(t){return new Promise(s=>{$.get({url:t},(t,e,i)=>s(i))})}runScript(t,s){return new Promise(e=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=s&&s.timeout?s.timeout:o;const[h,a]=i.split("@"),r={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":h,Accept:"*/*"}};$.post(r,(t,s,i)=>e(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),o=JSON.stringify(this.data);e?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(s,o):this.fs.writeFileSync(t,o)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return e;return o}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),o=e?this.getval(e):"";if(o)try{const t=JSON.parse(o);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(s),h=this.getval(i),a=i?"null"===h?null:h||"{}":"{}";try{const s=JSON.parse(a);this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i)}catch(s){const h={};this.lodash_set(h,o,t),e=this.setval(JSON.stringify(h),i)}}else e=$.setval(t,s);return e}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isLoon()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)))}post(t,s=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t));else if(this.isNode()){this.initGotEnv(t);const{url:e,...i}=t;this.got.post(e,i).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t))}}time(t){let s={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in s)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?s[e]:("00"+s[e]).substr((""+s[e]).length)));return t}msg(s=t,e="",i="",o){const h=t=>!t||!this.isLoon()&&this.isSurge()?t:"string"==typeof t?this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0:"object"==typeof t&&(t["open-url"]||t["media-url"])?this.isLoon()?t["open-url"]:this.isQuanX()?t:void 0:void 0;$.isMute||(this.isSurge()||this.isLoon()?$notification.post(s,e,i,h(o)):this.isQuanX()&&$notify(s,e,i,h(o))),this.logs.push("","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="),this.logs.push(s),e&&this.logs.push(e),i&&this.logs.push(i)}log(...t){t.length>0?this.logs=[...this.logs,...t]:console.log(this.logs.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();e?$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t={}){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,s)}
