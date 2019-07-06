package com.terafuze.gohomenotes.web.models;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Lob;
import javax.validation.constraints.NotNull;



/**
 * A Model based on the Go Home Notes Report entity.
 */
public class GoHomeNotesReportModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    @NotNull
    private LocalDate eventDate;
    
    private Boolean finalized;
    
    private String generatedByUsername;
    
    @Lob
    private byte[] goHomeNotesReport;

    private String goHomeNotesReportMimeType;

    private Long goHomeNotesReportContentLength;
    
    
    private Long schoolId;

    private String schoolIdentifier;
    
    
    private LocalDateTime timestamp;
    

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

    
    public LocalDate getEventDate() {
        return this.eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    
    
    public Boolean getFinalized() {
        return this.finalized;
    }

    public void setFinalized(Boolean finalized) {
        this.finalized = finalized;
    }
    
    
    public String getGeneratedByUsername() {
        return this.generatedByUsername;
    }

    public void setGeneratedByUsername(String generatedByUsername) {
        this.generatedByUsername = generatedByUsername;
    }
    
    
    public void setGoHomeNotesReport(byte[] goHomeNotesReport) {
        this.goHomeNotesReport = goHomeNotesReport;
    }

    public byte[] getGoHomeNotesReport() {
        return goHomeNotesReport;
    }

    public String getGoHomeNotesReportMimeType() {
        return goHomeNotesReportMimeType;
    }

    public void setGoHomeNotesReportMimeType(String goHomeNotesReportMimeType) {
        this.goHomeNotesReportMimeType = goHomeNotesReportMimeType;
    }

    public Long getGoHomeNotesReportContentLength() {
        return goHomeNotesReportContentLength;
    }

    public void setGoHomeNotesReportContentLength(Long goHomeNotesReportContentLength) {
        this.goHomeNotesReportContentLength = goHomeNotesReportContentLength;
    }
    
    
    public Long getSchoolId() {
        return this.schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolIdentifier() {
        return this.schoolIdentifier;
    }

    public void setSchoolIdentifier(String schoolIdentifier) {
        this.schoolIdentifier = schoolIdentifier;
    }
    
    
    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GoHomeNotesReportModel goHomeNotesReportModel = (GoHomeNotesReportModel) o;
        if (goHomeNotesReportModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), goHomeNotesReportModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GoHomeNotesReportModel{" +
            "id=" + getId() +
            ", eventDate='" + this.getEventDate() + "'" +
            ", finalized='" + this.getFinalized() + "'" +
            ", generatedByUsername='" + this.getGeneratedByUsername() + "'" +
            ", timestamp='" + this.getTimestamp() + "'" +
            "}";
    }
}