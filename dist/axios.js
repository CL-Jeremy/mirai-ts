"use strict";
/**
 * 实际上你基本不需要用到它，mirai-ts 实例化时已经自动设置。
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const axios_1 = __importDefault(require("axios"));
const log = __importStar(require("./utils/log"));
/**
 * 初始化 axios
 * @param baseURL 请求的基础 URL
 * @param timeout  请求超时时间
 */
function init(baseURL, timeout = 0) {
    axios_1.default.defaults.baseURL = baseURL;
    axios_1.default.defaults.timeout = timeout;
    axios_1.default.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        log.error("请求发送失败");
        return Promise.reject(error);
    });
    return axios_1.default;
}
exports.init = init;
