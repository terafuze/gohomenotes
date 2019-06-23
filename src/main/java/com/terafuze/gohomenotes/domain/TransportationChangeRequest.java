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

import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;

/**
 * A request for a student go home by another location or means of transportation than their regular location. 
 */
@Entity
@Table(name = "transportation_change_request")
public class TransportationChangeRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Column(name = "comments")
    private String comments;
    
    @ManyToOne
    private DismissalLocation dismissalLocation;
    
    @NotNull
    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;
    
    @ManyToOne
    private Student student;
    
    @Column(name = "submitted_by_username")
    private String submittedByUsername;
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getComments() {
        return this.comments;
    }

    public TransportationChangeRequest comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    

    
    public DismissalLocation getDismissalLocation() {
        return this.dismissalLocation;
    }

    public TransportationChangeRequest dismissalLocation(DismissalLocation dismissalLocation) {
        this.dismissalLocation = dismissalLocation;
        return this;
    }

    public void setDismissalLocation(DismissalLocation dismissalLocation) {
        this.dismissalLocation = dismissalLocation;
    }

    
    public LocalDate getEventDate() {
        return this.eventDate;
    }

    public TransportationChangeRequest eventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    

    
    public Student getStudent() {
        return this.student;
    }

    public TransportationChangeRequest student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    
    public String getSubmittedByUsername() {
        return this.submittedByUsername;
    }

    public TransportationChangeRequest submittedByUsername(String submittedByUsername) {
        this.submittedByUsername = submittedByUsername;
        return this;
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
        TransportationChangeRequest transportationChangeRequest = (TransportationChangeRequest) o;
        if (transportationChangeRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportationChangeRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransportationChangeRequest{" +
            "id=" + getId() +
            ", comments='" + getComments() + "'" +
            ", eventDate='" + getEventDate() + "'" +
            ", submittedByUsername='" + getSubmittedByUsername() + "'" +
        "}";
    }
}