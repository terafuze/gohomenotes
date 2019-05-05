package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Dismissal Location entity.
 */
public class DismissalLocationModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    private String abbreviation;
    
    private Integer assignedPassengers;
    
    private Integer maxGuestsPerStudent;
    
    private Integer maxPassengers;
    
    @NotNull
    private String name;
    
    private Boolean transfersAllowed;
    

    public String getIdentifier() {
        return this.identifier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
    public String getAbbreviation() {
        return this.abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }
    
    
    public Integer getAssignedPassengers() {
        return this.assignedPassengers;
    }

    public void setAssignedPassengers(Integer assignedPassengers) {
        this.assignedPassengers = assignedPassengers;
    }
    
    
    public Integer getMaxGuestsPerStudent() {
        return this.maxGuestsPerStudent;
    }

    public void setMaxGuestsPerStudent(Integer maxGuestsPerStudent) {
        this.maxGuestsPerStudent = maxGuestsPerStudent;
    }
    
    
    public Integer getMaxPassengers() {
        return this.maxPassengers;
    }

    public void setMaxPassengers(Integer maxPassengers) {
        this.maxPassengers = maxPassengers;
    }
    
    
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    
    public Boolean getTransfersAllowed() {
        return this.transfersAllowed;
    }

    public void setTransfersAllowed(Boolean transfersAllowed) {
        this.transfersAllowed = transfersAllowed;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DismissalLocationModel dismissalLocationModel = (DismissalLocationModel) o;
        if (dismissalLocationModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dismissalLocationModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DismissalLocationModel{" +
            "id=" + getId() +
            ", abbreviation='" + this.getAbbreviation() + "'" +
            ", assignedPassengers='" + this.getAssignedPassengers() + "'" +
            ", maxGuestsPerStudent='" + this.getMaxGuestsPerStudent() + "'" +
            ", maxPassengers='" + this.getMaxPassengers() + "'" +
            ", name='" + this.getName() + "'" +
            ", transfersAllowed='" + this.getTransfersAllowed() + "'" +
            "}";
    }
}