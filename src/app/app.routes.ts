import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CareersPageComponent } from './components/careers-page/careers-page.component';
import { JobApplicationComponent } from './components/job-application/job-application.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'careers', component: CareersPageComponent },
  { path: 'apply', component: JobApplicationComponent }
];
