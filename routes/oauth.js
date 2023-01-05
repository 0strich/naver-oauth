const express = require("express");
const qs = require("qs");
const router = express.Router();
const controller = require("../controllers/oauth");

// 네이버 로그인 페이지
router.get("/naver/login", controller.naverLogin);

// 네이버 리다이렉트(콜백)
router.get("/naver/callback", controller.naverCallback);

// 네이버 회원 정보 조회
router.get("/naver/member", controller.naverMember);

module.exports = router;
