/**
 * 导出一个 Mirai 类，具体见类的各个属性和方法。
 * @packageDocumentation
 */
import { AxiosStatic } from "axios";
import MiraiApiHttp from "./mirai-api-http";
import { MessageType, EventType, MiraiApiHttpConfig } from ".";
import ora from "ora";
export declare type MessageAndEvent = MessageType.ChatMessage | EventType.Event;
export declare type MessageAndEventType = MessageType.ChatMessageType | EventType.EventType;
declare type Listener = Map<MessageType.ChatMessageType | EventType.EventType, Function[]>;
/**
 * 数据类型
 */
declare type Data<T extends "message" | EventType.EventType | MessageType.ChatMessageType> = T extends EventType.EventType ? EventType.EventMap[T] : T extends MessageType.ChatMessageType ? MessageType.ChatMessageMap[T] : MessageType.ChatMessage;
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
     * 请求工具
     */
    axios: AxiosStatic;
    /**
     * sessionKey 是使用以下方法必须携带的 sessionKey 使用前必须进行校验和绑定指定的Bot，每个 Session 只能绑定一个 Bot，但一个 Bot 可有多个Session。
     * sessionKey 在未进行校验的情况下，一定时间后将会被自动释放。
     */
    sessionKey: string;
    qq: number;
    /**
     * 是否验证成功
     */
    verified: boolean;
    /**
     * 旋转进度
     */
    spinner?: ora.Ora;
    /**
     * 监听器状态（false 则不执行监听器回调函数）
     */
    active: boolean;
    /**
     * 监听者（回调函数）
     */
    listener: Listener;
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
     * 当前处理的消息
     */
    curMsg?: MessageType.ChatMessage | EventType.Event;
    constructor(mahConfig?: MiraiApiHttpConfig);
    /**
     * @deprecated since version v0.5.0
     */
    login(qq: number): void;
    /**
     * link 链接 mirai 已经登录的 QQ 号
     */
    link(qq: number): Promise<any>;
    /**
     * 获取 Session
     */
    auth(): Promise<any>;
    /**
     * 激活 Session，绑定 QQ
     */
    verify(): Promise<any>;
    /**
     * 释放 Session
     */
    release(): Promise<any>;
    /**
     * 绑定事件列表
     * message: FriendMessage | GroupMessage | TempMessage
     * [mirai-api-http事件类型一览](https://github.com/project-mirai/mirai-api-http/blob/master/EventType.md)
     * mirai.on('MemberMuteEvent', ()=>{})
     * @param type
     * @param callback
     */
    on<T extends "message" | EventType.EventType | MessageType.ChatMessageType>(type: T, callback: (data: Data<T>) => any): void;
    /**
     * 添加监听者
     * @param type
     * @param callback
     */
    addListener<T extends EventType.EventType | MessageType.ChatMessageType>(type: T, callback: Function): void;
    /**
     * 快速回复（只在消息类型包含群组或好友信息时有效）
     * @param msg 发送内容（消息链/纯文本皆可）
     * @param srcMsg 回复哪条消息
     * @param quote 是否引用回复（非聊天消息类型时无效）
     */
    reply(msgChain: string | MessageType.MessageChain, srcMsg: EventType.Event | MessageType.ChatMessage, quote?: boolean): Promise<import("./types/api/response").sendMessage> | undefined;
    /**
     * 为消息和事件类型挂载辅助函数
     * @param msg
     */
    addHelperForMsg(msg: MessageType.ChatMessage | EventType.Event): void;
    /**
     * 执行所有事件监听回调函数
     * @param msg
     */
    execListener(msg: MessageType.ChatMessage | EventType.Event): void;
    /**
     * 处理消息
     * @param msg
     * @param before 在监听器函数执行前执行
     * @param after 在监听器函数执行后执行
     */
    handle(msg: MessageType.ChatMessage | EventType.Event, before?: Function, after?: Function): void;
    /**
     * 监听消息和事件
     * @param before 在监听器函数执行前执行
     * @param after 在监听器函数执行后执行
     */
    listen(before?: Function, after?: Function): void;
}
export {};
