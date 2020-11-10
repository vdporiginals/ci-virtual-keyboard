import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
} from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  HostBinding,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CiKeyboardConfig } from '../../config/keyboard.config';
import { first } from 'rxjs/operators';

@Component({
  selector: 'lib-ci-keyboard-container',
  templateUrl: './ci-keyboard-container.component.html',
  styleUrls: ['./ci-keyboard-container.component.css'],
})
export class CiKeyboardContainerComponent
  extends BasePortalOutlet
  implements OnDestroy {
  /** Whether the component has been destroyed. */
  private _destroyed = false;

  /** The portal outlet inside of this container into which the keyboard content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true })
  private _portalOutlet: CdkPortalOutlet;

  /** The state of the keyboard animations. */
  @HostBinding('@state')
  // _animationState: KeyboardAnimationState = KeyboardAnimationState.Void;

  /** Subject for notifying that the keyboard has exited from view. */
  onExit: Subject<any> = new Subject();

  /** Subject for notifying that the keyboard has finished entering the view. */
  onEnter: Subject<any> = new Subject();

  @HostBinding('attr.role')
  attrRole = 'alert';

  // the keyboard configuration
  keyboardConfig: CiKeyboardConfig;

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    event.preventDefault();
  }

  /** Attach a component portal as content to this keyboard container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalOutlet.hasAttached()) {
      throw Error(
        'Attempting to attach keyboard content after content is already attached'
      );
    }

    return this._portalOutlet.attachComponentPortal(portal);
  }

  // Attach a template portal as content to this keyboard container
  attachTemplatePortal(): EmbeddedViewRef<any> {
    throw Error('Not yet implemented');
  }

  /** Handle end of animations, updating the state of the keyboard. */
  @HostListener('@state.done', ['$event'])
  // onAnimationEnd(event: AnimationEvent) {
  //   const { fromState, toState } = event;

  //   if (
  //     (toState === KeyboardAnimationState.Void &&
  //       fromState !== KeyboardAnimationState.Void) ||
  //     toState.startsWith('hidden')
  //   ) {
  //     this._completeExit();
  //   }

  //   if (toState === KeyboardAnimationState.Visible) {
  //     // Note: we shouldn't use `this` inside the zone callback,
  //     // because it can cause a memory leak.
  //     const onEnter = this.onEnter;

  //     this._ngZone.run(() => {
  //       onEnter.next();
  //       onEnter.complete();
  //     });
  //   }
  // }

  /** Begin animation of keyboard entrance into view. */
  enter() {
    if (!this._destroyed) {
      // this._animationState = KeyboardAnimationState.Visible;
      this._changeDetectorRef.detectChanges();
    }
  }

  /** Begin animation of the snack bar exiting from view. */
  exit(): Observable<void> {
    // this._animationState = KeyboardAnimationState.Hidden;
    return this.onExit;
  }

  /**
   * Makes sure the exit callbacks have been invoked when the element is destroyed.
   */
  ngOnDestroy() {
    this._destroyed = true;
    this._completeExit();
  }

  /**
   * Waits for the zone to settle before removing the element. Helps prevent
   * errors where we end up removing an element which is in the middle of an animation.
   */
  private _completeExit() {
    this._ngZone.onMicrotaskEmpty
      .asObservable()
      .pipe(first())
      .subscribe(() => {
        this.onExit.next();
        this.onExit.complete();
      });
  }
}
