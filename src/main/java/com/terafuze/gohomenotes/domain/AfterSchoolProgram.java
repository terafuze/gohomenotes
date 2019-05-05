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
@Table(name = "after_school_program")
public class AfterSchoolProgram implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "abbreviation")
    private String abbreviation;

    @Column(name = "name")
    private String name;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAbbreviation() {
        return this.abbreviation;
    }

    public AfterSchoolProgram abbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
        return this;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    
    public String getName() {
        return this.name;
    }

    public AfterSchoolProgram name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AfterSchoolProgram afterSchoolProgram = (AfterSchoolProgram) o;
        if (afterSchoolProgram.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), afterSchoolProgram.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AfterSchoolProgram{" +
            "id=" + getId() +
            ", abbreviation='" + getAbbreviation() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}