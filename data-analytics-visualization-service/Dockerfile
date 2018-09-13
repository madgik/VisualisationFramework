# Base Alpine Linux based image with OpenJDK JRE only
FROM tomcat:jre8-alpine
# copy application WAR (with libraries inside)
COPY target/data-analytics-visualization-service.war /usr/local/tomcat/webapps/
