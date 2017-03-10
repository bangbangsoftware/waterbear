# waterbear

> Agile engine

## Build Setup

``` bash
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
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

To setup local couch db instance for this project using docker
> ./dockercouch.sh
to start on subsequent run just
> docker start my-couchdb-app

you'll need to initialise datbase by doing a put to this
http://127.0.0.1:5984/waterbear/