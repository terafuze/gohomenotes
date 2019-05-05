import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AfterSchoolProgramModule } from './after-school-program/after-school-program.module';
import { DailyVerificationRecordModule } from './daily-verification-record/daily-verification-record.module';
import { DismissalLocationModule } from './dismissal-location/dismissal-location.module';
import { EarlyPickupRequestModule } from './early-pickup-request/early-pickup-request.module';
import { GuestRequestModule } from './guest-request/guest-request.module';
import { HostRequestModule } from './host-request/host-request.module';
import { LegalGuardianModule } from './legal-guardian/legal-guardian.module';
import { SchoolModule } from './school/school.module';
import { SchoolGradeModule } from './school-grade/school-grade.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { TransportationChangeModule } from './transportation-change/transportation-change.module';


@NgModule({
    // prettier-ignore
    imports: [
        AfterSchoolProgramModule,
        DailyVerificationRecordModule,
        DismissalLocationModule,
        EarlyPickupRequestModule,
        GuestRequestModule,
        HostRequestModule,
        LegalGuardianModule,
        SchoolModule,
        SchoolGradeModule,
        StudentModule,
        TeacherModule,
        TransportationChangeModule,
        
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturesModule {

}
