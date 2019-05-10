package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Student Registration entity.
 */
public class StudentRegistrationModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    
    private Long familyRegistrationId;

    private String familyRegistrationIdentifier;
    
    
    @NotNull
    private String firstName;
    
    @NotNull
    private String lastName;
    
    
    private Long schoolGradeId;

    private String schoolGradeIdentifier;
    
    

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

    
    public Long getFamilyRegistrationId() {
        return this.familyRegistrationId;
    }

    public void setFamilyRegistrationId(Long familyRegistrationId) {
        this.familyRegistrationId = familyRegistrationId;
    }

    public String getFamilyRegistrationIdentifier() {
        return this.familyRegistrationIdentifier;
    }

    public void setFamilyRegistrationIdentifier(String familyRegistrationIdentifier) {
        this.familyRegistrationIdentifier = familyRegistrationIdentifier;
    }
    
    
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    
    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    
    public Long getSchoolGradeId() {
        return this.schoolGradeId;
    }

    public void setSchoolGradeId(Long schoolGradeId) {
        this.schoolGradeId = schoolGradeId;
    }

    public String getSchoolGradeIdentifier() {
        return this.schoolGradeIdentifier;
    }

    public void setSchoolGradeIdentifier(String schoolGradeIdentifier) {
        this.schoolGradeIdentifier = schoolGradeIdentifier;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentRegistrationModel studentRegistrationModel = (StudentRegistrationModel) o;
        if (studentRegistrationModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentRegistrationModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentRegistrationModel{" +
            "id=" + getId() +
            ", firstName='" + this.getFirstName() + "'" +
            ", lastName='" + this.getLastName() + "'" +
            "}";
    }
}