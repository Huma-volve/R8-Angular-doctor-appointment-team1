import { Routes } from '@angular/router';
import { Dcard } from './components/dcard/dcard';
import { Dmap } from './components/dmap/dmap';


export const routes: Routes = [
{path: 'dcard', component: Dcard},
{path:'dmap', component: Dmap},
];
