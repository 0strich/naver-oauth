const { client_id, client_secret } = require("../config");

const naverHeaders = {
  "Content-Type": "text/html;charset=utf-8",
};

const naverGetTokenHeaders = {
  "X-Naver-Client-Id": client_id,
  "X-Naver-Client-Secret": client_secret,
};

module.exports = { naverHeaders, naverGetTokenHeaders };
