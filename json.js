function processJSON(json,div)
{
    div.innerHTML = "";
    json.data.children.forEach(function(child){
        div.innerHTML += '<p><a href="'+child.data.url+'"><img src="'+ child.data.thumbnail +'"/>'+child.data.title+'</a><br/><a class=comment_btn href=# onclick="showComments();">Comments</a></p>';
    });
}
