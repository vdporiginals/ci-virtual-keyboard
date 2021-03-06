import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { langArray } from '../../config/lang-array';
import { KeyboardClassKey } from '../../models/keyclass.enum';

export const VALUE_NEWLINE = '\n\r';
export const VALUE_SPACE = ' ';
export const VALUE_TAB = '\t';
const REPEAT_TIMEOUT = 500;
const REPEAT_INTERVAL = 100;

@Component({
  selector: 'ci-keyboard-key',
  templateUrl: './ci-keyboard-key.component.html',
  styleUrls: ['./ci-keyboard-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CiKeyboardKeyComponent implements OnInit, OnChanges {
  private _deadkeyKeys: string[] = [];
  private _repeatTimeoutHandler: any;
  private _repeatIntervalHandler: any;
  private _repeatState: boolean = false; // true if repeating, false if waiting
  numArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  isDisabled = false;
  active$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  activeArr = [];
  activeHighlight = [];
  pressed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @Input()
  key: string | KeyboardClassKey;

  @Input()
  set active(active: boolean) {
    this.active$.next(active);
  }

  get active(): boolean {
    return this.active$.getValue();
  }

  @Input()
  set pressed(pressed: boolean) {
    this.pressed$.next(pressed);
  }

  get pressed(): boolean {
    return this.pressed$.getValue();
  }

  @Input()
  input?: ElementRef;

  @Input()
  control?: FormControl;

  @Input()
  activeChar = [];

  @Input()
  lastChar = [];

  @Output()
  genericClick = new EventEmitter<MouseEvent>();

  @Output()
  enterClick = new EventEmitter<MouseEvent>();

  @Output()
  bkspClick = new EventEmitter<MouseEvent>();

  @Output()
  capsClick = new EventEmitter<MouseEvent>();

  @Output()
  altClick = new EventEmitter<MouseEvent>();

  @Output()
  shiftClick = new EventEmitter<MouseEvent>();

  @Output()
  spaceClick = new EventEmitter<MouseEvent>();

  @Output()
  tabClick = new EventEmitter<MouseEvent>();

  @Output()
  keyClick = new EventEmitter<MouseEvent>();

  get lowerKey(): string {
    return `${this.key}`.toLowerCase();
  }

  get charCode(): number {
    return `${this.key}`.charCodeAt(0);
  }

  get isClassKey(): boolean {
    return this.key in KeyboardClassKey;
  }

  get isDeadKey(): boolean {
    return this._deadkeyKeys.some(
      (deadKey: string) => deadKey === `${this.key}`
    );
  }

  get cssClass(): string {
    const classes = [];

    if (this.isDeadKey) {
      classes.push('mat-keyboard-key-deadkey');
    }

    return classes.join(' ');
  }

  get inputValue(): string {
    if (this.control) {
      return this.control.value;
    } else if (
      this.input &&
      this.input.nativeElement &&
      this.input.nativeElement.value
    ) {
      return this.input.nativeElement.value;
    } else {
      return '';
    }
  }

  set inputValue(inputValue: string) {
    if (this.control) {
      this.control.setValue(inputValue);
    } else if (this.input && this.input.nativeElement) {
      this.input.nativeElement.value = inputValue;
    }
  }

  // Inject dependencies
  constructor() {}

  ngOnInit() {}
  // ngAfterViewInit() {
  //   langArray.forEach((a) => {
  //     const concatArr = a.toUpperCase().split('');
  //     if (a.startsWith(this.activeChar[0])) {
  //       this.activeArr = [...new Set(this.activeArr.concat(concatArr))];
  //     }
  //   });
  // }

  ngOnDestroy() {
    this.cancelRepeat();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.activeChar);
    // if (changes.activeChar) {
    //   if (changes.activeChar.currentValue.length > 0) {

    //     console.log(this.activeArr);
    //   } else {
    //     this.activeArr = [];
    //   }
    // } else {
    //   this.activeArr = [];
    // }

    if (changes.lastChar) {
      const arrLang = langArray;
      const lastCharArr = [];
      if (changes.lastChar.currentValue.length > 0) {
        
        arrLang.forEach((a) => {
          const concatArr = a.toUpperCase().split('');
          const currentval = changes.lastChar.currentValue[0];
          if (
            a
              .toLowerCase()
              .startsWith(currentval[currentval.length - 1]?.toLowerCase())
          ) {
            this.activeArr = [...new Set(this.activeArr.concat(concatArr))];
          }
        });

        changes.lastChar.currentValue[0]?.forEach((element) => {
          lastCharArr.push(element.toUpperCase());
          this.activeHighlight = lastCharArr;
        });
        // console.log(this.activeHighlight);
      } else {
        this.activeHighlight = [];
        this.activeArr = [];
      }
    } else {
      this.activeHighlight = [];
      this.activeArr = [];
    }
  }
  onClick(event: MouseEvent) {
    // Trigger generic click event
    this.genericClick.emit(event);
    // Do not execute keypress if key is currently repeating
    if (this._repeatState) {
      return;
    }

    // Trigger a global key event. TODO: investigate
    // this._triggerKeyEvent();

    // Manipulate the focused input / textarea value
    const caret = this.input ? this._getCursorPosition() : 0;
    let char: string;
    switch (this.key) {
      // this keys have no actions yet
      // TODO: add deadkeys and modifiers
      case KeyboardClassKey.AltGr:
        this.altClick.emit(event);
        break;

      case KeyboardClassKey.Caps:
        this.capsClick.emit(event);
        break;

      case KeyboardClassKey.Space:
        char = VALUE_SPACE;
        this.spaceClick.emit(event);
        break;

      default:
        // the key is not mapped or a string
        char = `${this.key}`;
        this.keyClick.emit(event);
        break;
    }

    if (char && this.input) {
      this.replaceSelectedText(char);
      this._setCursorPosition(caret + 1);
    }

    // Dispatch Input Event for Angular to register a change
    if (this.input && this.input.nativeElement) {
      setTimeout(() => {
        this.input.nativeElement.dispatchEvent(
          new Event('input', { bubbles: true })
        );
      });
    }

    // this.getIrrelevant();
  }

  // Handle repeating keys. Keypress logic derived from onClick()
  onPointerDown() {
    this.cancelRepeat();
    this._repeatState = false;
    this._repeatTimeoutHandler = setTimeout(() => {
      // Initialize keypress variables
      let char: string;
      let keyFn: () => void;

      switch (this.key) {
        // Ignore non-repeating keys
        case KeyboardClassKey.Alt:
        case KeyboardClassKey.AltGr:
        case KeyboardClassKey.AltLk:
        case KeyboardClassKey.Caps:
        case KeyboardClassKey.Enter:
        case KeyboardClassKey.Shift:
          return;

        case KeyboardClassKey.Space:
          char = VALUE_SPACE;
          keyFn = () => this.spaceClick.emit();
          break;

        default:
          // console.log(char);

          char = `${this.key}`;
          keyFn = () => this.keyClick.emit();
          break;
      }

      // Execute repeating keypress
      this._repeatIntervalHandler = setInterval(() => {
        const caret = this.input ? this._getCursorPosition() : 0;
        this._repeatState = true;

        if (keyFn) {
          keyFn();
        }

        if (char && this.input) {
          this.replaceSelectedText(char);
          this._setCursorPosition(caret + 1);
        }

        if (this.input && this.input.nativeElement) {
          setTimeout(() =>
            this.input.nativeElement.dispatchEvent(
              new Event('input', { bubbles: true })
            )
          );
        }
      }, REPEAT_INTERVAL);
    }, REPEAT_TIMEOUT);
  }

  cancelRepeat() {
    if (this._repeatTimeoutHandler) {
      clearTimeout(this._repeatTimeoutHandler);
      this._repeatTimeoutHandler = null;
    }

    if (this._repeatIntervalHandler) {
      clearInterval(this._repeatIntervalHandler);
      this._repeatIntervalHandler = null;
    }
  }

  private deleteSelectedText(): void {
    const value = this.inputValue ? this.inputValue.toString() : '';
    let caret = this.input ? this._getCursorPosition() : 0;
    let selectionLength = this._getSelectionLength();
    if (selectionLength === 0) {
      if (caret === 0) {
        return;
      }
      caret--;
      selectionLength = 1;
    }

    const headPart = value.slice(0, caret);
    const endPart = value.slice(caret + selectionLength);

    this.inputValue = [headPart, endPart].join('');
    this._setCursorPosition(caret);
  }

  private replaceSelectedText(char: string): void {
    const value = this.inputValue ? this.inputValue.toString() : '';
    const caret = this.input ? this._getCursorPosition() : 0;
    const selectionLength = this._getSelectionLength();
    const headPart = value.slice(0, caret);
    const endPart = value.slice(caret + selectionLength);

    this.inputValue = [headPart, char, endPart].join('');
  }

  // inspired by:
  // ref https://stackoverflow.com/a/2897510/1146207
  private _getCursorPosition(): number {
    if (!this.input) {
      return;
    }

    if ('selectionStart' in this.input.nativeElement) {
      // Standard-compliant browsers
      return this.input.nativeElement.selectionStart;
    } else if ('selection' in window.document) {
      // IE
      this.input.nativeElement.focus();
      const selection: any = window.document['selection'];
      const sel = selection.createRange();
      const selLen = selection.createRange().text.length;
      sel.moveStart('character', -this.control.value.length);

      return sel.text.length - selLen;
    }
  }

  private _getSelectionLength(): number {
    if (!this.input) {
      return;
    }

    if ('selectionEnd' in this.input.nativeElement) {
      // Standard-compliant browsers
      return (
        this.input.nativeElement.selectionEnd -
        this.input.nativeElement.selectionStart
      );
    }

    if ('selection' in window.document) {
      // IE
      this.input.nativeElement.focus();
      const selection: any = window.document['selection'];
      return selection.createRange().text.length;
    }
  }

  // inspired by:
  // ref https://stackoverflow.com/a/12518737/1146207
  // tslint:disable one-line
  private _setCursorPosition(position: number): boolean {
    if (!this.input) {
      return;
    }

    this.inputValue = this.control.value;
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)

    if ('createTextRange' in this.input.nativeElement) {
      const range = this.input.nativeElement.createTextRange();
      range.move('character', position);
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
      // fail city, fortunately this never happens (as far as I've tested) :)
      else {
        this.input.nativeElement.focus();
        return false;
      }
    }
  }

  private _isTextarea(): boolean {
    return (
      this.input &&
      this.input.nativeElement &&
      this.input.nativeElement.tagName === 'TEXTAREA'
    );
  }

  getIrrelevant() {
    const arrLang = langArray;
    const inputArr = this.inputValue.split('');
    // console.log(this.inputValue.split(''));
    if (this.inputValue.length > 0) {
      this.inputValue.split('')[0];

      arrLang.forEach((a) => {
        if (
          a.toLowerCase().startsWith(inputArr[0].toLowerCase()) &&
          a.charAt(1).toLowerCase() === this.key.toLowerCase()
        ) {
          // this.listActiveChar.next(
          //   this.listActiveChar.getValue().concat(this.key)
          // );
        }
      });
    } else {
      // this.listActiveChar.next([]);
    }
  }

  getNumArr(key) {
    return this.numArr.includes(key);
  }
}
