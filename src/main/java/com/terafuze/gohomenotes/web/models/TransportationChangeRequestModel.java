package com.terafuze.gohomenotes.web.models;

import javax.persistence.Lob;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;



/**
 * A Model based on the Transportation Change Request entity.
 */
public class TransportationChangeRequestModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    private String comments;
    
    
    private Long dismissalLocationId;

    private String dismissalLocationIdentifier;
    
    
    @NotNull
    private LocalDate eventDate;
    
    
    private Long studentId;

    private String studentIdentifier;
    
    
    private String submittedByUsername;
    

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

    
    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    
    
    public Long getDismissalLocationId() {
        return this.dismissalLocationId;
    }

    public void setDismissalLocationId(Long dismissalLocationId) {
        this.dismissalLocationId = dismissalLocationId;
    }

    public String getDismissalLocationIdentifier() {
        return this.dismissalLocationIdentifier;
    }

    public void setDismissalLocationIdentifier(String dismissalLocationIdentifier) {
        this.dismissalLocationIdentifier = dismissalLocationIdentifier;
    }
    
    
    public LocalDate getEventDate() {
        return this.eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    
    
    public Long getStudentId() {
        return this.studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentIdentifier() {
        return this.studentIdentifier;
    }

    public void setStudentIdentifier(String studentIdentifier) {
        this.studentIdentifier = studentIdentifier;
    }
    
    
    public String getSubmittedByUsername() {
        return this.submittedByUsername;
    }

    public void setSubmittedByUsername(String submittedByUsername) {
        this.submittedByUsername = submittedByUsername;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransportationChangeRequestModel transportationChangeRequestModel = (TransportationChangeRequestModel) o;
        if (transportationChangeRequestModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportationChangeRequestModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransportationChangeRequestModel{" +
            "id=" + getId() +
            ", comments='" + this.getComments() + "'" +
            ", eventDate='" + this.getEventDate() + "'" +
            ", submittedByUsername='" + this.getSubmittedByUsername() + "'" +
            "}";
    }
}