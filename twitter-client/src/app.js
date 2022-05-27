const http = require('http');
const fs = require('fs');
const axios = require('axios')

const getData = (start) => {
    try {
        const data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'))
        
        return data.slice(start);
      } catch (err) {
        console.error(err);
      }
}

const sendDataOoUpdateFile = (response) => {
    let coursor = 0

    setInterval(() => {
        const data = getData(coursor) 
        coursor += data?.length
        if (data.length)
        {
            html = data.map(x => `<h5>text: ${x.text} name: ${x.name}</h5>`).join('')
            response.write(html);
        }
    }, 2000)
}

const updateData = async () => {
     await axios({
        method: 'get',
        url: 'http://twitter-api:9090/feed',
        responseType: 'json'
    }).then((res) => {
        const dataFromDB = res.data
        const currentData = getData(0)
        const newData = dataFromDB.slice(currentData.length)
        const concat = currentData.concat(newData)
        
        fs.writeFileSync(__dirname + '/data.json', JSON.stringify(concat));
    })

}



http.createServer(function (request, response) {
    response.setHeader('Content-Type', 'text/html; charset=UTF-8');
    response.setHeader('Transfer-Encoding', 'chunked');

    var html =
        '<!DOCTYPE html>' +
        '<html lang="en">' +
            '<head>' +
                '<meta charset="utf-8">' +
                '<title>Chunked transfer encoding test</title>' +
            '</head>' +
            '<body>';

    response.write(html);

    html = '<h1>Chunked transfer encoding test</h1>'

    response.write(html);

  
    setTimeout(() => {
        console.log('CLIENT IS STARTED');
        updateData()
        sendDataOoUpdateFile(response)
        setInterval(() => {
            updateData()
        }, 6000)
    }, 40000)
    

    
    
    
    

    

}).listen( 1337, () => {
    console.log('Server do work!');
});