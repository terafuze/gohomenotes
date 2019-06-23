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
 * A request by a parent to pick up their child early from school
 */
@Entity
@Table(name = "early_pickup_request")
public class EarlyPickupRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Column(name = "comments")
    private String comments;
    
    @NotNull
    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;
    
    @Column(name = "pickup_person")
    private String pickupPerson;
    
    @Column(name = "pickup_person_phone")
    private String pickupPersonPhone;
    
    @Column(name = "pickup_time")
    private LocalTime pickupTime;
    
    @Column(name = "returning")
    private Boolean returning;
    
    @Column(name = "return_time")
    private LocalTime returnTime;
    
    
    
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

    public EarlyPickupRequest comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    

    
    public LocalDate getEventDate() {
        return this.eventDate;
    }

    public EarlyPickupRequest eventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    

    
    public String getPickupPerson() {
        return this.pickupPerson;
    }

    public EarlyPickupRequest pickupPerson(String pickupPerson) {
        this.pickupPerson = pickupPerson;
        return this;
    }

    public void setPickupPerson(String pickupPerson) {
        this.pickupPerson = pickupPerson;
    }
    

    
    public String getPickupPersonPhone() {
        return this.pickupPersonPhone;
    }

    public EarlyPickupRequest pickupPersonPhone(String pickupPersonPhone) {
        this.pickupPersonPhone = pickupPersonPhone;
        return this;
    }

    public void setPickupPersonPhone(String pickupPersonPhone) {
        this.pickupPersonPhone = pickupPersonPhone;
    }
    

    
    public LocalTime getPickupTime() {
        return this.pickupTime;
    }

    public EarlyPickupRequest pickupTime(LocalTime pickupTime) {
        this.pickupTime = pickupTime;
        return this;
    }

    public void setPickupTime(LocalTime pickupTime) {
        this.pickupTime = pickupTime;
    }
    

    
    public Boolean getReturning() {
        return this.returning;
    }

    public EarlyPickupRequest returning(Boolean returning) {
        this.returning = returning;
        return this;
    }

    public void setReturning(Boolean returning) {
        this.returning = returning;
    }
    

    
    public LocalTime getReturnTime() {
        return this.returnTime;
    }

    public EarlyPickupRequest returnTime(LocalTime returnTime) {
        this.returnTime = returnTime;
        return this;
    }

    public void setReturnTime(LocalTime returnTime) {
        this.returnTime = returnTime;
    }
    

    

    
    public String getSubmittedByUsername() {
        return this.submittedByUsername;
    }

    public EarlyPickupRequest submittedByUsername(String submittedByUsername) {
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
        EarlyPickupRequest earlyPickupRequest = (EarlyPickupRequest) o;
        if (earlyPickupRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), earlyPickupRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EarlyPickupRequest{" +
            "id=" + getId() +
            ", comments='" + getComments() + "'" +
            ", eventDate='" + getEventDate() + "'" +
            ", pickupPerson='" + getPickupPerson() + "'" +
            ", pickupPersonPhone='" + getPickupPersonPhone() + "'" +
            ", pickupTime='" + getPickupTime() + "'" +
            ", returning='" + getReturning() + "'" +
            ", returnTime='" + getReturnTime() + "'" +
            ", submittedByUsername='" + getSubmittedByUsername() + "'" +
        "}";
    }
}