import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common'

import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { NavbarComponent } from './core/components/navbar/navbar.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeComponent } from './core/pages/home/home.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { LoginComponent } from './core/pages/login/login.component';
import { SignUpComponent } from './core/pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './core/pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './core/pages/verify-email/verify-email.component';

import { SearchBoxComponent } from './core/components/search-box/search-box.component';
import { SharedModule } from './shared/shared.module';
import { HeroCarouselComponent } from './core/pages/home/hero-carousel/hero-carousel.component';
import { InterceptorProviders } from './shared/interceptors';
import { ToastrModule } from 'ngx-toastr';
import { UserMenuComponent } from './core/components/user-menu/user-menu.component';
import { modalConfigOptions } from './shared/models/modalOptions';

import { SettingsComponent } from './core/user-pages/settings/settings.component';
import { BookmarksComponent } from './core/user-pages/bookmarks/bookmarks.component';
import { RatingsComponent } from './core/user-pages/ratings/ratings.component';
import { WatchlistComponent } from './core/user-pages/watchlist/watchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SearchBoxComponent,
    HeroCarouselComponent,
    UserMenuComponent,
    SettingsComponent,
    BookmarksComponent,
    RatingsComponent,
    WatchlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgOptimizedImage,
    SharedModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 5000,
      closeButton: true,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    provideImgixLoader('https://image.tmdb.org/t/p/'),
    InterceptorProviders,
    modalConfigOptions
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
