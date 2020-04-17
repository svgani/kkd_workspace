exports.capital = function (text) {
  name = text.charAt(0).toUpperCase() + text.slice(1);
  return name;
}

exports.aNum = function(nd) {
  var a=""
  while (true) {
    a = String(Math.round(Math.random() * Math.pow(10,nd)))
    var flag = 0
    var i,j
    if (a.length == nd){
      for (i=0;i<nd;i++){
        for (j=i+1;j<nd;j++){
          if (a[i]==a[j]){
            flag=1;
          }
        }
      }
      if (flag==0) {
        console.log(a);
        return a;
      }
    }
  }
}

var cowc,bullc;
exports.bNum = function(a,b,nd) {
  // console.log(b)
  bullc=0
	cowc=0
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
  console.log("cows : "+cowc+" bulls : "+bullc)
  if (bullc!=nd) {
    return true;
  }
  else {
    return false;
  }
}
