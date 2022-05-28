const express = require('express');
const { getUsers, getFeed, postTweet, sendDataThroughRabbitMQ, postUser } = require('./helpers')

const PORT = 9090;
const app = express();

app.use(express.json());

app.get('/ping', async (req, res) => {
    res.status(200).send('pong');
})

app.get('/users', async (req, res) => {
  try {
    const data = await getUsers()
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/feed', async (req, res) => {
  try {

      const data = await getFeed()
      
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
});
  
app.post('/tweet', async (req, res) => {
  try {
      
      const res = await sendDataThroughRabbitMQ(req.body.screen_name, req.body.text)
      console.log(res);

      //const data = await postTweet(req.body.screen_name, req.body.text)

      res.status(200).send('data');
    } catch (error) {
      res.status(500).send(error.message);
    }
} )

app.post('/user', async (req, res) => {
  try {
      const { name, screen_name } =  req.body
      const data = await postUser(name, screen_name)
      res.status(200).send('data');
  } catch (error) {
      res.status(500).send(error.message);
  }
});



app.listen(PORT, () => {
    console.log('Server do work!');
  });