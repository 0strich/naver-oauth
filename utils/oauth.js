const qs = require("qs");
const env = require("../config");

// 네이버 로그인
const naverLogin = async (req, res) => {
  try {
    const api_uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code`;
    const client_id = env?.client_id;
    const redirect_uri = env?.redirect_uri;
    const state = env?.state;

    const uris = { api_uri, client_id, redirect_uri, state };
  } catch (error) {
    res.send("error");
  }
};

module.exports = { naverLogin };
