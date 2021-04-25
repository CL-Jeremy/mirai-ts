/**
 * [状态码 | mirai-api-http](https://github.com/project-mirai/mirai-api-http/blob/master/docs/API.md#%E7%8A%B6%E6%80%81%E7%A0%81)
 */
export declare enum StatusCode {
    NORMAL = 0,
    ERROR_AUTH_KEY = 1,
    BOT_NOT_EXIST = 2,
    SESSION_INVALID = 3,
    SESSION_INACTIVATED = 4,
    TARGET_NOT_EXIST = 5,
    FILE_NOT_EXIST = 6,
    NO_OPERATION_AUTH = 10,
    BOT_MUTED = 20,
    MESSAGE_TOO_LONG = 30,
    WRONG_VISIT = 400,
    ERROR_SERVER = 500
}
export declare const StatusCodeMap: Map<StatusCode, string>;
/**
 * 状态码及其对应消息
 * @param code Mirai 状态码
 */
export declare function getMessageFromStatusCode(code: StatusCode): string;
