var http = require('http')
var url = require('url')
var http = require('http')


function startServer(route, handle){
http.createServer(
    function(request,response){
        var reviewData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request Recived for" + pathname);
        request.setEncoding("utf8")
        request.addListener("data",function(chunk){
            reviewData+=chunk;
        });
        request.addListener("end",function(){
            route(handle,pathname,response,reviewData);
        });
        
        
    }
).listen(8888);

console.log("Server started at port 8888")
}

exports.startServer = startServer;