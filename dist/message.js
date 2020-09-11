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
        target,
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
function Face(faceId, name = "") {
    return {
        type: "Face",
        faceId,
        name,
    };
}
/**
 * 生成文本消息格式
 * @param text 文本
 */
function Plain(text) {
    return {
        type: "Plain",
        text,
    };
}
/**
 * 生成图片消息格式
 * @param imageId 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
 * @param url 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
 * @param path 图片的路径，发送本地图片，相对路径于 `plugins/MiraiAPIHTTP/images`
 */
function Image(imageId = null, url = null, path = null) {
    return {
        type: "Image",
        imageId,
        url,
        path,
    };
}
/**
 * 生成闪照消息格式
 * @param imageId 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
 * @param url 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
 * @param path 图片的路径，发送本地图片，相对路径于 `plugins/MiraiAPIHTTP/images`
 */
function FlashImage(imageId = null, url = null, path = null) {
    return {
        type: "FlashImage",
        imageId,
        url,
        path,
    };
}
/**
 * 生成语音消息格式
 * @param voiceId 语音的 voiceId，不为空时将忽略 url 属性
 * @param url 语音的URL，发送时可作网络语音的链接；接收时为腾讯语音服务器的链接，可用于语音下载
 * @param path 语音的路径，发送本地语音，相对路径于 `plugins/MiraiAPIHTTP/voices`
 */
function Voice(voiceId = null, url = null, path = null) {
    return {
        type: "Voice",
        voiceId,
        url,
        path,
    };
}
/**
 * 富文本消息（譬如合并转发）
 * @param xml
 */
function Xml(xml) {
    return {
        type: "Xml",
        xml,
    };
}
/**
 * Json 消息格式（我也还没看懂这哪里用，欢迎 PR）
 * @param json
 */
function Json(json) {
    return {
        type: "Json",
        json,
    };
}
/**
 * 小程序
 * @param content
 */
function App(content) {
    return {
        type: "App",
        content,
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
        name,
    };
}
exports.default = {
    Quote,
    At,
    AtAll,
    Face,
    Plain,
    Image,
    FlashImage,
    Voice,
    Xml,
    Json,
    App,
    Poke,
};
