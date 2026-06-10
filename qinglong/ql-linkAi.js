/**
 * cron: 0 7 * * *
 *
 * linkAi平台自动签到
 *
 * 环境变量定义:
 *  - foo: 其含义
 *  - bar: 其含义
 */
const $ = new Env('linkAi平台自动签到');
const axios = require("axios");
const notify = require("./sendNotify");
const FormData = require('form-data');
// 读取环境变量: process.env[ENV]
// 读取存储文件: const data = $.getdata($.name) || {};
// 写入存储文件: $.setdata(data, $.name);
let msg;
// 登录获取token
async function login(username, password) {
    console.log('开始登录', username,password)
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
        const response = await axios.post('https://link-ai.tech/api/login', formData);
        // 处理响应数据
        // console.log('linkAi登录', response.data);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('登录失败:', error);
    }

}
async function getScore(linkAuth) {
    console.log('传入的linkAuth',linkAuth)
    await axios.get('https://link-ai.tech/api/chat/web/app/user/sign/in', {
        headers: {
            'Authorization': `Bearer ${linkAuth}`
        }
    })
        .then(async (res) => {
            //这里获得整个请求响应对象
            console.log('res', res.data);
            if (res.data.success) {
                msg=`签到成功，获得积分${res.data.data.score}`
                console.log(msg)

            } else {
                msg=res.data.message;
                console.log(msg)

            }
        })
        .catch(function (error) {
            msg=error;

            console.log('error',error);
        })
        .then(function () {
        });
}
!(async () => {

    // 代码开始
    try {
        const linkAuth = process.env.linkAuth;
        const linkInfo = JSON.parse(process.env.linkInfo);
        if (!linkAuth) {
            console.log('未设置linkAuth')
            if (linkInfo){
                console.log('手动获取token')
                const res = await login(linkInfo.username ,linkInfo.password)
                // console.log('res',res.data)
                await getScore(res.data.token)
            }
        } else {
            await getScore(linkAuth)
        }


    } catch (error) {
        console.log('linkAuth是否有效')
        msg = "linkAuth是否有效"
    }
    await notify.sendNotify('linkAi平台自动签到', msg)

})()
    .catch((e) => {
        $.logErr(e);
    })
    .finally(() => {
        $.done();
    });

// prettier-ignore
function Env(t, s) {
    return new class {
        constructor(t, s) {
            this.name = t, this.data = null, this.dataFile = "box.dat", this.logs = [], this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, s), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        getScript(t) {
            return new Promise(s => {
                $.get({url: t}, (t, e, i) => s(i))
            })
        }

        runScript(t, s) {
            return new Promise(e => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                o = o ? 1 * o : 20, o = s && s.timeout ? s.timeout : o;
                const [h, a] = i.split("@"), r = {
                    url: `http://${a}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: o},
                    headers: {"X-Key": h, Accept: "*/*"}
                };
                $.post(r, (t, s, i) => e(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), s = this.path.resolve(process.cwd(), this.dataFile),
                    e = this.fs.existsSync(t), i = !e && this.fs.existsSync(s);
                if (!e && !i) return {};
                {
                    const i = e ? t : s;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), s = this.path.resolve(process.cwd(), this.dataFile),
                    e = this.fs.existsSync(t), i = !e && this.fs.existsSync(s), o = JSON.stringify(this.data);
                e ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(s, o) : this.fs.writeFileSync(t, o)
            }
        }

        lodash_get(t, s, e) {
            const i = s.replace(/\[(\d+)\]/g, ".$1").split(".");
            let o = t;
            for (const t of i) if (o = Object(o)[t], void 0 === o) return e;
            return o
        }

        lodash_set(t, s, e) {
            return Object(t) !== t ? t : (Array.isArray(s) || (s = s.toString().match(/[^.[\]]+/g) || []), s.slice(0, -1).reduce((t, e, i) => Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(s[i + 1]) >> 0 == +s[i + 1] ? [] : {}, t)[s[s.length - 1]] = e, t)
        }

        getdata(t) {
            let s = this.getval(t);
            if (/^@/.test(t)) {
                const [, e, i] = /^@(.*?)\.(.*?)$/.exec(t), o = e ? this.getval(e) : "";
                if (o) try {
                    const t = JSON.parse(o);
                    s = t ? this.lodash_get(t, i, "") : s
                } catch (t) {
                    s = ""
                }
            }
            return s
        }

        setdata(t, s) {
            let e = !1;
            if (/^@/.test(s)) {
                const [, i, o] = /^@(.*?)\.(.*?)$/.exec(s), h = this.getval(i),
                    a = i ? "null" === h ? null : h || "{}" : "{}";
                try {
                    const s = JSON.parse(a);
                    this.lodash_set(s, o, t), e = this.setval(JSON.stringify(s), i)
                } catch (s) {
                    const h = {};
                    this.lodash_set(h, o, t), e = this.setval(JSON.stringify(h), i)
                }
            } else e = $.setval(t, s);
            return e
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, s) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, s) : this.isQuanX() ? $prefs.setValueForKey(t, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = t, this.writedata(), !0) : this.data && this.data[s] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, s = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? $httpClient.get(t, (t, e, i) => {
                !t && e && (e.body = i, e.statusCode = e.status), s(t, e, i)
            }) : this.isQuanX() ? $task.fetch(t).then(t => {
                const {statusCode: e, statusCode: i, headers: o, body: h} = t;
                s(null, {status: e, statusCode: i, headers: o, body: h}, h)
            }, t => s(t)) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, s) => {
                try {
                    const e = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                    this.ckjar.setCookieSync(e, null), s.cookieJar = this.ckjar
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: e, statusCode: i, headers: o, body: h} = t;
                s(null, {status: e, statusCode: i, headers: o, body: h}, h)
            }, t => s(t)))
        }

        post(t, s = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) $httpClient.post(t, (t, e, i) => {
                !t && e && (e.body = i, e.statusCode = e.status), s(t, e, i)
            }); else if (this.isQuanX()) t.method = "POST", $task.fetch(t).then(t => {
                const {statusCode: e, statusCode: i, headers: o, body: h} = t;
                s(null, {status: e, statusCode: i, headers: o, body: h}, h)
            }, t => s(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: e, ...i} = t;
                this.got.post(e, i).then(t => {
                    const {statusCode: e, statusCode: i, headers: o, body: h} = t;
                    s(null, {status: e, statusCode: i, headers: o, body: h}, h)
                }, t => s(t))
            }
        }

        time(t) {
            let s = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in s) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? s[e] : ("00" + s[e]).substr(("" + s[e]).length)));
            return t
        }

        msg(s = t, e = "", i = "", o) {
            const h = t => !t || !this.isLoon() && this.isSurge() ? t : "string" == typeof t ? this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : void 0 : "object" == typeof t && (t["open-url"] || t["media-url"]) ? this.isLoon() ? t["open-url"] : this.isQuanX() ? t : void 0 : void 0;
            $.isMute || (this.isSurge() || this.isLoon() ? $notification.post(s, e, i, h(o)) : this.isQuanX() && $notify(s, e, i, h(o))), this.logs.push("", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="), this.logs.push(s), e && this.logs.push(e), i && this.logs.push(i)
        }

        log(...t) {
            t.length > 0 ? this.logs = [...this.logs, ...t] : console.log(this.logs.join(this.logSeparator))
        }

        logErr(t, s) {
            const e = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            e ? $.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : $.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }

        wait(t) {
            return new Promise(s => setTimeout(s, t))
        }

        done(t = {}) {
            const s = (new Date).getTime(), e = (s - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, s)
}
