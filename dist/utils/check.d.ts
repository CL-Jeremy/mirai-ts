/**
 * 消息匹配辅助函数，提供了默认的几种匹配检测方式，可以直接导入使用。
 * @packageDocumentation
 */
import * as MessageType from "../types/message-type";
import * as EventType from "../types/event-type";
/**
 * 配置类型
 * @packageDocumentation
 */
/**
 * 正则表达式
 */
export interface Re {
    pattern: string;
    flags: string;
}
/**
 * 匹配配置
 */
export interface Match {
    re?: Re;
    is?: string | string[];
    includes?: string | string[];
}
/**
 * 匹配是否相同，当 keywords 为数组时，代表或，有一个相同即可
 * @param str 字符串
 * @param keywords 关键字
 */
export declare function is(str: string, keywords: string | string[]): boolean;
/**
 * 匹配是否包含，当 keywords 为数组时，代表同时包含
 * @param str 字符串
 * @param keywords  关键字
 */
export declare function includes(str: string, keywords: string | string[]): boolean;
/**
 * 正则匹配（存在时，返回匹配的情况，不存在时返回 false）
 * @param str 字符
 * @param config 正则配置，可以是包含 pattern，flags 的对象，也可以是字符串（直接代表 pattern）
 */
export declare function re(str: string, config: Re | string): RegExpMatchArray | boolean;
/**
 * 是否匹配
 * @param str 字符串
 * @param ans 回答的语法配置
 */
export declare function match(str: string, ans: Match): boolean | RegExpMatchArray | null;
/**
 * 是否是文本信息中的一种
 * ['FriendMessage', 'GroupMessage', 'TempMessage']
 * @param msg 消息链
 */
export declare function isMessage(msg: MessageType.ChatMessage | EventType.Event): msg is MessageType.ChatMessage;
/**
 * 是否被艾特
 * 传入 qq 时，返回是否被艾特
 * 未传入 qq 时，返回艾特消息
 * @param msg
 */
export declare function isAt(msg: MessageType.ChatMessage, qq?: number): boolean | MessageType.At | undefined;
