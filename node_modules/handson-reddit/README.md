# handson-reddit

Node.js wrapper for the Reddit API

## Purpose

1. To create a nice node-friendly wrapper/client for the Reddit API.
2. To learn how to create an API wrapper using superagent and request and share it using npm publish. (smackdown)

## Installation

We'll look at npm publish and make the project available via

> npm install _________ (project name here)

## Usage

### Simple

> var Reddit = require('handson-reddit'); // working title
>
> reddit = new Reddit();
>
> reddit.r('funny', function (err, results) {
> 
> });

### Chainable

> reddit.r('funny').new().exec(function (err, results) {
> 
> });

Support new(), controversial(), top()

### Interactive

> reddit.login(username, password, function (err, success) {
> 
> });

Plus more calls from https://github.com/reddit/reddit/wiki

## But Why?

1. So you never have to do it again.
2. So other people can use it to do amazing things.
3. Feedback, contributions, the whole community thing.

## But How?

### Request

https://github.com/mikeal/request/

### Superagent

https://github.com/visionmedia/superagent/

### Under the Hood

http://nodejs.org/api/http.html#http_http_request_options_callback

## The Tests

> git clone https://github.com/timisbusy/handson-reddit.git
>
> cd handson-reddit
>
> npm install
>
> REDDIT_USERNAME=usernamehere REDDIT_PASSWORD=passwordhere make test

## Let's Do This!

Check out the tests, check out a branch, make a test pass, submit a pull request, repeat.