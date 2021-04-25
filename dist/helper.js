"use strict";
/**
 * mirai-ts 内部 helper
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHelperForMsg = void 0;
var internal_1 = require("./utils/internal");
var check_1 = require("./utils/check");
/**
 * 为消息和事件类型挂载辅助函数
 * @param msg
 */
function createHelperForMsg(mirai, msg) {
    var _this = this;
    mirai.curMsg = msg;
    // 消息类型添加直接获取消息内容的参数
    if (check_1.isChatMessage(msg)) {
        msg.plain = internal_1.getPlain(msg.messageChain);
        if (msg.type === "GroupMessage") {
            // 添加判断是否被艾特的辅助函数
            msg.isAt = function (qq) {
                return check_1.isAt(msg, qq ? qq : mirai.qq);
            };
        }
        // 语法糖
        msg.group = function () {
            var groupIds = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                groupIds[_i] = arguments[_i];
            }
            return groupIds.includes(msg.sender.group.id);
        };
        msg.friend = function () {
            var qqs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                qqs[_i] = arguments[_i];
            }
            return qqs.includes(msg.sender.id);
        };
        msg.get = function (type) {
            var curSingleMessage = null;
            msg.messageChain.some(function (singleMessage) {
                if (singleMessage.type === type) {
                    curSingleMessage = singleMessage;
                    return true;
                }
            });
            return curSingleMessage;
        };
    }
    // 为各类型添加 reply 辅助函数
    msg.reply = function (msgChain, quote) {
        if (quote === void 0) { quote = false; }
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mirai.reply(msgChain, msg, quote)];
            });
        });
    };
    // 为请求类事件添加 respond 辅助函数
    if (msg.type === "NewFriendRequestEvent") {
        msg.respond = function (operate, message) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mirai.api.resp.newFriendRequest(msg, operate, message)];
            });
        }); };
    }
    else if (msg.type === "MemberJoinRequestEvent") {
        msg.respond = function (operate, message) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mirai.api.resp.memberJoinRequest(msg, operate, message)];
            });
        }); };
    }
    else if (msg.type === "BotInvitedJoinGroupRequestEvent") {
        msg.respond = function (operate, message) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, mirai.api.resp.botInvitedJoinGroupRequest(msg, operate, message)];
            });
        }); };
    }
}
exports.createHelperForMsg = createHelperForMsg;
