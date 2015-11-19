var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    os = require('os'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    exec = require('child_process').exec,
    config = require('./config.json');

server.listen(config.port,'localhost');
app.use(express.static(path.join(__dirname,'public')));

console.log('Listening on port ' + config.port);

var intervals = {};

function handleError(moduleName, error) {
  console.error('Error in module ' + moduleName + ': ' + error);
  clearInterval(intervals[moduleName]);
}

//Global declarations for easy configuration

global.song = function(){
    exec('mpc current',function(err,stdout,stderr) {
        if(err) {
          handleError('song', err);
        } else if(stdout) {
            io.emit('song',stdout.toString('utf8'));
        }
    });
};

global.disk = function(){
    exec("echo \"$(df "+ config.partition +" --output=used -h |sed '1d')/$(df "+ config.partition +" --output=size -h |sed '1d')\" available",function(err,stdout,stderr){
        if(err) {
            handleError('disk', err);
        } else if(stdout) {
            io.emit('disk',stdout.toString());
        }
    });
};

global.ram = function(){
    exec("echo \"$(free -h | awk '/Mem:/ {print $3}')/$(free -h | awk '/Mem:/ {print $2}') used\"",function(err,stdout,stderr){
        if(err) {
            handleError('ram', err);
        } else if(stdout) {
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

global.uname = function(){
    io.emit('uname', os.type() + ' ' + os.release() + ' ' + os.arch());
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
        intervals[val.name] = setInterval(global[val.name],val.interval);
    }
});
