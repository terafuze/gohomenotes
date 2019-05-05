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

    @Column(name = "go_home_notes_daily_cutoff_time")
    private LocalTime goHomeNotesDailyCutoffTime;

    @Column(name = "go_home_notes_start_date")
    private LocalDate goHomeNotesStartDate;

    @Column(name = "go_home_notes_stop_date")
    private LocalDate goHomeNotesStopDate;

    @Column(name = "name")
    private String name;

    
    
    @OneToMany(mappedBy = "school")
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

    public School abbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
        return this;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
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
            ", students='" + getStudents() + "'" +
            "}";
    }
}