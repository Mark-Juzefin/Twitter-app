const axios = require('axios')
const amqp = require('amqplib/callback_api');
const amqplib = require('amqplib');



const sendDataThroughRabbitMQ = async (screen_name, text) => {
    try {
        let res
        amqp.connect('amqp://rabbitmq', (error0, connection) => {
            if (error0) {
                res = false;
                return
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    res = false;
                    return
                }
                
                var queue = 'tweet';
                var msg = {
                    screen_name,
                    text
                };

                channel.assertQueue(queue);
                
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
                
                console.log(" [x] Sent %s", msg);
                res = true

            });
        });

        return res
    } catch (error) {
        throw error
    }
    

}


const postTweet = async (screen_name, text) => {
    const data = await axios.post('http://twitter-db:8090/tweet', {  
        text,
        screen_name
    })
    return data.data
}

const postUser = async (name, screen_name) => {
    const data = await axios.post('http://twitter-db:8090/tweet', {  
        name,
        screen_name
    })
    return data.data
}


const getFeed = async () => {
    const res = await axios({
        method: 'get',
        url: 'http://twitter-db:8090/feed',
        responseType: 'json'
     })
    return res.data;
}


const getUsers = async () => {
     const res = await axios({
        method: 'get',
        url: 'http://twitter-db:8090/users',
        responseType: 'json'
     })
    return res.data;
}


module.exports = {
    getUsers,
    getFeed,
    postTweet,
    sendDataThroughRabbitMQ,
    postUser
}