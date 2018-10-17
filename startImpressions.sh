#!/usr/bin/env bash

echo "Running maven clean and install..."
mvn clean install
echo "Launching Impressions webserver..."
java -jar target/impressions-0.1.0.jar

