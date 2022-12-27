function route(handle,pathname,response,reviewData){
    console.log("Routing a request for" + pathname);
    if(typeof handle[pathname]==='function'){
        handle[pathname](response,reviewData);
    
    }else{
        console.log("No handle for" + pathname);
        response.writeHead(404,{"Content-Tpe": "text/plain"});
        response.write("Error 404. Page not found");
        response.end()
    }
}

exports.route = route;