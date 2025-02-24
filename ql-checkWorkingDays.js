/**
 * cron: 0 13 * * *
 *
 * 最后一天工作日发送邮件
 *
 * 环境变量定义:
 *  - foo: 其含义
 *  - bar: 其含义
 */
const $ = new Env('最后一天工作日发送邮件');
const axios = require("axios");
const notify = require("./sendNotify");
// 读取环境变量: process.env[ENV]
// 读取存储文件: const data = $.getdata($.name) || {};
// 写入存储文件: $.setdata(data, $.name);

!(async () => {
    let msg = '今天不是最后一天的工作日';

    // 代码开始
    try {
        function getTodayDate() {
            let today = new Date();
            let year = today.getFullYear();
            let month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始计数，所以加1
            let day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        const CHECKDATA = JSON.parse(process.env.CHECKDATA)

        function checkWorkingDays(inputDate) {
            // 定义假期和特殊工作日
            const holidays = [
                '2025-01-01', '2025-01-26', '2025-02-08', '2025-04-04', '2025-04-05',
                '2025-05-01', '2025-05-02', '2025-05-03', '2025-06-02', '2025-09-28',
                '2025-10-01', '2025-10-02', '2025-10-03', '2025-10-04', '2025-10-05',
                '2025-10-06', '2025-10-07',
            ];

            const workingDays = [
                '2025-01-26', '2025-02-08', '2025-04-27', '2025-05-31', '2025-10-11',
            ];

            // 检查指定日期是否为工作日
            function isWorkDay(date) {
                const dayOfWeek = date.getDay();
                const dateFormat = date.toISOString().split('T')[0];

                if (holidays.includes(dateFormat)) {
                    return false; // 特殊假期
                } else if (workingDays.includes(dateFormat)) {
                    return true; // 调休工作日
                }

                return dayOfWeek !== 0 && dayOfWeek !== 6; // 周一至周五为工作日
            }

            // 创建 Date 实例
            const date = new Date(inputDate);

            // 判断输入的日期是否为工作日
            const isInputDayWorkDay = isWorkDay(date);

            // 获取第二天的日期
            date.setDate(date.getDate() + 1);
            const isNextDayWorkDay = isWorkDay(date);

            return {
                inputDay: isInputDayWorkDay,
                nextDay: isNextDayWorkDay,
                nextDate: date.toISOString().split('T')[0],
                isLastWorkingDay: isInputDayWorkDay && !isNextDayWorkDay
            };
        }

// 使用方式示例:
        const input = '' || getTodayDate(); // 假设的输入日期，格式为 yyyy-mm-dd
        const result = checkWorkingDays(input);
        let resultText = `${input}${result.inputDay ? '是工作日' : '不是工作日'}，且第二天${result.nextDate}${result.nextDay ? '是工作日' : '不是工作日'}。是不是最后的工作日：${result.isLastWorkingDay}。`;

        console.log(resultText);

        if (result.isLastWorkingDay) {
            msg = '今天是最后一个工作日，发送邮件通知';
            console.log('今天是最后一个工作日，发送邮件通知');
            const nodemailer = require('nodemailer');
            // 创建一个SMTP传输器
            const transporter = nodemailer.createTransport({
                host: 'smtp.qq.com', // QQ邮箱的SMTP服务器地址
                port: 465, // 通常SMTP服务器使用的端口是465（SSL）或587（TLS）
                secure: true, // 如果端口是465，则设置为true
                auth: {
                    user: CHECKDATA.user, // 你的邮箱地址
                    pass: CHECKDATA.password // 你的邮箱密码或授权码
                }
            });
            // 假设你有一个包含多个邮箱地址的字符串，用分号分隔
            const emailString = CHECKDATA.emailString;
            // 使用分号将字符串分割成数组
            const emailAddresses = emailString.split(';');

            // 设置邮件选项
            let mailOptions = {
                from: CHECKDATA.user, // 发件人邮箱地址
                to: emailAddresses, // 收件人邮箱地址
                subject: '日期预报', // 邮件主题
                text: resultText // 纯文本内容
            };

            // 发送邮件
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }


    } catch (error) {
        msg = "检查环境变量是否填写正确"
        console.log(msg)
        
    }
    await notify.sendNotify('最后一天工作日发送邮件', msg)

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
