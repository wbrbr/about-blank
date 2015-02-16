function parse_rss(xml,callback)
{
    callback(xml.channel.title);
}

function fetch_feed(url,callback)
{
    var req = createCORSRequest('GET','127.0.0.1:3527');
    if(! req) throw new Error('CORS not supported');
    req.onload = function(e) {
        console.log(req.response);
    };
    req.send(null);
}

