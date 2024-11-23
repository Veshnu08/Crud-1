import { Routes } from '@angular/router';
import { FruitListComponent } from './fruit-list/fruit-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/fruits', pathMatch: 'full' },
  { path: 'fruits', component: FruitListComponent }
];