import { Routes } from '@angular/router';
import {HomePage} from './home/home.page';

// export const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
//   },
// ];

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomePage},
  {
    path: 'contact-details/:id',
    loadChildren: () => import('./contact-details/contact-details.module').then( m => m.ContactDetailsPageModule)
  },
  {
    path: 'update-contact/:id',
    loadChildren: () => import('./update-contact/update-contact.module').then( m => m.UpdateContactPageModule)
  }
];
