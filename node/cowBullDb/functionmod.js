exports.capital = function (text) {
  name = text.charAt(0).toUpperCase() + text.slice(1);
  return name;
}

exports.aNum = function(nd) {
  var a="";
  while (true) {
    a = String(Math.round(Math.random() * Math.pow(10,nd)))
    var flag = 0;
    var i,j;
    if (a.length == nd){
      for (i=0;i<nd;i++){
        for (j=i+1;j<nd;j++){
          if (a[i]==a[j]){
            flag=1;
          }
        }
      }
      if(a[0]=='0'){
        flag=1;
      }
      if (flag==0) {
        console.log(a);
        return a;
      }
    }
  }
}

exports.bNum = function(a,b,nd) {
  console.log('in bNum function '+a+' '+b+' '+nd)
  a=String(a)
  var bullc=0;
	var cowc=0;
	for (i=0;i<nd;i++){
    for (j=0;j<nd;j++){
      if (i!=j){
        if (a[i]==b[j]){
          cowc+=1;
        }
      }
    }
  }
  for (i=0;i<nd;i++){
    if (a[i]==b[i]){
      bullc+=1;
    }
  }
  console.log("cows : "+cowc+" bulls : "+bullc);
  cowc=String(cowc);
  bullc=String(bullc);
  return b+cowc+bullc;
}

exports.bRep = function(b,nd){
  for (var i=0;i<nd;i++){
    for (var j=i+1;j<nd;j++){
      if (b[i]==b[j]){
        return true;
      }
    }
  }
}

exports.toList = function(list, chances, digit){
  var updatedList = [];
  console.log("chances : "+chances+" digits : "+digit);
  for(var i = 0; i < chances; i++) {
    var a=i*(digit+2);
    var b=(i+1)*(digit+2);
    console.log("a : "+a+" b : "+b);
    var t=list.slice(a,b);
    console.log(t)
    var s=[]
    s.push(t.slice(0,digit),t.slice(digit,digit+1),t.slice(digit+1,digit+2))
    updatedList.push(s);
  }
  return updatedList
}
