/**
 * mirai-ts 默认导出内容
 * @packageDocumentation
 */
import Mirai from "./mirai";
export * from "./mirai";
export default Mirai;
export declare type MiraiInstance = Mirai;
import Message from "./message";
import MiraiApiHttp from "./mirai-api-http";
export * from "./utils/index";
import Logger from "@yunyoujun/logger";
export * as check from "./utils/check";
export * as template from "./utils/template";
export * as Api from "./types/api";
export * as Config from "./types/config";
export * as Contact from "./types/contact";
export * as MessageType from "./types/message-type";
export * as EventType from "./types/event-type";
export { MiraiApiHttpConfig } from "./mirai-api-http";
export { Mirai, Message, MiraiApiHttp, Logger };
