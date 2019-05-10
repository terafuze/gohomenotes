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
@Table(name = "school_grade")
public class SchoolGrade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "abbreviation")
    private String abbreviation;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    
    @ManyToOne
    private School school;
    
    
    @OneToMany(mappedBy = "schoolGrade")
    @OrderBy("name ASC")
    private List<StudentRegistration> studentRegistrations = new ArrayList<>();
    
    
    @OneToMany(mappedBy = "schoolGrade")
    @OrderBy("lastName ASC")
    private List<Student> students = new ArrayList<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAbbreviation() {
        return this.abbreviation;
    }

    public SchoolGrade abbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
        return this;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    
    public String getName() {
        return this.name;
    }

    public SchoolGrade name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    
    public School getSchool() {
        return this.school;
    }

    public SchoolGrade school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }


    
    
    public List<StudentRegistration> getStudentRegistrations() {
        return studentRegistrations;
    }

    public SchoolGrade studentRegistrations(List<StudentRegistration> studentRegistrations) {
        this.studentRegistrations = studentRegistrations;
        return this;
    }

    public SchoolGrade addStudentRegistration(StudentRegistration studentRegistration) {
        this.studentRegistrations.add(studentRegistration);
        studentRegistration.setSchoolGrade(this);
        return this;
    }

    public SchoolGrade removeStudentRegistration(StudentRegistration studentRegistration) {
        this.studentRegistrations.remove(studentRegistration);
        studentRegistration.setSchoolGrade(null);
        return this;
    }

    public void setStudentRegistrations(List<StudentRegistration> studentRegistrations) {
        this.studentRegistrations = studentRegistrations;
    }


    
    
    public List<Student> getStudents() {
        return students;
    }

    public SchoolGrade students(List<Student> students) {
        this.students = students;
        return this;
    }

    public SchoolGrade addStudent(Student student) {
        this.students.add(student);
        student.setSchoolGrade(this);
        return this;
    }

    public SchoolGrade removeStudent(Student student) {
        this.students.remove(student);
        student.setSchoolGrade(null);
        return this;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SchoolGrade schoolGrade = (SchoolGrade) o;
        if (schoolGrade.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schoolGrade.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SchoolGrade{" +
            "id=" + getId() +
            ", abbreviation='" + getAbbreviation() + "'" +
            ", name='" + getName() + "'" +
            ", school='" + getSchool() + "'" +
            ", studentRegistrations='" + getStudentRegistrations() + "'" +
            ", students='" + getStudents() + "'" +
            "}";
    }
}