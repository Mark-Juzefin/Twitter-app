const express = require('express');
const { startListenTweetQueue, postTweet, getUsers, getFeed, createUser } = require('./helpers')

const PORT = 8090;
const app = express();

app.use(express.json());

app.get('/ping', async (req, res) => {
    res.status(200).send('pong');
})

app.get('/users', async (req, res) => {
  try {
      const data = await getUsers()
      res.status(200).send(data.rows);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.post('/user', async (req, res) => {
    try {
        const { name, screen_name } =  req.body
        const data = await createUser(name, screen_name)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
  });


app.get('/feed', async (req, res) => {
    try {
        const data = await getFeed()
        res.status(200).send(data.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
  
app.post('/tweet', async (req, res) => {
  try {
      
      const screen_name = req.body.screen_name
      const text = req.body.text
      const data = await postTweet(screen_name, text)

      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
} )



app.listen(PORT, async () => {
    console.log('Server do work!');

    setTimeout(() => {
        startListenTweetQueue()
        console.log('start ListenTweetQueue');
    }, 50000);
  });