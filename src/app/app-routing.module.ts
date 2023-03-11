import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './core/pages/forgot-password/forgot-password.component';
import { HomeComponent } from './core/pages/home/home.component';
import { LoginComponent } from './core/pages/login/login.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { SignUpComponent } from './core/pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './core/pages/verify-email/verify-email.component';
import { SettingsComponent } from './core/user-pages/settings/settings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full' },
  { path: 'verify-email', component: VerifyEmailComponent, pathMatch: 'full' },
  { path: 'browse', loadChildren: () => import('./modules/browse-results/browse-results.module').then(m => m.BrowseResultsModule) },
  { path: 'movies', loadChildren: () => import('./modules/movies/movies.module').then(m => m.MoviesModule) }, 
  { path: 'shows', loadChildren: () => import('./modules/tv-shows/tv-shows.module').then(m => m.TvShowsModule) }, 
  { path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) }, 
  { path: 'contact', loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
