/**
 * mirai-ts 内部自用的工具方法（不导出）
 * @packageDocumentation
 */
import * as MessageType from "../types/message-type";
/**
 * 获取纯文本
 *
 * > getPlain 已自动调用并挂载于 msg 上，你可以直接使用 msg.plain 获取纯文本内容，而无须调用 getPlain。
 * @param messageChain 消息链
 */
export declare function getPlain(messageChain: MessageType.MessageChain): string;
/**
 * 分离文本
 * @param text
 */
export declare function splitText(text: string): string[];
