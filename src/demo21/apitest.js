const HOST = 'https://zhihui.izaiqi.com';
const PROJECT = '/yanglao-huliyuan';

const tenant = (url) => {
  const REGEXP = '(/[\w\-]*)';
  const REPLACE_REGEXP = /[\$\.\?\/\^\|\\w\\-]/g;
  const STRING_REGEXP = `^${HOST.replace(REPLACE_REGEXP,"\\$&")}${REGEXP.replace(REPLACE_REGEXP,"\\$&")}${PROJECT.replace(REPLACE_REGEXP,"\\$&")}\/`;
  const regExp = new RegExp(STRING_REGEXP);
  const match = url.match(regExp);
  if(match) {
    return match[1];
  }
  return match;
};

console.log(tenant('https://zhihui.izaiqi.com/hzyly/yanglao-huliyuan/chuangwei?louhao=B&louceng=1&fanghao=1&chuanghao=1'));
