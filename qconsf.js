var reg = (o, n) => o ? o[n] : '';
var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

var cleanObject = (ob) => 
  Object.entries(ob).reduce((r, [k, v]) => {
    if(v) { r[k] = v; return r;
    } else { return r; }
  }, {});

async function getUserByNum(number){
  var res = await fetch(`https://qconsf.com/api/v1/user/${number}`).catch(err=> console.log(err));
  if(res.status == 200){
    var jdat = await res.json();
    var d = jdat.data ? cleanObject(jdat.data) : null;
    if(d.image == "https://qconsf.com/") delete d.image;
    console.log(d);
  }else{
    var d = null;
    console.log(res.status);
  }
  return d;
}

async function looper(){
  var containArr = [];
  for(var i=1001; i<20001; i++){
    var res = await getUserByNum(i);
    await delay(rando(1000)+200);
    if(res) containArr.push(res);
  }
  console.log(containArr);
}

looper()
