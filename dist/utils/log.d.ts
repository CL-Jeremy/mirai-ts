/**
 * 辅助工具，输出彩色控制台信息。
 * @packageDocumentation
 */
/**
 * 输出提示信息（蓝色）
 * @param msg 文本
 */
declare const info: (msg: any) => void;
/**
 * 输出成功信息（绿色）
 * @param msg 文本
 */
declare const success: (msg: any) => void;
/**
 * 输出警告信息（黄色）
 * @param msg 文本
 */
declare const warning: (msg: any) => void;
/**
 * 输出错误信息（红色）
 * @param msg 文本
 */
declare const error: (msg: any) => void;
export { info, success, warning, error };
