package com.terafuze.gohomenotes.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.terafuze.gohomenotes.domain.DailyVerificationRecord;
import com.terafuze.gohomenotes.web.models.DailyVerificationRecordModel;

/**
 * Mapper for the Daily Verification Record domain model object to the Daily Verification Record Model.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DailyVerificationRecordMapper extends IEntityMapper<DailyVerificationRecordModel, DailyVerificationRecord> {

    @Mapping(source = "", target = "identifier")
    DailyVerificationRecordModel toModel(DailyVerificationRecord dailyVerificationRecord);

    DailyVerificationRecord toEntity(DailyVerificationRecordModel dailyVerificationRecordModel);

    default DailyVerificationRecord fromId(Long id) {
        if (id == null) {
            return null;
        }
        DailyVerificationRecord dailyVerificationRecord = new DailyVerificationRecord();
        dailyVerificationRecord.setId(id);
        return dailyVerificationRecord;
    }
}