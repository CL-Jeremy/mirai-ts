"use strict";
/**
 * 导出一个 Mirai 类，具体见类的各个属性和方法。
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var axios = __importStar(require("./axios"));
var mirai_api_http_1 = __importDefault(require("./mirai-api-http"));
var logger_1 = __importDefault(require("@yunyoujun/logger"));
var internal_1 = require("./utils/internal");
var check_1 = require("./utils/check");
var events_1 = __importDefault(require("events"));
var helper_1 = require("./helper");
/**
 * Mirai SDK 初始化类
 */
var Mirai = /** @class */ (function () {
    function Mirai(mahConfig) {
        if (mahConfig === void 0) { mahConfig = {
            host: "0.0.0.0",
            port: 8080,
            authKey: "el-psy-congroo",
            cacheSize: 4096,
            enableWebsocket: false,
            cors: ["*"],
        }; }
        this.mahConfig = mahConfig;
        /**
         * 日志模块
         */
        this.logger = new logger_1.default({ prefix: chalk_1.default.cyan("[mirai-ts]") });
        /**
         * 事件触发器
         */
        this.eventEmitter = new events_1.default.EventEmitter();
        this.axios = axios.init("http://" + this.mahConfig.host + ":" + this.mahConfig.port);
        this.api = new mirai_api_http_1.default(this.mahConfig, this.axios);
        // default
        this.qq = 0;
        this.verified = false;
        this.active = true;
        this.beforeListener = [];
        this.afterListener = [];
        this.interval = 200;
        this.retries = 10;
        // set default max listeners
        this.eventEmitter.setMaxListeners(9999);
    }
    Mirai.prototype.about = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pkg;
            return __generator(this, function (_a) {
                pkg = require("../package.json");
                this.logger.info("Version " + pkg.version);
                this.logger.info("Docs: " + pkg.homepage);
                this.logger.info("GitHub: " + pkg.repository.url);
                return [2 /*return*/];
            });
        });
    };
    /**
     * link 链接 mirai 已经登录的 QQ 号
     */
    Mirai.prototype.link = function (qq) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.qq = qq;
                        this.api.handleStatusCode();
                        return [4 /*yield*/, this.auth()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.verify()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取 Session
     * data.code === 0 成功
     */
    Mirai.prototype.auth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.auth()];
                    case 1:
                        data = _a.sent();
                        if (data.code === 0) {
                            this.logger.info("\u83B7\u53D6 Session: " + data.session);
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 激活 Session，绑定 QQ
     * data.code === 0 成功
     */
    Mirai.prototype.verify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.verify(this.qq)];
                    case 1:
                        data = _a.sent();
                        if (data.code === 0) {
                            this.logger.success("验证成功");
                            this.verified = true;
                        }
                        else {
                            this.logger.error("验证失败");
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 释放 Session
     */
    Mirai.prototype.release = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.release()];
                    case 1:
                        data = _a.sent();
                        if (data.code === 0) {
                            this.logger.success("\u91CA\u653E " + this.qq + " Session: " + this.api.sessionKey);
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * message 展开为 FriendMessage | GroupMessage | TempMessage
     * @param method
     * @param callback
     */
    Mirai.prototype._adaptMessageForAll = function (method, callback) {
        var emitter = this.eventEmitter;
        var messageType = ["FriendMessage", "GroupMessage", "TempMessage"];
        messageType.forEach(function (message) {
            emitter[method](message, callback);
        });
    };
    /**
     * 绑定事件列表
     * message: FriendMessage | GroupMessage | TempMessage
     * [mirai-api-http事件类型一览](https://github.com/project-mirai/mirai-api-http/blob/master/docs/EventType.md)
     * mirai.on('MemberMuteEvent', ()=>{})
     * @param type
     * @param callback
     */
    Mirai.prototype.on = function (type, callback) {
        var emitter = this.eventEmitter;
        // 监听所有消息类型
        if (type === "message") {
            this._adaptMessageForAll("on", callback);
        }
        else {
            try {
                emitter.on(type, callback);
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    /**
     * 仅处理事件一次
     * @param type
     * @param callback
     */
    Mirai.prototype.once = function (type, callback) {
        var emitter = this.eventEmitter;
        if (type === "message") {
            this._adaptMessageForAll("once", callback);
        }
        else {
            try {
                emitter.once(type, callback);
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    /**
     * 取消监听器
     * @param type
     * @param callback
     */
    Mirai.prototype.off = function (type, callback) {
        var emitter = this.eventEmitter;
        if (type === "message") {
            this._adaptMessageForAll("off", callback);
        }
        else {
            try {
                emitter.off(type, callback);
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    /**
     * 快速回复（只在消息类型包含群组或好友信息时有效）
     * @param msg 发送内容（消息链/纯文本皆可）
     * @param srcMsg 回复哪条消息
     * @param quote 是否引用回复（非聊天消息类型时无效）
     */
    Mirai.prototype.reply = function (msgChain, srcMsg, quote) {
        var e_1, _a;
        if (quote === void 0) { quote = false; }
        return __awaiter(this, void 0, void 0, function () {
            var messageId, target, type, sections, responses, sections_1, sections_1_1, section, res, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        messageId = 0;
                        target = 0;
                        type = "friend";
                        if (check_1.isChatMessage(srcMsg)) {
                            if (quote && srcMsg.messageChain[0].type === "Source") {
                                messageId = srcMsg.messageChain[0].id;
                            }
                        }
                        // reply 不同的目标
                        switch (srcMsg.type) {
                            case "TempMessage":
                                return [2 /*return*/, this.api.sendTempMessage(msgChain, srcMsg.sender.id, srcMsg.sender.group.id, messageId)];
                            case "FriendMessage":
                                type = "friend";
                                target = srcMsg.sender.id;
                                break;
                            case "GroupMessage":
                                type = "group";
                                target = srcMsg.sender.group.id;
                                break;
                            case "BotOnlineEvent":
                            case "BotOfflineEventActive":
                            case "BotOfflineEventForce":
                            case "BotOfflineEventDropped":
                            case "BotReloginEvent":
                                type = "friend";
                                target = srcMsg.qq;
                                break;
                            case "GroupRecallEvent":
                            case "BotGroupPermissionChangeEvent":
                            case "BotJoinGroupEvent":
                            case "GroupNameChangeEvent":
                            case "GroupEntranceAnnouncementChangeEvent":
                            case "GroupMuteAllEvent":
                            case "GroupAllowAnonymousChatEvent":
                            case "GroupAllowConfessTalkEvent":
                            case "GroupAllowMemberInviteEvent":
                                type = "group";
                                break;
                            case "MemberJoinEvent":
                            case "MemberLeaveEventKick":
                            case "MemberLeaveEventQuit":
                            case "MemberCardChangeEvent":
                            case "MemberSpecialTitleChangeEvent":
                            case "MemberPermissionChangeEvent":
                            case "MemberMuteEvent":
                            case "MemberUnmuteEvent":
                                type = "group";
                                target = srcMsg.member.group.id;
                                break;
                            case "MemberJoinRequestEvent":
                                type = "group";
                                target = srcMsg.groupId;
                                break;
                            default:
                                break;
                        }
                        if (!(typeof msgChain === "string")) return [3 /*break*/, 14];
                        sections = internal_1.splitText(msgChain);
                        if (!(sections.length > 1)) return [3 /*break*/, 14];
                        responses = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 13]);
                        sections_1 = __asyncValues(sections);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, sections_1.next()];
                    case 3:
                        if (!(sections_1_1 = _b.sent(), !sections_1_1.done)) return [3 /*break*/, 6];
                        section = sections_1_1.value;
                        return [4 /*yield*/, this._sendMessageByType(type, section, target, messageId)];
                    case 4:
                        res = _b.sent();
                        responses.push(res);
                        _b.label = 5;
                    case 5: return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _b.trys.push([8, , 11, 12]);
                        if (!(sections_1_1 && !sections_1_1.done && (_a = sections_1.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(sections_1)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, responses];
                    case 14: return [2 /*return*/, this._sendMessageByType(type, msgChain, target, messageId)];
                }
            });
        });
    };
    /**
     * 根据消息类型发送消息
     * @param type
     * @param msgChain
     * @param target
     * @param messageId
     */
    Mirai.prototype._sendMessageByType = function (type, msgChain, target, messageId) {
        if (type === "friend") {
            return this.api.sendFriendMessage(msgChain, target, messageId);
        }
        else if (type === "group") {
            return this.api.sendGroupMessage(msgChain, target, messageId);
        }
    };
    /**
     * 处理消息
     * @param msg
     * @param before 在监听器函数执行前执行
     * @param after 在监听器函数执行后执行
     */
    Mirai.prototype.handle = function (msg) {
        helper_1.createHelperForMsg(this, msg);
        this.beforeListener.forEach(function (cb) {
            cb(msg);
        });
        if (this.active) {
            var emitter = this.eventEmitter;
            emitter.emit(msg.type, msg);
        }
        this.afterListener.forEach(function (cb) {
            cb(msg);
        });
        // 清空当前 curMsg
        delete this.curMsg;
    };
    /**
     * 在监听器函数执行前执行
     */
    Mirai.prototype.before = function (callback) {
        this.beforeListener.push(callback);
    };
    /**
     * 在监听器函数执行后执行
     */
    Mirai.prototype.after = function (callback) {
        this.afterListener.push(callback);
    };
    /**
     * 监听消息和事件
     * @param before 在监听器函数执行前执行
     * @param after 在监听器函数执行后执行
     */
    Mirai.prototype.listen = function () {
        var _this = this;
        var address = this.mahConfig.host + ":" + this.mahConfig.port;
        if (this.mahConfig.enableWebsocket) {
            this.api.all(function (msg) {
                _this.handle(msg);
            });
        }
        else {
            this.logger.info("开始监听: http://" + address);
            var count_1 = 0;
            var intId_1 = setInterval(function () {
                _this.api
                    .fetchMessage()
                    .then(function (res) {
                    var data = res.data;
                    if (data && data.length) {
                        count_1 = 0;
                        data.forEach(function (msg) {
                            _this.handle(msg);
                        });
                    }
                })
                    .catch(function (err) {
                    _this.logger.error(err.message);
                    count_1++;
                    // 失败超过十次
                    if (count_1 >= _this.retries) {
                        clearInterval(intId_1);
                        throw new Error("fetchMessage \u5DF2\u8FDE\u7EED " + _this.retries + " \u6B21\u672A\u6536\u5230\u4EFB\u4F55\u6D88\u606F\u5185\u5BB9\uFF0C\u629B\u51FA\u5F02\u5E38\u3002");
                    }
                });
            }, this.interval);
        }
    };
    return Mirai;
}());
exports.default = Mirai;
