var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    exec = require('child_process').exec,
    config = require('./config.json'),
    osascript = require('node-osascript');

server.listen(config.port,'localhost');
app.use(express.static(path.join(__dirname,'public')));

// start with true to prevent from getting info when we haven't checked if iTunes is running
var paused = true;

// prevent from loading in each call to iTunesInfo
var infoCmd = 'tell application "iTunes" to ' +
            '{ artist of current track as string, ' +
            'name of current track as string }';



var iTunesInfo = function() {
    // iTunes throws an error if it's paused and we try to obtain the current song
    osascript.execute('tell app "iTunes" to get player state as string', function(err, stdout, stderr) {
        var state = stdout.toString('utf8');
        paused = state === 'paused' || state === 'stopped';
    });

    if(paused) {
       return;
    }

    osascript.execute(infoCmd, function(err,stdout,stderr) {
        if(err) {
            throw err;
        }
        if(stdout) {
            io.emit('song',stdout.join(' - ').toString('utf8'));
        }
    });
};

//Global declarations for easy configuration

global.song = function(){
    osascript.execute('tell app "System Events" to count processes whose name is "iTunes"', function(err, stdout, stderr) {
        if(stdout)
            iTunesInfo();
    });
};

global.disk = function(){
    exec("echo \"$(df -h "+ config.partition + " | sed '1d' | awk '{print $3}')/$(df -h " + config.partition + " | sed '1d' | awk '{print $2}')\"",function(err,stdout,stderr){
        if(err) throw err;
        if(stdout) {
            var object = {
                name: config.partition,
                description: stdout.toString()
            };
            io.emit('disk', stdout.toString());
        }
    });
};

global.ram = function(){
    exec('top -l 1 | head -n 10 | grep PhysMem',function(err,stdout,stderr){
        if(err) throw err;
        if(stdout) {
            io.emit('ram',stdout.toString('utf8'));
        }
    });

};

global.weather = function(){
    http.get("http://api.openweathermap.org/data/2.5/weather?q="+config.city,function(res){
        var str = '';
        res.on('data',function(chunk){
            str += chunk;
        });
        res.on('end',function(){
            io.emit('weather',str);
        });
    });
};

//Initialize the modules

io.on('connection',function(socket){
    config.modules.forEach(function(val){
        if(typeof global[val.name] === "function"){
            global[val.name]();
        }
    });
    socket.emit('config',config);
    socket.on('command',function(command){
        exec(command);
    });
});

config.modules.forEach(function(val){
    if(typeof global[val.name] === "function"){
        setInterval(global[val.name],val.interval);
    }
});
