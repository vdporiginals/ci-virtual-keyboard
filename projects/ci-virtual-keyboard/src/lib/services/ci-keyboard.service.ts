import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Inject,
  Injectable,
  LOCALE_ID,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  CiKeyboardComponent,
  CI_KEYBOARD_LAYOUTS,
  CiKeyboardConfig,
  CiKeyboardContainerComponent,
  KeyboardLayouts,
  KeyboardLayout,
  CiKeyboardKeyComponent,
} from '../../public-api';
import { CiKeyboardRef } from '../event/key-ref';
import { _applyConfigDefaults } from '../utils';

/**
 * Service to dispatch Cierial Design keyboard.
 */
@Injectable()
export class CiKeyboardService {
  /**
   * Reference to the current keyboard in the view *at this level* (in the Angular injector tree).
   * If there is a parent keyboard service, all operations should delegate to that parent
   * via `_openedKeyboardRef`.
   */
  private _keyboardRefAtThisLevel: CiKeyboardRef<
    CiKeyboardComponent
  > | null = null;

  /** Reference to the currently opened keyboard at *any* level. */
  private get _openedKeyboardRef(): CiKeyboardRef<CiKeyboardComponent> | null {
    const parent = this._parentKeyboard;
    return parent ? parent._openedKeyboardRef : this._keyboardRefAtThisLevel;
  }

  private set _openedKeyboardRef(value: CiKeyboardRef<CiKeyboardComponent>) {
    if (this._parentKeyboard) {
      this._parentKeyboard._openedKeyboardRef = value;
    } else {
      this._keyboardRefAtThisLevel = value;
    }
  }

  get isOpened(): boolean {
    return !!this._openedKeyboardRef;
  }
  private _defaultLocale: string = 'vi-VN';

  constructor(
    private _overlay: Overlay,
    private _live: LiveAnnouncer,
    @Inject(CI_KEYBOARD_LAYOUTS) private _layouts: KeyboardLayouts,
    @Optional() @SkipSelf() private _parentKeyboard: CiKeyboardService
  ) {
    // prepare available layouts mapping
  }

  /**
   * Creates and dispatches a keyboard with a custom component for the content, removing any
   * currently opened keyboards.
   *
   * @param layoutOrLocale layout or locale to use.
   * @param config Extra configuration for the keyboard.
   */
  openFromComponent(
    layoutOrLocale: string,
    config: CiKeyboardConfig
  ): CiKeyboardRef<CiKeyboardComponent> {
    const keyboardRef: CiKeyboardRef<CiKeyboardComponent> = this._attachKeyboardContent(
      config
    );

    keyboardRef.instance.isDebug = config.isDebug;

    // a locale is provided

    // a layout name is provided

    // When the keyboard is dismissed, lower the keyboard counter.
    keyboardRef.afterDismissed().subscribe(() => {
      // Clear the keyboard ref if it hasn't already been replaced by a newer keyboard.
      if (this._openedKeyboardRef === keyboardRef) {
        this._openedKeyboardRef = null;
      }
    });

    if (this._openedKeyboardRef) {
      // If a keyboard is already in view, dismiss it and enter the
      // new keyboard after exit aniCiion is complete.
      this._openedKeyboardRef.afterDismissed().subscribe(() => {
        keyboardRef.containerInstance.enter();
      });
      this._openedKeyboardRef.dismiss();
    } else {
      // If no keyboard is in view, enter the new keyboard.
      keyboardRef.containerInstance.enter();
    }

    // If a dismiss timeout is provided, set up dismiss based on after the keyboard is opened.
    // if (configs.duration > 0) {
    //   keyboardRef.afterOpened().subscribe(() => {
    //     setTimeout(() => keyboardRef.dismiss(), configs.duration);
    //   });
    // }

    if (config.announcementMessage) {
      this._live.announce(config.announcementMessage, config.politeness);
    }

    this._openedKeyboardRef = keyboardRef;
    return this._openedKeyboardRef;
  }

  /**
   * Opens a keyboard with a message and an optional action.
   * @param layoutOrLocale A string representing the locale or the layout name to be used.
   * @param config Additional configuration options for the keyboard.
   */
  open(
    layoutOrLocale: string = this._defaultLocale,
    config: CiKeyboardConfig = {}
  ): CiKeyboardRef<CiKeyboardComponent> {
    const _config = _applyConfigDefaults(config);

    return this.openFromComponent(layoutOrLocale, _config);
  }

  /**
   * Dismisses the currently-visible keyboard.
   */
  dismiss() {
    if (this._openedKeyboardRef) {
      this._openedKeyboardRef.dismiss();
    }
  }

  /**
   * Map a given locale to a layout name.
   * @param locale The layout name
   */
  mapLocale(locale: string = this._defaultLocale): string {
    let layout: string;
    const country = locale.split('-').shift();

    // search for layout Ciching the
    // first part, the country code
    // look if the detailed locale Ciches any layout

    // if (!layout) {
    //   throw Error(`No layout found for locale ${locale}`);
    // }

    return 'vi';
  }

  getLayoutForLocale(locale: string): KeyboardLayout {
    return this._layouts[this.mapLocale(locale)];
  }

  /**
   * Attaches the keyboard container component to the overlay.
   */
  private _attachKeyboardContainer(
    overlayRef: OverlayRef,
    config: CiKeyboardConfig
  ): CiKeyboardContainerComponent {
    const containerPortal = new ComponentPortal(
      CiKeyboardContainerComponent,
      config.viewContainerRef
    );
    const containerRef: ComponentRef<CiKeyboardContainerComponent> = overlayRef.attach(
      containerPortal
    );

    // set config
    containerRef.instance.keyboardConfig = config;

    return containerRef.instance;
  }

  /**
   * Places a new component as the content of the keyboard container.
   */
  private _attachKeyboardContent(
    config: CiKeyboardConfig
  ): CiKeyboardRef<CiKeyboardComponent> {
    const overlayRef = this._createOverlay();
    const container = this._attachKeyboardContainer(overlayRef, config);
    const portal = new ComponentPortal(CiKeyboardComponent);
    const contentRef = container.attachComponentPortal(portal);
    return new CiKeyboardRef(
      contentRef.instance,
      container,
      overlayRef
    ) as CiKeyboardRef<CiKeyboardComponent>;
  }

  /**
   * Creates a new overlay and places it in the correct location.
   */
  private _createOverlay(): OverlayRef {
    const state = new OverlayConfig({
      width: '100%',
    });

    state.positionStrategy = this._overlay
      .position()
      .global()
      .centerHorizontally()
      .bottom('0');

    return this._overlay.create(state);
  }
}
