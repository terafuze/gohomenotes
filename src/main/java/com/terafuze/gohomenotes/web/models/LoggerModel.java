package com.terafuze.gohomenotes.web.models;

import ch.qos.logback.classic.Logger;

/**
 * API Model object for storing a Logback logger.
 */
public class LoggerModel {

    private String name;

    private String level;

    public LoggerModel(Logger logger) {
        this.name = logger.getName();
        this.level = logger.getEffectiveLevel().toString();
    }

    public LoggerModel() {
        // Empty public constructor used by Jackson.
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    @Override
    public String toString() {
        return "LoggerModel{" +
            "name='" + name + '\'' +
            ", level='" + level + '\'' +
            '}';
    }
}
