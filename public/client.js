var socket = io();
socket.on('default',function(id){
    $('#'+id).addClass('active');
});
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
        alert('mdr');
        socket.emit('command',$('#command').val());
        $('#command').val('');
    }
    else if($('#google').hasClass('active'))
    {
        window.location.href = 'http://google.com/?q=' + $('#command').val();
        $('#command').val('');
    }
    else if($('#github').hasClass('active'))
    {
        window.location.href = 'http://github.com/search?q=' + $('#command').val();
        $('#command').val('');
    }

}
