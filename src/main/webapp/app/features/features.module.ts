import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AddressModule } from './address/address.module';
import { AfterSchoolProgramModule } from './after-school-program/after-school-program.module';
import { DailyVerificationRecordModule } from './daily-verification-record/daily-verification-record.module';
import { DismissalLocationModule } from './dismissal-location/dismissal-location.module';
import { EarlyPickupRequestModule } from './early-pickup-request/early-pickup-request.module';
import { FamilyRegistrationModule } from './family-registration/family-registration.module';
import { GuestRequestModule } from './guest-request/guest-request.module';
import { HostRequestModule } from './host-request/host-request.module';
import { ParentModule } from './parent/parent.module';
import { ParentRegistrationModule } from './parent-registration/parent-registration.module';
import { SchoolModule } from './school/school.module';
import { SchoolGradeModule } from './school-grade/school-grade.module';
import { StudentModule } from './student/student.module';
import { StudentRegistrationModule } from './student-registration/student-registration.module';
import { TeacherModule } from './teacher/teacher.module';
import { TransportationChangeModule } from './transportation-change/transportation-change.module';
import { UserProfileModule } from './user-profile/user-profile.module';


@NgModule({
    // prettier-ignore
    imports: [
        AddressModule,
        AfterSchoolProgramModule,
        DailyVerificationRecordModule,
        DismissalLocationModule,
        EarlyPickupRequestModule,
        FamilyRegistrationModule,
        GuestRequestModule,
        HostRequestModule,
        ParentModule,
        ParentRegistrationModule,
        SchoolModule,
        SchoolGradeModule,
        StudentModule,
        StudentRegistrationModule,
        TeacherModule,
        TransportationChangeModule,
        UserProfileModule,
        
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturesModule {

}
