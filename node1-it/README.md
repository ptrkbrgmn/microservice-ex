# Microservice lab project  
This is a lab project for testing how to run and test microservices. Right now it contains only one service:  
- node1: A simple nodejs REST api that fetches data from ElasticSearch  

## Running integration test for node1
docker build . -t patrikbergman/node1-it
### Without Docker
...

### With Docker

#### Build and run node1 (system under test)
From project root folder (microservice-ex) run:
```sh
docker-compose build node1
```
Then run:
```sh
docker-compose up node1
```

#### Build and run node1 ingetration test in container (join docker network)
From folder microservice-ex/node1-it run:
```sh
docker build . -t patrikbergman/node1-it
```
Then run:
```sh
docker run --network=microservice-ex_default patrikbergman/node1-it
```

*** 

#### Mocha tests
-b, --bail                      bail after first test failure

