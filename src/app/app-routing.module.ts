import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRountingModule } from './auth/auth.routing';
import { PageRountingModule } from './pages/pages.routing';


const routes: Routes = [
  { path: '', redirectTo: 'page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    AuthRountingModule,
    PageRountingModule
  ]
})
export class AppRoutingModule { }
