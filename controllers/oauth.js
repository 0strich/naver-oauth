const axios = require("axios");
const qs = require("qs");
const env = require("../config");
const utils = require("../utils/oauth");

// 네이버 로그인
const naverLogin = async (req, res) => {
  try {
    // make header
    const header = { "Content-Type": "text/html;charset=utf-8" };

    // make query
    const oauth_uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code`;
    const client_id = env?.client_id;
    const redirect_uri = env?.redirect_uri;
    const state = env?.state;

    const queryParams = { client_id, redirect_uri, state };
    const queryOption = { encode: false };
    const query = qs.stringify(queryParams, queryOption);

    const api_url = `${oauth_uri}&${query}`;
    const naverButtonImage = `http://static.nid.naver.com/oauth/small_g_in.PNG`;

    const end = `<a href="${api_url}"><img height='50' src='${naverButtonImage}'/></a>`;

    res.writeHead(200, header);
    res.end(end);
  } catch (error) {
    res.send("error");
  }
};

module.exports = { naverLogin };
