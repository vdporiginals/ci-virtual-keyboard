import { InjectionToken } from '@angular/core';
import { KeyboardClassKey } from '../models/keyclass.enum';
export interface KeyboardLayout {
  name: string;
  keys: (string | KeyboardClassKey)[][][];
  lang?: string[];
}

export interface KeyboardLayouts {
  [layout: string]: KeyboardLayout;
}

const CI_KEYBOARD_LAYOUTS = new InjectionToken<KeyboardLayouts>(
  'keyboard-layouts.config'
);
// const CI_KEYBOARD_LAYOUTS = nei InjectionToken<KeyboardLayouts>(
//   'keyboard-layouts.config'
// );

export const layoutKeyboardNum = [
  ['1', '!'],
  ['2', '@'],
  ['3', '#'],
  ['4', '$'],
  ['5', '%'],
  ['6', '^'],
  ['7', '&'],
  ['8', '*'],
  ['9', '('],
  ['0', ')'],
];
export const dau = [
  ['\u0300', '\u0300'],
  ['\u0309', '\u0309'],
  ['\u0303', '\u0303'],
  ['\u0301', '\u0301'],
  ['\u0323', '\u0323'],
];

export const layoutKeyboard = [
  [
    //   ['`', '~', '`', '~'],
    ['A', 'A', 'A', 'A'],
    ['\u0102', '\u0102'],
    ['\u00C2', '\u00C2'],
    ['B', 'B', 'B', 'B'],
    ['C', 'C'],
    ['D', 'D'],
    ['\u0111', '\u0110', '\u0111', '\u0110'],
    ['E', 'E'],
    ['\u00EA', '\u00CA', '\u00EA', '\u00CA'],
    ['G', 'G'],
    // ['-', '_', '-', '_'],
    // ['\u20AB', '+', '=', '+'],
    // [
    //   KeyboardClassKey.Bksp,
    //   KeyboardClassKey.Bksp,
    //   KeyboardClassKey.Bksp,
    //   KeyboardClassKey.Bksp,
    // ],
  ],
  [
    // [
    //   KeyboardClassKey.Tab,
    //   KeyboardClassKey.Tab,
    //   KeyboardClassKey.Tab,
    //   KeyboardClassKey.Tab,
    // ],
    ['H', 'H'],
    ['I', 'I'],
    ['K', 'K'],
    ['L', 'L'],
    ['M', 'M'],
    ['N', 'N'],
    ['I', 'I'],
    ['O', 'O'],
    ['\u00D4', '\u00D4', '\u00D4', '\u00D4'],
    ['\u01A0', '\u01A0', '\u01A0', '\u01A0'],
    ['P', 'P'],
  ],
  [
    // [
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    // ],
    [
      KeyboardClassKey.AltGr,
      KeyboardClassKey.AltGr,
      KeyboardClassKey.AltGr,
      KeyboardClassKey.AltGr,
    ],
    ['Q', 'Q'],
    ['R', 'R'],
    ['S', 'S'],
    ['T', 'T'],
    ['U', 'U'],
    ['\u01AF', '\u01AF'],
    ['V', 'V'],
    ['X', 'X'],
    ['Y', 'Y'],
    // [
    //   KeyboardClassKey.Enter,
    //   KeyboardClassKey.Enter,
    //   KeyboardClassKey.Enter,
    //   KeyboardClassKey.Enter,
    // ],
  ],
  //   [
  //     // [
  //     //   KeyboardClassKey.Shift,
  //     //   KeyboardClassKey.Shift,
  //     //   KeyboardClassKey.Shift,
  //     //   KeyboardClassKey.Shift,
  //     // ],
  //     ['z', 'Z', 'z', 'Z'],
  //     ['x', 'X', 'x', 'X'],
  //     ['c', 'C', 'c', 'C'],
  //     ['v', 'V', 'v', 'V'],
  //     ['n', 'N', 'n', 'N'],
  //     ['m', 'M', 'm', 'M'],
  //     [',', '<', ',', '<'],
  //     ['.', '>', '.', '>'],
  //     ['/', '?', '/', '?'],
  //     // [
  //     //   KeyboardClassKey.Shift,
  //     //   KeyboardClassKey.Shift,
  //     //   KeyboardClassKey.Shift,
  //     //   KeyboardClassKey.Shift,
  //     // ],
  //   ],
  [
    [
      KeyboardClassKey.Space,
      KeyboardClassKey.Space,
      KeyboardClassKey.Space,
      KeyboardClassKey.Space,
    ],
  ],
];

export { CI_KEYBOARD_LAYOUTS };
