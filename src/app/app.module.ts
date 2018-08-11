import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './posts.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardGuard } from './auth.guard'


const appRoutes: Routes = [
  { path: 'manage', component: ManagementPageComponent, canActivate:[AuthGuardGuard]},
  { path: 'home', component: HomePageComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ManagementPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    OrderModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PostsService,
    FormBuilder,
    AuthGuardGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
