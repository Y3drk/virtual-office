FROM maven:3.8.3-openjdk-17-slim AS MAVEN_BUILD
COPY pom.xml /build/
COPY src /build/src/
WORKDIR /build/
RUN mvn package

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/backend-0.0.1-SNAPSHOT.jar /app/
EXPOSE 8080
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]