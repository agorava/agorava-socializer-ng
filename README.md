# Socializer 2.0

New Socializer version with AngularJS

## Goal

Lots of people say "Java EE is uber heavy, you always need to use JSF as front-end, etc...".

This project aims to demonstrate a REST API on a Java EE 7 server with a pure HTML/CSS/JavaScript front-end, using nice frameworks like AngularJS and Bootstrap. Since we didn't want to do a simple "Hello World", the project will also use Agorava to plug on famous social APIs (Twitter, Facebook, LinkedIn) and stream the data through our API.

## Build project

### Mandatory tools

- Java EE 7 Application Server
- Maven
- NPM
- Grunt
- Bower

### Build front-end resources

```shell
bower install
grunt
```

### Deploy

You know... just push the stuff as a war to your server...

TODO by Antoine for more infos.
