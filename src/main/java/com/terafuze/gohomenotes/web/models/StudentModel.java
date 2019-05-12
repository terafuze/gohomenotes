package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Student entity.
 */
public class StudentModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    @NotNull
    private String firstName;
    
    @NotNull
    private String lastName;
    
    
    private Long schoolId;

    private String schoolIdentifier;
    
    
    
    private Long schoolGradeId;

    private String schoolGradeIdentifier;
    
    
    
    private Long teacherId;

    private String teacherIdentifier;
    
    

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
    
    
    public Long getTeacherId() {
        return this.teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherIdentifier() {
        return this.teacherIdentifier;
    }

    public void setTeacherIdentifier(String teacherIdentifier) {
        this.teacherIdentifier = teacherIdentifier;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentModel studentModel = (StudentModel) o;
        if (studentModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentModel{" +
            "id=" + getId() +
            ", firstName='" + this.getFirstName() + "'" +
            ", lastName='" + this.getLastName() + "'" +
            "}";
    }
}