package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the After School Program entity.
 */
public class AfterSchoolProgramModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    private String abbreviation;
    
    @NotNull
    private String name;
    
    
    private Long schoolId;

    private String schoolIdentifier;
    
    

    public String getIdentifier() {
        return this.identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
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
    
    
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    
    public Long getSchoolId() {
        return this.schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolIdentifier() {
        return this.schoolIdentifier;
    }

    public void setSchoolIdentifier(String schoolIdentifier) {
        this.schoolIdentifier = schoolIdentifier;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AfterSchoolProgramModel afterSchoolProgramModel = (AfterSchoolProgramModel) o;
        if (afterSchoolProgramModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), afterSchoolProgramModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AfterSchoolProgramModel{" +
            "id=" + getId() +
            ", abbreviation='" + this.getAbbreviation() + "'" +
            ", name='" + this.getName() + "'" +
            "}";
    }
}