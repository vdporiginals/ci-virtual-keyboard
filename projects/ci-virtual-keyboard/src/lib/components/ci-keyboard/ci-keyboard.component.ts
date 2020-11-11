import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { layoutKeyboard } from '../../config/key.config';
import { CiKeyboardRef } from '../../event/key-ref';
import { KeyboardClassKey, KeyboardModifier } from '../../models/keyclass.enum';
import { CiKeyboardService } from '../../services/ci-keyboard.service';
import { CiKeyboardKeyComponent } from '../ci-keyboard-key/ci-keyboard-key.component';
@Component({
  selector: 'ci-keyboard',
  templateUrl: './ci-keyboard.component.html',
  styleUrls: ['./ci-keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CiKeyboardComponent implements OnInit {
  private _isDebug: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _inputInstance$: BehaviorSubject<ElementRef | null> = new BehaviorSubject(
    null
  );

  @ViewChildren(CiKeyboardKeyComponent)
  private _keys: QueryList<CiKeyboardKeyComponent>;

  private _modifier: KeyboardModifier = KeyboardModifier.None;

  private _capsLocked = false;

  // the service provides a locale or layout optionally
  locale?: string;

  layout = layoutKeyboard;

  control: AbstractControl;

  // the instance of the component making up the content of the keyboard
  keyboardRef: CiKeyboardRef<CiKeyboardComponent>;

  @HostBinding('class.ci-keyboard')
  cssClass = true;

  enterClick: EventEmitter<void> = new EventEmitter<void>();

  capsClick: EventEmitter<void> = new EventEmitter<void>();

  altClick: EventEmitter<void> = new EventEmitter<void>();

  shiftClick: EventEmitter<void> = new EventEmitter<void>();

  // returns an observable of the input instance
  get inputInstance(): Observable<ElementRef | null> {
    return this._inputInstance$.asObservable();
  }

  set isDebug(isDebug: boolean) {
    if (this._isDebug.getValue() !== isDebug) {
      this._isDebug.next(isDebug);
    }
  }

  get isDebug$(): Observable<boolean> {
    return this._isDebug.asObservable();
  }
  private _locale: string = 'vi';

  // inject dependencies
  constructor(private _keyboardService: CiKeyboardService) {
    //   this.attachControl();
  }

  setInputInstance(inputInstance: ElementRef) {
    this._inputInstance$.next(inputInstance);
  }

  attachControl(control: AbstractControl) {
    this.control = control;
  }

  ngOnInit() {
    // set a fallback using the locale
    // if (!this.layout) {
    //   this.locale = this._locale;
    //   this.layout = this._keyboardService.getLayoutForLocale(this.locale);
    // }
  }

  /**
   * dismisses the keyboard
   */
  dismiss() {
    this.keyboardRef.dismiss();
  }

  /**
   * checks if a given key is currently pressed
   * @param key
   * @param
   */
  isActive(key: (string | KeyboardClassKey)[]): boolean {
    const modifiedKey: string = this.getModifiedKey(key);
    const isActiveCapsLock: boolean =
      modifiedKey === KeyboardClassKey.Caps && this._capsLocked;
    const isActiveModifier: boolean =
      modifiedKey === KeyboardModifier[this._modifier];
    return isActiveCapsLock || isActiveModifier;
  }

  // retrieves modified key
  getModifiedKey(key: (string | KeyboardClassKey)[]): string {
    let modifier: KeyboardModifier = this._modifier;
    // `CapsLock` inverts the meaning of `Shift`
    if (this._capsLocked) {
      modifier = this._invertShiftModifier(this._modifier);
    }

    return key[modifier];
  }

  /**
   * listens to users keyboard inputs to simulate on virtual keyboard, too
   * @param event
   */
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // 'activate' corresponding key
    this._keys
      .filter((key: CiKeyboardKeyComponent) => key.key === event.key)
      .forEach((key: CiKeyboardKeyComponent) => {
        key.pressed = true;
      });

    // simulate modifier press
    if (event.key === KeyboardClassKey.Caps) {
      this.onCapsClick(event.getModifierState(KeyboardClassKey.Caps));
    }

    if (
      event.key === KeyboardClassKey.AltGr &&
      this._modifier !== KeyboardModifier.Alt &&
      this._modifier !== KeyboardModifier.ShiftAlt
    ) {
      this.onAltClick();
    }

    if (
      event.key === KeyboardClassKey.Shift &&
      this._modifier !== KeyboardModifier.Shift &&
      this._modifier !== KeyboardModifier.ShiftAlt
    ) {
      this.onShiftClick();
    }
  }

  /**
   * listens to users keyboard inputs to simulate on virtual keyboard, too
   * @param event
   */
  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    // 'deactivate' corresponding key
    this._keys
      .filter((key: CiKeyboardKeyComponent) => key.key === event.key)
      .forEach((key: CiKeyboardKeyComponent) => {
        key.pressed = false;
      });

    // simulate modifier release
    if (
      event.key === KeyboardClassKey.AltGr &&
      (this._modifier === KeyboardModifier.Alt ||
        this._modifier === KeyboardModifier.ShiftAlt)
    ) {
      this.onAltClick();
    }
    if (
      event.key === KeyboardClassKey.Shift &&
      (this._modifier === KeyboardModifier.Shift ||
        this._modifier === KeyboardModifier.ShiftAlt)
    ) {
      this.onShiftClick();
    }
  }

  /**
   * bubbles event if submit is potentially triggered
   */
  onEnterClick() {
    // notify subscribers
    this.enterClick.next();
  }

  /**
   * simulates clicking `CapsLock` key
   * @param targetState
   */
  onCapsClick(targetState = !this._capsLocked) {
    // not implemented
    this._capsLocked = targetState;

    // notify subscribers
    this.capsClick.next();
  }

  /*
   * non-modifier keys are clicked
   */
  onKeyClick() {
    if (
      this._modifier === KeyboardModifier.Shift ||
      this._modifier === KeyboardModifier.ShiftAlt
    ) {
      this._modifier = this._invertShiftModifier(this._modifier);
    }
  }

  /**
   * simulates clicking `Alt` key
   */
  onAltClick() {
    // invert modifier meaning
    this._modifier = this._invertAltModifier(this._modifier);

    // notify subscribers
    this.altClick.next();
  }

  /**
   * simulates clicking `Shift` key
   */
  onShiftClick() {
    // invert modifier meaning
    this._modifier = this._invertShiftModifier(this._modifier);

    // notify subscribers
    this.shiftClick.next();
  }

  private _invertAltModifier(modifier: KeyboardModifier): KeyboardModifier {
    switch (modifier) {
      case KeyboardModifier.None:
        return KeyboardModifier.Alt;

      case KeyboardModifier.Shift:
        return KeyboardModifier.ShiftAlt;

      case KeyboardModifier.ShiftAlt:
        return KeyboardModifier.Shift;

      case KeyboardModifier.Alt:
        return KeyboardModifier.None;
    }
  }

  private _invertShiftModifier(modifier: KeyboardModifier): KeyboardModifier {
    switch (modifier) {
      case KeyboardModifier.None:
        return KeyboardModifier.Shift;

      case KeyboardModifier.Alt:
        return KeyboardModifier.ShiftAlt;

      case KeyboardModifier.ShiftAlt:
        return KeyboardModifier.Alt;

      case KeyboardModifier.Shift:
        return KeyboardModifier.None;
    }
  }
}
