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
    [null, null, KeyboardClassKey.AltGr, KeyboardClassKey.AltGr],
    //   ['`', '~', '`', '~'],
    ['A', 'A', '1', '1'],
    ['\u0102', '\u0102'],
    ['\u00C2', '\u00C2'],
    ['B', 'B', '2', '2'],
    ['C', 'C', '3', '3'],
    ['D', 'D', '4', '4'],
    [ '\u0110', '\u0110', '5', '5'],
    ['E', 'E'],
    ['\u00CA', '\u00CA', '6', '6'],
    ['G', 'G', '7', '7'],
    [null, null, '8', '8'],
    [null, null, '9', '9'],
    [null, null, '0', '0'],
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
    ['H', 'H',],
    ['I', 'I'],
    ['K', 'K'],
    ['L', 'L'],
    ['M', 'M'],
    ['N', 'N'],
    ['I', 'I'],
    ['O', 'O'],
    ['\u00D4', '\u00D4'],
    ['\u01A0', '\u01A0'],
    ['P', 'P'],
  ],
  [
    // [
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    // ],
    [KeyboardClassKey.AltGr, KeyboardClassKey.AltGr],
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
