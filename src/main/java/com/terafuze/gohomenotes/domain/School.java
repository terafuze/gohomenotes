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
@Table(name = "school")
public class School implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "abbreviation", nullable = false)
    private String abbreviation;

    
    
    @OneToMany(mappedBy = "school")
    @OrderBy("name ASC")
    private List<AfterSchoolProgram> afterSchoolPrograms = new ArrayList<>();
    
    
    @OneToMany(mappedBy = "school")
    @OrderBy("name ASC")
    private List<DismissalLocation> dismissalLocations = new ArrayList<>();
	
    @Column(name = "go_home_notes_daily_cutoff_time")
    private LocalTime goHomeNotesDailyCutoffTime;

    @Column(name = "go_home_notes_start_date")
    private LocalDate goHomeNotesStartDate;

    @Column(name = "go_home_notes_stop_date")
    private LocalDate goHomeNotesStopDate;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    
    
    @OneToMany(mappedBy = "school")
    @OrderBy("name ASC")
    private List<SchoolGrade> schoolGrades = new ArrayList<>();
    
    
    @OneToMany(mappedBy = "school")
    @OrderBy("lastName ASC")
    private List<Student> students = new ArrayList<>();
    
    
    @OneToMany(mappedBy = "school")
    private List<Teacher> teachers = new ArrayList<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAbbreviation() {
        return this.abbreviation;
    }

    public School abbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
        return this;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    
    
    public List<AfterSchoolProgram> getAfterSchoolPrograms() {
        return afterSchoolPrograms;
    }

    public School afterSchoolPrograms(List<AfterSchoolProgram> afterSchoolPrograms) {
        this.afterSchoolPrograms = afterSchoolPrograms;
        return this;
    }

    public School addAfterSchoolProgram(AfterSchoolProgram afterSchoolProgram) {
        this.afterSchoolPrograms.add(afterSchoolProgram);
        afterSchoolProgram.setSchool(this);
        return this;
    }

    public School removeAfterSchoolProgram(AfterSchoolProgram afterSchoolProgram) {
        this.afterSchoolPrograms.remove(afterSchoolProgram);
        afterSchoolProgram.setSchool(null);
        return this;
    }

    
    public List<DismissalLocation> getDismissalLocations() {
        return dismissalLocations;
    }

    public School dismissalLocations(List<DismissalLocation> dismissalLocations) {
        this.dismissalLocations = dismissalLocations;
        return this;
    }

    public School addDismissalLocation(DismissalLocation dismissalLocation) {
        this.dismissalLocations.add(dismissalLocation);
        dismissalLocation.setSchool(this);
        return this;
    }

    public School removeDismissalLocation(DismissalLocation dismissalLocation) {
        this.dismissalLocations.remove(dismissalLocation);
        dismissalLocation.setSchool(null);
        return this;
    }

    
    public LocalTime getGoHomeNotesDailyCutoffTime() {
        return this.goHomeNotesDailyCutoffTime;
    }

    public School goHomeNotesDailyCutoffTime(LocalTime goHomeNotesDailyCutoffTime) {
        this.goHomeNotesDailyCutoffTime = goHomeNotesDailyCutoffTime;
        return this;
    }

    public void setGoHomeNotesDailyCutoffTime(LocalTime goHomeNotesDailyCutoffTime) {
        this.goHomeNotesDailyCutoffTime = goHomeNotesDailyCutoffTime;
    }

    
    public LocalDate getGoHomeNotesStartDate() {
        return this.goHomeNotesStartDate;
    }

    public School goHomeNotesStartDate(LocalDate goHomeNotesStartDate) {
        this.goHomeNotesStartDate = goHomeNotesStartDate;
        return this;
    }

    public void setGoHomeNotesStartDate(LocalDate goHomeNotesStartDate) {
        this.goHomeNotesStartDate = goHomeNotesStartDate;
    }

    
    public LocalDate getGoHomeNotesStopDate() {
        return this.goHomeNotesStopDate;
    }

    public School goHomeNotesStopDate(LocalDate goHomeNotesStopDate) {
        this.goHomeNotesStopDate = goHomeNotesStopDate;
        return this;
    }

    public void setGoHomeNotesStopDate(LocalDate goHomeNotesStopDate) {
        this.goHomeNotesStopDate = goHomeNotesStopDate;
    }

    
    public String getName() {
        return this.name;
    }

    public School name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    
    public List<SchoolGrade> getSchoolGrades() {
        return schoolGrades;
    }

    public School schoolGrades(List<SchoolGrade> schoolGrades) {
        this.schoolGrades = schoolGrades;
        return this;
    }

    public School addSchoolGrade(SchoolGrade schoolGrade) {
        this.schoolGrades.add(schoolGrade);
        schoolGrade.setSchool(this);
        return this;
    }

    public School removeSchoolGrade(SchoolGrade schoolGrade) {
        this.schoolGrades.remove(schoolGrade);
        schoolGrade.setSchool(null);
        return this;
    }

    
    public List<Student> getStudents() {
        return students;
    }

    public School students(List<Student> students) {
        this.students = students;
        return this;
    }

    public School addStudent(Student student) {
        this.students.add(student);
        student.setSchool(this);
        return this;
    }

    public School removeStudent(Student student) {
        this.students.remove(student);
        student.setSchool(null);
        return this;
    }

    
    public List<Teacher> getTeachers() {
        return teachers;
    }

    public School teachers(List<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public School addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.setSchool(this);
        return this;
    }

    public School removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.setSchool(null);
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
        School school = (School) o;
        if (school.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), school.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "School{" +
            "id=" + getId() +
            ", abbreviation='" + getAbbreviation() + "'" +
            ", goHomeNotesDailyCutoffTime='" + getGoHomeNotesDailyCutoffTime() + "'" +
            ", goHomeNotesStartDate='" + getGoHomeNotesStartDate() + "'" +
            ", goHomeNotesStopDate='" + getGoHomeNotesStopDate() + "'" +
            ", name='" + getName() + "'" +
        "}";
    }
}