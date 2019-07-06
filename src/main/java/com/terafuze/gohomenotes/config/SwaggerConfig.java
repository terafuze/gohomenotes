package com.terafuze.gohomenotes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("go-home-notes")
                .tags(
                    new Tag("address-resource", "Address Resource"),
                    new Tag("after-school-program-resource", "After School Program Resource"),
                    new Tag("dismissal-location-resource", "Dismissal Location Resource"),
                    new Tag("early-pickup-request-resource", "Early Pickup Request Resource"),
                    new Tag("family-registration-resource", "Family Registration Resource"),
                    new Tag("go-home-notes-report-resource", "Go Home Notes Report Resource"),
                    new Tag("guest-request-resource", "Guest Request Resource"),
                    new Tag("host-request-resource", "Host Request Resource"),
                    new Tag("parent-resource", "Parent Resource"),
                    new Tag("parent-registration-resource", "Parent Registration Resource"),
                    new Tag("school-resource", "School Resource"),
                    new Tag("school-grade-resource", "School Grade Resource"),
                    new Tag("student-resource", "Student Resource"),
                    new Tag("student-registration-resource", "Student Registration Resource"),
                    new Tag("teacher-resource", "Teacher Resource"),
                    new Tag("transportation-change-request-resource", "Transportation Change Request Resource"),
                    new Tag("user-profile-resource", "User Profile Resource"))
                    .apiInfo(this.apiInfo())
                .select()
                .build();
    }


    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Go Home Notes")
                .description("Go Home Notes API")
                .version("1.0.0")
                .build();
    }

}
