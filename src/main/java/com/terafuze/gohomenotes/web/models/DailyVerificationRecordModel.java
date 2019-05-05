package com.terafuze.gohomenotes.web.models;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;
import java.time.LocalTime;




/**
 * A Model based on the Daily Verification Record entity.
 */
public class DailyVerificationRecordModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    

    public String getIdentifier() {
        return this.identifier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DailyVerificationRecordModel dailyVerificationRecordModel = (DailyVerificationRecordModel) o;
        if (dailyVerificationRecordModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dailyVerificationRecordModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DailyVerificationRecordModel{" +
            "id=" + getId() +
            "}";
    }
}