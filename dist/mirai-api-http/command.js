"use strict";
/**
 * 指令系统
 * @packageDocumentation
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
/**
 * https://github.com/project-mirai/mirai-api-http#%E6%8F%92%E4%BB%B6%E7%9B%B8%E5%85%B3console%E7%9B%B8%E5%85%B3
 */
class Command {
    constructor(api) {
        this.api = api;
    }
    /**
     * 注册指令
     * @param name 指令名
     * @param alias 指令别名
     * @param description 指令描述
     * @param usage 指令描述，会在指令执行错误时显示
     */
    register(name, alias, description, usage) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.api.axios.post("/command/register", {
                authKey: this.api.config.authKey,
                name,
                alias,
                description,
                usage,
            });
            return data;
        });
    }
    /**
     * 发送指令
     * @param name 指令名
     * @param args 指令参数
     */
    send(name, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.api.axios.post("/command/send", {
                authKey: this.api.config.authKey,
                name,
                args,
            });
            return data;
        });
    }
}
exports.Command = Command;
