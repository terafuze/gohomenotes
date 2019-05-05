package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the School entity.
 */
public class SchoolModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    @NotNull
    private String abbreviation;
    
    private LocalTime goHomeNotesDailyCutoffTime;
    
    private LocalDate goHomeNotesStartDate;
    
    private LocalDate goHomeNotesStopDate;
    
    @NotNull
    private String name;
    
    
    

    public String getIdentifier() {
        return this.identifier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
    public String getAbbreviation() {
        return this.abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }
    
    
    public LocalTime getGoHomeNotesDailyCutoffTime() {
        return this.goHomeNotesDailyCutoffTime;
    }

    public void setGoHomeNotesDailyCutoffTime(LocalTime goHomeNotesDailyCutoffTime) {
        this.goHomeNotesDailyCutoffTime = goHomeNotesDailyCutoffTime;
    }
    
    
    public LocalDate getGoHomeNotesStartDate() {
        return this.goHomeNotesStartDate;
    }

    public void setGoHomeNotesStartDate(LocalDate goHomeNotesStartDate) {
        this.goHomeNotesStartDate = goHomeNotesStartDate;
    }
    
    
    public LocalDate getGoHomeNotesStopDate() {
        return this.goHomeNotesStopDate;
    }

    public void setGoHomeNotesStopDate(LocalDate goHomeNotesStopDate) {
        this.goHomeNotesStopDate = goHomeNotesStopDate;
    }
    
    
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SchoolModel schoolModel = (SchoolModel) o;
        if (schoolModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schoolModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SchoolModel{" +
            "id=" + getId() +
            ", abbreviation='" + this.getAbbreviation() + "'" +
            ", goHomeNotesDailyCutoffTime='" + this.getGoHomeNotesDailyCutoffTime() + "'" +
            ", goHomeNotesStartDate='" + this.getGoHomeNotesStartDate() + "'" +
            ", goHomeNotesStopDate='" + this.getGoHomeNotesStopDate() + "'" +
            ", name='" + this.getName() + "'" +
            "}";
    }
}