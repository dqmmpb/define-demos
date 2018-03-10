/**
 * Created by alphabeta on 18-1-31.
 */

const hash = [
  "#/",
  "#/?k=123",
  "#/?_k=123",
  "#/login",
  "#/login?k=123",
  "#/login?_k=123",
  "#/admin?k=123",
  "#/admin?_k=123",
  "#/admin/add?_k=123",
  "#/admin/add/?_k=123",
  "#/admin/delete/test?_k=123",
];

const hashPath = (hash) => {
  const regExp = /^(?:#)((?:\/[0-9a-zA-Z_!~*'().;:@&=+$,%#-]*)*)?(?:\?[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]*)?$/i;
  const matchResult = hash && hash.match(regExp);
  if (matchResult && matchResult.length) {
    return matchResult[1];
  }
};

hash.forEach(item => {
  console.log(hashPath(item));
});
