var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    exec = require('child_process').exec,
    config = require('./config.json');

server.listen(config.port,'localhost');
app.use(express.static(path.join(__dirname,'public')));

//Global declarations for easy configuration

global.song = function(){
	exec('mpc current',function(err,stdout,stderr) {
        if(err) throw err;
        if(stdout) {
            io.emit('song',stdout.toString('utf8'));
        }
    });
}

global.disk = function(){
	exec("echo \"$(df -h "+ config.partition + " | sed '1d' | awk '{print $3}')/$(df -h " + config.partition + " | sed '1d' | awk '{print $2}')\"",function(err,stdout,stderr){
        if(err) throw err;
        if(stdout) {
            io.emit('disk',stdout.toString());
        }
    });
}

global.ram = function(){
	exec("echo \"$(free -h | head -n 2 | tail -n 1 | awk '{print $4}')/$(free -h | head -n 2 | tail -n 1 | awk '{print $2}')\"",function(err,stdout,stderr){
        if(err) throw err;
        if(stdout) {
            io.emit('ram',stdout.toString('utf8'));
        }
    });

}

global.update = function(){
	exec("checkupdates | wc -l",function(err,stdout,stderr){
        if(err) throw err;
        if(stdout) {
            io.emit('update',stdout.toString('utf8'));
        }
    });
}

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
}

//Initialize the modules

io.on('connection',function(socket){
	config.modules.forEach(function(val){
		if(typeof global[val.name] === "function"){
			global[val.name]();
		}
	})
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
