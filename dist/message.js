"use strict";
/**
 * 生成对应消息格式
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 生成引用的消息格式
 * @param messageId 消息 ID
 */
function Quote(messageId) {
    return {
        type: "Quote",
        id: messageId,
    };
}
/**
 * 生成艾特默认的消息格式
 * @param target QQ 号
 */
function At(target) {
    return {
        type: "At",
        target: target,
        display: "",
    };
}
/**
 * 生成艾特全体成员的消息格式
 */
function AtAll() {
    return {
        type: "AtAll",
    };
}
/**
 * 生成 QQ 原生表情消息格式
 * @param faceId QQ表情编号
 * @param name QQ表情拼音，可选
 */
function Face(faceId, name) {
    if (name === void 0) { name = ""; }
    return {
        type: "Face",
        faceId: faceId,
        name: name,
    };
}
/**
 * 生成文本消息格式
 * @param text 文本
 */
function Plain(text) {
    return {
        type: "Plain",
        text: text,
    };
}
/**
 * 生成图片消息格式
 * @param imageId 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
 * @param url 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
 * @param path 图片的路径，发送本地图片，相对路径于 `data/net.mamoe.mirai-api-http/images`
 */
function Image(imageId, url, path) {
    if (imageId === void 0) { imageId = null; }
    if (url === void 0) { url = null; }
    if (path === void 0) { path = null; }
    return {
        type: "Image",
        imageId: imageId,
        url: url,
        path: path,
    };
}
/**
 * 生成闪照消息格式
 * @param imageId 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
 * @param url 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
 * @param path 图片的路径，发送本地图片，相对路径于 `data/net.mamoe.mirai-api-http/images`
 */
function FlashImage(imageId, url, path) {
    if (imageId === void 0) { imageId = null; }
    if (url === void 0) { url = null; }
    if (path === void 0) { path = null; }
    return {
        type: "FlashImage",
        imageId: imageId,
        url: url,
        path: path,
    };
}
/**
 * 需要 mirai-api-http 1.8.2 以上，mirai-console 1.0 以上
 * 生成语音消息格式
 * @param voiceId 语音的 voiceId，不为空时将忽略 url 属性
 * @param url 语音的URL，发送时可作网络语音的链接；接收时为腾讯语音服务器的链接，可用于语音下载
 * @param path 语音的路径，发送本地语音，相对路径于 `data/net.mamoe.mirai-api-http/voices`
 */
function Voice(voiceId, url, path) {
    if (voiceId === void 0) { voiceId = null; }
    if (url === void 0) { url = null; }
    if (path === void 0) { path = null; }
    return {
        type: "Voice",
        voiceId: voiceId,
        url: url,
        path: path,
    };
}
/**
 * 富文本消息（譬如合并转发）
 * @param xml
 */
function Xml(xml) {
    return {
        type: "Xml",
        xml: xml,
    };
}
/**
 * Json 消息格式（我也还没看懂这哪里用，欢迎 PR）
 * @param json
 */
function Json(json) {
    return {
        type: "Json",
        json: json,
    };
}
/**
 * 小程序
 * @param content
 */
function App(content) {
    return {
        type: "App",
        content: content,
    };
}
/**
 * - "Poke": 戳一戳
 * - "ShowLove": 比心
 * - "Like": 点赞
 * - "Heartbroken": 心碎
 * - "SixSixSix": 666
 * - "FangDaZhao": 放大招
 * @param name 戳一戳的类型
 */
function Poke(name) {
    return {
        type: "Poke",
        name: name,
    };
}
/**
 * （实验性）需要 mirai-api-http 1.11.0 以上，mirai-console 2.5.1 以上
 * 文件消息格式
 * @param id 文件唯一 ID
 * @param internalId 服务器需要的 ID
 * @param name 文件名字
 * @param size 文件大小
 */
function File(id, internalId, name, size) {
    return {
        type: "File",
        id: id,
        internalId: internalId,
        name: name,
        size: size,
    };
}
exports.default = {
    Quote: Quote,
    At: At,
    AtAll: AtAll,
    Face: Face,
    Plain: Plain,
    Image: Image,
    FlashImage: FlashImage,
    Voice: Voice,
    Xml: Xml,
    Json: Json,
    App: App,
    Poke: Poke,
    File: File,
};
