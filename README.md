# Impressions

I decided approach this project by using Spring Boot as a Backend and ReactJS for the Frontend.

# Install 
## Requirements
* Java 1.8
* Maven

Once you have Java and Maven installed and configured, run:
`mvn clean install` inside the project root folder.

# Run
## Manually
`java -jar target/impressions-0.1.0.jar`
## Bash script
`sh startImpressions.sh`
# Docker
##Build
`docker build -t impressions .`
##Run
`docker run -d --publish=8888:8080 impressions:latest`
It will start SpringBoot in a docker container. You can then check at `localhost:8888`


## Project Structure
### API Service
A Spring Boot microservice structured as follows:

* Controller: contains the endpoints of the service
* Model: contains the only domain model that represents the Impressions
* Dao: Here we have the layer that access the data, in this concrete case the dataset.csv file

### Frontend
I'm using React together with vis for interactive visualizations. 

