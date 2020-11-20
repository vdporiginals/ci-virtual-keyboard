import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { CiKeyboardComponent } from '../components/ci-keyboard/ci-keyboard.component';

import { CiKeyboardRef } from '../event/key-ref';
import { CiKeyboardService } from '../services/ci-keyboard.service';

@Directive({
  selector: '[ciKeyboard]',
})
export class CiKeyboardDirective
  implements OnDestroy, AfterViewInit, OnChanges {
  private _keyboardRef: CiKeyboardRef<CiKeyboardComponent>;
  public currentEvent: Subscription;
  @Input() ciKeyboard: any;
  @Input() ngModel;
  //   @Input() darkTheme: boolean;
  @Input() historySuggest: any;
  @Input() duration: number;

  @Input() isDebug: boolean;

  @Output() enterClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() capsClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() altClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() shiftClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private element: ElementRef,
    private _elementRef: ElementRef,
    private _keyboardService: CiKeyboardService,
    @Optional() @Self() private _control?: NgControl
  ) {}

  ngAfterViewInit() {}
  ngOnChanges() {
    if (this._keyboardRef) {
      this._keyboardRef.instance.historySuggest.next(this.historySuggest);
    }
  }
  ngOnDestroy() {
    if (this.currentEvent) {
      this.currentEvent.unsubscribe();
    }
    this.hideKeyboard();
  }

  @HostListener('keyup', ['$event'])
  public onValueChange(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;
  }

  @HostListener('focus', ['$event'])
  public showKeyboard() {
    this._keyboardRef = this._keyboardService.open(this.ciKeyboard, {
      //   darkTheme: this.darkTheme,
      duration: this.duration,
      isDebug: this.isDebug,
    });

    // reference the input element
    this._keyboardRef.instance.setInputInstance(this._elementRef);
    // set control if given, cast to smth. non-abstract
    if (this._control) {
      this._keyboardRef.instance.attachControl(this._control.control);
    }

    // connect outputs
    this._keyboardRef.instance.enterClick.subscribe(() =>
      this.enterClick.next()
    );
    this._keyboardRef.instance.capsClick.subscribe(() => this.capsClick.next());
    this._keyboardRef.instance.altClick.subscribe(() => this.altClick.next());
    this._keyboardRef.instance.shiftClick.subscribe(() =>
      this.shiftClick.next()
    );
  }

  @HostListener('blur', ['$event'])
  public hideKeyboard() {
    if (this._keyboardRef) {
      this._keyboardRef.dismiss();
    }
  }
}
