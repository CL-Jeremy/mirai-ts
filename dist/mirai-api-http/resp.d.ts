import MiraiApiHttp from "./index";
import { EventType } from "..";
/**
 * https://github.com/project-mirai/mirai-api-http/blob/master/EventType.md
 * EventType 中的请求
 * resp.xxx 以与 mirai-api-http URL 保持一致
 */
export declare class Resp {
    private api;
    /**
     * 将请求事件类型映射到合适的响应方法
     */
    mapper: {
        [type in EventType.RequestEvent["type"]]: (event: EventType.EventMap[type], operate: EventType.EventMap[type]["operations"][number], message?: string) => Promise<void>;
    };
    constructor(api: MiraiApiHttp);
    /**
     * 响应新朋友请求
     * @param event 请求的事件
     * @param operate 操作 allow 同意添加好友, deny 拒绝添加好友, black 拒绝添加好友并添加黑名单，不再接收该用户的好友申请
     * @param message 响应消息
     */
    newFriendRequest(event: EventType.NewFriendRequestEvent, operate: typeof event["operations"][number], message?: string): Promise<void>;
    /**
     * 响应新入群请求
     * @param event 请求的事件
     * @param operate 操作 allow 同意入群, deny 拒绝入群, ignore 忽略请求, deny-black 拒绝入群并添加黑名单，不再接收该用户的入群申请, ignore-black 忽略入群并添加黑名单，不再接收该用户的入群申请
     * @param message 响应消息
     */
    memberJoinRequest(event: EventType.MemberJoinRequestEvent, operate: typeof event["operations"][number], message?: string): Promise<void>;
    /**
     * 响应被邀请入群申请
     * @param event 请求的事件
     * @param operate 操作 allow 同意邀请, deny 拒绝邀请
     * @param message 响应消息
     */
    botInvitedJoinGroupRequest(event: EventType.BotInvitedJoinGroupRequestEvent, operate: typeof event["operations"][number], message?: string): Promise<void>;
}
