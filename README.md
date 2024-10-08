# daily_push——微信每日推送


## 效果参考

![img.png](readmeImg%2Fimg.png)

### 其他功能 
- linkAi平台自动签到（青龙面板环境变量添加linkAuth：linkAi平台的Auth请求头，或者添加如下的linkInfo） 
```json
{
"username":"linkAi账号名",
"password":"linkAi账号密码"
}
```
- 放假的最后一天发送邮件(仅支持2024年)，青龙面板需要安装nodemailer依赖，并且添加CHECKDATA环境变量，多个邮箱以英文的;分割，最后一个邮箱不需要加“;”，需要严格按照下面的json格式添加环境变量
```json
{
"user":"xxxxx@qq.com",
"password":"上面的邮箱授权码",
"emailString":"邮箱1@qq.com;邮箱2@qq.com"
}
``` 
- 联想延保每日签到  所需依赖：CryptoJS、axios，环境变量：lenovoInfo
```json
{
"account":"联想账号",
"password":"联想账号密码"
}
```
- 后续增加，敬请期待

## 获取各种参数的过程参考： 
https://www.coolapk.com/feed/38579891?shareKey=NGI3ZGZlZTM4MDBjNjMwMzdlM2M~&shareUid=3198334&shareFrom=com.coolapk.app_4.10

## 启动步骤：
```shell
npm i
node index.js
```
## 部署方式
1、可以部署到coding开启自动化构建，以达到每天定时发送消息的效果。参考：https://www.coolapk.com/feed/51238147?shareKey=Zjk0N2UwZTFjNjcwNjU3YThjNjg~&shareUid=1528711&shareFrom=com.coolapk.market_13.2.1  
2、可以使用GitHub Actions以达到每日自动发送消息，默认发送时间为七点半。  
3、青龙面板部署
```text
拉库命令：ql repo https://github.com/lengsukq/daily_push.git "ql-" "" "index.js"
--拉库完成后，需要在青龙面板-脚本管理lengsukq——daily_push文件夹中添加configs.json文件并配置好
--青龙面板-依赖管理-创建依赖 分别添加 axios、dayjs、solarlunar 三个nodejs的依赖，安装完成后即可运行
--不添加congfigs.json文件，可以选择添加环境变量：daliyPushConfigs，内容跟json文件一样即可
```
---
***需要在根目录添加configs.json 文件***  

configs.json配置说明：
```text
{
"location": "滨江区", // 输入地区
"adm": "杭州市",  // 选填,城市的上级行政区划，可设定只在某个行政区划范围内进行搜索，用于排除重名城市或对结果进行过滤   
"weatherIndex": "1", //天气指数，具体查看https://dev.qweather.com/docs/resource/indices-info/
"fullInLoveDate": "2000-01-01", // 纪念日时间
"name": "1",   // 推送用户1
"name2": "2",   // 推送用户2
"birthday": "2000-01-01", // 推送用户1的生日 只支持输入农历
"birthday2": "2000-01-01",// 推送用户2的生日 只支持输入农历
"key": "70add67deb8d8d33", // 和风天气Key获取，https://id.qweather.com/#/

// 以下数据获取：http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
"appId": "wxc56b9022",
"appSecret": "96b89bc360ae7315febfbbd",
"templateId": "OSoSPbyNdUIeVm3nV5pptiC8GrwCXzk",
"toUser": ["odW-45hi-ZH3o1rg9i5U","odW-45jDOf1pIwK0I"]
"oneType": "d", // 一言接口,详情https://developer.hitokoto.cn/sentence/
}

```
***微信公众号模板消息：***
```text
日期：{{date.DATA}}
一言：{{oneWords.DATA}}{{oneWords2.DATA}}
地区：{{region.DATA}}
气温：{{temp.DATA}}
白昼：{{textDay.DATA}}
黑夜：{{textNight.DATA}}
今天是我们恋爱的第{{memorialDay.DATA}}天
距离{{name.DATA}}的生日还有{{birthdayDiff.DATA}}天
距离{{name2.DATA}}的生日还有{{birthdayDiff2.DATA}}天
今日建议：{{tip.DATA}}{{tip2.DATA}}
```
