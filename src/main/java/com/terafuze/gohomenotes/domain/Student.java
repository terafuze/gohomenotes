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
@Table(name = "student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    // Student owns the relationship because there is no mappedBy annotation used here.
    @ManyToMany
    @JoinTable(name = "student_parent",
        joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "parent_id", referencedColumnName = "id"))
    private List<Parent> parents = new ArrayList<>();
    
    @ManyToOne
    private School school;
    
    @ManyToOne
    private SchoolGrade schoolGrade;
    
    @ManyToOne
    private Teacher teacher;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFirstName() {
        return this.firstName;
    }

    public Student firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    
    public String getLastName() {
        return this.lastName;
    }

    public Student lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public List<Parent> getParents() {
        return parents;
    }

    public Student parents(List<Parent> parents) {
        this.parents = parents;
        return this;
    }

    public Student addParent(Parent parent) {
        this.parents.add(parent);
        return this;
    }

    public Student removeParent(Parent parent) {
        this.parents.remove(parent);
        parent.removeStudent(this);
        return this;
    }
    
    public School getSchool() {
        return this.school;
    }

    public Student school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }


    
    
    public SchoolGrade getSchoolGrade() {
        return this.schoolGrade;
    }

    public Student schoolGrade(SchoolGrade schoolGrade) {
        this.schoolGrade = schoolGrade;
        return this;
    }

    public void setSchoolGrade(SchoolGrade schoolGrade) {
        this.schoolGrade = schoolGrade;
    }


    
    
    public Teacher getTeacher() {
        return this.teacher;
    }

    public Student teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
        "}";
    }
}