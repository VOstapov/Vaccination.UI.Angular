import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { HeaderComponent } from './header/header.component';
import { PatientService } from './shared/services/patient.service';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { PatientAddComponent } from './patient-page/patient-add/patient-add.component';
import { PatientEditComponent } from './patient-page/patient-edit/patient-edit.component';
import { PatientFormComponent } from './patient-page/patient-form/patient-form.component';
import { PatientInfoComponent } from './patient-page/patient-info/patient-info.component';
import { VaccineService } from './shared/services/vaccine.service';
import { VaccineFormComponent } from './patient-page/patient-info/vaccine-form/vaccine-form.component';
import { VaccineAddComponent } from './patient-page/patient-info/vaccine-add/vaccine-add.component';
import { PatientDefinerComponent } from './patient-page/patient-definer/patient-definer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

const appRoutes: Routes =[
  { path: 'patient', component: PatientPageComponent},
  { path: 'patient/add', component: PatientAddComponent},
  { path: 'patient/:id/edit', component: PatientEditComponent},
  { path: 'patient/:id', component: PatientInfoComponent},
  { path: 'patient/:id/vaccine/add', component: VaccineAddComponent},
  { path: '**', redirectTo: '/patient'}
];

@NgModule({
  declarations: [
    AppComponent,
    PatientPageComponent,
    HeaderComponent,
    PatientAddComponent,
    PatientEditComponent,
    PatientFormComponent,
    PatientInfoComponent,
    VaccineFormComponent,
    VaccineAddComponent,
    PatientDefinerComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
