import { Routes } from '@angular/router';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';


export const routes: Routes = [
    { path: '', redirectTo: '/cv-list', pathMatch: 'full' },
    { path: 'cv-list', component: CvListComponent },
    { path: 'cv-form', component: CvFormComponent },
    { path: 'cv-form/:id', component: CvFormComponent } // For editing
  ];
  