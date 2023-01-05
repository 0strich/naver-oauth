const axios = require("axios");
const qs = require("qs");
const env = require("../config");
const { naverHeaders, naverGetTokenHeaders } = require("../lib/reqConf");

// 인메모리(임시 DB 역할)
let saveToken = {};
const fnSaveToken = (body = {}) => {
  saveToken.access_token = body?.access_token;
  saveToken.refresh_token = body?.refresh_token;
  saveToken.token_type = body?.token_type;
  saveToken.expires_in = body?.expires_in;
};

// 네이버 로그인
const naverLogin = async (req, res) => {
  try {
    // make api_url
    const oauth_uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code`;
    const queryOption = { encode: false };
    const queryParams = {
      client_id: env?.client_id,
      redirect_uri: env?.redirect_uri,
      state: env?.state,
    };
    const query = qs.stringify(queryParams, queryOption);

    const api_url = `${oauth_uri}&${query}`;
    const naverButtonImage = `http://static.nid.naver.com/oauth/small_g_in.PNG`;

    const end = `<a href="${api_url}"><img height='50' src='${naverButtonImage}'/></a>`;

    res.writeHead(200, naverHeaders);
    res.end(end);
  } catch (error) {
    res.send("error");
  }
};

// 네이버 리다이렉트(콜백)
const naverCallback = async (req, res) => {
  try {
    // make api_url
    const code = req.query.code;
    const state = req.query.state;
    const oauth_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code`;
    const queryOption = { encode: false };
    const queryParams = {
      client_id: env?.client_id,
      client_secret: env?.client_secret,
      redirect_uri: env?.redirect_uri,
      code,
      state,
    };

    const query = qs.stringify(queryParams, queryOption);
    const api_url = `${oauth_url}&${query}`;

    const response = await axios.get(api_url, naverGetTokenHeaders);

    // 임시 DB 저장
    fnSaveToken(response.data);

    res.json(response.data);
  } catch (error) {
    res.send("error");
  }
};

// 네이버 회원 정보 조회
const naverMember = async (req, res) => {
  const token = saveToken?.access_token;
  const header = "Bearer " + token; // Bearer 다음에 공백 추가

  const api_url = "https://openapi.naver.com/v1/nid/me";
  const headers = { headers: { Authorization: header } };
  const response = await axios.get(api_url, headers);

  res.send(response.data.response);

  try {
  } catch (error) {
    res.send("error");
  }
};

module.exports = { naverLogin, naverCallback, naverMember };
