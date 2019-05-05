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
 * Record that the Go Home Notes have been finalized for a specific day
 */
@Entity
@Table(name = "daily_verification_record")
public class DailyVerificationRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
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
        DailyVerificationRecord dailyVerificationRecord = (DailyVerificationRecord) o;
        if (dailyVerificationRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dailyVerificationRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DailyVerificationRecord{" +
            "id=" + getId() +
            "}";
    }
}