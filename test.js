const https = require('https')

var str = 'https://api.dictionaryapi.dev/api/v2/entries/en/tea';

https.get(str, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var Response = JSON.parse(body);
        console.log("Got a response: ", Response);
        try {
        const parsedData = JSON.parse(body);
        console.log("parse data: "+JSON.stringify(parsedData));
        if (parsedData[0] == null){
            reply=parsedData.title;
        }
        else{
            reply=(parsedData[0].meanings[0].definitions[0].definition);
        }
        console.log("reply: "+reply);

        console.log(JSON.stringify(msg.message.from.id));

  //       var url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=";
  // url += JSON.stringify(msg.message.from.id)+"&text="+reply;
  // var e = https.get(url);

        var url = "https://api.telegram.org/bot1162523716:AAFg3J5__o3LzNjdV3HqL0hXczZ6Xd31A88/sendMessage?chat_id=1008250855";
      url += "&text="+m1+"  "+reply;

      var e = https.get(url);
      } catch (e) {
        console.error(e.message);
      }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
