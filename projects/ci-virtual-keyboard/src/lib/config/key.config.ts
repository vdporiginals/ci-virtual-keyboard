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
    ['1', '1', '1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4', '2', '2'],
    ['5', '5', '3', '3'],
    ['6', '6', '4', '4'],
    ['7', '7', '5', '5'],
    ['8', '8'],
    ['9', '9', '6', '6'],
    ['0', '0', '7', '7'],
    // [null, null, '8', '8'],
    // [null, null, '9', '9'],
    // [null, null, '0', '0'],
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
    ['Q', 'Q'],
    ['E', 'E'],
    ['R', 'R'],
    ['T', 'T'],
    ['Y', 'Y'],
    ['U', 'U'],
    ['I', 'I'],
    ['O', 'O'],
    ['P', 'P'],
    // ['\u00D4', '\u00D4'],
    // ['\u01A0', '\u01A0'],
    // ['P', 'P'],
  ],
  [
    // [
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    //   KeyboardClassKey.Caps,
    // ],
    ['A', 'A'],
    ['S', 'S'],
    ['D', 'D'],
    ['G', 'G'],
    ['H', 'H'],
    ['K', 'K'],
    ['L', 'L'],
    ['/','/'],
    // [
    //   KeyboardClassKey.Enter,
    //   KeyboardClassKey.Enter,
    //   KeyboardClassKey.Enter,
    //   KeyboardClassKey.Enter,
    // ],
  ],
  [
    ['X', 'X'],
    ['C', 'C'],
    ['V', 'V'],
    ['B', 'B'],
    ['N', 'N'],
    ['M', 'M'],
    [',',','],
    ['.','.'],
    [':',':']
  ],
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
