docker run -p 5984:5984 \
  -v $PWD/couchdbconf/local.ini:/usr/local/etc/couchdb/local.ini:rw \
  --name my-couchdb-app \
  -d couchdb \