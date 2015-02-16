#redwrap

##Description

Redwrap is a node.js module that simplifies Reddit API requests through jquery style chaining methods.  

##How to use

Start by requiring the redwrap module

```javascript
reddit = require('redwrap');
```

This gives us access to 3 types of requests. Each of these request types must be provided with a callback function.  The arguments for the callback function are error, data, and response.
* error - will return any errors encountered during the request
* data - returns an object created by parsing the JSON  in the response body
* response - returns the raw response from Reddit, including the body in JSON form.

###1.The basic user request


```javascript
reddit.user('username', function(err, data, res){
  console.log(data); //outputs a parsed javascript object represeting
});
```

###2.The basic subreddit request


```javascript
reddit.r('WTF', function(err, data, res){
  console.log(data); //outputs object representing first page of WTF subreddit
});	
```

###3.The basic list request

With the list method the first argument is optional, and we will see why in a moment, but let's include one for now.

```javascript
reddit.list('hot', function(err, data, res){
	console.log(data); //object representing the front page of reddit w/ 'hot' filter
});
```

That's cool, but we can make it even easier by chaining other methods onto our request.  So let's look at how to format our previous request, using chaining this time.

```javascript
reddit.list().hot().exe(function(err, data, res){
	console.log(data);
});
```
Take note of the .exe() method.  This is an optional method that can be placed at the end of our chain which takes a callback as its only argument.  You might use this as a way of breaking up long chains into a more readable structure.  For shorter chains, we can just add our callback to the last method in the chain.

###Filters

Filters in redwrap are methods we can chain to our requests.  These filters correspond exactly with the filters you see on the reddit site. In the last example, we saw our first use of a filter, when we chained .hot() to our request.  Below is a list of possible filters.  You can find 


User filters
 
* overview
* comments
* submitted
* liked
* disliked
* hidden
* saved
* about
 
Subreddit filters

* hot
* new
* controversial
* top

###Queries

Queries are applied to our request chain in the same way filters are.  They allow us to make a more targeted request from the Reddit API.  The main difference between filters and queries is that queries require an argument when called. In this next example we will be requesting the 'top' '100' comments from this 'year', for the given username.

```javascript
reddit.user('username').sort('top').from('year').limit(100, function(err, data, res){
	console.log(data); //top 100 comments this year for username
});
```
Here is a list of the possible queries along with acceptable arguments. You can learn more about the arguments from the Reddit API documentation.

* sort() 
	Possible arguments: 'hot', 'top', 'new', 'controversial' 
* from()
	Possible arguments: 'all','day','week','month','year'
* limit()
	Possible arguments: Any integer from 1 - 100;
* after()
	Possible arguments: a post ID
* before()
	Possible arguments: a post ID
* count()
	Possible arguments: An integer from 1 - 100;

###Advanced - Making multiple requests with the .all() method.

**Use this at your own risk** 

Before using this feature it is important that you be aware of the rules found in the Reddit API documentation.  Currently, there is no throttle on the number of requests per min the .all()  method makes.  It will continue to cycle until it collects all of the requested data, or until Reddit cuts you off. Also note that the default limit is set to 100.  You can change this by adding your own limit query to the request chain, but it isn't recommended.  I would like to expand on this feature in the near future, so please, if you have any feature requests let me know.


What exactly does the .all() method do? It is basicly a method that allows you to scrape multiple pages of Reddit data. First we create a request chain with our desired filter and queries, just like the previous examples.  Then we add the .all() method to the end of the chain. This gives us access to an event emitter which we can attach listener functions to.  

Here is the basic pattern for making multiple page requests with redwrap using the .all() method.

```javascript
reddit.user('username').comments().sort('top').all(function(res) {
	res.on('data', function(data, res) {
		console.log(data); //a parsed javascript object of the requested data
		console.log(res); //the raw response data from Reddit
	});

	res.on('error', function(e) {
		console.log(e); //outputs any errors
	});

	res.on('end', function(){
		console.log('All Done');
	});
});
```

If you have experience with the http module in node, then this should look very familiar.  When you use the .all method, it passes back an event emitter object that you can attach your event listeners to. The standard data, error, and end events are possible. Each time reddit responds with a new page of results, it triggers the 'data' event.

That's all for now. My goal is to expand the features of redwrap to cover as much of the Reddit API as is needed by devs, so let me know if there is a feature you would like to see included. Enjoy!
