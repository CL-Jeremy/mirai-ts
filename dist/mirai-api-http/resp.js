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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resp = void 0;
var NewFriendRequestEventEnum;
(function (NewFriendRequestEventEnum) {
    NewFriendRequestEventEnum[NewFriendRequestEventEnum["allow"] = 0] = "allow";
    NewFriendRequestEventEnum[NewFriendRequestEventEnum["deny"] = 1] = "deny";
    NewFriendRequestEventEnum[NewFriendRequestEventEnum["black"] = 2] = "black";
})(NewFriendRequestEventEnum || (NewFriendRequestEventEnum = {}));
var MemberJoinRequestEventEnum;
(function (MemberJoinRequestEventEnum) {
    MemberJoinRequestEventEnum[MemberJoinRequestEventEnum["allow"] = 0] = "allow";
    MemberJoinRequestEventEnum[MemberJoinRequestEventEnum["deny"] = 1] = "deny";
    MemberJoinRequestEventEnum[MemberJoinRequestEventEnum["ignore"] = 2] = "ignore";
    MemberJoinRequestEventEnum[MemberJoinRequestEventEnum["deny-black"] = 3] = "deny-black";
    MemberJoinRequestEventEnum[MemberJoinRequestEventEnum["ignore-black"] = 4] = "ignore-black";
})(MemberJoinRequestEventEnum || (MemberJoinRequestEventEnum = {}));
var DefaultRequestEventEnum;
(function (DefaultRequestEventEnum) {
    DefaultRequestEventEnum[DefaultRequestEventEnum["allow"] = 0] = "allow";
    DefaultRequestEventEnum[DefaultRequestEventEnum["deny"] = 1] = "deny";
})(DefaultRequestEventEnum || (DefaultRequestEventEnum = {}));
const operations = {
    NewFriendRequestEvent: NewFriendRequestEventEnum,
    MemberJoinRequestEvent: MemberJoinRequestEventEnum,
    BotInvitedJoinGroupRequestEvent: DefaultRequestEventEnum,
};
/**
 * https://github.com/project-mirai/mirai-api-http/blob/master/EventType.md
 * EventType 中的请求
 * resp.xxx 以与 mirai-api-http URL 保持一致
 */
class Resp {
    constructor(api) {
        this.api = api;
    }
    _request(event, operate, message = "") {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.axios.post(`/resp/${event.type[0].toLowerCase()}${event.type.substring(1)}`, {
                sessionKey: this.api.sessionKey,
                eventId: event.eventId,
                fromId: event.fromId,
                groupId: event.groupId,
                operate: operations[event.type][operate],
                message,
            });
        });
    }
    /**
     * 响应新朋友请求
     * @param event 请求的事件
     * @param operate 操作 allow 同意添加好友, deny 拒绝添加好友, black 拒绝添加好友并添加黑名单，不再接收该用户的好友申请
     * @param message 响应消息
     */
    newFriendRequest(event, operate, message) {
        return this._request(event, operate, message);
    }
    /**
     * 响应新入群请求
     * @param event 请求的事件
     * @param operate 操作 allow 同意入群, deny 拒绝入群, ignore 忽略请求, deny-black 拒绝入群并添加黑名单，不再接收该用户的入群申请, ignore-black 忽略入群并添加黑名单，不再接收该用户的入群申请
     * @param message 响应消息
     */
    memberJoinRequest(event, operate, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request(event, operate, message);
        });
    }
    /**
     * 响应被邀请入群申请
     * @param event 请求的事件
     * @param operate 操作 allow 同意邀请, deny 拒绝邀请
     * @param message 响应消息
     */
    botInvitedJoinGroupRequest(event, operate, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request(event, operate, message);
        });
    }
}
exports.Resp = Resp;
