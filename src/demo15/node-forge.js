var forge = require('node-forge');
var pki = forge.pki;
var util = forge.util;
var rsa = forge.rsa;
var pem = forge.pem;

var PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsrxY7zwnU8/u9a5KClEjEHDiGyMXYBJUr+il5Pw9KsVqFuhydjV7EiMBTykQ4XuZdaBWqlA7KMOio9xsL8nuMZOSu3fsmuSvMjt6gX/7kd3TQO2Tbjs8sFokJ3LPYqrhWhHCxFe52USMiKEanKbSZch1uPF1+pQHfV4zo8Mu6FQIDAQAB";
var PRIVATE_KEY = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKyvFjvPCdTz+71rkoKUSMQcOIbIxdgElSv6KXk/D0qxWoW6HJ2NXsSIwFPKRDhe5l1oFaqUDsow6Kj3Gwvye4xk5K7d+ya5K8yO3qBf/uR3dNA7ZNuOzywWiQncs9iquFaEcLEV7nZRIyIoRqcptJlyHW48XX6lAd9XjOjwy7oVAgMBAAECgYEAk2mb506kq//j5R3RolsHizI0Jwt5qSCwXyxc/z4PxcmE5yerievG/Kto056VgjGxIgfahxWBUqVR1/uqQRas1A2j5/de8Y+LcpNrEuwF8YgOWmK3EAty0pgHQ1ezYSaxJ2AMBF427UrzMpGrB77UEzGE07GxbbC/sK/u66h0A/kCQQD89Q3OmWV8Gxie8XkWHeiUhseo3kZ9AYy7tRpsEkTkkWZAK2znphdHl35yDk0Cqu4uCe3usz6TfRlWu+3WK5k3AkEArsLXtUUt1IVeM0Z0Oxz8AWMb4v1lJiS4BhotZs7fyZ6DnMd+LIdfqQCLl9j3hCzdxEqIqmcuL2uGy1OYdfz9EwJAF+lGM9hWOoQJMMUcsBWFrbyL1Q+l1B04Y2n8JGkZsA16f+ha9A7ENpVAc6Gcb/seZqWzoxO4f5KcuZEsK0mVwwJAIp4qCJhZib2ZeWK9Z3BIYyX0wjQbs0CWy26oC7NzFQc3XvkNf1iZlGqtPDkYXrBchaOWCttBhNcx7ljy3HxuzQJAQxcxqCOUmLJah+Mtjb+aJQ2L6Lg3mBA62WNGxXDzpX2pAcJVZ7bNcsBq41rOpQEtQ8bEyj/Nfxxsxy/F57xuCQ==";
var PUBLIC_KEY_PEM = "-----BEGIN PUBLIC KEY-----\n" +
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsrxY7zwnU8/u9a5KClEjEHDiG\n" +
  "yMXYBJUr+il5Pw9KsVqFuhydjV7EiMBTykQ4XuZdaBWqlA7KMOio9xsL8nuMZOSu\n" +
  "3fsmuSvMjt6gX/7kd3TQO2Tbjs8sFokJ3LPYqrhWhHCxFe52USMiKEanKbSZch1u\n" +
  "PF1+pQHfV4zo8Mu6FQIDAQAB\n" +
  "-----END PUBLIC KEY-----";
var　PRIVATE_KEY_PEM = "-----BEGIN PRIVATE KEY-----\n" +
  "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKyvFjvPCdTz+71r\n" +
  "koKUSMQcOIbIxdgElSv6KXk/D0qxWoW6HJ2NXsSIwFPKRDhe5l1oFaqUDsow6Kj3\n" +
  "Gwvye4xk5K7d+ya5K8yO3qBf/uR3dNA7ZNuOzywWiQncs9iquFaEcLEV7nZRIyIo\n" +
  "RqcptJlyHW48XX6lAd9XjOjwy7oVAgMBAAECgYEAk2mb506kq//j5R3RolsHizI0\n" +
  "Jwt5qSCwXyxc/z4PxcmE5yerievG/Kto056VgjGxIgfahxWBUqVR1/uqQRas1A2j\n" +
  "5/de8Y+LcpNrEuwF8YgOWmK3EAty0pgHQ1ezYSaxJ2AMBF427UrzMpGrB77UEzGE\n" +
  "07GxbbC/sK/u66h0A/kCQQD89Q3OmWV8Gxie8XkWHeiUhseo3kZ9AYy7tRpsEkTk\n" +
  "kWZAK2znphdHl35yDk0Cqu4uCe3usz6TfRlWu+3WK5k3AkEArsLXtUUt1IVeM0Z0\n" +
  "Oxz8AWMb4v1lJiS4BhotZs7fyZ6DnMd+LIdfqQCLl9j3hCzdxEqIqmcuL2uGy1OY\n" +
  "dfz9EwJAF+lGM9hWOoQJMMUcsBWFrbyL1Q+l1B04Y2n8JGkZsA16f+ha9A7ENpVA\n" +
  "c6Gcb/seZqWzoxO4f5KcuZEsK0mVwwJAIp4qCJhZib2ZeWK9Z3BIYyX0wjQbs0CW\n" +
  "y26oC7NzFQc3XvkNf1iZlGqtPDkYXrBchaOWCttBhNcx7ljy3HxuzQJAQxcxqCOU\n" +
  "mLJah+Mtjb+aJQ2L6Lg3mBA62WNGxXDzpX2pAcJVZ7bNcsBq41rOpQEtQ8bEyj/N\n" +
  "fxxsxy/F57xuCQ==\n" +
  "-----END PRIVATE KEY-----";


/**
 * 加密
 * @param text 待加密的字符串
 * @param key 加密的key
 * @param isPub 是否使用publicKey加密，默认false
 * @returns {*}
 */
function encrypt(text, key, isPub) {
  // Encrypt with key...
  var encryptKey = key;
  var buffer = util.createBuffer(util.encodeUtf8(text));
  var binaryString = buffer.getBytes();
  if(isPub) {
    return util.encode64(encryptKey.encrypt(binaryString));
  } else {
    return util.encode64(encryptKey.encrypt(binaryString));
  }
}

/**
 * 解密
 * @param text 待解密的字符串
 * @param key 解密的key
 * @param isPub 是否使用publicKey解密，默认false
 * @returns {*}
 */
function decrypt(text, key, isPub) {
  // Decrypt with key...
  var decryptKey = key;
  var binaryString = util.decode64(text);
  if(isPub) {
    return util.decodeUtf8(decryptKey.decrypt(binaryString));
  } else {
    return util.decodeUtf8(decryptKey.decrypt(binaryString));
  }
}

/**
 * 将PKCS#1转换为PKCS#8
 * @param prvKeyObj
 * @returns {the|*}
 */
function privateKeyPKCS1ToPKCS8(prvKeyObj) {
  // 生成pkcs#8格式的pem
  const rsaPrivateKey = pki.privateKeyToAsn1(prvKeyObj);
  const privateKeyInfo = pki.wrapRsaPrivateKey(rsaPrivateKey);
  const privateKeyPem = pki.privateKeyInfoToPem(privateKeyInfo);
  return pki.privateKeyFromPem(privateKeyPem);
}

/**
 * 提取pem中的body
 * @param Pem
 * @returns {the|*}
 */
function bodyFromPem(Pem) {
  return util.encode64(pem.decode(Pem)[0].body);
}

function test() {
  var keyPair = {
    prvKeyObj: privateKeyPKCS1ToPKCS8(pki.privateKeyFromPem(PRIVATE_KEY_PEM)),
    pubKeyObj: pki.publicKeyFromPem(PUBLIC_KEY_PEM),
  };

  var prvKeyObj = keyPair.prvKeyObj;
  var pubKeyObj = keyPair.pubKeyObj;

  // 生成pem
  const privateKeyPem = pki.privateKeyToPem(prvKeyObj);
  // 从pem中解析body
  const privateKey = bodyFromPem(privateKeyPem);
  // 生成pem
  const publicKeyPem = pki.publicKeyToPem(pubKeyObj);
  // 从pem中解析body
  const publicKey = bodyFromPem(publicKeyPem);
  console.log(privateKey);
  console.log(publicKey);


  var plainText = 'Java中文';
  var encryptText = encrypt(plainText, pubKeyObj, true);
  console.log(plainText, encryptText);
  var decryptText = decrypt(encryptText, prvKeyObj, false);
  console.log(plainText, decryptText);

  // 私钥加密，公钥验签有问题
  // var plainText = 'Java中文2';
  // var encryptText = encrypt(plainText, prvKeyObj, false);
  // console.log(plainText, encryptText);
  // var decryptText = decrypt(encryptText, pubKeyObj, true);
  // console.log(plainText, decryptText);

}

test();
