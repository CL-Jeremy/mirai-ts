"use strict";
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
exports.Resp = exports.BotInvitedJoinGroupRequestOperationType = exports.MemberJoinRequestOperationType = exports.NewFriendRequestOperationType = void 0;
/**
 * - `0` 同意添加好友
 * - `1` 拒绝添加好友
 * - `2` 拒绝添加好友并添加黑名单，不再接收该用户的好友申请
 */
var NewFriendRequestOperationType;
(function (NewFriendRequestOperationType) {
    /**
     * 同意添加好友
     */
    NewFriendRequestOperationType[NewFriendRequestOperationType["Accept"] = 0] = "Accept";
    /**
     * 拒绝添加好友
     */
    NewFriendRequestOperationType[NewFriendRequestOperationType["Refuse"] = 1] = "Refuse";
    /**
     * 拒绝添加好友并添加黑名单，不再接收该用户的好友申请
     */
    NewFriendRequestOperationType[NewFriendRequestOperationType["RefuseAndBlock"] = 2] = "RefuseAndBlock";
})(NewFriendRequestOperationType = exports.NewFriendRequestOperationType || (exports.NewFriendRequestOperationType = {}));
/**
 * - `0` 同意入群
 * - `1` 拒绝入群
 * - `2` 忽略请求
 * - `3` 拒绝入群并添加黑名单，不再接收该用户的入群申请
 * - `4` 忽略入群并添加黑名单，不再接收该用户的入群申请
 */
var MemberJoinRequestOperationType;
(function (MemberJoinRequestOperationType) {
    /**
     * 同意入群
     */
    MemberJoinRequestOperationType[MemberJoinRequestOperationType["Accept"] = 0] = "Accept";
    /**
     * 拒绝入群
     */
    MemberJoinRequestOperationType[MemberJoinRequestOperationType["Refuse"] = 1] = "Refuse";
    /**
     * 忽略请求
     */
    MemberJoinRequestOperationType[MemberJoinRequestOperationType["Ignore"] = 2] = "Ignore";
    /**
     * 拒绝入群并添加黑名单，不再接收该用户的入群申请
     */
    MemberJoinRequestOperationType[MemberJoinRequestOperationType["RefuseAndBlock"] = 3] = "RefuseAndBlock";
    /**
     * 忽略入群并添加黑名单，不再接收该用户的入群申请
     */
    MemberJoinRequestOperationType[MemberJoinRequestOperationType["IgnoreAndBlock"] = 4] = "IgnoreAndBlock";
})(MemberJoinRequestOperationType = exports.MemberJoinRequestOperationType || (exports.MemberJoinRequestOperationType = {}));
/**
 * - `0` 同意邀请
 * - `1` 拒绝邀请
 */
var BotInvitedJoinGroupRequestOperationType;
(function (BotInvitedJoinGroupRequestOperationType) {
    /**
     * 同意邀请
     */
    BotInvitedJoinGroupRequestOperationType[BotInvitedJoinGroupRequestOperationType["Accept"] = 0] = "Accept";
    /**
     * 拒绝邀请
     */
    BotInvitedJoinGroupRequestOperationType[BotInvitedJoinGroupRequestOperationType["Refuse"] = 1] = "Refuse";
})(BotInvitedJoinGroupRequestOperationType = exports.BotInvitedJoinGroupRequestOperationType || (exports.BotInvitedJoinGroupRequestOperationType = {}));
/**
 * [申请事件 | EventType](https://github.com/project-mirai/mirai-api-http/blob/master/docs/EventType.md#%E7%94%B3%E8%AF%B7%E4%BA%8B%E4%BB%B6)
 * Example: resp.newFriendRequest for `/resp/newFriendRequestEvent`
 */
var Resp = /** @class */ (function () {
    function Resp(api) {
        this.api = api;
    }
    Resp.prototype._request = function (event, operate, message) {
        if (message === void 0) { message = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.axios.post("/resp/" + event.type[0].toLowerCase() + event.type.substring(1), {
                            sessionKey: this.api.sessionKey,
                            eventId: event.eventId,
                            fromId: event.fromId,
                            groupId: event.groupId,
                            operate: operate,
                            message: message,
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 响应新朋友请求
     * @param event 请求的事件
     * @param operate 操作：0 同意添加好友, 1 拒绝添加好友, 2 拒绝添加好友并添加黑名单，不再接收该用户的好友申请
     * @param message 响应消息
     */
    Resp.prototype.newFriendRequest = function (event, operate, message) {
        return this._request(event, operate, message);
    };
    /**
     * 响应新入群请求
     * @param event 请求的事件
     * @param operate 操作: 0 同意入群, 1 拒绝入群, 2 忽略请求, 3 拒绝入群并添加黑名单，不再接收该用户的入群申请, 4 忽略入群并添加黑名单，不再接收该用户的入群申请
     * @param message 响应消息
     */
    Resp.prototype.memberJoinRequest = function (event, operate, message) {
        return this._request(event, operate, message);
    };
    /**
     * 响应被邀请入群申请
     * @param event 请求的事件
     * @param operate 操作：0 同意邀请, 1 拒绝邀请
     * @param message 响应消息
     */
    Resp.prototype.botInvitedJoinGroupRequest = function (event, operate, message) {
        return this._request(event, operate, message);
    };
    return Resp;
}());
exports.Resp = Resp;
