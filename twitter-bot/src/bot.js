const {sentence} = require('./sentenceGenerator')
const {randGen} = require('./sentenceGenerator')
const axios = require('axios')

const timeToStart = 40000
console.log(`bot will starts after ${timeToStart} s.`);


setTimeout(async () => {
  
  console.log('BOT IS STARTED');

  let users = []
  await axios({
      method: 'get',
      url: 'http://twitter-api:9090/users',
      responseType: 'json'
  }).then((res) => {
      users = res.data
  })
  
  
  
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
          console.log(error);
        });
  
  
  }, 6000)

}, timeToStart)