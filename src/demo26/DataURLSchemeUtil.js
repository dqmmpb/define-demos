import forge from 'node-forge';

/**
 * Get Inline DataURLScheme
 * @type {RegExp}
 */
export const INLINE_IMAGE_REGEXP = /<img[^>]+(?:src=(["'])(.*?)\1)(?:[^>]+)?>/gi;

// data:,<文本数据>
// data:text/plain,<文本数据>
// data:text/html,<HTML代码>
// data:text/html;base64,<base64编码的HTML代码>
// data:text/css,<CSS代码>
// data:text/css;base64,<base64编码的CSS代码>
// data:text/javascript,<Javascript代码>
// data:text/javascript;base64,<base64编码的Javascript代码>
// data:image/gif;base64,base64编码的gif图片数据
// data:image/png;base64,base64编码的png图片数据
// data:image/jpeg;base64,base64编码的jpeg图片数据
// data:image/x-icon;base64,base64编码的icon图片数据
export const DATA_TEXT_REGEXP = /^data:(?:(text\/(?:plain|html|css|javascript))(?:;base64)?)?,/i;
export const DATA_IMAGE_REGEXP = /^data:(image\/(?:jpeg|png|gif|x-icon));base64,/i;

export function getExecMatches(content, regExp) {
  let match;
  const matches = [];

  for(match = regExp.exec(content); match != null; match = regExp.exec(content)) {
    matches.push(match)
  }
  return matches
}

export function getInlineImageMatches(content) {
  return getExecMatches(content, INLINE_IMAGE_REGEXP)
}


export function isDataURLText(data) {
  return DATA_TEXT_REGEXP.test(data);
}

export function isDataURLImage(data) {
  return DATA_IMAGE_REGEXP.test(data);
}

export function isDataURL(data) {
  return isDataURLText(data) || isDataURLImage(data);
}

export function extractInlineImageMimeType(data) {
  const mimeType = DATA_IMAGE_REGEXP.exec(data);
  if (mimeType) {
    return mimeType[1];
  }
}

export function extractInlineImageBase64(data) {
  return data.replace(DATA_IMAGE_REGEXP, '');
}

export function generateCID(data) {
  const md = forge.md.md5.create();
  md.update(data);
  return md.digest().toHex();
}

/**
 * When array is large(>=100KB), String.fromCharCode throw `Uncaught RangeError: Maximum call stack size exceeded`
 * @param arr
 * @returns {string}
 */
const a2s = arr => {
  const array = new Uint8Array(arr)
  const chunk = 8 * 1024

  let res = ''
  let i = 0
  while (i < array.length / chunk) {
    res += String.fromCharCode.apply(null, array.slice(i * chunk, (i + 1) * chunk))
    i += 1;
  }
  res += String.fromCharCode.apply(null, array.slice(i * chunk))

  return res
}

const s2a = str => new Uint8Array(str.split('').map(char => char.charCodeAt(0))).buffer

export function encodeUint8ArrayToBase64(data) {
  return forge.util.encode64(a2s(data))
}

export function decodeBase64ToUint8Array(data) {
  return new Uint8Array(s2a(forge.util.decode64(data)));
}
