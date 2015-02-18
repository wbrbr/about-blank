var socket = io();
socket.on('song',function(result){
    document.getElementById('song').innerHTML = "<span class='fa fa-music'> -  " + result + "</span>";
});
socket.on('disk',function(space){
    document.getElementById('disk').innerHTML = "<span class='fa fa-hdd-o'> - /home: " + space + "</span>";
});
socket.on('update',function(count){
    document.getElementById('update').innerHTML = "<span class='fa fa-linux'> - Updates: " + count + "</span>";
});
socket.on('ram',function(ram){
    document.getElementById('ram').innerHTML = "<span class='fa fa-line-chart'> - Ram: " + ram + "</span>";
});
socket.on('weather',function(weather){
    document.getElementById('weather').innerHTML = "<span class='fa fa-sun-o'> - " + JSON.parse(weather).weather[0].description + "</span>";
});

document.getElementById('command').addEventListener('keypress',function(e){
    if(e.charCode == 13) { // Enter key
        socket.emit('command',document.getElementById('command').value);
        document.getElementById('command').value = '';
    }
});
document.getElementById('cmd_btn').onclick = function() {
    socket.emit('command',document.getElementById('command').value);
    document.getElementById('command').value = '';
};
document.getElementById('google').addEventListener('keypress',function(e){
    if(e.charCode == 13) {
        window.location.href = 'http://google.com/search?q=' + document.getElementById('google').value;
        document.getElementById('google').value = '';
    }
});
document.getElementById('google_btn').onclick = function() {
    window.location.href = 'http://google.com/?q=' + document.getElementById('google').value;
    document.getElementById('google').value = '';
};
document.getElementById('github').addEventListener('keypress',function(e){
    if(e.charCode == 13) {
        window.location.href = 'http://github.com/search?q=' + document.getElementById('github').value;
        document.getElementById('github').value = '';
    }
});
document.getElementById('github_btn').onclick = function() {
    window.location.href = 'http://github.com/search?q=' + document.getElementById('github').value;
    document.getElementById('github').value = '';
};

document.getElementById('web').onclick = function() {
    socket.emit('web');
};

document.getElementById('terminal').onclick = function() {
    socket.emit('terminal');
};

document.getElementById('file').onclick = function() {
    socket.emit('file');
};

document.getElementById('game').onclick = function() {
    socket.emit('game');
};
