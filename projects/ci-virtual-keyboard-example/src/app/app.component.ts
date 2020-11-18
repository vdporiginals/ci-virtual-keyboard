import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgControl, NgModel } from '@angular/forms';
import {
  CiKeyboardComponent,
  CiKeyboardRef,
  CiKeyboardService,
} from 'ci-virtual-keyboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formTest = new FormControl('');
  attachModelValue = '';
  private _keyboardRef: CiKeyboardRef<CiKeyboardComponent>;
  @ViewChild('attachTo', { read: ElementRef, static: true })
  private _attachToElement: ElementRef;

  @ViewChild('attachTo', { read: NgModel, static: true })
  private _attachToControl: NgControl;
  constructor(private _keyboardService: CiKeyboardService) {
    this.formTest.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }
  openAttachedKeyboard() {
    this._keyboardRef = this._keyboardService.open();

    // reference the input element
    this._keyboardRef.instance.setInputInstance(this._attachToElement);

    // set control
    this._keyboardRef.instance.attachControl(this._attachToControl.control);
  }

  test() {}
}
