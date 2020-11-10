import { CiKeyboardConfig } from './config/keyboard.config';

/**
 * Applies default options to the keyboard configs.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
export function _applyConfigDefaults(
  config: CiKeyboardConfig
): CiKeyboardConfig {
  return Object.assign(new CiKeyboardConfig(), config);
}
