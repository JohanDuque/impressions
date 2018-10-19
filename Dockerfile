# Dockerfile
FROM java:8

MAINTAINER  Johan Duque <johand.duque@gmail.com>

WORKDIR /

ADD /target/impressions-0.1.0.jar impressions.jar
ADD /src/main/resources/dataset.csv /src/main/resources/dataset.csv

EXPOSE 8080

CMD java -jar impressions.jar
