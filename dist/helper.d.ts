/**
 * mirai-ts 内部 helper
 * @packageDocumentation
 */
import Mirai from "./mirai";
import type { MessageType, EventType } from ".";
/**
 * 为消息和事件类型挂载辅助函数
 * @param msg
 */
export declare function createHelperForMsg(mirai: Mirai, msg: MessageType.ChatMessage | EventType.Event): void;
