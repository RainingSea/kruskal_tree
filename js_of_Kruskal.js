var onlink = false;
var onid = "";
var MaxvertextType = 100
var gigantic = 99999

var gx = ""
var gy = ""
var gobj

var speed = 1000;

/*
  
*/

//邻接矩阵
function Mgraph() {
  this.vex = new Array();
  this.edge = new Array();
  this.alines = new Array();
  console.log(this.edge, '///');
  //edge是图的邻接矩阵表示法
  this.vexnum = 0;
  this.arcnum = 0;
};


function graph() {
  this.vex = new Array();
  //vex 代表图的顶点集
  this.edge = new Array();
  //edge代表图的邻接矩阵的二维数组
  this.alines = new Array();
  //alines 代表图的所有权值边对象集合

  this.num_v = 0; 
  //初始时顶点数为0
};





//vex Array以及edge Array 分别存储点和边 
//vexnum是顶点数目 arcnum是边的数目

function getVex(G, x) {
  var i = 0;
  for (; i < G.vexnum; i++) {
    if (G.vex[i] == x) return i;
  }
  if (G.vex[i] != x) return -1;
}
//返回x对应的在vex数组的下标

//kruskal所用的排序函数
//比较权值的大小
function NumAscSort(a, b) {
  return a.distance - b.distance;
}
// arr.sort(NumAscSort);

function speedup() {
  speed = speed / 2;
  let x = document.getElementById('speed').innerHTML;
  // console.log(x);
  x = x / 2;
  // console.log(x);
  document.getElementById('speed').innerHTML = x;
}

function speeddown() {
  speed = speed * 2;
  let x = document.getElementById('speed').innerHTML;
  // console.log(x);
  x = x * 2;
  // console.log(x);
  document.getElementById('speed').innerHTML = x;
}

function speedback() {
  speed = 1000;
  document.getElementById('speed').innerHTML = 1000;
}


let x_array = new Array;


function kruskal(g, arr) {
  //从所有的边中选择一个最短的line
  //arr是对象数组 存储了包含起点 终点 边的权值的对象集合 并且是有序的
  cleancolor();
  document.getElementById('process').innerHTML = '';
  arr.sort(NumAscSort);
  console.log('打印参数');
  console.log(arr);
  let times = arr.length;
  let count = 0;
  let allvex = new Array(mgraph.vexnum);
  console.log('得到顶点个数');
  console.log(g.vexnum);
  for (let j = 0; j < mgraph.vexnum; j++) {
    allvex[j] = j;
  }

  let same = 0;
  let mark = true;
  for (let i = 0; i < times; i++) { //time是图的所有边数 默认遍历所有边
    setTimeout(function () {
      if (i >= times) {
        console.log(count, 'i', i);
        console.log('iftimes one time!');
        if (arr[i - 1].distance == arr[i].distance) {
          reverse_find(allvex);
          console.log(allvex, 'allvex');
          if (x_find(allvex, arr[i].v_start, arr[i].v_end)) {
            let va1 = 'v' + arr[i].v_start + 'v' + arr[i].v_end;
            let va2 = 'v' + arr[i - 1].v_start + 'v' + arr[i - 1].v_end;
            let lineone1 = document.getElementById(va1);
            let lineone2 = document.getElementById(va2);
            lineone1.style.stroke = '#7B68EE';
            lineone2.style.stroke = '#7B68EE';
            console.log('重复的颜色');
            return;
          }
        } else return;
      }

      if (count < mgraph.vexnum - 1) { //生成足够的边 
        if (find(allvex, arr[i].v_start, arr[i].v_end)) {
          // mark=false;
          console.log('distance', arr[i].distance);
          let va = 'v' + arr[i].v_start + 'v' + arr[i].v_end;
          let lineone = document.getElementById(va);
          lineone.style.stroke = '#233';
          let xdiv = document.getElementById('process');
          let p = document.createElement('p');
          p.innerHTML = 'V' + arr[i].v_start + ' V' + arr[i].v_end;
          // let vaa='V' + arr[i].v_start + ' V' + arr[i].v_end;
          xdiv.innerHTML += '选中  ' + p.innerHTML + '<br><br>'
          count++;
          console.log(count, 'count');
        } else {
          console.log('wrong!')
          let va = 'v' + arr[i].v_start + 'v' + arr[i].v_end;
          let lineone = document.getElementById(va);
          lineone.style.stroke = '#FF0000';
          let vaa = 'V' + arr[i].v_start + ' V' + arr[i].v_end;
          let p = document.createElement('p');
          p.setAttribute('class', 'wrongp')
          p.innerHTML = vaa + '会形成环路，不可选取<br><br>';
          let xdiv = document.getElementById('process');
          xdiv.appendChild(p);
          setTimeout(function () {
            lineone.style.stroke = '#DDDDDD';
          }, 1000);
        }
      } else { //这个else对应因为count=num-1而停止的情况 并没有包含到i=times的情况
        // console.log(count, 'i', i);
        // same = i;
        // if (mark == true) {
        //   console.log('else one time!');
        //   while (arr[same - 1].distance == arr[same].distance && find(allvex, arr[same].v_start, arr[same].v_end)) {
        //     let va1 = 'v' + arr[same].v_start + 'v' + arr[same].v_end;
        //     let va2 = 'v' + arr[same - 1].v_start + 'v' + arr[same - 1].v_end;
        //     let lineone1 = document.getElementById(va1);
        //     let lineone2 = document.getElementById(va2);
        //     lineone1.style.stroke = '#7B68EE';
        //     lineone2.style.stroke = '#7B68EE';
        //     console.log('重复的颜色');
        //     same++;
        //   }
        // }
        // mark = false;
        console.log(count, 'i', i);
        same = i;
        if (mark == true) {
          console.log('else one time!');
          reverse_find(allvex);
          console.log(allvex, 'allvex');
          while (arr[same - 1].distance == arr[same].distance) {   
            if (x_find(allvex, arr[same].v_start, arr[same].v_end)) {
              let va1 = 'v' + arr[same].v_start + 'v' + arr[same].v_end;
              let va2 = 'v' + arr[same - 1].v_start + 'v' + arr[same - 1].v_end;
              let lineone1 = document.getElementById(va1);
              let lineone2 = document.getElementById(va2);
              lineone1.style.stroke = '#7B68EE';
              lineone2.style.stroke = '#7B68EE';
              console.log('重复的颜色');
              reverse_find(allvex);
            }
            same++;
          }
          mark = false;
        }
      }
    }, speed * i);
  }
}


//find函数确定是否可以找到相同的根节点
//find方法可以确定是否成环 但无法确定哪个节点是最后一个加入生成树中的
//目前可以想到的解决方法 记录出那个初始大根节点 最后一步判断哪个arr[]仍然等于自身 且这个点不是 初始大根节点 那么这个点必定是最后一个孤立节点
//然后就可以取消这个孤立节点的arr 即仍然设为自己 但是从剩下的权值相等的边中去选择不会成环的再进行考虑
//allvex里没有添加到图中的点不要设为自己了 设为none；
function find(arr, x, y) {
  // console.log(arr,'arr');
  x_array = [];
  for (let j = 0; j < arr.length; j++) {
    x_array[j] = arr[j];
  }
  // x_array=x_array.reverse();
  console.log(x_array, 'x_array');
  while (arr[x] != x) {
    x = arr[x];
  }

  while (arr[y] != y) {
    y = arr[y];
  }

  if (x != y) {
    console.log(x, y);
    arr[x] = y;
    console.log(arr, 'arr');
    return true
  } else {
    return false;
  }
}

function x_find(arr, x, y) {
  while (arr[x] != x) {
    x = arr[x];
  }

  while (arr[y] != y) {
    y = arr[y];
  }

  if (x != y) {
    console.log(x, y);
    arr[x] = y;
    console.log(arr, 'arr');
    return true
  } else {
    return false;
  }
}

function reverse_find(arr) {
  for (let j = 0; j < arr.length; j++) {
    arr[j] = x_array[j];
  }
}

//先创建一个全局图
mgraph = new Mgraph;
var content = "";

//获取X轴坐标
function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  // console.log(actualLeft,'left');
  return actualLeft;

}

//获取y轴坐标
function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  // console.log(actualTop,'Top');
  return actualTop;
}

//图的初始化
function init(g) {
  for (var i = 0; i < g.vexnum; i++) {
    var temp = [];
    for (var j = 0; j < g.vexnum; ++j) {
      if (i == j) temp[j] = 0;
      else temp[j] = gigantic;
    }
    g.edge[i] = temp;
  }
  //初始时赋值除自身路径长度为0外 其他各店均不可达 99999
}

//节点渲染
function input() {
  cleanele();
  if (mgraph.vexnum == 0) {
    var oinput = document.getElementById('input_num');
    //input_button里存的是节点的个数 这里获取要创建多少个节点
    var num = oinput.value;
    console.log(num, 'num');
    mgraph.vexnum = num;
    //同时修改vexnum的值为input_button里的值

    for (var i = 0; i < num; i++) {
      var vex = "v" + i;
      mgraph.vex[i] = vex;
      var div = document.getElementById("divele");
      var ang = (360 / num) * i + 240;
      var x = 45 + Math.cos(ang * (Math.PI / 180)) * 25;
      var y = 50 + Math.sin(ang * (Math.PI / 180)) * 35;
      //确定每一个节点的绝对位置
      div.innerHTML = div.innerHTML + "<div id=" + vex + " style=" + "left:" + x + "%;" + "top:" + y + "%;" + " class=" + "test" + " onclick=link(this)>" + vex + "</div>";
      document.body.appendChild(div); //将每一个节点添加到body中
    } //构建出v0、v1、v2......
  } else alert("\n\n请再")

  init(mgraph);
  //
}

//链路线条渲染

//这里用到了X轴坐标和Y轴坐标 为什么？
//这里是用来画边的吧
function creatline(id1, id2, dis) {
  //id1、id2来表示两端定点 dis是路径长度
  var linediv = document.getElementById("Wrap");
  var ele1 = document.getElementById(id1);
  var x1 = getElementLeft(ele1) + 25;
  var y1 = getElementTop(ele1) + 25;

  var ele2 = document.getElementById(id2);
  var x2 = getElementLeft(ele2) + 25;
  var y2 = getElementTop(ele2) + 25;

  var size = " x1=" + x1 + " y1=" + y1 + " x2=" + x2 + " y2=" + y2;
  linediv.innerHTML = linediv.innerHTML + "<svg class=lineWrap id=line" + id1 + id2 + "><line id=" + id1 + id2 + " " + size + " xmlns=" + "http://www.w3.org/2000/svg" + " stroke=" + "#ddd" + " stroke-width=" + 3 + " marker-end=" + "url(#arrow)" + "></line></svg>" + "<div class=int_num style=" + "left:" + (x1 + (x2 - x1) / 2.5) + "px;top:" + (y1 + (y2 - y1) / 2.5) + "px;position:fixed;" + " onclick=changnum(" + id1 + "," + id2 + ",this)><input type=text class=thetext value=" + dis + "></div>"
  document.body.appendChild(linediv);
}


function link(obj) {
  var oid = obj.id;
  if (oid != onid && onlink) {
    var onclolor = document.getElementById(onid);
    onclolor.style.background = "#FFFFFF";
    onclolor.style.height = "40px";
    onclolor.style.width = "40px";
    //生成随机路径长度
    var dis = Math.round(Math.random() * 15) + 1;

    var x1 = getVex(mgraph, oid);
    var y1 = getVex(mgraph, onid);
    //x1和y1分别是
    if (mgraph.edge[x1][y1] == gigantic) {
      console.log(dis);
      creatline(oid, onid, dis);
      //如果是gigantic说明是不通的 要将随机生成的dis赋值给这条边
      //无向图的连线
      mgraph.edge[x1][y1] = dis;
      mgraph.edge[y1][x1] = dis;

      let obj = {
        v_start: parseInt(oid.substring(1)),
        v_end: parseInt(onid.substring(1)),
        distance: dis,
      }
      mgraph.alines.push(obj); //将这条边记住
      //无向图具有对称性 为双边赋值
    }
    onlink = false;
    onid = "";

  } else if (!onlink) {
    onid = obj.id;
    onlink = true;
    obj.style.background = "#000000";
    obj.style.height = "50px";
    obj.style.width = "50px";
    // obj.style.font-size="40px";
  }
}

//开始搜索路径
function createTree() {
  // var begin = document.getElementById("begin");
  // // var bd = begin.value;
  console.log('排序后的数组为');
  console.log(mgraph.alines);
  kruskal(mgraph, mgraph.alines);
}

function autoFocus() {
  var xinput = document.getElementById('cnum');
  xinput.focus();
  xinput.select();
}

//修改链路权值弹框
function changnum(x, y, obj) {
  console.log(x, y)
  var ch = document.getElementById("changdiv");
  ch.style.display = "block";
  autoFocus();
  //console.log(x);
  gx = x.id;
  gy = y.id;
  gobj = obj;
  // console.log(gx,'gx');
}


//修改权值后点击确定事件
function ok() {
  var changenum = document.getElementById("cnum");
  var cnum = Number(changenum.value);

  if (cnum != null) {
    var x = getVex(mgraph, gx);
    var y = getVex(mgraph, gy);
    mgraph.edge[x][y] = cnum;
    mgraph.edge[y][x] = cnum;
    console.log(cnum, 'cnum');
  }
  //gobj.innerText = Number(cnum);
  gobj.innerHTML = '<div class=int_num style=" + "left:" + (x1 + (x2 - x1) / 2.5) + "px;top:" + (y1 + (y2 - y1) / 2.5) + "px;position:fixed;" + " onclick=changnum(" + id1 + "," + id2 + ",this)><input type=text class=thetext value=' + cnum + '></div>';
  var ch = document.getElementById("changdiv");
  ch.style.display = "none";
  changenum.value = ""

  //删除在数组的那条边
  for (let i = 0; i < mgraph.alines.length; i++) {
    console.log(mgraph.alines[i].v_start, mgraph.alines[i].v_end, 'what');
    if (mgraph.alines[i].v_start == gx[1] && mgraph.alines[i].v_end == gy[1]) {
      console.log('替换操作');
      mgraph.alines[i].distance = cnum;
    }
  }
  console.log('更改后的数组');
  console.log(mgraph.alines);
}

//删除链路
function deleteline() {
  var div = document.getElementById("Wrap");
  var line = document.getElementById("line" + gx + gy);
  div.removeChild(line);
  div.removeChild(gobj);

  // line.style.display="none";
  // gobj.style.display="none";
  var x = getVex(mgraph, gx);
  var y = getVex(mgraph, gy);
  mgraph.edge[x][y] = gigantic;
  mgraph.edge[y][x] = gigantic;

  //将关联的两个顶点之间设置为不可达
  for (let i = 0; i < mgraph.alines.length; i++) {
    console.log(mgraph.alines[i].v_start, mgraph.alines[i].v_end, 'that');
    if (mgraph.alines[i].v_start == gx[1] && mgraph.alines[i].v_end == gy[1]) {
      console.log('删除操作');
      mgraph.alines.splice(i, 1);
    }
  }

  console.log('删除单边后的数组');
  console.log(mgraph.alines);
  var ch = document.getElementById("changdiv");
  ch.style.display = "none";
}

//取消修改权值
function quxiao() {
  var ch = document.getElementById("changdiv");
  ch.style.display = "none";
  gx = "";
  gy = "";
}

//清空链路
function cleanline() {
  var div = document.getElementById("Wrap");
  div.innerHTML = "";
  init(mgraph);
  mgraph.alines.splice(0, mgraph.alines.length);
  // var descripe = document.getElementById("slider");
  // descripe.innerHTML = content;
  cleancolor();
}

//清空节点
function cleanele() {
  var div = document.getElementById("divele");
  div.innerHTML = "";
  cleanline();
  mgraph.vexnum = 0;
  // var descripe = document.getElementById("slider");
  // descripe.innerHTML = content;
  console.log(mgraph.alines);
}


//清空颜色
function cleancolor() {
  var div = document.getElementById("divele")
  var ele = div.getElementsByTagName("div")
  for (var i = ele.length - 1; i >= 0; i--) {
    ele[i].style.background = "#FFFFFF";
  }
  var line = document.getElementById("Wrap");
  var linele = line.getElementsByTagName("line")
  for (var i = linele.length - 1; i >= 0; i--) {
    linele[i].style.stroke = "#ddd";
  }
}

//随机生成一个图
function randomCreate(num) {
  document.getElementById('process').innerHTML = '';
  var input_num = document.getElementById("input_num");
  let value = input_num.value;
  console.log(value, '检查value')
  // cleanele();

  if (num == -1) {
    // var value = Math.round(Math.random() * 4) + 4;
    value = 6;
    //value是使用rondom函数来选一个
    console.log(value, '-------')
    input_num.value = value;
  }
  //初始化生成图 这里先确定顶点个数 先调成6

  let xcount = 0;
  input();

  for (var i = value - 1; i >= 0; i--) {
    var lines = Math.round(Math.random() * 2) + 1;
    //console.log(i,lines,'$$$');
    var S = new Array();
    //S只执行value次 即只执行点个数次
    for (var m = value - 1; m >= 0; m--) S[i] = false;
    var k = 0;

    for (var j = lines - 1; j >= 0; j--) {
      for (var n = value - 1; n >= 0; n--) {
        if (i == n) {
          break;
        } else if (30 > Math.round(Math.random() * 100) && !S[n] && k <= lines) {
          var x = 'v' + i;
          var y = 'v' + n;
          var having1 = document.getElementById(y + x); //这个应该是用来判断是否有无向图两条边的
          var having2 = document.getElementById(x + y); //这个应该是用来判断是否有无向图两条边的
          if (having1 == null && having2 == null) {
            xcount++;
            var val = Math.round(Math.random() * 15) + 1; //随机生成一条路径的长度 范围在之间
            creatline(x, y, val); //为这两个顶点生成对应的边
            let obj = {
              v_start: i,
              v_end: n,
              distance: val,
            }
            mgraph.edge[i][n] = val; //在邻接矩阵里为无向图赋值
            mgraph.edge[n][i] = val; //在邻接矩阵里为无向图赋值
            mgraph.alines.push(obj); //将这条边记住
          }
          S[n] = true;
          k++;
        } //生成一条边
      } //检索所有点 包括自身 然后用随机条件30>math来生成一条边 但是K>line时就不再生成了
    } //每次循环一个点时，都会生成这个点对应的line 为这个点生成对应的所有line 
  } //value个点循环结束
  console.log(xcount, '边的个数');
  mgraph.alines.sort(NumAscSort);
  console.log(mgraph.alines);
  console.log('创建图完成！');
}

window.onload = function () {
  console.log('Hello!Ronghui!')
  var descripe = document.getElementById("slider");
  content = descripe.innerHTML;
  randomCreate(-1);
  descripe.innerHTML = content;
}