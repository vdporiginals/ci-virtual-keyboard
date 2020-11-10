import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { CiKeyboardComponent } from '../components/ci-keyboard/ci-keyboard.component';

import { CiKeyboardRef } from '../event/key-ref';
import { MatKeyboardService } from '../services/ci-keyboard.service';

@Directive({
  selector: 'input[ciKeyboard], textarea[ciKeyboard]',
})
export class MatKeyboardDirective implements OnDestroy {
  private _keyboardRef: CiKeyboardRef<CiKeyboardComponent>;

  @Input() matKeyboard: string;

  //   @Input() darkTheme: boolean;

  @Input() duration: number;

  @Input() isDebug: boolean;

  @Output() enterClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() capsClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() altClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() shiftClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _elementRef: ElementRef,
    private _keyboardService: MatKeyboardService,
    @Optional() @Self() private _control?: NgControl
  ) {}

  ngOnDestroy() {
    this.hideKeyboard();
  }

  @HostListener('focus', ['$event'])
  public showKeyboard() {
    this._keyboardRef = this._keyboardService.open(this.matKeyboard, {
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
