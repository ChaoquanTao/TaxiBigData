var express = require('express');
var app = express();

app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
 res.sendFile( __dirname + "/" + "index.html" );

   //这里加入数据库操作代码********************************************************

 })

app.get('/datas', function(req, res){
   get_data(res);
})

app.get('/hhh', function(req, res){
	var carID = req.query.name;
	console.log(req.query.name);
	//console.log(req);
	//这里进行检索
	get_data(res,carID)
	//res.send(res);
	//console.log(res)
	//res.end();
})


function get_data(res,carID) {
	var oracledb = require('C:/Users/Terry/node_modules/_oracledb@2.0.15@oracledb/lib/oracledb');
	var config = {
	    user: 'C##Arrow',
	    password:'taochaoquan',
	    connectString : "127.0.0.1:1521/mydb"
	};



	oracledb.getConnection(
	  config,
	  function(err, connection)
	  {
	    if (err) {
	      console.error(err.message);
	      return;
	    }

  //  connection.execute("SELECT * FROM ( SELECT A.*, ROWNUM RN FROM (SELECT * FROM carinfo) A WHERE ROWNUM <= 10 ) WHERE RN >= 0",
// connection.execute("select * from allcar where cph = '苏AW85A0' order by sj",
		if(carID==null){
  			connection.execute(" select cph,wd,jd,sd,sj,row_number() over(partition by cph order by sj) row_number from tencar",
		    	function(err, result)
		    	{
		      	if (err) {
		       		console.error(err.message);
		        	doRelease(connection);
		        	return;
		    	}
        		res.send(result.rows)
    		});
    	}
	    else{
	    	console.log("*******************carID: " + carID)
	    	connection.execute(" select cph,wd,jd,sd,sj from tencar where cph = '"+ carID + "' order by sj ",
			    function(err, result)
			    {
			      if (err) {
			        console.error(err.message);
			        doRelease(connection);
			        return;
			    }
	        	res.send(result.rows)
	    	});	
	    }
});

function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}

}

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})