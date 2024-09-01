import mysql from 'mysql2';


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1449913luda', // замените на ваш пароль
    database: 'product_db'
});




export default connection;
