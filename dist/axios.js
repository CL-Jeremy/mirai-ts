"use strict";
/**
 * 实际上你基本不需要用到它，mirai-ts 实例化时已经自动设置。
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var axios_1 = __importDefault(require("axios"));
/**
 * 初始化 axios
 * @param baseURL 请求的基础 URL
 * @param timeout  请求超时时间
 */
function init(baseURL, timeout) {
    if (timeout === void 0) { timeout = 0; }
    axios_1.default.defaults.baseURL = baseURL;
    axios_1.default.defaults.timeout = timeout;
    axios_1.default.interceptors.request.use(function (config) {
        return config;
    }, function (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error(err);
        }
        return Promise.reject(err);
    });
    return axios_1.default;
}
exports.init = init;