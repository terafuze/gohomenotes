package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Guest Request entity.
 */
public class GuestRequestModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    private String comments;
    
    private String confirmationNotes;
    
    private Boolean confirmed;
    
    private String confirmedByUsername;
    
    @NotNull
    private LocalDate eventDate;
    
    
    private Long guestStudentId;

    private String guestStudentIdentifier;
    
    
    
    private Long hostStudentId;

    private String hostStudentIdentifier;
    
    
    private Boolean manuallyConfirmed;
    
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
    
    
    public String getConfirmationNotes() {
        return this.confirmationNotes;
    }

    public void setConfirmationNotes(String confirmationNotes) {
        this.confirmationNotes = confirmationNotes;
    }
    
    
    public Boolean getConfirmed() {
        return this.confirmed;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }
    
    
    public String getConfirmedByUsername() {
        return this.confirmedByUsername;
    }

    public void setConfirmedByUsername(String confirmedByUsername) {
        this.confirmedByUsername = confirmedByUsername;
    }
    
    
    public LocalDate getEventDate() {
        return this.eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    
    
    public Long getGuestStudentId() {
        return this.guestStudentId;
    }

    public void setGuestStudentId(Long guestStudentId) {
        this.guestStudentId = guestStudentId;
    }

    public String getGuestStudentIdentifier() {
        return this.guestStudentIdentifier;
    }

    public void setGuestStudentIdentifier(String guestStudentIdentifier) {
        this.guestStudentIdentifier = guestStudentIdentifier;
    }
    
    
    public Long getHostStudentId() {
        return this.hostStudentId;
    }

    public void setHostStudentId(Long hostStudentId) {
        this.hostStudentId = hostStudentId;
    }

    public String getHostStudentIdentifier() {
        return this.hostStudentIdentifier;
    }

    public void setHostStudentIdentifier(String hostStudentIdentifier) {
        this.hostStudentIdentifier = hostStudentIdentifier;
    }
    
    
    public Boolean getManuallyConfirmed() {
        return this.manuallyConfirmed;
    }

    public void setManuallyConfirmed(Boolean manuallyConfirmed) {
        this.manuallyConfirmed = manuallyConfirmed;
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

        GuestRequestModel guestRequestModel = (GuestRequestModel) o;
        if (guestRequestModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), guestRequestModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GuestRequestModel{" +
            "id=" + getId() +
            ", comments='" + this.getComments() + "'" +
            ", confirmationNotes='" + this.getConfirmationNotes() + "'" +
            ", confirmed='" + this.getConfirmed() + "'" +
            ", confirmedByUsername='" + this.getConfirmedByUsername() + "'" +
            ", eventDate='" + this.getEventDate() + "'" +
            ", manuallyConfirmed='" + this.getManuallyConfirmed() + "'" +
            ", submittedByUsername='" + this.getSubmittedByUsername() + "'" +
            "}";
    }
}