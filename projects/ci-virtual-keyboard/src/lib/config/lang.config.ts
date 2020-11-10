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
const lang = {
  name: 'Vietnamese',
  keys: [
    [
    //   ['`', '~', '`', '~'],
      ['\u0103', '\u0102', '1', '!'],
      ['\u00E2', '\u00C2', '2', '@'],
      ['\u00EA', '\u00CA', '3', '#'],
      ['\u00F4', '\u00D4', '4', '$'],
      ['\u0300', '\u0300', '5', '%'],
      ['\u0309', '\u0309', '6', '^'],
      ['\u0303', '\u0303', '7', '&'],
      ['\u0301', '\u0301', '8', '*'],
      ['\u0323', '\u0323', '9', '('],
      ['\u0111', '\u0110', '0', ')'],
      ['-', '_', '-', '_'],
      ['\u20AB', '+', '=', '+'],
      [
        KeyboardClassKey.Bksp,
        KeyboardClassKey.Bksp,
        KeyboardClassKey.Bksp,
        KeyboardClassKey.Bksp,
      ],
    ],
    [
      [
        KeyboardClassKey.Tab,
        KeyboardClassKey.Tab,
        KeyboardClassKey.Tab,
        KeyboardClassKey.Tab,
      ],
      ['q', 'Q', 'q', 'Q'],
      ['w', 'W', 'w', 'W'],
      ['e', 'E', 'e', 'E'],
      ['r', 'R', 'r', 'R'],
      ['t', 'T', 't', 'T'],
      ['y', 'Y', 'y', 'Y'],
      ['u', 'U', 'u', 'U'],
      ['i', 'I', 'i', 'I'],
      ['o', 'O', 'o', 'O'],
      ['p', 'P', 'p', 'P'],
      ['\u01B0', '\u01AF', '[', '{'],
      ['\u01A1', '\u01A0', ']', '}'],
      ['\\', '|', '\\', '|'],
    ],
    [
      [
        KeyboardClassKey.Caps,
        KeyboardClassKey.Caps,
        KeyboardClassKey.Caps,
        KeyboardClassKey.Caps,
      ],
      ['a', 'A', 'a', 'A'],
      ['s', 'S', 's', 'S'],
      ['d', 'D', 'd', 'D'],
      ['f', 'F', 'f', 'F'],
      ['g', 'G', 'g', 'G'],
      ['h', 'H', 'h', 'H'],
      ['j', 'J', 'j', 'J'],
      ['k', 'K', 'k', 'K'],
      ['l', 'L', 'l', 'L'],
      [';', ':', ';', ':'],
      ["'", '"', "'", '"'],
      [
        KeyboardClassKey.Enter,
        KeyboardClassKey.Enter,
        KeyboardClassKey.Enter,
        KeyboardClassKey.Enter,
      ],
    ],
    [
      [
        KeyboardClassKey.Shift,
        KeyboardClassKey.Shift,
        KeyboardClassKey.Shift,
        KeyboardClassKey.Shift,
      ],
      ['z', 'Z', 'z', 'Z'],
      ['x', 'X', 'x', 'X'],
      ['c', 'C', 'c', 'C'],
      ['v', 'V', 'v', 'V'],
      ['b', 'B', 'b', 'B'],
      ['n', 'N', 'n', 'N'],
      ['m', 'M', 'm', 'M'],
      [',', '<', ',', '<'],
      ['.', '>', '.', '>'],
      ['/', '?', '/', '?'],
      [
        KeyboardClassKey.Shift,
        KeyboardClassKey.Shift,
        KeyboardClassKey.Shift,
        KeyboardClassKey.Shift,
      ],
    ],
    [
      [
        KeyboardClassKey.Space,
        KeyboardClassKey.Space,
        KeyboardClassKey.Space,
        KeyboardClassKey.Space,
      ],
      [
        KeyboardClassKey.AltGr,
        KeyboardClassKey.AltGr,
        KeyboardClassKey.AltGr,
        KeyboardClassKey.AltGr,
      ],
    ],
  ],
  lang: ['vi'],
};

export { lang, CI_KEYBOARD_LAYOUTS };
