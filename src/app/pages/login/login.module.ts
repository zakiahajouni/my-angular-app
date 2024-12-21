import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent

   ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class LoginModule { }
