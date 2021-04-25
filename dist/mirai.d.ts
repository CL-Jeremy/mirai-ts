/**
 * 导出一个 Mirai 类，具体见类的各个属性和方法。
 * @packageDocumentation
 */
/// <reference types="node" />
import { AxiosStatic } from "axios";
import MiraiApiHttp from "./mirai-api-http";
import { MessageType, EventType, MiraiApiHttpConfig } from ".";
import Logger from "@yunyoujun/logger";
import events from "events";
/**
 * 所有消息
 */
export declare type MessageAndEvent = MessageType.ChatMessage | EventType.Event;
/**
 * 所有消息类型
 */
export declare type MessageAndEventType = MessageType.ChatMessageType | EventType.EventType;
/**
 * 数据类型
 */
declare type Data<T extends "message" | EventType.EventType | MessageType.ChatMessageType> = T extends EventType.EventType ? EventType.EventMap[T] : T extends MessageType.ChatMessageType ? MessageType.ChatMessageMap[T] : MessageType.ChatMessage;
declare type SendMessageType = "friend" | "group";
/**
 * Mirai SDK 初始化类
 */
export default class Mirai {
    mahConfig: MiraiApiHttpConfig;
    /**
     * 封装 mirai-api-http 的固有方法
     */
    api: MiraiApiHttp;
    /**
     * 日志模块
     */
    logger: Logger;
    /**
     * 请求工具
     */
    axios: AxiosStatic;
    qq: number;
    /**
     * 是否验证成功
     */
    verified: boolean;
    /**
     * 监听器状态（false 则不执行监听器回调函数）
     */
    active: boolean;
    /**
     * 监听者之前执行的函数
     */
    beforeListener: Function[];
    /**
     * 监听者之后执行的函数
     */
    afterListener: Function[];
    /**
     * 轮询获取消息的时间间隔，默认 200 ms，仅在未开启 Websocket 时有效
     */
    interval: number;
    /**
     * fetchMessage 重试次数
     */
    retries: number;
    /**
     * 当前处理的消息
     */
    curMsg?: MessageType.ChatMessage | EventType.Event;
    /**
     * 事件触发器
     */
    eventEmitter: events;
    constructor(mahConfig?: MiraiApiHttpConfig);
    about(): Promise<void>;
    /**
     * link 链接 mirai 已经登录的 QQ 号
     */
    link(qq: number): Promise<import("./types/api/response").BaseResponse>;
    /**
     * 获取 Session
     * data.code === 0 成功
     */
    auth(): Promise<import("./types/api/response").Auth>;
    /**
     * 激活 Session，绑定 QQ
     * data.code === 0 成功
     */
    verify(): Promise<import("./types/api/response").BaseResponse>;
    /**
     * 释放 Session
     */
    release(): Promise<import("./types/api/response").BaseResponse>;
    /**
     * message 展开为 FriendMessage | GroupMessage | TempMessage
     * @param method
     * @param callback
     */
    _adaptMessageForAll<T extends "message" | EventType.EventType | MessageType.ChatMessageType>(method: "on" | "off" | "once", callback: (data: Data<T>) => any): void;
    /**
     * 绑定事件列表
     * message: FriendMessage | GroupMessage | TempMessage
     * [mirai-api-http事件类型一览](https://github.com/project-mirai/mirai-api-http/blob/master/docs/EventType.md)
     * mirai.on('MemberMuteEvent', ()=>{})
     * @param type
     * @param callback
     */
    on<T extends "message" | EventType.EventType | MessageType.ChatMessageType>(type: T, callback: (data: Data<T>) => any): void;
    /**
     * 仅处理事件一次
     * @param type
     * @param callback
     */
    once<T extends "message" | EventType.EventType | MessageType.ChatMessageType>(type: T, callback: (data: Data<T>) => any): void;
    /**
     * 取消监听器
     * @param type
     * @param callback
     */
    off<T extends "message" | EventType.EventType | MessageType.ChatMessageType>(type: T, callback: (data: Data<T>) => any): void;
    /**
     * 快速回复（只在消息类型包含群组或好友信息时有效）
     * @param msg 发送内容（消息链/纯文本皆可）
     * @param srcMsg 回复哪条消息
     * @param quote 是否引用回复（非聊天消息类型时无效）
     */
    reply(msgChain: string | MessageType.MessageChain, srcMsg: EventType.Event | MessageType.ChatMessage, quote?: boolean): Promise<import("./types/api/response").SendMessage | (import("./types/api/response").SendMessage | undefined)[] | undefined>;
    /**
     * 根据消息类型发送消息
     * @param type
     * @param msgChain
     * @param target
     * @param messageId
     */
    _sendMessageByType(type: SendMessageType, msgChain: string | MessageType.MessageChain, target: number, messageId: number): Promise<import("./types/api/response").SendMessage> | undefined;
    /**
     * 处理消息
     * @param msg
     * @param before 在监听器函数执行前执行
     * @param after 在监听器函数执行后执行
     */
    handle(msg: MessageType.ChatMessage | EventType.Event): void;
    /**
     * 在监听器函数执行前执行
     */
    before(callback: Function): void;
    /**
     * 在监听器函数执行后执行
     */
    after(callback: Function): void;
    /**
     * 监听消息和事件
     * @param before 在监听器函数执行前执行
     * @param after 在监听器函数执行后执行
     */
    listen(): void;
}
export {};
