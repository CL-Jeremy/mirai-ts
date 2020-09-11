"use strict";
/**
 * mirai-api-http 类，实现了 [mirai-appi-http](https://github.com/project-mirai/mirai-api-http) 文档中的所有请求
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log = __importStar(require("../utils/log"));
const message_1 = __importDefault(require("../message"));
// for upload image
const form_data_1 = __importDefault(require("form-data"));
const ws_1 = __importDefault(require("ws"));
// nested api url
const command_1 = require("./command");
const resp_1 = require("./resp");
// 处理状态码
const utils_1 = require("./utils");
class MiraiApiHttp {
    constructor(config, axios) {
        this.config = config;
        this.axios = axios;
        this.sessionKey = "";
        this.qq = 0;
        this.verified = false;
        if (this.config.enableWebsocket) {
            this.address = `ws://${this.config.host}:${this.config.port}`;
        }
        else {
            this.address = `http://${this.config.host}:${this.config.port}`;
        }
        this.command = new command_1.Command(this);
        this.resp = new resp_1.Resp(this);
    }
    /**
     * 拦截 mirai 错误信息
     */
    handleStatusCode() {
        return __awaiter(this, void 0, void 0, function* () {
            this.axios.interceptors.response.use((res) => __awaiter(this, void 0, void 0, function* () {
                if (res.status === 200 && res.data.code) {
                    const message = utils_1.handleStatusCode(res.data.code);
                    if (message) {
                        log.error(`Code ${res.data.code}: ${message}`);
                        if (res.data.code === 3) {
                            log.warning("正在尝试重新建立连接...");
                            yield this.auth();
                            yield this.verify(this.qq);
                        }
                    }
                }
                return res;
            }), (err) => {
                log.error("响应失败");
                return Promise.reject(err);
            });
        });
    }
    /**
     * 使用此方法获取插件的信息，如版本号
     * data.data: { "version": "v1.0.0" }
     */
    about() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/about");
            return data;
        });
    }
    /**
     * 使用此方法验证你的身份，并返回一个会话
     */
    auth(authKey = this.config.authKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/auth", {
                authKey,
            });
            if (data.code === 0) {
                this.sessionKey = data.session;
            }
            return data;
        });
    }
    /**
     * 使用此方法校验并激活你的Session，同时将Session与一个已登录的Bot绑定
     */
    verify(qq) {
        return __awaiter(this, void 0, void 0, function* () {
            this.qq = qq;
            const { data } = yield this.axios.post("/verify", {
                sessionKey: this.sessionKey,
                qq,
            });
            this.verified = data.code === 0;
            return data;
        });
    }
    /**
     * 使用此方式释放 session 及其相关资源（Bot不会被释放） 不使用的 Session 应当被释放，长时间（30分钟）未使用的 Session 将自动释放。
     * 否则 Session 持续保存Bot收到的消息，将会导致内存泄露(开启websocket后将不会自动释放)
     */
    release(qq = this.qq) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/release", {
                sessionKey: this.sessionKey,
                qq,
            });
            if (data.code === 0) {
                this.verified = false;
            }
            return data;
        });
    }
    // 获取 Bot 收到的消息和事件
    /**
     * 使用此方法获取 bot 接收到的最老消息和最老各类事件(会从 MiraiApiHttp 消息记录中删除)
     * { code: 0, data: [] }
     * @param count 获取消息和事件的数量
     */
    fetchMessage(count = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/fetchMessage", {
                params: {
                    sessionKey: this.sessionKey,
                    count,
                },
            });
            return data;
        });
    }
    /**
     * 使用此方法获取bot接收到的最新消息和最新各类事件(会从MiraiApiHttp消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    fetchLatestMessage(count = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/fetchLatestMessage", {
                params: {
                    sessionKey: this.sessionKey,
                    count,
                },
            });
            return data;
        });
    }
    /**
     * 使用此方法获取bot接收到的最老消息和最老各类事件(不会从MiraiApiHttp消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    peekMessage(count = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/peekMessage", {
                params: {
                    sessionKey: this.sessionKey,
                    count,
                },
            });
            return data;
        });
    }
    /**
     * 使用此方法获取bot接收到的最老消息和最老各类事件(不会从MiraiApiHttp消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    peekLatestMessage(count = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/peekLatestMessage", {
                params: {
                    sessionKey: this.sessionKey,
                    count,
                },
            });
            return data;
        });
    }
    /**
     * 通过 messageId 获取一条被缓存的消息
     * @param id 获取消息的messageId
     */
    messageFromId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/messageFromId", {
                params: {
                    sessionKey: this.sessionKey,
                    id,
                },
            });
            if (data.code === 0) {
                return data.data;
            }
            else {
                return data;
            }
        });
    }
    /**
     * 使用此方法向指定好友发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标好友的 QQ 号
     * @param quote 引用一条消息的messageId进行回复
     * @returns { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    sendFriendMessage(messageChain, target, quote) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof messageChain === "string") {
                messageChain = [message_1.default.Plain(messageChain)];
            }
            const payload = {
                sessionKey: this.sessionKey,
                target,
                messageChain,
            };
            if (quote) {
                payload.quote = quote;
            }
            const { data } = yield this.axios.post("/sendFriendMessage", payload);
            return data;
        });
    }
    /**
     * 使用此方法向指定群发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标群的群号
     * @param quote 引用一条消息的messageId进行回复
     * @return { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    sendGroupMessage(messageChain, target, quote) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof messageChain === "string") {
                messageChain = [message_1.default.Plain(messageChain)];
            }
            const payload = {
                sessionKey: this.sessionKey,
                target,
                messageChain,
            };
            if (quote) {
                payload.quote = quote;
            }
            const { data } = yield this.axios.post("/sendGroupMessage", payload);
            return data;
        });
    }
    /**
     * 发送临时会话消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param qq 临时会话对象QQ号
     * @param group 临时会话群号
     * @param quote 引用一条消息的messageId进行回复
     */
    sendTempMessage(messageChain, qq, group, quote) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof messageChain === "string") {
                messageChain = [message_1.default.Plain(messageChain)];
            }
            const payload = {
                sessionKey: this.sessionKey,
                qq,
                group,
                messageChain,
            };
            if (quote) {
                payload.quote = quote;
            }
            const { data } = yield this.axios.post("/sendTempMessage", payload);
            return data;
        });
    }
    /**
     * 使用此方法向指定对象（群或好友）发送图片消息 除非需要通过此手段获取imageId，否则不推荐使用该接口
     * @param urls 是一个url字符串构成的数组
     * @param target 发送对象的QQ号或群号，可能存在歧义
     * @param qq 发送对象的QQ号
     * @param group 发送对象的群号
     */
    sendImageMessage(urls, target, qq, group) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/sendImageMessage", {
                sessionKey: this.sessionKey,
                target,
                qq,
                group,
                urls,
            });
            return data;
        });
    }
    /**
     * 使用此方法上传图片文件至服务器并返回 ImageId
     * @param type
     * @param img 图片文件
     */
    uploadImage(type, img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof img === "string") {
                const fs = require("fs");
                img = fs.createReadStream(img);
            }
            const form = new form_data_1.default();
            form.append("sessionKey", this.sessionKey);
            form.append("type", type);
            form.append("img", img);
            const { data } = yield this.axios.post("/uploadImage", form, {
                headers: form.getHeaders(),
            });
            return data;
        });
    }
    /**
     * 使用此方法上传语音文件至服务器并返回 VoiceId
     * @param type 当前仅支持 "group"
     * @param voice 语音文件
     */
    uploadVoice(type, voice) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof voice === "string") {
                const fs = require("fs");
                voice = fs.createReadStream(voice);
            }
            const form = new form_data_1.default();
            form.append("sessionKey", this.sessionKey);
            form.append("type", type);
            form.append("voice", voice);
            const { data } = yield this.axios.post("/uploadVoice", form, {
                headers: form.getHeaders(),
            });
            return data;
        });
    }
    /**
     * 撤回消息
     * 使用此方法撤回指定消息。对于bot发送的消息，有2分钟时间限制。对于撤回群聊中群员的消息，需要有相应权限
     * @param target 需要撤回的消息的messageId
     */
    recall(target) {
        return __awaiter(this, void 0, void 0, function* () {
            let messageId = target;
            if (typeof target !== "number" && target.messageChain[0].id) {
                messageId = target.messageChain[0].id;
            }
            const { data } = yield this.axios.post("/recall", {
                sessionKey: this.sessionKey,
                target: messageId,
            });
            return data;
        });
    }
    /**
     * 获取 bot 的好友列表
     */
    friendList() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/friendList", {
                params: {
                    sessionKey: this.sessionKey,
                },
            });
            return data;
        });
    }
    /**
     * 获取 bot 的群列表
     */
    groupList() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/groupList", {
                params: {
                    sessionKey: this.sessionKey,
                },
            });
            return data;
        });
    }
    /**
     * 获取 BOT 的群成员列表
     * @param target 指定群的群号
     */
    memberList(target) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/memberList", {
                params: {
                    sessionKey: this.sessionKey,
                    target,
                },
            });
            return data;
        });
    }
    /**
     * 指定群进行全体禁言
     * @param target 指定群的群号
     */
    muteAll(target) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/muteAll", {
                sessionKey: this.sessionKey,
                target,
            });
            return data;
        });
    }
    /**
     * 指定群解除全体禁言
     * @param target 指定群的群号
     */
    unmuteAll(target) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/unmuteAll", {
                sessionKey: this.sessionKey,
                target,
            });
            return data;
        });
    }
    /**
     * 指定群禁言指定群员
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     * @param time 禁言时长，单位为秒，最多30天，默认为 60 秒
     */
    mute(target, memberId, time = 60) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/mute", {
                sessionKey: this.sessionKey,
                target,
                memberId,
                time,
            });
            return data;
        });
    }
    /**
     * 指定群解除群成员禁言
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     */
    unmute(target, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/unmute", {
                sessionKey: this.sessionKey,
                target,
                memberId,
            });
            return data;
        });
    }
    /**
     * 移除群成员
     * @param target 指定群的群号
     * @param memberId 指定群员QQ号
     * @param msg 信息
     */
    kick(target, memberId, msg = "您已被移出群聊") {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/kick", {
                sessionKey: this.sessionKey,
                target,
                memberId,
                msg,
            });
            return data;
        });
    }
    /**
     * 退出群聊
     * @param target 群号
     * bot为该群群主时退出失败并返回code 10(无操作权限)
     */
    quit(target) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post("/quit", {
                sessionKey: this.sessionKey,
                target,
            });
            return data;
        });
    }
    /**
     * 传入 config 时，修改群设置
     * 未传入 config 时，获取群设置
     * @param target 指定群的群号
     * @param config 群设置
     */
    groupConfig(target, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config) {
                const { data } = yield this.axios.post("/groupConfig", {
                    sessionKey: this.sessionKey,
                    target,
                    config,
                });
                return data;
            }
            else {
                const { data } = yield this.axios.get("/groupConfig", {
                    params: {
                        target,
                    },
                });
                return data;
            }
        });
    }
    /**
     * 传入 info 时，修改群员资料
     * 未传入 info 时，获取群员资料
     * @param targer 指定群的群号
     * @param memberId 群员QQ号
     * @param info 群员资料
     */
    memberInfo(target, memberId, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (info) {
                const { data } = yield this.axios.post("/groupConfig", {
                    sessionKey: this.sessionKey,
                    target,
                    memberId,
                    info,
                });
                return data;
            }
            else {
                const { data } = yield this.axios.get("/groupConfig", {
                    params: {
                        target,
                        memberId,
                    },
                });
                return data;
            }
        });
    }
    // Websocket
    /**
     * 监听该接口，插件将推送 Bot 收到的消息
     * @param callback 回调函数
     */
    message(callback) {
        log.info(`监听消息: ${this.address}`);
        const ws = new ws_1.default(this.address + "/message?sessionKey=" + this.sessionKey);
        ws.on("message", (data) => {
            const msg = JSON.parse(data.toString());
            callback(msg);
        });
    }
    /**
     * 监听该接口，插件将推送 Bot 收到的事件
     * @param callback 回调函数
     */
    event(callback) {
        log.info(`监听事件: ${this.address}`);
        const ws = new ws_1.default(this.address + "/event?sessionKey=" + this.sessionKey);
        ws.on("message", (data) => {
            const msg = JSON.parse(data.toString());
            callback(msg);
        });
    }
    /**
     * 监听该接口，插件将推送 Bot 收到的消息和事件
     * @param callback 回调函数
     */
    all(callback) {
        log.info(`监听消息和事件: ${this.address}`);
        const ws = new ws_1.default(this.address + "/all?sessionKey=" + this.sessionKey);
        ws.on("message", (data) => {
            const msg = JSON.parse(data.toString());
            callback(msg);
        });
    }
    // 配置相关
    /**
     * 获取 Mangers
     */
    managers() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get("/managers", {
                params: {
                    qq: this.qq,
                },
            });
            return data;
        });
    }
}
exports.default = MiraiApiHttp;
