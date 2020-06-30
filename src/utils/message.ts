/**
 * 消息匹配辅助函数，提供了默认的几种匹配方式，可以直接导入使用。
 * @packageDocumentation
 */

import { Config } from "../..";

/**
 * 匹配是否相同，当 keywords 为数组时，代表或，有一个相同即可
 * @param str 字符串
 * @param keywords 关键字
 */
function is(str: string, keywords: string | string[]): boolean {
  if (Array.isArray(keywords)) {
    return keywords.some((keyword) => {
      return str === keyword;
    });
  } else {
    return str === keywords;
  }
}

/**
 * 匹配是否包含，当 keywords 为数组时，代表同时包含
 * @param str 字符串
 * @param keywords  关键字
 */
function includes(str: string, keywords: string | string[]): boolean {
  if (Array.isArray(keywords)) {
    return keywords.every((keyword) => {
      /**
       * 有 false 时跳出循环
       */
      return str.includes(keyword);
    });
  } else {
    return str.includes(keywords);
  }
}

function re(str: string, config: Config.Re): RegExpMatchArray | null {
  const regExp = new RegExp(config.pattern, config.flags || "i");
  return regExp.exec(str);
}

/**
 * 是否匹配
 * @param str 字符串
 * @param ans 回答的语法配置
 */
function match(str: string, ans: Config.Match): boolean | RegExpMatchArray | null {
  if (ans.re) return re(str, ans.re);
  if (ans.is) return is(str, ans.is);
  if (ans.includes) return includes(str, ans.includes);
  return false;
}

export {
  is,
  includes,
  re,
  match
};
