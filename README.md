![Logo of the project](./src/assets/logo.png)

# Waterbear 
> Agile engine - Bonfire for bureaucracy

A tool to plan sprints - from vision to stories to tasks and where the team's
abilities and times fit in.  

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
# install dependencies
npm install

# To setup local couch db instance for this project using docker
npm run docker

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e - currently there are none

# run all tests
npm test
```

After starting couch (maybe through docker), then the dev server will start on localhost:8080. 

## Developing

### Built With
VueJS and vue-cli

### Prerequisites
You will need couchDB running on your machine. This could be done through docker using the docker file.

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/bangbangsoftware/waterbear.git
cd waterbear/
npm i
docker run couchdb
npm run dev
```

To get developing, you'll need docker and/or couchdb. You will need to create a waterbear database on couch typically [here](http://0.0.0.0:5984/_utils/index.html)

### Building

To build the project...

```shell
npm run build
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing
give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Versioning

Undecided.

## Configuration

There is zero configuration as of yet, a remote couchDB can be used 
by changing the address on the log on screen

# Tests

All jest tests can be run with...

```shell
npm run jest
```

## Style guide

This project splits up the Vue components into three files html, i
js and css.

## Api Reference

Future development will rely on the git protocol to trap task completion
through 

## Database

Designed to work with Apache CouchDB 1.6.1.

To setup local couch db instance for this project using docker
> ./dockercouch.sh
to start on subsequent run just
> docker start my-couchdb-app

you'll need to initialise "waterbear" database [here](http://0.0.0.0:5984/_utils/index.html)

## Licensing

GNU General Public License v3.0


