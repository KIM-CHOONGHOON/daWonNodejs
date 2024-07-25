const fs = require('fs');
const mysql = require('mysql');

// ****************************************************
// 1. 데이터베이스 설정 Json 파일을 읽어온다
// 2. Json 파일 정보를 변수명에 맞게 나눠 조립한다.
// ****************************************************
const data = fs.readFileSync('./database.json', 'utf8');
const conf = JSON.parse(data);

// MySQL 연결을 생성합니다.
const connection = mysql.createConnection({
    host: conf.host, // conf.localhost 대신 conf.host로 수정
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

// 데이터베이스에 연결합니다.
connection.connect(err => {
    if (err) {
        console.error('데이터베이스 연결 오류:', err.stack);
        return;
    }
    console.log('데이터베이스에 연결되었습니다.');
});

module.exports = connection;
