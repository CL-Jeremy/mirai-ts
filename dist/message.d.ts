/**
 * 生成对应消息格式
 * @packageDocumentation
 */
import * as MessageType from "./types/message-type";
/**
 * 生成引用的消息格式
 * @param messageId 消息 ID
 */
declare function Quote(messageId: number): MessageType.Quote;
/**
 * 生成艾特默认的消息格式
 * @param target QQ 号
 */
declare function At(target: number): MessageType.At;
/**
 * 生成艾特全体成员的消息格式
 */
declare function AtAll(): MessageType.AtAll;
/**
 * 生成 QQ 原生表情消息格式
 * @param faceId QQ表情编号
 * @param name QQ表情拼音，可选
 */
declare function Face(faceId: number, name?: string): MessageType.Face;
/**
 * 生成文本消息格式
 * @param text 文本
 */
declare function Plain(text: string): MessageType.Plain;
/**
 * 生成图片消息格式
 * @param imageId 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
 * @param url 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
 * @param path 图片的路径，发送本地图片，相对路径于 `data/net.mamoe.mirai-api-http/images`
 */
declare function Image(imageId?: string | null, url?: string | null, path?: string | null): MessageType.Image;
/**
 * 生成闪照消息格式
 * @param imageId 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
 * @param url 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
 * @param path 图片的路径，发送本地图片，相对路径于 `data/net.mamoe.mirai-api-http/images`
 */
declare function FlashImage(imageId?: string | null, url?: string | null, path?: string | null): MessageType.FlashImage;
/**
 * 需要 mirai-api-http 1.8.2 以上，mirai-console 1.0 以上
 * 生成语音消息格式
 * @param voiceId 语音的 voiceId，不为空时将忽略 url 属性
 * @param url 语音的URL，发送时可作网络语音的链接；接收时为腾讯语音服务器的链接，可用于语音下载
 * @param path 语音的路径，发送本地语音，相对路径于 `data/net.mamoe.mirai-api-http/voices`
 */
declare function Voice(voiceId?: string | null, url?: string | null, path?: string | null): MessageType.Voice;
/**
 * 富文本消息（譬如合并转发）
 * @param xml
 */
declare function Xml(xml: string): MessageType.Xml;
/**
 * Json 消息格式（我也还没看懂这哪里用，欢迎 PR）
 * @param json
 */
declare function Json(json: string): MessageType.Json;
/**
 * 小程序
 * @param content
 */
declare function App(content: string): MessageType.App;
/**
 * - "Poke": 戳一戳
 * - "ShowLove": 比心
 * - "Like": 点赞
 * - "Heartbroken": 心碎
 * - "SixSixSix": 666
 * - "FangDaZhao": 放大招
 * @param name 戳一戳的类型
 */
declare function Poke(name: MessageType.PokeName): MessageType.Poke;
/**
 * （实验性）需要 mirai-api-http 1.11.0 以上，mirai-console 2.5.1 以上
 * 文件消息格式
 * @param id 文件唯一 ID
 * @param internalId 服务器需要的 ID
 * @param name 文件名字
 * @param size 文件大小
 */
declare function File(id: string, internalId: number, name: string, size: number): MessageType.File;
declare const _default: {
    Quote: typeof Quote;
    At: typeof At;
    AtAll: typeof AtAll;
    Face: typeof Face;
    Plain: typeof Plain;
    Image: typeof Image;
    FlashImage: typeof FlashImage;
    Voice: typeof Voice;
    Xml: typeof Xml;
    Json: typeof Json;
    App: typeof App;
    Poke: typeof Poke;
    File: typeof File;
};
export default _default;
