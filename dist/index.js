"use strict";
/**
 * mirai-ts 默认导出内容
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.Logger = exports.MiraiApiHttp = exports.Message = exports.Mirai = exports.EventType = exports.MessageType = exports.Contact = exports.Config = exports.Api = exports.template = exports.check = void 0;
var mirai_1 = __importDefault(require("./mirai"));
exports.Mirai = mirai_1.default;
__exportStar(require("./mirai"), exports);
exports.default = mirai_1.default;
// 必须放在最前面，适配 js require
if (typeof window === "undefined" && typeof module !== "undefined") {
    module.exports = mirai_1.default;
    module.exports.default = mirai_1.default;
    module.exports.Mirai = mirai_1.default;
    exports = module.exports;
}
var message_1 = __importDefault(require("./message"));
exports.Message = message_1.default;
var mirai_api_http_1 = __importDefault(require("./mirai-api-http"));
exports.MiraiApiHttp = mirai_api_http_1.default;
// 工具
__exportStar(require("./utils/index"), exports);
// https://www.npmjs.com/package/@yunyoujun/logger
var logger_1 = __importDefault(require("@yunyoujun/logger"));
exports.Logger = logger_1.default;
exports.check = __importStar(require("./utils/check"));
exports.template = __importStar(require("./utils/template"));
// 类型
exports.Api = __importStar(require("./types/api"));
exports.Config = __importStar(require("./types/config"));
exports.Contact = __importStar(require("./types/contact"));
exports.MessageType = __importStar(require("./types/message-type"));
exports.EventType = __importStar(require("./types/event-type"));