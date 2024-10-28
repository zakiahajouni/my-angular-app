import { NgModule } from '@angular/core';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
 import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
   SharedModule,
    SignUpRoutingModule,
   ReactiveFormsModule,
    MatTabsModule,
  MatCardModule,
   MatFormFieldModule,
    MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule


  ]

})
export class SignUpModule { }
