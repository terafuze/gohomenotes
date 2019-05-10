package com.terafuze.gohomenotes.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.OrderBy;
import javax.validation.constraints.NotNull;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 */
@Entity
@Table(name = "dismissal_location")
public class DismissalLocation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "abbreviation")
    private String abbreviation;

    @Column(name = "assigned_passengers")
    private Integer assignedPassengers;

    @Column(name = "max_guests_per_student")
    private Integer maxGuestsPerStudent;

    @Column(name = "max_passengers")
    private Integer maxPassengers;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    
    @ManyToOne
    private School school;
	
    @Column(name = "transfers_allowed")
    private Boolean transfersAllowed;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAbbreviation() {
        return this.abbreviation;
    }

    public DismissalLocation abbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
        return this;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    
    public Integer getAssignedPassengers() {
        return this.assignedPassengers;
    }

    public DismissalLocation assignedPassengers(Integer assignedPassengers) {
        this.assignedPassengers = assignedPassengers;
        return this;
    }

    public void setAssignedPassengers(Integer assignedPassengers) {
        this.assignedPassengers = assignedPassengers;
    }

    
    public Integer getMaxGuestsPerStudent() {
        return this.maxGuestsPerStudent;
    }

    public DismissalLocation maxGuestsPerStudent(Integer maxGuestsPerStudent) {
        this.maxGuestsPerStudent = maxGuestsPerStudent;
        return this;
    }

    public void setMaxGuestsPerStudent(Integer maxGuestsPerStudent) {
        this.maxGuestsPerStudent = maxGuestsPerStudent;
    }

    
    public Integer getMaxPassengers() {
        return this.maxPassengers;
    }

    public DismissalLocation maxPassengers(Integer maxPassengers) {
        this.maxPassengers = maxPassengers;
        return this;
    }

    public void setMaxPassengers(Integer maxPassengers) {
        this.maxPassengers = maxPassengers;
    }

    
    public String getName() {
        return this.name;
    }

    public DismissalLocation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    
    public School getSchool() {
        return this.school;
    }

    public DismissalLocation school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }


    
    public Boolean getTransfersAllowed() {
        return this.transfersAllowed;
    }

    public DismissalLocation transfersAllowed(Boolean transfersAllowed) {
        this.transfersAllowed = transfersAllowed;
        return this;
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
        DismissalLocation dismissalLocation = (DismissalLocation) o;
        if (dismissalLocation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dismissalLocation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DismissalLocation{" +
            "id=" + getId() +
            ", abbreviation='" + getAbbreviation() + "'" +
            ", assignedPassengers='" + getAssignedPassengers() + "'" +
            ", maxGuestsPerStudent='" + getMaxGuestsPerStudent() + "'" +
            ", maxPassengers='" + getMaxPassengers() + "'" +
            ", name='" + getName() + "'" +
            ", school='" + getSchool() + "'" +
            ", transfersAllowed='" + getTransfersAllowed() + "'" +
            "}";
    }
}