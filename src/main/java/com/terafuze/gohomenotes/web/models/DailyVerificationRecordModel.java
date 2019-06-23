package com.terafuze.gohomenotes.web.models;


import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Lob;




/**
 * A Model based on the Daily Verification Record entity.
 */
public class DailyVerificationRecordModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    public String identifier;

    
    @Lob
    private byte[] goHomeNotesReport;

    private String goHomeNotesReportMimeType;

    private Long goHomeNotesReportContentLength;
    
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
            ", timestamp='" + this.getTimestamp() + "'" +
            "}";
    }
}