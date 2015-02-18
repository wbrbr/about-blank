var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    serveStatic = require('serve-static'),
    exec = require('child_process').exec,
    config = require('./config.json');

server.listen(config.port,'localhost');
app.use(express.static(path.join(__dirname,'public')));

io.on('connection',function(socket){
    currentSong();
    diskSpace();
    countUpdates();
    freeRam();
    getWeather();
    socket.on('command',function(command){
        exec(command);
    });
    socket.on('web',function(){
        exec(config.web);
    });
    socket.on('game',function(){
        exec(config.game);
    });
    socket.on('terminal',function(){
        exec(config.terminal);
    });
    socket.on('file',function(){
        exec(config.file);
    });
    
});

function currentSong() {
    exec('mpc current',function(err,stdout,stderr) {
        if(err) throw err;
        if(stdout) {
            io.emit('song',stdout.toString('utf8'));
        }
    });
}

function diskSpace() {
    exec("echo \"$(df -h /home | sed '1d' | awk '{print $3}')/$(df -h /home | sed '1d' | awk '{print $2}')\"",function(err,stdout,stderr){
        if(err) throw err;
        if(stdout) {
            io.emit('disk',stdout.toString('utf8'));
        }
    });
}

function freeRam() {
    exec("echo \"$(free -h | head -n 2 | tail -n 1 | awk '{print $4}')/$(free -h | head -n 2 | tail -n 1 | awk '{print $2}')\"",function(err,stdout,stderr){
        if(err) throw err;
        if(stdout) {
            io.emit('ram',stdout.toString('utf8'));
        }
    });
}

function countUpdates() {
    exec("checkupdates | wc -l",function(err,stdout,stderr){
        if(err) throw err;
        if(stdout) {
            io.emit('update',stdout.toString('utf9'));
        }
    });
}

function getWeather() {
    http.get("http://api.openweathermap.org/data/2.5/weather?q="+config.city,function(res){
        var str = '';
        res.on('data',function(chunk){
            str += chunk;
        });
        res.on('end',function(){
            io.emit('weather',str);
        });
        res.on('error',function(err){
            throw err;
        });
    });
}

setInterval(currentSong,1000);
setInterval(diskSpace,5000);
setInterval(countUpdates,30000);
setInterval(freeRam,1000);
setInterval(getWeather,30000);
