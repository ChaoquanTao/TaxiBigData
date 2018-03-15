 
function disAll(){
	// window.location.reload()
    //var data = document.getElementById('slider').getAttribute('data')
	console.log(replay_speed)
    console.log("displayall")
	$.ajax({
		url: "/datas",
		type:'GET',
		success: function(result) {
			console.log(result)
			console.log(result.length)
			track(result)
		}
	})
}

function haha() {
	
	var name= $('#cph').val();
	console.log(name)
	// window.location.reload()
	//console.log(name.value)
	$.ajax({
		url: "/hhh?name=" + name,
		type: "GET",
		success: function(result) {
			console.log("*********************************")
			console.log(result);
			if(result==null){
				alert('没有查询到相关轨迹!')
			}
			else{
				track(result)
			}
			//这里得到了检索结果
		}
	})
}


function callbackfun( data){
	alert("转换完毕");
	console.log(data.points);
	points.setPoints(data.points);
}

function track(res){
	console.log("ddd")

	console.log("ttt")
 //   var point = new BMap.Point(118.778611, 32.043889);

 var map = new AMap.Map('container',{
 	zoom: 20,
        center: [118.778611, 32.043889]//new AMap.LngLat(116.39,39.9)
    });

 var marker = new AMap.Marker({
        position: [118.778611, 32.043889],//marker所在的位置
        map:map//创建时直接赋予map属性
    });
    //也可以在创建完成后通过setMap方法执行地图对象
    marker.setMap(map);


    // if (document.createElement('canvas').getContext) {

    	/*创建一个二维数组来存储不同车辆坐标*/    
    var loc = new Array();         //先声明一维
    for(var i=0; i<2000; i++){          //这里后期定义为总车辆个数
        loc[i] = new Array();    //在声明二维
    }
    //   console.log(loc)

    var speeds = new Array()  //用来存速度
    for(var i=0; i<2000; i++){
    	speeds[i] = new Array()
    }

    var cph = new Array()  //用来存车牌号

//**************************************
/*我们在这里计算并保存时间差，
      以及每辆车的初始时间，
      以及不同辆车的初始时间差，
      以及每辆车的初始时间排序
      */
      var time_differ = new Array()
      for(var i=0; i<2000; i++){
      	time_differ[i] = new Array()
      }
   // var start_time = new Array()
   var start_info = new Array()
    //console.log(res.length)
//*******************************************************************
console.log(res)
/*我们在这里操作传过来的数据*/
    var cnt = 0 ;       //我们通过cnt来确定实际车数
    for(var i=0; i<res.length; ){
    	loc[cnt].push(new AMap.LngLat(res[i][2],res[i][1]))      
    	speeds[cnt].push(res[i][3])
    	cph[cnt] = res[i][0]
        //start_time[cnt] = new Date(res[i][4])
        start_info[cnt] = {index:cnt,
        	start_time: new Date(res[i][4])
        }
        var k=i

        for(var j=i+1; j<res.length; j++){
                if(res[i][0]===res[j][0]){ //如果是同一车牌号
                	loc[cnt].push(new AMap.LngLat(res[j][2],res[j][1]))
                	speeds[cnt].push(res[j][3])

                	time_differ[cnt].push(parseInt(new Date(res[j][4])-new Date(res[k][4])))
                	k=j

                }
                else{       //如果不是同一车牌号
                	cnt++
                	i = j
                	j++
                	break 
                }
            }
            if(j==res.length){

            	cnt++
            	break
            }
        }
        console.log(start_info)
        console.log(loc)
        console.log(cnt)
    // console.log('speeds '+speeds)
    // console.log('time_differ '+time_differ)


    AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {

    	if (!PathSimplifier.supportCanvas) {
    		alert('当前环境不支持 Canvas！');
    		return;
    	}

    //启动页面
    initPage(PathSimplifier);
});

    function initPage(PathSimplifier) {
    	var emptyLineStyle = {
    		lineWidth: 0,
    		fillStyle: null,
    		strokeStyle: null,
    		borderStyle: null
               // borderWidth: 0
           };

           console.log(speeds)
           console.log(loc)
           console.log(cnt)
    //创建组件实例
    var pathSimplifierIns = new PathSimplifier({
    	zIndex: 100,
                map: map, //所属的地图实例
                getPath: function(pathData, pathIndex) {
                    //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
                    return pathData.path;
                },
                getHoverTitle: function(pathData, pathIndex, pointIndex) {
                    //返回鼠标悬停时显示的信息
                    if (pointIndex >= 0) {
                        //鼠标悬停在某个轨迹节点上
                        return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length+' '+pathData.path[pointIndex];
                    }
                    //鼠标悬停在节点之间的连线上
                    return pathData.name + '，点数量' + pathData.path.length;
                 //   return null ;
                },
                renderOptions: {
                	pathLineStyle: emptyLineStyle,
                	pathLineSelectedStyle: emptyLineStyle,
                	pathLineHoverStyle: emptyLineStyle,
                	keyPointStyle: emptyLineStyle,
                	startPointStyle: emptyLineStyle,
                	endPointStyle: emptyLineStyle,
                	keyPointHoverStyle: emptyLineStyle,
                	keyPointOnSelectedPathLineStyle: emptyLineStyle
                //   keyPointTolerance : 0
            }
        });


    var trace=[]
    for(var i=0; i<loc.length; i++){
    	trace.push({name: 'cph'+cph[i]+'轨迹'+i,
    		path: loc[i]
    	})
    }
    pathSimplifierIns.setData(trace)


    function onload() {
    	pathSimplifierIns.renderLater();
    }

    function onerror(e) {
    	alert('图片加载失败！');
    } 
                        //cnt
            // for(var i=0 ;i<100; i++){
            //     replay(i)
            // }
            //先排序
            console.log(start_info)
            start_info.sort(function(x,y){
            	//console.log(x.start_time)
            	//console.log(y.start_time)
                // if(parseInt(x.start_time)<parseInt(y.start_time)){
                //     return -1
                // }
                // if(parseInt(x.start_time)>parseInt(y.start_time)){
                //     return 1
                // }
                // return  0
                return x.start_time > y.start_time ? 1 : -1
            })

            console.log(start_info)



            var t=0
            if(cnt==1){
            	console.log("one car============")
            	replay(start_info[t].index)
            }
            else{
            	var int1 = setInterval(function(){
            		console.log('t： '+t)
	                // console.log(start_info[0].index)
	                // console.log(start_info[t])
	                //console.log('index: '+ start_info[t].index)
	                //console.log(parseInt(start_info[t+1].start_time)-parseInt(start_info[t].start_time))
	                console.log('异车时差： '+ (start_info[t+1].start_time - start_info[t].start_time)+'replay_speed'+replay_speed)
	                replay(start_info[t].index)
	                t++
	                console.log("new t:"+ t)
	                if(t+1==cnt){
	                	clearInterval(int1)
	                	console.log("clearInterval one")
	                }

	            },(start_info[t+1].start_time - start_info[t].start_time)/replay_speed)
            }
            function replay(idx){
            	console.log('idx: '+idx)
                var navg0 = pathSimplifierIns.createPathNavigator(idx, //关联第1条轨迹
                {
                    loop: true, //循环播放
                    speed: speeds[idx][0]*replay_speed,
                    pathNavigatorStyle:{
                        // width: 24,
                        // height: 24,
                        autoRotate:true,
                        strokeStyle: null,
                        //fillStyle: 'red',
                        //content: 'defaultPathNavigator',
                         content: PathSimplifier.Render.Canvas.getImageContent('./images/icon4.jpeg', onload, onerror),
                        pathLinePassedStyle: {
                            strokeStyle: null, //线颜色，比如 red, rgb(255,0,0), rgba(0,0,0,1)等
                            lineWidth:  0, //  线宽度
                            borderStyle: null,  //描边颜色
                            borderWidth: 0,  //描边宽度
                            fillStyle: null,
                            
                        }
                    }
                });

                navg0.start();
                 //console.log('cursor '+navg0.getCursor().idx+' '+navg0.getCursor().tail)
                 console.log('speed: '+ navg0.getSpeed())   

                 var t1=0
                 var int2 = setInterval(function(){
                 	console.log("cnt==========="+cnt)
                 	console.log('t1: '+t1)
                 	console.log('cph '+ cph[idx] + '同车时差： '+ time_differ[idx][t1]+'replay_speed:'+replay_speed)
           
                 	t1++
                        //var cursor = navg0.getCursor().idx

                        // console.log('cursor '+cursor)
                        // console.log('t '+t1)
                        // console.log('i '+idx)
                        // if(t>cursor){
                        //     navg0.setSpeed(speeds[i-1][cursor])
                        // }
                        // else{
                        	navg0.setSpeed(speeds[idx][t1]*replay_speed)
                       // }
                       console.log(navg0.getSpeed())
                       if(t1==time_differ[idx].length){
                       		console.log("layer2 over");
                       		clearInterval(int2);
                       }
                   },time_differ[idx][t1]/replay_speed) 
             }
         }
     }