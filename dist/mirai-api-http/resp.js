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
/**
 * https://github.com/project-mirai/mirai-api-http/blob/master/EventType.md
 * EventType 中的请求
 * resp.xxx 以与 mirai-api-http URL 保持一致
 */
class Resp {
    constructor(api) {
        this.api = api;
        this.mapper = {
            NewFriendRequestEvent: this.newFriendRequest,
            MemberJoinRequestEvent: this.memberJoinRequest,
            BotInvitedJoinGroupRequestEvent: this.botInvitedJoinGroupRequest,
        };
    }
    /**
     * 响应新朋友请求
     * @param event 请求的事件
     * @param operate 操作 allow 同意添加好友, deny 拒绝添加好友, black 拒绝添加好友并添加黑名单，不再接收该用户的好友申请
     * @param message 响应消息
     */
    newFriendRequest(event, operate, message = "") {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.axios.post("/resp/newFriendRequestEvent", {
                sessionKey: this.api.sessionKey,
                eventId: event.eventId,
                fromId: event.fromId,
                groupId: event.groupId,
                operate: event.operations.indexOf(operate),
                message,
            });
        });
    }
    /**
     * 响应新入群请求
     * @param event 请求的事件
     * @param operate 操作 allow 同意入群, deny 拒绝入群, ignore 忽略请求, deny-black 拒绝入群并添加黑名单，不再接收该用户的入群申请, ignore-black 忽略入群并添加黑名单，不再接收该用户的入群申请
     * @param message 响应消息
     */
    memberJoinRequest(event, operate, message = "") {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.axios.post("/resp/memberJoinRequestEvent", {
                sessionKey: this.api.sessionKey,
                eventId: event.eventId,
                fromId: event.fromId,
                groupId: event.groupId,
                operate: event.operations.indexOf(operate),
                message,
            });
        });
    }
    /**
     * 响应被邀请入群申请
     * @param event 请求的事件
     * @param operate 操作 allow 同意邀请, deny 拒绝邀请
     * @param message 响应消息
     */
    botInvitedJoinGroupRequest(event, operate, message = "") {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.axios.post("/resp/botInvitedJoinGroupRequestEvent", {
                sessionKey: this.api.sessionKey,
                eventId: event.eventId,
                fromId: event.fromId,
                groupId: event.groupId,
                operate: event.operations.indexOf(operate),
                message,
            });
        });
    }
}
exports.Resp = Resp;
