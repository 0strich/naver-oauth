const express = require("express");
const qs = require("qs");
const router = express.Router();
const controller = require("../controllers/oauth");

// 네이버 로그인 페이지
router.get("/naver/login", controller.naverLogin);

module.exports = router;
