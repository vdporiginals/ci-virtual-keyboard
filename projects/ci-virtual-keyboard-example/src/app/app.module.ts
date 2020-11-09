import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CiVirtualKeyboardModule } from 'ci-virtual-keyboard';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CiVirtualKeyboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
