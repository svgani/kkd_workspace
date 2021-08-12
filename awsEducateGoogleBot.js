const https = require('https')
// const fetch = require('fetch')
// const fetch = require('node-fetch');

exports.handler =  function(event, context, callback) {

  // console.log("From new lambda function");
  // console.log(event.body);

  var msg = JSON.parse(event.body);
  var m1 = JSON.stringify(msg.message.text);

  // var str="";
  // for (var i = m1.length; i > 2; i--) {
  //   str+=m1[i-2];
  // }

  var str = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBryisQwqZ9CjoOgc-xijl_KQVRqFO-rac&cx=017576662512468239146:omuauf_lfve&q='+m1;
  var reply="";
  // var d = https.get(str);

//   const fetchPromise = fetch(str);
// fetchPromise.then(response => {
//   return response.json();
// }).then(people => {
//   console.log("people: "+people);
//   console.log("people string: "+JSON.stringify(people));
// });


  https.get(str, (res) => {
    var { statusCode } = res;
    var contentType = res.headers['content-type'];

    let error;

    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }

    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
    }

    res.setEncoding('utf8');
    let rawData = '';

    res.on('data', (chunk) => {
      rawData += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log("parse data: "+JSON.stringify(parsedData));
        reply=parsedData.items[0].link;
        console.log("reply: "+reply);
        let url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=";
  url += JSON.stringify(msg.message.from.id)+"&text="+reply;
  var e = https.get(url);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });

  // console.log("msg "+m1);
  // console.log("data: "+JSON.stringify(d));

  // let url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=";
  // url += JSON.stringify(msg.message.from.id)+"&text="+reply;

  // var e = https.get(url);
  // console.log("data: "+JSON.stringify(e));
}
