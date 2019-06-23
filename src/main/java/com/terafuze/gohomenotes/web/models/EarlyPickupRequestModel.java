package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Early Pickup Request entity.
 */
public class EarlyPickupRequestModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    private String comments;
    
    @NotNull
    private LocalDate eventDate;
    
    private String pickupPerson;
    
    private String pickupPersonPhone;
    
    private LocalTime pickupTime;
    
    private Boolean returning;
    
    private LocalTime returnTime;
    
    
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
    
    
    public LocalDate getEventDate() {
        return this.eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    
    
    public String getPickupPerson() {
        return this.pickupPerson;
    }

    public void setPickupPerson(String pickupPerson) {
        this.pickupPerson = pickupPerson;
    }
    
    
    public String getPickupPersonPhone() {
        return this.pickupPersonPhone;
    }

    public void setPickupPersonPhone(String pickupPersonPhone) {
        this.pickupPersonPhone = pickupPersonPhone;
    }
    
    
    public LocalTime getPickupTime() {
        return this.pickupTime;
    }

    public void setPickupTime(LocalTime pickupTime) {
        this.pickupTime = pickupTime;
    }
    
    
    public Boolean getReturning() {
        return this.returning;
    }

    public void setReturning(Boolean returning) {
        this.returning = returning;
    }
    
    
    public LocalTime getReturnTime() {
        return this.returnTime;
    }

    public void setReturnTime(LocalTime returnTime) {
        this.returnTime = returnTime;
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

        EarlyPickupRequestModel earlyPickupRequestModel = (EarlyPickupRequestModel) o;
        if (earlyPickupRequestModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), earlyPickupRequestModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EarlyPickupRequestModel{" +
            "id=" + getId() +
            ", comments='" + this.getComments() + "'" +
            ", eventDate='" + this.getEventDate() + "'" +
            ", pickupPerson='" + this.getPickupPerson() + "'" +
            ", pickupPersonPhone='" + this.getPickupPersonPhone() + "'" +
            ", pickupTime='" + this.getPickupTime() + "'" +
            ", returning='" + this.getReturning() + "'" +
            ", returnTime='" + this.getReturnTime() + "'" +
            ", submittedByUsername='" + this.getSubmittedByUsername() + "'" +
            "}";
    }
}