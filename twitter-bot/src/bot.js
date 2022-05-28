const {sentence} = require('./sentenceGenerator')
const {randGen} = require('./sentenceGenerator')
const axios = require('axios')

const timeToStart = 1000
console.log(`bot will starts after ${timeToStart % 1000} s.`);


setTimeout(async () => {
  
  console.log('BOT IS STARTED');

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    }

  let isConnected = true
  while (isConnected) {
    await axios({
      method: 'get',
      url: 'http://twitter-api:9090/ping',
      responseType: 'json'
    }).then((res) => {
      console.log("Connected to twitter-api:9090")
      isConnected = false
    }).catch(e => console.log("Failed to connect to twitter-api:9090 ", e.code))
    
    await sleep(2000);

  }

  




  let users = []


  {let isConnected = true
  while (isConnected) {
    await axios({
      method: 'get',
      url: 'http://twitter-api:9090/users',
      responseType: 'json'
    }).then((res) => {
      console.log("Got users")
      isConnected = false
      users = res.data
      console.log(users);
  }).catch(e => console.log('ERROR: ', "Failed to  get users ", e.message))
    await sleep(2000);

  }}

  
  
  
  
  setInterval( async () => {
      const number = randGen(users.length)
      
      const { screen_name } = users[number]; 
      const text = sentence()
  
      console.log({text, screen_name});
  
      await axios.post('http://twitter-api:9090/tweet', {  
          text,
          screen_name
        })
        .catch(function (error) {
          console.log('failed to post tweet', error.code);
        });
  
  
  }, 6000)

}, timeToStart)