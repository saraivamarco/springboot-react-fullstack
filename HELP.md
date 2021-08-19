# Getting Started

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.4.8/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.4.8/maven-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.5.2/reference/htmlsingle/#boot-features-developing-web-applications)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)

### PostgreSQL with Docker

* Create a Network named ‘db’ (use ‘rm’ to delete instead of ‘create’
  
docker network create db

* Run a docker container for Postgres  


* Create a folder to mount
   cd $usr

mkdir var/lib/postgresql/data  
cd var/lib/postgresql/data

docker run --name db -p 5432:5432 --network=db -v "$PWD:$usr/var/lib/postgresql/data" -e POSTGRES_PASSWORD=[pg-password] -d postgres:alpine

### Run a sql container client to run sql commands against our database 
  
docker run -it --rm --network=db postgres:alpine psql -h db -U postgres

* To restart an exiting container
  
docker start db  
create database amigoscode;

### PostgreSQL with AWS
* Run a sql container client to run sql commands against our database in AWS
  
docker run -it --rm postgres:alpine psql -h aa1vqr4odanntrn.citcw1jig9us.eu-west-2.rds.amazonaws.com -U amigoscode -d postgres

* Change the environment variable to point out to the dev environment.  
  
SPRING_PROFILES_ACTIVE=dev
   
### Export project to AWS with JIB
./mvnw clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=latest

used commands:  
docker login   
docker pull  
docker rm -f id  
./mvnw help:active-profiles  

./mvnw clean install jib:build -Djib.to.image=saraivam/springboot-react-fullstack:latest   

* or we can issue the whole command, note that the password field will be the one we set for docker.io 

./mvnw clean install jib:build -Djib.to.image=saraivam/springboot-react-fullstack:latest -D jib.to.auth.username=saraivam -Djib.to.auth.password=[password]  

docker pull saraivam/spring-react-fullstack:latest  
docker run -p 8080:8080 saraivam/springboot-react-fullstack  