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
@Table(name = "family_registration")
public class FamilyRegistration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    
    @OneToMany(mappedBy = "familyRegistration")
    @OrderBy("lastName ASC")
    private List<ParentRegistration> parentRegistrations = new ArrayList<>();
    
    
    @OneToMany(mappedBy = "familyRegistration")
    @OrderBy("lastName ASC")
    private List<StudentRegistration> studentRegistrations = new ArrayList<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    
    public List<ParentRegistration> getParentRegistrations() {
        return parentRegistrations;
    }

    public FamilyRegistration parentRegistrations(List<ParentRegistration> parentRegistrations) {
        this.parentRegistrations = parentRegistrations;
        return this;
    }

    public FamilyRegistration addParentRegistration(ParentRegistration parentRegistration) {
        this.parentRegistrations.add(parentRegistration);
        parentRegistration.setFamilyRegistration(this);
        return this;
    }

    public FamilyRegistration removeParentRegistration(ParentRegistration parentRegistration) {
        this.parentRegistrations.remove(parentRegistration);
        parentRegistration.setFamilyRegistration(null);
        return this;
    }

    public void setParentRegistrations(List<ParentRegistration> parentRegistrations) {
        this.parentRegistrations = parentRegistrations;
    }


    
    
    public List<StudentRegistration> getStudentRegistrations() {
        return studentRegistrations;
    }

    public FamilyRegistration studentRegistrations(List<StudentRegistration> studentRegistrations) {
        this.studentRegistrations = studentRegistrations;
        return this;
    }

    public FamilyRegistration addStudentRegistration(StudentRegistration studentRegistration) {
        this.studentRegistrations.add(studentRegistration);
        studentRegistration.setFamilyRegistration(this);
        return this;
    }

    public FamilyRegistration removeStudentRegistration(StudentRegistration studentRegistration) {
        this.studentRegistrations.remove(studentRegistration);
        studentRegistration.setFamilyRegistration(null);
        return this;
    }

    public void setStudentRegistrations(List<StudentRegistration> studentRegistrations) {
        this.studentRegistrations = studentRegistrations;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FamilyRegistration familyRegistration = (FamilyRegistration) o;
        if (familyRegistration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), familyRegistration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FamilyRegistration{" +
            "id=" + getId() +
            ", parentRegistrations='" + getParentRegistrations() + "'" +
            ", studentRegistrations='" + getStudentRegistrations() + "'" +
            "}";
    }
}