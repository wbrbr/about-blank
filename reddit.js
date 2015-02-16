var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    client_id = 'A9ZFCwPa7OrF2g',
    base_url = 'http://www.reddit.com/';

function subreddit(subname,callback)
{
    http.get(base_url + 'r/' + subname + '/hot.json',function(res){
        var str = '';
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            str += chunk;
        });
        res.on('end',function(){
            callback(str);
        });
    }).on('error',function(e){
        throw e;
    });
}

function home(callback)
{
    http.get(base_url + '.json',function(res){
        var str = '';
        res.on('data',function(chunk){
            str += chunk;
        });
        res.on('end',function(){
            console.log(str);
            callback(str);
        });
    }).on('error',function(err){
        throw err;
    });
}

function get_access_token(callback)
{
    url = "https://www.reddit.com/api/v1/authorize?client_id="+client_id+"&response_type=token&state="+Math.random().toString(36).slice(2)+"&redirect_uri=http://reddit.com&scope=read,mysubreddits";
    console.log(url);
    https.get(url,function(res){
        res.pipe(process.stdout);
    });
}

exports.subreddit = subreddit;
exports.home = home;

