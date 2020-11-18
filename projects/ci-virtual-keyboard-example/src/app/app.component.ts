import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgControl, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  @ViewChild("input", { static: true }) input;
  // attachModelValue;
  attachModelValue = "";
  private _keyboardRef: CiKeyboardRef<CiKeyboardComponent>;
  @ViewChild("attachTo", { read: ElementRef, static: true })
  private _attachToElement: ElementRef;

  @ViewChild("attachTo", { read: NgModel, static: true })
  private _attachToControl: NgControl;
  constructor(
    public dialog2: MatDialog,
    private _keyboardService: CiKeyboardService
  ) {}

  ngOnInit() {
    this.openAttachedKeyboard();
  }

  ngAfterViewInit() {
  }

  ionViewDidEnter() {
  }

  hideKeyboard() {
  }
  deleteText(type) {
    //type 1 = xóa chữ , 2 = từ , 3 = all
    let inputArr;
    switch (type) {
      case 1:
        inputArr = this.attachModelValue.split("");
        inputArr.splice(-1, 1);
        this.attachModelValue = inputArr.join("");
        break;
      case 2:
        inputArr = this.attachModelValue.split(" ");
        console.log();

        if (inputArr[inputArr.length - 1] === "") {
          inputArr.splice(-1, 1);
          inputArr.splice(-1, 1);
        } else {
          inputArr.splice(-1, 1);
        }
        // inputArr.splice(-1, 1);
        this.attachModelValue = inputArr.join(" ");
        break;
      case 3:
        this.attachModelValue = "";
        break;
    }
  }
  showText() {
    // const dialogRef = this.dialog2.open(ShowTextComponent, {
    //   width: "813px",
    //   height: "718px",
    //   panelClass: "custom_dialog3",
    //   data: this.attachModelValue,
    // });
    // dialogRef.updatePosition({ top: "0", left: "0" });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log("The dialog was closed");
    // });
  }
  delete() {
    let caret = this.input ? this._getCursorPosition() : 0;
    let selectionLength = this._getSelectionLength();
    if (selectionLength === 0) {
      if (caret === 0) {
        return;
      }
      caret--;
      selectionLength = 1;
    }

    this._setCursorPosition(caret);
  }

  private _getCursorPosition(): number {
    if (!this.input) {
      return;
    }

    if ("selectionStart" in this.input.nativeElement) {
      // Standard-compliant browsers
      return this.input.nativeElement.selectionStart;
    } else if ("selection" in window.document) {
      // IE
      this.input.nativeElement.focus();
      const selection: any = window.document["selection"];
      const sel = selection.createRange();
      const selLen = selection.createRange().text.length;
      sel.moveStart("character", -this.attachModelValue.length);

     
      return sel.text.length - selLen;
    }
  }

  private _getSelectionLength(): number {
    if (!this.input) {
      return;
    }

    if ("selectionEnd" in this.input.nativeElement) {
      // Standard-compliant browsers
      return (
        this.input.nativeElement.selectionEnd -
        this.input.nativeElement.selectionStart
      );
    }

    if ("selection" in window.document) {
      // IE
      this.input.nativeElement.focus();
      const selection: any = window.document["selection"];
      return selection.createRange().text.length;
    }
  }

  openAttachedKeyboard() {
    this._keyboardRef = this._keyboardService.open();

    // reference the input element
    this._keyboardRef.instance.setInputInstance(this._attachToElement);

    // set control
    this._keyboardRef.instance.attachControl(this._attachToControl.control);
  }

  private _setCursorPosition(position: number): boolean {
    if (!this.input) {
      return;
    }

    // this.inputValue = this.control.value;
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)

    if ("createTextRange" in this.input.nativeElement) {
      const range = this.input.nativeElement.createTextRange();
      range.move("character", position);
      range.select();
      return true;
    } else {
      // (el.selectionStart === 0 added for Firefox bug)
      if (
        this.input.nativeElement.selectionStart ||
        this.input.nativeElement.selectionStart === 0
      ) {
        this.input.nativeElement.setSelectionRange(position, position);
        setTimeout(() => {
          // this will make the execution after the above boolean has changed
          this.input.nativeElement.focus();
        
        }, 100);
        return true;
      }
      // fail city, fortunately this never happens (as far as I've attachModelValueed) :)
      else {
       
        return false;
      }
    }
  }
}
