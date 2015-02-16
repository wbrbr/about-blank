var https = require('https'),
    url = require('url'),
    base_url = 'https://api.github.com/';


function get_timeline_url(username,password,callback)
{
    https.get({auth:username+':'+password,hostname:'api.github.com',path:'/feeds',headers:{'user-agent':'node.js'}},function(res){
        var str = '';
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            str += chunk;
        });
        res.on('end',function(){
            callback(JSON.parse(str)._links.current_user.href);
        });
    }).on('error',function(err){
        throw err;
    });
}

function get_timeline(username,password,timeline_url,callback)
{
    https.get({auth:username+':'+password,hostname:url.parse(timeline_url).hostname,path:url.parse(timeline_url).path,headers:{'user-agent':'node.js'}},function(res){
        var str = '';
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            str += chunk;
        });
        res.on('end',function(){
            callback(str);
        });
    }).on('error',function(err){
        throw err;
    });
}

function get_feed(username,password,callback)
{
    get_timeline_url(username,password,function(address){
        get_timeline(username,password,address,function(str){
            callback(str);
        });
    });
}

module.exports = get_feed;
