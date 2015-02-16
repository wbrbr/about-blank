var http = require('http'),
    fs = require('fs'),
    feed = require('feed-read'),
    reddit = require('./reddit.js'),
    github = require('./github.js'),
    currentSub = 'all';

var server = http.createServer(function(req,res){
    res.writeHead(200,{'Access-Control-Allow-Origin':'*/*'});
    req.setEncoding('utf8');
    fs.createReadStream('./index.html').pipe(res);
});
server.listen(3527);
var io = require('socket.io')(server);

io.on('connection',function(socket){
    // sub();
    reddit_home();
    getGithub();
    socket.on('chsub',function(subname){
        sub(subname);
    });
});

function sub(subname) {
    if(subname === undefined) subname = currentSub;
    reddit.subreddit(subname,function(str){
        io.emit('reddit',str);
    });
    currentSub = subname;
}

function reddit_home() {
    reddit.home(function(str){
        io.emit('reddit',str);
    });
}

function getGithub()
{
    github(process.argv[2],process.argv[3],function(result){
        feed.atom(result,function(err,items){
            if(err) throw err;
            io.emit('github',JSON.stringify(items));
        });
    });
}
// setInterval(getGithub,5000);
// setInterval(sub,5000);
