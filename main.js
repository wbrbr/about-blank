var div = document.getElementById('posts'),
    subbtn = document.getElementById('subbtn');

function changeSubreddit()
{
    fetch_subreddit(document.getElementById('subname').value,function(res){
        processJSON(JSON.parse(res));
    });
    document.getElementById('subname').value = "";
}

function processJSON(json)
{
    div.innerHTML = "";
    json.data.children.forEach(function(child){
        div.innerHTML += '<p><a href="'+child.data.url+'"><img src="'+ child.data.thumbnail +'"/>'+child.data.title+'</a><br/><a class=comment_btn href=# onclick="showComments();">Comments</a></p>';
    });
}

fetch_subreddit('all',function(res){
    processJSON(JSON.parse(res));
});

fetch_github(function(res){
    console.log(res);
});
