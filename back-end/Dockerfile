# Build stage
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app

# Copy only the necessary files to leverage Docker caching
COPY pom.xml /app/
RUN mvn dependency:go-offline

# Now copy the rest of the project files
COPY src /app/src
RUN mvn clean package -DskipTests

# Package stage
FROM openjdk:17-alpine
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar /app/app.jar

# Expose the port and define the entry point
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
