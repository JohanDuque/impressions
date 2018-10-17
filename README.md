# Impressions

I decided approach the challenge using Spring Boot as a Backend and ReactJS for the Frontend.

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

## Project Structure
### API Service
A Spring Boot microservice structured as follows:

* Controller: contains the endpoints of the service
* Model: contains the only domain model that represents the Impressions
* Dao: Here we have the layer that access the data, in this concrete case the dataset.csv file

### Frontend
As suggested I'm using React

