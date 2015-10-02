var socket = io();
var config;
socket.on('config',function(conf){
    config = conf;
    $('#' + config.active).addClass('active');
	document.getElementById('theme').href = conf.theme + ".css";
});
socket.on('song',function(result){
    document.getElementById('song').innerHTML = "<span class='fa fa-music'> -  " + result + "</span>";
});
socket.on('disk',function(size){
    document.getElementById('disk').innerHTML = "<span class='fa fa-hdd-o'> - " + config.partition + ": " + size + "</span>";
});
socket.on('update',function(count){
    document.getElementById('update').innerHTML = "<span class='fa fa-linux'> - Updates: " + count + "</span>";
});
socket.on('ram',function(ram){
    document.getElementById('ram').innerHTML = "<span class='fa fa-line-chart'> - Ram: " + ram + "</span>";
});
socket.on('uname',function(kernel){
    document.getElementById('uname').innerHTML = "<span class='fa fa-linux'> - Kernel: " + kernel + "</span>";
});
socket.on('weather',function(weather){
    document.getElementById('weather').innerHTML = "<span class='fa fa-sun-o'> - " + JSON.parse(weather).weather[0].description + "</span>";
});

$('#command').keypress(function(e){
    if(e.key == "Enter" || e.charCode == 13) { // Enter key
        processInput();
    }
});
$('cmd_btn').click(function(e) {
    processInput();
});

function processInput()
{
    if($('#terminal').hasClass('active'))
    {
        var cmd;
        if(navigator.platform.indexOf('Mac') > -1) cmd = "open -a " + $('#command').val().replace(/ /g, '\\ ');
        else cmd = $("#command").val();
        socket.emit('command',cmd);
        $('#command').val('');
    }
    else if($('#search').hasClass('active'))
    {
        if(config.search == "google") window.location.href = 'http://google.com/search?q=' + $('#command').val();
        else if(config.search == "duckduckgo") window.location.href = 'http://duckduckgo.com/?q=' + $('#command').val();
        $('#command').val('');
    }
    else if($('#github').hasClass('active'))
    {
        window.location.href = 'http://github.com/search?q=' + $('#command').val();
        $('#command').val('');
    }

}
