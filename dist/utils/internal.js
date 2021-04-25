"use strict";
/**
 * mirai-ts 内部自用的工具方法（不导出）
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitText = exports.getPlain = void 0;
/**
 * 获取纯文本
 *
 * > getPlain 已自动调用并挂载于 msg 上，你可以直接使用 msg.plain 获取纯文本内容，而无须调用 getPlain。
 * @param messageChain 消息链
 */
function getPlain(messageChain) {
    var msg = "";
    messageChain.forEach(function (chain) {
        if (chain.type === "Plain")
            msg += chain.text;
    });
    return msg;
}
exports.getPlain = getPlain;
/**
 * 分离文本
 * @param text
 */
function splitText(text) {
    var sections = [];
    if (text.length < 900) {
        sections.push(text);
    }
    else {
        var number = Math.ceil(text.length / 800);
        for (var i = 0; i < number; i++) {
            var section = text.slice(i * 800, (i + 1) * 800);
            sections.push(section);
        }
    }
    return sections;
}
exports.splitText = splitText;