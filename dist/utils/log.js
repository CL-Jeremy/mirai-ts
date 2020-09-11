"use strict";
/**
 * 辅助工具，输出彩色控制台信息。
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warning = exports.success = exports.info = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = (msg) => {
    console.log(chalk_1.default.cyan("[mirai-ts]"), msg);
};
/**
 * 输出提示信息（蓝色）
 * @param msg 文本
 */
const info = (msg) => {
    log(chalk_1.default.blue(msg));
};
exports.info = info;
/**
 * 输出成功信息（绿色）
 * @param msg 文本
 */
const success = (msg) => {
    log(chalk_1.default.green(msg));
};
exports.success = success;
/**
 * 输出警告信息（黄色）
 * @param msg 文本
 */
const warning = (msg) => {
    log(chalk_1.default.yellow(msg));
};
exports.warning = warning;
/**
 * 输出错误信息（红色）
 * @param msg 文本
 */
const error = (msg) => {
    log(chalk_1.default.red(msg));
};
exports.error = error;
