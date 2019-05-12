package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;


import com.terafuze.gohomenotes.domain.State;



/**
 * A Model based on the Address entity.
 */
public class AddressModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    @NotNull
    private String city;
    
    @NotNull
    private String line1;
    
    private String line2;
    
    @NotNull
    private State state;
    
    
    
    private String zipCode;
    

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

    
    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }
    
    
    public String getLine1() {
        return this.line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }
    
    
    public String getLine2() {
        return this.line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }
    
    
    public State getState() {
        return this.state;
    }

    public void setState(State state) {
        this.state = state;
    }
    
    
    
    public String getZipCode() {
        return this.zipCode;
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

        AddressModel addressModel = (AddressModel) o;
        if (addressModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressModel{" +
            "id=" + getId() +
            ", city='" + this.getCity() + "'" +
            ", line1='" + this.getLine1() + "'" +
            ", line2='" + this.getLine2() + "'" +
            ", state='" + this.getState() + "'" +
            ", zipCode='" + this.getZipCode() + "'" +
            "}";
    }
}