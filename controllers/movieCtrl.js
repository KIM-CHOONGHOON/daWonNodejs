const connection = require('../dbconfig');

const movieCtrl = {
    getMovies: async (req, res) => {
        // 데이터베이스 쿼리 실행
        connection.query('SELECT id, title, actor, genre, Showtime FROM movietest.movie', (error, results, fields) => {
            if (error) {
                // 오류 발생 시 클라이언트에 오류 메시지 응답
                console.error('데이터베이스 쿼리 오류:', error);
                return res.status(500).json({ error: '데이터베이스 쿼리 오류' });
            }

            // '이봉원'을 배우로 가진 행만 필터링
            const filteredResults = results.filter(item => item.actor === '신봉선');

            // 필터링된 결과가 있는 경우에만 로그 출력
            if (filteredResults.length <= 0) {
                console.log("신봉선에 대한 정보가 없습니다.")
            } else {
                console.log("신봉선의 영화들 결과 : ", filteredResults)
                // 필터링된 결과의 각 항목을 콘솔에 출력
                filteredResults.forEach(item => {
                    console.log('ID:', item.id);
                    console.log('Title:', item.title);
                    console.log('Actor:', item.actor);
                    console.log('Genre:', item.genre);
                    console.log('Showtime:', item.Showtime);
                    console.log('---'); // 각 영화 항목 사이에 구분선 추가
                });
            }

            console.log(results);
            // 쿼리 결과를 클라이언트에 응답
            res.json(results);

        });
    },
    insertMovies: async (req, res) => {

        //{
        //    "id" : "6",
        //    "title" : "노션",
        //    "actor" : "이강사",
        //    "genre" : "교육",
        //    "Showtime" : "90"
        //
        //}



        const { id, title, actor, genre, Showtime } = req.body;

        // 쿼리 문을 두 부분으로 나눈 후 결합
        const sqlMain = 'INSERT INTO movietest.movie (id, title, actor, genre, Showtime) ';
        const sqlValue = 'VALUES (?, ?, ?, ?, ?)';
        const insMovie = sqlMain + sqlValue;

        console.log(insMovie); // 생성된 쿼리 로그 출력

        // 데이터베이스 쿼리 실행
        connection.query(insMovie, [id, title, actor, genre, Showtime], (error, results, fields) => {
            if (error) {
                // 오류 발생 시 클라이언트에 오류 메시지 응답
                console.error('신규 정보 생성시 오류 발생되었습니다. :', error);
                return res.status(500).json({ error: '신규 정보 생성시 오류 발생되었습니다.' });
            }

            console.log(results);
            // 쿼리 결과를 클라이언트에 응답
            res.json(results);
        });
    },
    insComCode: async (req, res) => {

        const { jbds, grp_cd, lrdv_cd, mddv_cd, lrdv_title, mddv_nm, lrdv_compr_title, mddv_compr_title, use_yn, otpt_sqc } = req.body;

        const numOtptSqc = Number(otpt_sqc);


        // 쿼리 문을 두 부분으로 나눈 후 결합
        const sqlMain = 'INSERT INTO common_db.com_cd_mstr (grp_cd, lrdv_cd, mddv_cd,lrdv_title, mddv_nm, lrdv_compr_title,mddv_compr_title, use_yn, otpt_sqc,frst_creat_emplo, frst_rgsn_dt, last_amnn_dt, last_amnn_emplo)';
        const sqlValue = 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)';
        const insMovie = sqlMain + sqlValue;

        console.log(insMovie); // 생성된 쿼리 로그 출력

        // 데이터베이스 쿼리 실행
        connection.query(insMovie, [grp_cd, lrdv_cd, mddv_cd, lrdv_title, mddv_nm, lrdv_compr_title, mddv_compr_title, use_yn, numOtptSqc, 'boss000001', 'boss000001'], (error, results, fields) => {

            if (error) {
                // 오류 발생 시 클라이언트에 오류 메시지 응답
                console.error('신규 정보 생성시 오류 발생되었습니다. :', error);
                return res.status(500).json({ error: '신규 정보 생성시 오류 발생되었습니다.' });
            }

            console.log(results);
            // 쿼리 결과를 클라이언트에 응답
            res.json(results);
        });
    }

};


module.exports = movieCtrl;

