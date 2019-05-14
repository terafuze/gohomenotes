package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Teacher entity.
 */
public class TeacherModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    @NotNull
    private String firstName;
    
    @NotNull
    private String lastName;
    
    @NotNull
    private String emailAddress;
    
    private Long schoolId;

    private String schoolIdentifier;
    
    private Long schoolGradeId;

    private String schoolGradeIdentifier;
    
    private Long userProfileId;

    private String userProfileIdentifier;
    
    

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

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
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
    
    
    
    public Long getUserProfileId() {
        return this.userProfileId;
    }

    public void setUserProfileId(Long userProfileId) {
        this.userProfileId = userProfileId;
    }

    public String getUserProfileIdentifier() {
        return this.userProfileIdentifier;
    }

    public void setUserProfileIdentifier(String userProfileIdentifier) {
        this.userProfileIdentifier = userProfileIdentifier;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeacherModel teacherModel = (TeacherModel) o;
        if (teacherModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacherModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeacherModel{" +
            "id=" + getId() +
            ", firstName='" + this.getFirstName() + "'" +
            ", lastName='" + this.getLastName() + "'" +
            "}";
    }
}