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
 * A request for a student to go home with another student
 */
@Entity
@Table(name = "guest_request")
public class GuestRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Column(name = "comments")
    private String comments;
    
    @Column(name = "confirmation_notes")
    private String confirmationNotes;
    
    @Column(name = "confirmed")
    private Boolean confirmed;
    
    @Column(name = "confirmed_by_username")
    private String confirmedByUsername;
    
    @NotNull
    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;
    
    @OneToOne
    @JoinColumn(unique = true)
    private Student guestStudent;
    
    @OneToOne
    @JoinColumn(unique = true)
    private Student hostStudent;
    
    @Column(name = "manually_confirmed")
    private Boolean manuallyConfirmed;
    
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

    public GuestRequest comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    

    
    public String getConfirmationNotes() {
        return this.confirmationNotes;
    }

    public GuestRequest confirmationNotes(String confirmationNotes) {
        this.confirmationNotes = confirmationNotes;
        return this;
    }

    public void setConfirmationNotes(String confirmationNotes) {
        this.confirmationNotes = confirmationNotes;
    }
    

    
    public Boolean getConfirmed() {
        return this.confirmed;
    }

    public GuestRequest confirmed(Boolean confirmed) {
        this.confirmed = confirmed;
        return this;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }
    

    
    public String getConfirmedByUsername() {
        return this.confirmedByUsername;
    }

    public GuestRequest confirmedByUsername(String confirmedByUsername) {
        this.confirmedByUsername = confirmedByUsername;
        return this;
    }

    public void setConfirmedByUsername(String confirmedByUsername) {
        this.confirmedByUsername = confirmedByUsername;
    }
    

    
    public LocalDate getEventDate() {
        return this.eventDate;
    }

    public GuestRequest eventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    

    
    public Student getGuestStudent() {
        return this.guestStudent;
    }

    public GuestRequest guestStudent(Student guestStudent) {
        this.guestStudent = guestStudent;
        return this;
    }

    public void setGuestStudent(Student guestStudent) {
        this.guestStudent = guestStudent;
    }

    
    public Student getHostStudent() {
        return this.hostStudent;
    }

    public GuestRequest hostStudent(Student hostStudent) {
        this.hostStudent = hostStudent;
        return this;
    }

    public void setHostStudent(Student hostStudent) {
        this.hostStudent = hostStudent;
    }

    
    public Boolean getManuallyConfirmed() {
        return this.manuallyConfirmed;
    }

    public GuestRequest manuallyConfirmed(Boolean manuallyConfirmed) {
        this.manuallyConfirmed = manuallyConfirmed;
        return this;
    }

    public void setManuallyConfirmed(Boolean manuallyConfirmed) {
        this.manuallyConfirmed = manuallyConfirmed;
    }
    

    
    public String getSubmittedByUsername() {
        return this.submittedByUsername;
    }

    public GuestRequest submittedByUsername(String submittedByUsername) {
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
        GuestRequest guestRequest = (GuestRequest) o;
        if (guestRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), guestRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GuestRequest{" +
            "id=" + getId() +
            ", comments='" + getComments() + "'" +
            ", confirmationNotes='" + getConfirmationNotes() + "'" +
            ", confirmed='" + getConfirmed() + "'" +
            ", confirmedByUsername='" + getConfirmedByUsername() + "'" +
            ", eventDate='" + getEventDate() + "'" +
            ", manuallyConfirmed='" + getManuallyConfirmed() + "'" +
            ", submittedByUsername='" + getSubmittedByUsername() + "'" +
        "}";
    }
}