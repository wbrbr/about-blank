var socket = io();
socket.on('song',function(result){
    document.getElementById('song').innerHTML = "<span class='fa fa-music'> -  " + result + "</span>";
});
socket.on('disk',function(str){
    result = JSON.parse(str);
    document.getElementById('disk').innerHTML = "<span class='fa fa-hdd-o'> - " + result.name + ": " + result.description + "</span>";
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

$('#command').keypress(function(e){
    if(e.key == "Enter" || e.charCode == 13) { // Enter key
        socket.emit('command',$('#command').val());
        $('#command').val('');
    }
});
$('cmd_btn').click(function(e) {
    socket.emit('command',$('#command').val());
    $('#command').val('');
});
$('#google').keypress(function(e){
    if(e.key == "Enter" || e.charCode == 13) {
        window.location.href = 'http://google.com/search?q=' + $('#google').val();
        $('#google').val('');
    }
});
$('#google_btn').click(function(e) {
    window.location.href = 'http://google.com/?q=' + $('#google').val();
    $('#google').val('');
});
$('#github').keypress(function(e){
    if(e.key == "Enter" || e.charCode == 13) {
        window.location.href = 'http://github.com/search?q=' + $('#github').val();
        $('#github').val('');
    }
});
document.getElementById('github_btn').onclick = function() {
    window.location.href = 'http://github.com/search?q=' + $('#github').val();
    $('#github').val('');
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
