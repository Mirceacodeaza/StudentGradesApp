import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; 

@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule,
      AuthModule,
      AppRoutingModule
    ],
    bootstrap: [AppComponent]
  })
  
export class AppModule { }
