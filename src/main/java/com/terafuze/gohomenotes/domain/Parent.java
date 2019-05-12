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
@Table(name = "parent")
public class Parent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Column(name = "email_address", nullable = false)
    private String emailAddress;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "primary_phone_number", nullable = false)
    private String primaryPhoneNumber;

    @Column(name = "secondary_phone_number")
    private String secondaryPhoneNumber;

    
    
    @ManyToMany(mappedBy = "parents")
    private List<Student> students = new ArrayList<>();
    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAddress() {
        return this.address;
    }

    public Parent address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    
    public String getEmailAddress() {
        return this.emailAddress;
    }

    public Parent emailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
        return this;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    
    public String getFirstName() {
        return this.firstName;
    }

    public Parent firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    
    public String getLastName() {
        return this.lastName;
    }

    public Parent lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    
    public String getPrimaryPhoneNumber() {
        return this.primaryPhoneNumber;
    }

    public Parent primaryPhoneNumber(String primaryPhoneNumber) {
        this.primaryPhoneNumber = primaryPhoneNumber;
        return this;
    }

    public void setPrimaryPhoneNumber(String primaryPhoneNumber) {
        this.primaryPhoneNumber = primaryPhoneNumber;
    }

    
    public String getSecondaryPhoneNumber() {
        return this.secondaryPhoneNumber;
    }

    public Parent secondaryPhoneNumber(String secondaryPhoneNumber) {
        this.secondaryPhoneNumber = secondaryPhoneNumber;
        return this;
    }

    public void setSecondaryPhoneNumber(String secondaryPhoneNumber) {
        this.secondaryPhoneNumber = secondaryPhoneNumber;
    }

    
    
    
    public List<Student> getStudents() {
        return students;
    }

    public Parent students(List<Student> students) {
        this.students = students;
        return this;
    }

    public Parent addStudent(Student student) {
        this.students.add(student);
        student.addParent(this);
        return this;
    }

    public Parent removeStudent(Student student) {
        this.students.remove(student);
        student.removeParent(this);
        return this;
    }


    


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Parent parent = (Parent) o;
        if (parent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parent{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", emailAddress='" + getEmailAddress() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", primaryPhoneNumber='" + getPrimaryPhoneNumber() + "'" +
            ", secondaryPhoneNumber='" + getSecondaryPhoneNumber() + "'" +
            "}";
    }
}