import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CiVirtualKeyboardModule } from 'ci-virtual-keyboard';
import { AppComponent } from './app.component';
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    CiVirtualKeyboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
