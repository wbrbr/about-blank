var http = require('http'),
    base_url = 'http://api.twitter.com/1.1/statuses/user_timeline.json';

function fetch_user(username,callback)
{
    http.get(base_url+'?screen_name='+username,function(res){
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

module.exports = fetch_user;
