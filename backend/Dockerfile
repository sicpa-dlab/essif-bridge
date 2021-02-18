# Compile
FROM maven:3.6.0-jdk-11-slim AS build
COPY pom.xml /app/
COPY src /app/src
RUN mvn -f /app/pom.xml clean package


# Run stage
FROM openjdk:11-jre-slim
COPY --from=build /app/target/*.jar /opt/app.jar
WORKDIR /opt
CMD ["java", "-jar", "app.jar"]