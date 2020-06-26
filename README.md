# mirai-ts

mirai-api-http 的 TypeScript SDK，编译压缩为 JavaScript 发布。你也可以直接引用其中的 TypeScript。

## 如何使用

```sh
npm install mirai-ts
# yarn add mirai-ts
```

- [API 文档](https://www.yunyoujun.cn/mirai-ts/)

## 快速开始

```js
const Mirai = require('mirai-ts');

const mahConfig = {
  host: 'http://你的服务器地址' || 'http://localhost',
  port: 你的端口号 || 8080,
  authKey: 你的 authKey || "el-bot-js",
  // Todo
  enableWebsocket: false,
};

const mirai = new Mirai(mahConfig);

// 对收到的消息进行处理
// message 本质相当于同时绑定了 FriendMessage GroupMessage TempMessage
mirai.on("message", (msg) => {
  console.log("on message");
  console.log(msg);
  // 复读
  msg.reply(msg.messageChain);
});

// 调用 mirai-ts 封装的 mirai-api-http 发送指令
console.log("send command help");
// 注意这里使用 await，所以你需要在外围函数加上 async
// 这里只是简单示例，所以没有放在函数里。
const data = await mirai.api.command.send("help", []);
console.log("info:" + data);

// 处理各种事件类型
// 事件订阅说明（名称均与 mirai-api-http 中时间名一致）
// https://github.com/RedBeanN/node-mirai/blob/master/event.md
console.log("on other event");
mirai.on('BotMuteEvent', ({ operator }) => console.log(`我被${operator.memberName}禁言啦！`));

// 开始监听
mirai.listen()
// 传入参数可以设置轮训间隔的 ms，譬如：
// mirai.listen(500)
```

## 示例模版

- [el-bot-js](https://github.com/ElpsyCN/el-bot-js/)：你可以参考它的使用方式，你也可以直接使用它。

EBJ 展示了整个 mirai-ts 的使用流程，并内置了一些如自动应答、转发、命令行、RSS 等常用功能（默认插件），开箱即用。

你只需要一些自定义的配置，而不再需要编写繁琐的脚本内容。

但这并不是束缚，在插件系统中你仍然可以调用机器人所有的上下文，并通过编写插件的形式快速实现你想要的功能。

> 更多请参见文档 [el-bot-js | El Bot Docs](https://docs.bot.elpsy.cn/js/)

## Why Typescript & mirai-ts?

- 更友好的控制台消息错误提示
- 更清晰的语义
- 更易懂的注释
- 更优雅的结构
