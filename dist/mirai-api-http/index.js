"use strict";
/**
 * mirai-api-http 类，实现了 [mirai-appi-http](https://github.com/project-mirai/mirai-api-http) 文档中的所有请求
 * @packageDocumentation
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var form_data_1 = __importDefault(require("form-data"));
var ws_1 = __importDefault(require("ws"));
// nested api url
var command_1 = require("./command");
var resp_1 = require("./resp");
// 处理状态码
var utils_1 = require("./utils");
var logger_1 = __importDefault(require("@yunyoujun/logger"));
var chalk_1 = __importDefault(require("chalk"));
// utils
var message_1 = require("./message");
var MiraiApiHttp = /** @class */ (function () {
    function MiraiApiHttp(config, axios) {
        this.config = config;
        this.axios = axios;
        this.sessionKey = "";
        this.qq = 0;
        this.verified = false;
        if (this.config.enableWebsocket) {
            this.address =
                this.config.url || "ws://" + this.config.host + ":" + this.config.port;
        }
        else {
            this.address =
                this.config.url || "http://" + this.config.host + ":" + this.config.port;
        }
        this.command = new command_1.Command(this);
        this.resp = new resp_1.Resp(this);
        this.logger = new logger_1.default({ prefix: chalk_1.default.cyan("[mirai-api-http]") });
    }
    /**
     * 拦截 mirai 错误信息
     */
    MiraiApiHttp.prototype.handleStatusCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.axios.interceptors.response.use(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var message;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(res.status === 200 && res.data.code)) return [3 /*break*/, 3];
                                message = utils_1.getMessageFromStatusCode(res.data.code);
                                if (!message) return [3 /*break*/, 3];
                                this.logger.error("Code " + res.data.code + ": " + message);
                                if (!(res.data.code === 3 || res.data.code === 4)) return [3 /*break*/, 3];
                                this.logger.warning("正在尝试重新建立连接...");
                                return [4 /*yield*/, this.auth()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.verify(this.qq)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/, res];
                        }
                    });
                }); }, function (err) {
                    _this.logger.error("\u54CD\u5E94\u5931\u8D25\uFF1A" + err.message);
                    if (process.env.NODE_ENV !== "production") {
                        console.error(err);
                    }
                    return Promise.reject(err);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 使用此方法获取插件的信息，如版本号
     * data.data: { "version": "v1.0.0" }
     */
    MiraiApiHttp.prototype.about = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/about")];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法验证你的身份，并返回一个会话
     */
    MiraiApiHttp.prototype.auth = function (authKey) {
        if (authKey === void 0) { authKey = this.config.authKey; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/auth", {
                            authKey: authKey,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        if (data.code === 0) {
                            this.sessionKey = data.session;
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法校验并激活你的Session，同时将Session与一个已登录的Bot绑定
     */
    MiraiApiHttp.prototype.verify = function (qq) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.qq = qq;
                        return [4 /*yield*/, this.axios.post("/verify", {
                                sessionKey: this.sessionKey,
                                qq: qq,
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        this.verified = data.code === 0;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方式释放 session 及其相关资源（Bot不会被释放） 不使用的 Session 应当被释放，长时间（30分钟）未使用的 Session 将自动释放。
     * 否则 Session 持续保存Bot收到的消息，将会导致内存泄露(开启websocket后将不会自动释放)
     */
    MiraiApiHttp.prototype.release = function (qq) {
        if (qq === void 0) { qq = this.qq; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/release", {
                            sessionKey: this.sessionKey,
                            qq: qq,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        if (data.code === 0) {
                            this.verified = false;
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // 获取 Bot 收到的消息和事件
    /**
     * 使用此方法获取 bot 接收到的最老消息和最老各类事件(会从 MiraiApiHttp 消息记录中删除)
     * { code: 0, data: [] }
     * @param count 获取消息和事件的数量
     */
    MiraiApiHttp.prototype.fetchMessage = function (count) {
        if (count === void 0) { count = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/fetchMessage", {
                            params: {
                                sessionKey: this.sessionKey,
                                count: count,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法获取 bot 接收到的最新消息和最新各类事件(会从 MiraiApiHttp 消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    MiraiApiHttp.prototype.fetchLatestMessage = function (count) {
        if (count === void 0) { count = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/fetchLatestMessage", {
                            params: {
                                sessionKey: this.sessionKey,
                                count: count,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法获取 bot 接收到的最老消息和最老各类事件(不会从 MiraiApiHttp 消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    MiraiApiHttp.prototype.peekMessage = function (count) {
        if (count === void 0) { count = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/peekMessage", {
                            params: {
                                sessionKey: this.sessionKey,
                                count: count,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法获取 bot 接收到的最老消息和最老各类事件(不会从 MiraiApiHttp 消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    MiraiApiHttp.prototype.peekLatestMessage = function (count) {
        if (count === void 0) { count = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/peekLatestMessage", {
                            params: {
                                sessionKey: this.sessionKey,
                                count: count,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 通过 messageId 获取一条被缓存的消息
     * @param id 获取消息的messageId
     */
    MiraiApiHttp.prototype.messageFromId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/messageFromId", {
                            params: {
                                sessionKey: this.sessionKey,
                                id: id,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        if (data.code === 0) {
                            return [2 /*return*/, data.data];
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 使用此方法向指定好友发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标好友的 QQ 号
     * @param quote 引用一条消息的messageId进行回复
     * @returns { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    MiraiApiHttp.prototype.sendFriendMessage = function (messageChain, target, quote) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageChain = message_1.toMessageChain(messageChain);
                        payload = {
                            sessionKey: this.sessionKey,
                            target: target,
                            messageChain: messageChain,
                        };
                        if (quote) {
                            payload.quote = quote;
                        }
                        return [4 /*yield*/, this.axios.post("/sendFriendMessage", payload)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法向指定群发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标群的群号
     * @param quote 引用一条消息的messageId进行回复
     * @return { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    MiraiApiHttp.prototype.sendGroupMessage = function (messageChain, target, quote) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageChain = message_1.toMessageChain(messageChain);
                        payload = {
                            sessionKey: this.sessionKey,
                            target: target,
                            messageChain: messageChain,
                        };
                        if (quote) {
                            payload.quote = quote;
                        }
                        return [4 /*yield*/, this.axios.post("/sendGroupMessage", payload)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 发送临时会话消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param qq 临时会话对象QQ号
     * @param group 临时会话群号
     * @param quote 引用一条消息的messageId进行回复
     */
    MiraiApiHttp.prototype.sendTempMessage = function (messageChain, qq, group, quote) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageChain = message_1.toMessageChain(messageChain);
                        payload = {
                            sessionKey: this.sessionKey,
                            qq: qq,
                            group: group,
                            messageChain: messageChain,
                        };
                        if (quote) {
                            payload.quote = quote;
                        }
                        return [4 /*yield*/, this.axios.post("/sendTempMessage", payload)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法向指定对象（群或好友）发送图片消息 除非需要通过此手段获取imageId，否则不推荐使用该接口
     * @param urls 是一个url字符串构成的数组
     * @param target 发送对象的QQ号或群号，可能存在歧义
     * @param qq 发送对象的QQ号
     * @param group 发送对象的群号
     */
    MiraiApiHttp.prototype.sendImageMessage = function (urls, target, qq, group) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/sendImageMessage", {
                            sessionKey: this.sessionKey,
                            target: target,
                            qq: qq,
                            group: group,
                            urls: urls,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法上传图片文件至服务器并返回 ImageId
     * @param type
     * @param img 图片文件 fs.createReadStream(img)
     */
    MiraiApiHttp.prototype.uploadImage = function (type, img) {
        return __awaiter(this, void 0, void 0, function () {
            var form, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = new form_data_1.default();
                        form.append("sessionKey", this.sessionKey);
                        form.append("type", type);
                        form.append("img", img);
                        return [4 /*yield*/, this.axios.post("/uploadImage", form, {
                                headers: form.getHeaders(), // same as post: { 'Content-Type': 'multipart/form-data' }
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法上传语音文件至服务器并返回 VoiceId
     * @param type 当前仅支持 "group"
     * @param voice 语音文件 fs.createReadStream(voice)
     */
    MiraiApiHttp.prototype.uploadVoice = function (type, voice) {
        return __awaiter(this, void 0, void 0, function () {
            var form, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = new form_data_1.default();
                        form.append("sessionKey", this.sessionKey);
                        form.append("type", type);
                        form.append("voice", voice);
                        return [4 /*yield*/, this.axios.post("/uploadVoice", form, {
                                headers: form.getHeaders(), // same as post: { 'Content-Type': 'multipart/form-data' }
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 使用此方法上传文件至群/好友并返回 FileId
     * @param type 当前仅支持 "group"
     * @param target 发送对象的QQ号或群号，当前仅支持群
     * @param path 文件上传目录与名字，例：folder/subfolder/file
     * @param file 目标文件 fs.createReadStream(file)
     */
    MiraiApiHttp.prototype.uploadFileAndSend = function (type, target, path, file) {
        return __awaiter(this, void 0, void 0, function () {
            var form, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = new form_data_1.default();
                        form.append("sessionKey", this.sessionKey);
                        form.append("type", type);
                        form.append("target", target);
                        form.append("path", path);
                        form.append("file", file);
                        return [4 /*yield*/, this.axios.post("/uploadFileAndSend", form, {
                                headers: form.getHeaders(), // same as post: { 'Content-Type': 'multipart/form-data' }
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 撤回消息
     * 使用此方法撤回指定消息。对于bot发送的消息，有2分钟时间限制。对于撤回群聊中群员的消息，需要有相应权限
     * @param target 需要撤回的消息的messageId
     */
    MiraiApiHttp.prototype.recall = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var messageId, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageId = target;
                        if (typeof target !== "number" && target.messageChain[0].id) {
                            messageId = target.messageChain[0].id;
                        }
                        return [4 /*yield*/, this.axios.post("/recall", {
                                sessionKey: this.sessionKey,
                                target: messageId,
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取 bot 的好友列表
     */
    MiraiApiHttp.prototype.friendList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/friendList", {
                            params: {
                                sessionKey: this.sessionKey,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取 bot 的群列表
     */
    MiraiApiHttp.prototype.groupList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/groupList", {
                            params: {
                                sessionKey: this.sessionKey,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取 BOT 的群成员列表
     * @param target 指定群的群号
     */
    MiraiApiHttp.prototype.memberList = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/memberList", {
                            params: {
                                sessionKey: this.sessionKey,
                                target: target,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 指定群进行全体禁言
     * @param target 指定群的群号
     */
    MiraiApiHttp.prototype.muteAll = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/muteAll", {
                            sessionKey: this.sessionKey,
                            target: target,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 指定群解除全体禁言
     * @param target 指定群的群号
     */
    MiraiApiHttp.prototype.unmuteAll = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/unmuteAll", {
                            sessionKey: this.sessionKey,
                            target: target,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 指定群禁言指定群员
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     * @param time 禁言时长，单位为秒，最多30天，默认为 60 秒
     */
    MiraiApiHttp.prototype.mute = function (target, memberId, time) {
        if (time === void 0) { time = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/mute", {
                            sessionKey: this.sessionKey,
                            target: target,
                            memberId: memberId,
                            time: time,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 指定群解除群成员禁言
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     */
    MiraiApiHttp.prototype.unmute = function (target, memberId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/unmute", {
                            sessionKey: this.sessionKey,
                            target: target,
                            memberId: memberId,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 移除群成员
     * @param target 指定群的群号
     * @param memberId 指定群员QQ号
     * @param msg 信息
     */
    MiraiApiHttp.prototype.kick = function (target, memberId, msg) {
        if (msg === void 0) { msg = "您已被移出群聊"; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/kick", {
                            sessionKey: this.sessionKey,
                            target: target,
                            memberId: memberId,
                            msg: msg,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 退出群聊
     * @param target 群号
     * bot为该群群主时退出失败并返回code 10(无操作权限)
     */
    MiraiApiHttp.prototype.quit = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/quit", {
                            sessionKey: this.sessionKey,
                            target: target,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 传入 config 时，修改群设置
     * 未传入 config 时，获取群设置
     * @param target 指定群的群号
     * @param config 群设置
     */
    MiraiApiHttp.prototype.groupConfig = function (target, config) {
        return __awaiter(this, void 0, void 0, function () {
            var data, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!config) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.axios.post("/groupConfig", {
                                sessionKey: this.sessionKey,
                                target: target,
                                config: config,
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 2: return [4 /*yield*/, this.axios.get("/groupConfig", {
                            params: {
                                sessionKey: this.sessionKey,
                                target: target,
                            },
                        })];
                    case 3:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 传入 info 时，修改群员资料
     * 未传入 info 时，获取群员资料
     * @param targer 指定群的群号
     * @param memberId 群员QQ号
     * @param info 群员资料
     */
    MiraiApiHttp.prototype.memberInfo = function (target, memberId, info) {
        return __awaiter(this, void 0, void 0, function () {
            var data, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!info) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.axios.post("/memberInfo", {
                                sessionKey: this.sessionKey,
                                target: target,
                                memberId: memberId,
                                info: info,
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 2: return [4 /*yield*/, this.axios.get("/memberInfo", {
                            params: {
                                sessionKey: this.sessionKey,
                                target: target,
                                memberId: memberId,
                            },
                        })];
                    case 3:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // Websocket
    /**
     * 监听该接口，插件将推送 Bot 收到的消息
     * @param callback 回调函数
     */
    MiraiApiHttp.prototype.message = function (callback) {
        this.logger.info("\u76D1\u542C\u6D88\u606F: " + this.address);
        var ws = new ws_1.default(this.address + "/message?sessionKey=" + this.sessionKey);
        ws.on("open", function () {
            var interval = setInterval(function () { return ws.ping(); }, 60000);
            ws.on("close", function () { return clearInterval(interval); });
        });
        ws.on("message", function (data) {
            var msg = JSON.parse(data.toString());
            callback(msg);
        });
    };
    /**
     * 监听该接口，插件将推送 Bot 收到的事件
     * @param callback 回调函数
     */
    MiraiApiHttp.prototype.event = function (callback) {
        this.logger.info("\u76D1\u542C\u4E8B\u4EF6: " + this.address);
        var ws = new ws_1.default(this.address + "/event?sessionKey=" + this.sessionKey);
        ws.on("open", function () {
            var interval = setInterval(function () { return ws.ping(); }, 60000);
            ws.on("close", function () { return clearInterval(interval); });
        });
        ws.on("message", function (data) {
            var msg = JSON.parse(data.toString());
            callback(msg);
        });
    };
    /**
     * 监听该接口，插件将推送 Bot 收到的消息和事件
     * @param callback 回调函数
     */
    MiraiApiHttp.prototype.all = function (callback) {
        this.logger.info("\u76D1\u542C\u6D88\u606F\u548C\u4E8B\u4EF6: " + this.address);
        var ws = new ws_1.default(this.address + "/all?sessionKey=" + this.sessionKey);
        ws.on("open", function () {
            var interval = setInterval(function () { return ws.ping(); }, 60000);
            ws.on("close", function () { return clearInterval(interval); });
        });
        ws.on("message", function (data) {
            var msg = JSON.parse(data.toString());
            callback(msg);
        });
    };
    // 配置相关
    /**
     * 获取 Mangers
     */
    MiraiApiHttp.prototype.managers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/managers", {
                            params: {
                                qq: this.qq,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return MiraiApiHttp;
}());
exports.default = MiraiApiHttp;