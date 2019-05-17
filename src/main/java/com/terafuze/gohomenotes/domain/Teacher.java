package com.terafuze.gohomenotes.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Teacher at a School
 */
@Entity
@Table(name = "teacher")
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;
    
    @ManyToOne
    private School school;
    
    @ManyToOne
    private SchoolGrade schoolGrade;
    
    @OneToMany(mappedBy = "teacher")
    // TODO confirm that "name" is a valid field in Student
    @OrderBy("lastName ASC")
    private List<Student> students = new ArrayList<>();
    
    @OneToOne(mappedBy = "teacher", fetch = FetchType.EAGER)
    @JoinColumn(unique = true)
    private UserProfile userProfile;
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public School getSchool() {
        return this.school;
    }

    public Teacher school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    
    public SchoolGrade getSchoolGrade() {
        return this.schoolGrade;
    }

    public Teacher schoolGrade(SchoolGrade schoolGrade) {
        this.schoolGrade = schoolGrade;
        return this;
    }

    public void setSchoolGrade(SchoolGrade schoolGrade) {
        this.schoolGrade = schoolGrade;
    }

    
    public List<Student> getStudents() {
        return students;
    }

    public Teacher students(List<Student> students) {
        this.students = students;
        return this;
    }

    public Teacher addStudent(Student student) {
        this.students.add(student);
        student.setTeacher(this);
        return this;
    }

    public Teacher removeStudent(Student student) {
        this.students.remove(student);
        student.setTeacher(null);
        return this;
    }

    
    public UserProfile getUserProfile() {
        return this.userProfile;
    }

    public Teacher userProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
        return this;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Teacher teacher = (Teacher) o;
        if (teacher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
        "}";
    }
}