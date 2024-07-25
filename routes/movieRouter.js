const movieCtrl = require('../controllers/movieCtrl');
const router = require('express').Router(); // Router의 오타 수정

// 라우터 설정
router.get('/', movieCtrl.getMovies); // 조회
// router.post('/', movieCtrl.insertMovies); // 등록
router.post('/', movieCtrl.insComCode); // 등록

module.exports = router;

