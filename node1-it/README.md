# Microservice lab projet  
This is a lab project for testing how to run and test microservices. Right now it contains only one service:  
- node1: A simple nodejs REST api that fetches data from ElasticSearch  

## Running integration test for node1

### Without Docker
...

### With Docker

#### Build node1 (system under test)
From project root folder (microservice-ex) run:

```sh
docker-compose build node1
```

#### Run test in container and join network

Build test docker image
```sh
docker build . -t patrikbergman/node1-it
```

```sh
docker run --network=microservice-ex_default patrikbergman/node1-it 
```

#### Mocha tests
-b, --bail                      bail after first test failure

