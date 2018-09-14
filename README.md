# Visualisation Framework

## Installation

### React Projects

#### Install Dependencies

yarn install

#### Run locally

yarn run start

#### Build release

yarn run build

### Service

#### Build

mvn install (root project)

#### Run locally

tomcat7:run

### Portlets

#### Build

1. build react project
	- copies dist/assets directory to portlet
2. mvn install 
	- replace manually version numbers in jsp :(
3. copy war to deploy folder

### Dependencies

MongoDB on localhost default port