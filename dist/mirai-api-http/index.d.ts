/**
 * mirai-api-http 类，实现了 [mirai-appi-http](https://github.com/project-mirai/mirai-api-http) 文档中的所有请求
 * @packageDocumentation
 */
/// <reference types="node" />
import { AxiosStatic } from "axios";
import { MessageType, Api, Config, EventType } from "..";
import { Stream } from "stream";
import { Command } from "./command";
import { Resp } from "./resp";
import Logger from "@yunyoujun/logger";
/**
 * 与 mirai-api-http [setting.yml](https://github.com/project-mirai/mirai-api-http#settingyml模板) 的配置保持一致
 */
export interface MiraiApiHttpConfig {
    /**
     * 可选，默认值为0.0.0.0
     */
    host?: string;
    /**
     * 可选，默认值为8080
     */
    port?: number;
    /**
     * 可选，默认由 mirai-api-http 随机生成，建议手动指定。未传入该值时，默认为 'el-psy-congroo'
     */
    authKey?: string;
    /**
     * 可选，缓存大小，默认4096.缓存过小会导致引用回复与撤回消息失败
     */
    cacheSize?: number;
    /**
     * 可选，是否开启websocket，默认关闭，建议通过Session范围的配置设置
     */
    enableWebsocket?: boolean;
    /**
     * 可选，配置CORS跨域，默认为*，即允许所有域名
     */
    cors?: string[];
    /**
     * 自定义连接 URL
     */
    url?: string;
}
export default class MiraiApiHttp {
    config: MiraiApiHttpConfig;
    axios: AxiosStatic;
    sessionKey: string;
    qq: number;
    verified: boolean;
    address: string;
    command: Command;
    /**
     * [申请事件 | EventType](https://github.com/project-mirai/mirai-api-http/blob/master/docs/EventType.md#%E7%94%B3%E8%AF%B7%E4%BA%8B%E4%BB%B6)
     */
    resp: Resp;
    logger: Logger;
    constructor(config: MiraiApiHttpConfig, axios: AxiosStatic);
    /**
     * 拦截 mirai 错误信息
     */
    handleStatusCode(): Promise<void>;
    /**
     * 使用此方法获取插件的信息，如版本号
     * data.data: { "version": "v1.0.0" }
     */
    about(): Promise<Api.Response.About>;
    /**
     * 使用此方法验证你的身份，并返回一个会话
     */
    auth(authKey?: string | undefined): Promise<Api.Response.Auth>;
    /**
     * 使用此方法校验并激活你的Session，同时将Session与一个已登录的Bot绑定
     */
    verify(qq: number): Promise<Api.Response.BaseResponse>;
    /**
     * 使用此方式释放 session 及其相关资源（Bot不会被释放） 不使用的 Session 应当被释放，长时间（30分钟）未使用的 Session 将自动释放。
     * 否则 Session 持续保存Bot收到的消息，将会导致内存泄露(开启websocket后将不会自动释放)
     */
    release(qq?: number): Promise<Api.Response.BaseResponse>;
    /**
     * 使用此方法获取 bot 接收到的最老消息和最老各类事件(会从 MiraiApiHttp 消息记录中删除)
     * { code: 0, data: [] }
     * @param count 获取消息和事件的数量
     */
    fetchMessage(count?: number): Promise<Api.Response.FetchMessage>;
    /**
     * 使用此方法获取 bot 接收到的最新消息和最新各类事件(会从 MiraiApiHttp 消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    fetchLatestMessage(count?: number): Promise<Api.Response.FetchMessage>;
    /**
     * 使用此方法获取 bot 接收到的最老消息和最老各类事件(不会从 MiraiApiHttp 消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    peekMessage(count?: number): Promise<Api.Response.FetchMessage>;
    /**
     * 使用此方法获取 bot 接收到的最老消息和最老各类事件(不会从 MiraiApiHttp 消息记录中删除)
     * @param count 获取消息和事件的数量
     */
    peekLatestMessage(count?: number): Promise<Api.Response.FetchMessage>;
    /**
     * 通过 messageId 获取一条被缓存的消息
     * @param id 获取消息的messageId
     */
    messageFromId(id: number): Promise<Api.Response.MessageFromId | MessageType.ChatMessage>;
    /**
     * 使用此方法向指定好友发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标好友的 QQ 号
     * @param quote 引用一条消息的messageId进行回复
     * @returns { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    sendFriendMessage(messageChain: string | MessageType.MessageChain, target: number, quote?: number): Promise<Api.Response.SendMessage>;
    /**
     * 使用此方法向指定群发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标群的群号
     * @param quote 引用一条消息的messageId进行回复
     * @return { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    sendGroupMessage(messageChain: string | MessageType.MessageChain, target: number, quote?: number): Promise<Api.Response.SendMessage>;
    /**
     * 发送临时会话消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param qq 临时会话对象QQ号
     * @param group 临时会话群号
     * @param quote 引用一条消息的messageId进行回复
     */
    sendTempMessage(messageChain: string | MessageType.MessageChain, qq: number, group: number, quote?: number): Promise<Api.Response.SendMessage>;
    /**
     * 使用此方法向指定对象（群或好友）发送图片消息 除非需要通过此手段获取imageId，否则不推荐使用该接口
     * @param urls 是一个url字符串构成的数组
     * @param target 发送对象的QQ号或群号，可能存在歧义
     * @param qq 发送对象的QQ号
     * @param group 发送对象的群号
     */
    sendImageMessage(urls: string[], target?: number, qq?: number, group?: number): Promise<string[]>;
    /**
     * 使用此方法上传图片文件至服务器并返回 ImageId
     * @param type
     * @param img 图片文件 fs.createReadStream(img)
     */
    uploadImage(type: "friend" | "group" | "temp", img: Stream): Promise<Api.Response.UploadImage>;
    /**
     * 使用此方法上传语音文件至服务器并返回 VoiceId
     * @param type 当前仅支持 "group"
     * @param voice 语音文件 fs.createReadStream(voice)
     */
    uploadVoice(type: "friend" | "group" | "temp", voice: Stream): Promise<Api.Response.UploadVoice>;
    /**
     * 使用此方法上传文件至群/好友并返回 FileId
     * @param type 当前仅支持 "group"
     * @param target 发送对象的QQ号或群号，当前仅支持群
     * @param path 文件上传目录与名字，例：folder/subfolder/file
     * @param file 目标文件 fs.createReadStream(file)
     */
    uploadFileAndSend(type: "friend" | "group" | "temp", target: number, path: string, file: Stream): Promise<Api.Response.UploadFileAndSend>;
    /**
     * 撤回消息
     * 使用此方法撤回指定消息。对于bot发送的消息，有2分钟时间限制。对于撤回群聊中群员的消息，需要有相应权限
     * @param target 需要撤回的消息的messageId
     */
    recall(target: number | MessageType.ChatMessage): Promise<Api.Response.BaseResponse>;
    /**
     * 获取 bot 的好友列表
     */
    friendList(): Promise<Api.Response.FriendList>;
    /**
     * 获取 bot 的群列表
     */
    groupList(): Promise<Api.Response.GroupList>;
    /**
     * 获取 BOT 的群成员列表
     * @param target 指定群的群号
     */
    memberList(target: number): Promise<Api.Response.MemberList>;
    /**
     * 指定群进行全体禁言
     * @param target 指定群的群号
     */
    muteAll(target: number): Promise<Api.Response.BaseResponse>;
    /**
     * 指定群解除全体禁言
     * @param target 指定群的群号
     */
    unmuteAll(target: number): Promise<Api.Response.BaseResponse>;
    /**
     * 指定群禁言指定群员
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     * @param time 禁言时长，单位为秒，最多30天，默认为 60 秒
     */
    mute(target: number, memberId: number, time?: number): Promise<Api.Response.BaseResponse>;
    /**
     * 指定群解除群成员禁言
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     */
    unmute(target: number, memberId: number): Promise<Api.Response.BaseResponse>;
    /**
     * 移除群成员
     * @param target 指定群的群号
     * @param memberId 指定群员QQ号
     * @param msg 信息
     */
    kick(target: number, memberId: number, msg?: string): Promise<Api.Response.BaseResponse>;
    /**
     * 退出群聊
     * @param target 群号
     * bot为该群群主时退出失败并返回code 10(无操作权限)
     */
    quit(target: number): Promise<Api.Response.BaseResponse>;
    /**
     * 传入 config 时，修改群设置
     * 未传入 config 时，获取群设置
     * @param target 指定群的群号
     * @param config 群设置
     */
    groupConfig(target: number, config?: Config.GroupConfig): Promise<Api.Response.BaseResponse | Config.GroupConfig>;
    /**
     * 传入 info 时，修改群员资料
     * 未传入 info 时，获取群员资料
     * @param targer 指定群的群号
     * @param memberId 群员QQ号
     * @param info 群员资料
     */
    memberInfo(target: number, memberId: number, info?: Config.MemberInfo): Promise<Api.Response.BaseResponse | Config.MemberInfo>;
    /**
     * 监听该接口，插件将推送 Bot 收到的消息
     * @param callback 回调函数
     */
    message(callback: (msg: MessageType.ChatMessage) => any): void;
    /**
     * 监听该接口，插件将推送 Bot 收到的事件
     * @param callback 回调函数
     */
    event(callback: (event: EventType.Event) => any): void;
    /**
     * 监听该接口，插件将推送 Bot 收到的消息和事件
     * @param callback 回调函数
     */
    all(callback: (data: EventType.Event | MessageType.ChatMessage) => any): void;
    /**
     * 获取 Mangers
     */
    managers(): Promise<number[]>;
}