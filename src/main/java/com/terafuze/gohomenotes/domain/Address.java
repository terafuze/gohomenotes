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
@Table(name = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @NotNull
    @Column(name = "line_1", nullable = false)
    private String line1;

    @Column(name = "line_2")
    private String line2;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private State state;

    @OneToMany(mappedBy = "homeAddress")
    // TODO confirm that "name" is a valid field in UserProfile
    @OrderBy("name ASC")
    private List<UserProfile> userProfiles = new ArrayList<>();
    
    @Column(name = "zip_code")
    private String zipCode;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCity() {
        return this.city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    
    public String getLine1() {
        return this.line1;
    }

    public Address line1(String line1) {
        this.line1 = line1;
        return this;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    
    public String getLine2() {
        return this.line2;
    }

    public Address line2(String line2) {
        this.line2 = line2;
        return this;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    
    public State getState() {
        return this.state;
    }

    public Address state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    
    
    public List<UserProfile> getUserProfiles() {
        return userProfiles;
    }

    public Address userProfiles(List<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
        return this;
    }

    public Address addUserProfile(UserProfile userProfile) {
        this.userProfiles.add(userProfile);
        userProfile.setHomeAddress(this);
        return this;
    }

    public Address removeUserProfile(UserProfile userProfile) {
        this.userProfiles.remove(userProfile);
        userProfile.setHomeAddress(null);
        return this;
    }

    
    public String getZipCode() {
        return this.zipCode;
    }

    public Address zipCode(String zipCode) {
        this.zipCode = zipCode;
        return this;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Address address = (Address) o;
        if (address.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), address.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", city='" + getCity() + "'" +
            ", line1='" + getLine1() + "'" +
            ", line2='" + getLine2() + "'" +
            ", zipCode='" + getZipCode() + "'" +
        "}";
    }
}