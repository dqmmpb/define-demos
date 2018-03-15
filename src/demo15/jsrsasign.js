/**
 * Created by alphabeta on 18-2-7.
 */

var RSA = require('jsrsasign');


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


RSA.RSAKey.prototype.getPEM = function(key, pemHeader) {
  return RSA.hextopem(RSA.b64nltohex(key), pemHeader);
};

RSA.RSAKey.prototype.encryptB64 = function (text) {
  return RSA.hextob64(this.encrypt(text));
};

RSA.RSAKey.prototype.decryptB64 = function (text) {
  return this.decrypt(RSA.b64tohex(text));
};

RSA.RSAKey.prototype.getPrivateBaseKey = function () {
  var keyPem = RSA.KEYUTIL.getPEM(this, "PKCS8PRV");
  return RSA.pemtohex(keyPem);
};

RSA.RSAKey.prototype.getPrivateBaseKeyB64 = function () {
  return RSA.hextob64(this.getPrivateBaseKey());
};

RSA.RSAKey.prototype.getPublicBaseKey = function () {
  var keyPem = RSA.KEYUTIL.getPEM(this, "PKCS8PUB");
  return RSA.pemtohex(keyPem);
};

RSA.RSAKey.prototype.getPublicBaseKeyB64 = function () {
  return RSA.hextob64(this.getPublicBaseKey());
};

RSA.RSAKey.prototype.readPKCS8PrvKeyFromB64 = function (prvKeyB64) {
  var prvKeyPem = this.getPEM(prvKeyB64, "PRIVATE KEY");
  this.readPKCS8PrvKeyHex(RSA.pemtohex(prvKeyPem));
};

RSA.RSAKey.prototype.readPKCS8PubKeyFromB64 = function (pubKeyB64) {
  var pubKeyPem = this.getPEM(pubKeyB64, "PUBLIC KEY");
  this.readPKCS8PubKeyHex(RSA.pemtohex(pubKeyPem));
};

RSA.RSAKey.readPKCS9KeypairFromB64 = function(prvKeyB64, pubKeyB64) {
  var prvKey = new RSA.RSAKey();
  prvKey.readPKCS8PrvKeyFromB64(prvKeyB64);
  var pubKey = new RSA.RSAKey();
  pubKey.readPKCS8PubKeyFromB64(pubKeyB64);

  var result = {};
  result.prvKeyObj = prvKey;
  result.pubKeyObj = pubKey;
  return result;
};

/**
 * 加密
 * @param text 待加密的字符串
 * @param key 加密的key
 * @param isPub 是否使用publicKey加密，默认false
 * @returns {*}
 */
function encrypt(text, key, isPub) {
  // Encrypt with key...
  var rsa = new RSA.RSAKey();
  if(isPub) {
    rsa.readPKCS8PubKeyFromB64(key);
  } else {
    rsa.readPKCS8PrvKeyFromB64(key);
  }
  var encrypted = rsa.encryptB64(text);

  return encrypted;
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
  var rsa = new RSA.RSAKey();
  if(isPub) {
    rsa.readPKCS8PubKeyFromB64(key);
  } else {
    rsa.readPKCS8PrvKeyFromB64(key);
  }
  var decrypted = rsa.decryptB64(text);

  return decrypted;
}

function test() {
  var keyPair = RSA.RSAKey.readPKCS9KeypairFromB64(PRIVATE_KEY, PUBLIC_KEY);
  //var keyPair = RSA.KEYUTIL.generateKeypair("RSA", 1024);

  var prvKeyObj = keyPair.prvKeyObj;
  var pubKeyObj = keyPair.pubKeyObj;
  var privateKey = prvKeyObj.getPrivateBaseKeyB64();
  var publicKey = pubKeyObj.getPublicBaseKeyB64();
  console.log(privateKey);
  console.log(publicKey);


  var plainText = 'Java中文';
  var encryptText = encrypt(plainText, publicKey, true);
  console.log(plainText, encryptText);
  var decryptText = decrypt(encryptText, privateKey, false);
  console.log(plainText, decryptText);

  // 私钥加密，公钥验签有问题
  var plainText = 'Java中文2';
  var encryptText = encrypt(plainText, privateKey, false);
  console.log(plainText, encryptText);
  var decryptText = decrypt(encryptText, publicKey, true);
  console.log(plainText, decryptText);
}

test();

