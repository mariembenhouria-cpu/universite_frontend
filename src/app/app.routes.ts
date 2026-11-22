
import { Routes } from '@angular/router';

import { UniversitiesComponent } from './universities/universities';
import { AddUniversiteComponent } from './add-university/add-university';
import { UpdateUniversiteComponent } from './update-universite/update-universite';

import { RechercheParClassification } from './recherche-par-classification/recherche-par-classification';
import { RechercheParNomUniversite } from './recherche-par-nom-universite/recherche-par-nom-universite';
import { ListeClassifications } from './liste-classifications/liste-classifications';

import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';

export const routes: Routes = [

  { path: 'universities', component: UniversitiesComponent },

  { path: 'add-university', component: AddUniversiteComponent },

  { path: 'updateuniversite/:id', component: UpdateUniversiteComponent },

  { path: 'RechercheParClassification', component: RechercheParClassification },

  { path: 'recherche-par-nom-universite', component: RechercheParNomUniversite },

  { path: 'ListeClassifications', component: ListeClassifications },

  { path: 'login', component: Login },

  { path: 'app-forbidden', component: Forbidden },

  { path: '', redirectTo: 'universities', pathMatch: 'full' }

];
