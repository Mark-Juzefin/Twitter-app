require('dotenv').config();
const { Pool } = require('pg');

let db = {}
// console.log('START DT INITIALAZE');


// setTimeout(async() => {
  
//     db = await new Pool({
//         connectionString: 'postgresql://root@node_1:26257/postgres?sslmode=disable',
//         connectionTimeoutMillis: 10000
//     })
//     const createDataBaseSQL = `CREATE DATABASE IF NOT EXISTS postgres`

//   const createTableUsersSQL = `
//   CREATE TABLE IF NOT EXISTS postgres.users (
//     id SERIAL PRIMARY KEY,
//     name varchar(250),
//     screen_name varchar(250)
//   );
// `

//   const createTableTweetsSQL = `
//   CREATE TABLE IF NOT EXISTS postgres.tweets
//   (
//     id SERIAL PRIMARY KEY,
//     text varchar(250),
//     user_id integer REFERENCES users(id)
//   )
// `
//   const insertUsers = `
//   insert into postgres.users (name, screen_name)
//   values 
//   ('Illya Yarema', 'yarema'),
//   ('Alex Olink', 'alex'),
//   ('Oleg Giga', 'giga'),
//   ('Shreck', 'shreck'),
//   ('Lana Del Rey', 'lana'),
//   ('Ye', 'ye')
//   `
  
    
//     await db.query(createDataBaseSQL, (err, res) => {
//         console.log('pool.query', err)
//       })
//       await db.query(createTableUsersSQL, (err, res) => {
//         console.log('pool.query', err)
//       })
//       await db.query(createTableTweetsSQL, (err, res) => {
//         console.log('pool.query', err)
//       })
//       await db.query(insertUsers, (err, res) => {
//         console.log('pool.query', err)
//       })


   
// }, 20000)






module.export = db
// async function populateDB (pool)  {

  

//   console.log(this.isCreated);

//   const createDataBaseSQL = `CREATE DATABASE IF NOT EXISTS postgres`

//   const createTableUsersSQL = `
//   CREATE TABLE IF NOT EXISTS postgres.users (
//     id SERIAL PRIMARY KEY,
//     name varchar(250),
//     screen_name varchar(250)
//   );
// `

//   const createTableTweetsSQL = `
//   CREATE TABLE IF NOT EXISTS postgres.tweets
//   (
//     id SERIAL PRIMARY KEY,
//     text varchar(250),
//     user_id integer REFERENCES users(id)
//   )
// `

//   await pool.query(createDataBaseSQL, (err, res) => {
//     console.log('pool.query', err)
//   })
//   await pool.query(createTableUsersSQL, (err, res) => {
//     console.log('pool.query', err)
//   })
//   await pool.query(createTableTweetsSQL, (err, res) => {
//     console.log('pool.query', err)

//     if (res) {
//       this.isCreated = "yes"
//     }
//   })
// }

// const connectToDB = async () => {


//   const pool = await new Pool({
//     connectionString: 'postgresql://root@node_1:26257/postgres?sslmode=disable',
//     connectionTimeoutMillis: 10000
//   })


//   const createDataBaseSQL = `CREATE DATABASE IF NOT EXISTS postgres`


//   const data = {
//     err: undefined,
//     db: undefined
//   }
//   await pool.query(createDataBaseSQL, (err, res) => {

//     console.log('start test query');
//     if (err) {
//       console.log('ERRRRRRRRRRR___');
//       data.err = err
//       data.db = undefined
      
//     } else {
//       console.log('res___');
//       populateDB(pool)
//       data.err = undefined
//       data.db = pool
//     }
//   })
//   console.log('return');

//   return data



  
// }


// module.exports = {
//   connectToDB
// };