const amqp = require('amqplib/callback_api');
const amqplib = require('amqplib');
const { connectToDB } = require('./db')
const { Pool } = require('pg');



const getDB = async () => {

    const db = await new Pool({
        connectionString: 'postgresql://root@node_1:26257/postgres?sslmode=disable',
        connectionTimeoutMillis: 10000
    })
    const createDataBaseSQL = `CREATE DATABASE IF NOT EXISTS postgres`

  const createTableUsersSQL = `
  CREATE TABLE IF NOT EXISTS postgres.users (
    id SERIAL PRIMARY KEY,
    name varchar(250),
    screen_name varchar(250)
  );
`

  const createTableTweetsSQL = `
  CREATE TABLE IF NOT EXISTS postgres.tweets
  (
    id SERIAL PRIMARY KEY,
    text varchar(250),
    user_id integer REFERENCES postgres.users(id)
  )
`
  
const insertUsers = `
insert into postgres.users (name, screen_name)
values 
('Illya Yarema', 'yarema'),
('Alex Olink', 'alex'),
('Oleg Giga', 'giga'),
('Shreck', 'shreck'),
('Lana Del Rey', 'lana'),
('Ye', 'ye')
`
    
    
    await db.query(createDataBaseSQL, (err, res) => {
      if(err){console.log('pool.query', err) }
      })
  await db.query(createTableUsersSQL, (err, res) => {
        if(err){console.log('pool.query', err) }
      })
      await db.query(createTableTweetsSQL, (err, res) => {
        if(err){console.log('pool.query', err) }
      })
      await db.query('select * from users',async (err, res) => {
        if(err){console.log('pool.query', err) }
        if (res?.rows?.length <= 6) {
            await db.query(insertUsers, (err, res) => {
              if(err){console.log('pool.query', err) }
          })
        }
      })
  
      // await db.query(insertUsers, (err, res) => {
      //   console.log('pool.query', err)
      // })


    return db
}


const postTweet = async (screen_name, text) => {
    const db = await getDB()

    //get user id by screen_name
    const user_id_data = await db.query(`select users.id from postgres.users
    where users.screen_name = '${screen_name}'`)
    const user_id = user_id_data.rows[0]?.id
    
    //post
    const query = `
    insert into postgres.tweets(text, user_id)
    values ('${text}', ${user_id})`
    
    const data = await db.query(query)

    return data
}

const getUsers = async () => {
    const db = await getDB()


    const data = await db.query(`
      select users.screen_name
      from postgres.users
    `)
    return data
}

const createUser = async (name, screen_name) => {
    const db = await getDB()


    const data = await db.query(`
      insert into postgres.users (name, screen_name)
      values ('${name}', '${screen_name}')
    `)
    return data
}

const getFeed = async () => {
    const db = await getDB()


    const data = await db.query(`
    select tweets.id, tweets.text, users.name, users.screen_name
    from postgres.tweets
    join postgres.users
    on tweets.user_id = users.id
  `)
    return data
}


  
const startListenTweetQueue = async () => {
    try {
    const queue = 'tweet';
    const conn = await amqplib.connect('amqp://rabbitmq');
  
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);
  
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    // Listener
    ch1.consume(queue, async (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log(" [x] Received %s", message);
        const { screen_name, text } = JSON.parse(message);
        await postTweet(screen_name, text);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
      
      return true
    } catch (error) {
      console.log('failed connecting to rabbitmq');
      return false
    }
    
}


// const startListenTweetQueue = () => {
//     amqp.connect('amqp://rabbitmq', (error0, connection) => {
//         if (error0) {
//             throw error0;
//         }
//         connection.createChannel((error1, channel) => {
//             if (error1) {
//                 throw error1;
//             }
//             var queue = 'tweet';
//             channel.assertQueue(queue, {
//             durable: false
//             });         
//             console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);    
//             channel.consume(queue,  async (msg) => {
//                 const message = msg.content.toString();
//                 console.log(" [x] Received %s", message);
//                 const { screen_name, text } = JSON.parse(message);
//                 await postTweet(screen_name, text);
//         }, {
//             noAck: true
//         });
//     });
//     });
// }


module.exports = {
    startListenTweetQueue,
    postTweet,
    getUsers,
    getFeed,
    createUser,
    getDB
}