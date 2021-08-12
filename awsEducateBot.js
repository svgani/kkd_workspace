const https = require('https')
// const fetch = require('fetch')
// const fetch = require('node-fetch');

exports.handler =  function(event, context, callback) {

  // console.log("From new lambda function");
  // console.log(JSON.stringify(event));

  var msg = JSON.parse(event.body);
  var m1 = JSON.stringify(msg.message.text);

  // console.log("message");
  console.log(m1);

  var str="";
  for (var i = m1.length; i > 2; i--) {
    str+=m1[i-2];
  }
  var reply = (str);

//   var str = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+m1;
//   var reply="";
//   // var d = https.get(str);

//   // console.log(d);

//   https.get(str, function(res){
//     var body = '';

//     res.on('data', function(chunk){
//         body += chunk;
//     });
//     console.log(JSON.parse(body));
//     console.log(JSON.stringify(body));

//     res.on('end', function(){
//         var Response = JSON.stringify(body);
//         console.log("Got a response: ", Response);
//         try {
//         const parsedData = JSON.parse(body);
//         console.log("parse data: "+JSON.stringify(parsedData));
//         if (parsedData[0] == null){
//             reply=parsedData.title;
//         }
//         else{
//             reply=(parsedData[0].meanings[0].definitions[0].definition);
//         }
//         console.log("reply: "+reply);

//         console.log(JSON.stringify(msg.message.from.id));

//         var url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=";
//   url += JSON.stringify(msg.message.from.id)+"&text="+reply;
//   var e = https.get(url);

//         var url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=1008250855";
//       url += "&text="+m1+"  "+reply;

//       var e = https.get(url);
//       } catch (e) {
//         console.error(e.message);
//       }
//     });
// }).on('error', function(e){
//       console.log("Got an error: ", e);
// });

//   // https.get(str, (res) => {
//   //   // var { statusCode } = res;
//   //   // var contentType = res.headers['content-type'];

//   //   // let error;

//   //   // if (statusCode !== 200) {
//   //   //   error = new Error('Request Failed.\n' +
//   //   //                     `Status Code: ${statusCode}`);
//   //   // } else if (!/^application\/json/.test(contentType)) {
//   //   //   error = new Error('Invalid content-type.\n' +
//   //   //                     `Expected application/json but received ${contentType}`);
//   //   // }

//   //   // if (error) {
//   //   //   console.error(error.message);
//   //   //   // consume response data to free up memory
//   //   //   res.resume();
//   //   // }

//   //   res.setEncoding('utf8');
//   //   let rawData = '';

//   //   res.on('data', (chunk) => {
//   //     rawData += chunk;
//   //   });

//   //   console.log(rawData);

//   //   res.on('end', () => {
//   //     try {
//   //       const parsedData = JSON.parse(rawData);
//   //       console.log("parse data: "+JSON.stringify(parsedData));
//   //       if (parsedData[0] == null){
//   //           reply=parsedData.title;
//   //       }
//   //       else{
//   //           reply=(parsedData[0].meanings[0].definitions[0].definition);
//   //       }
  // //       console.log("reply: "+reply);

  //       console.log(JSON.stringify(msg.message.from.id));

  //       var url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=";
  // url += JSON.stringify(msg.message.from.id)+"&text="+reply;
  // var e = https.get(url);

  //       var url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=1008250855";
  //     url += "&text="+m1+"  "+reply;

  //     var e = https.get(url);
  //     } catch (e) {
  //       console.error(e.message);
  //     }
  //   });
  // }).on('error', (e) => {
  //   console.error(`Got error: ${e.message}`);
  // });

  // console.log("msg "+m1);
  // console.log("data: "+JSON.stringify(d));

  var url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=";
  url += JSON.stringify(msg.message.from.id)+"&text="+reply;

  var e = https.get(url);

  // var url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=1008250855";
  // url += "&text="+JSON.parse(d);

  // var e = https.get(url);
  // console.log("data: "+JSON.stringify(e));
};
