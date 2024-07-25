const express = require('express');
const fs = require('fs');
const cors = require('cors'); // cors를 require를 통해 불러옵니다.
const path = require('path'); // path는 Node.js의 내장 모듈입니다.
const port = 4000;

const app = express(); // express 인스턴스를 생성합니다.

// JSON 본문을 파싱하기 위한 미들웨어
app.use(express.json());

// URL 인코딩된 본문을 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true }));

// CORS 설정
app.use(cors());

// 라우터 설정
const movieRouter = require('./routes/movieRouter');
app.use('/api/movie', movieRouter);

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 실행되었습니다. http://localhost:${port}`);
});
