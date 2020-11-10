import { NgModule } from '@angular/core';
import { CiKeyboardContainerComponent } from './components/ci-keyboard-container/ci-keyboard-container.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { CiKeyboardKeyComponent } from './components/ci-keyboard-key/ci-keyboard-key.component';
import { CiKeyboardComponent } from './components/ci-keyboard/ci-keyboard.component';
import { CiKeyboardService } from './services/ci-keyboard.service';
import { CiKeyboardDirective } from './directives/ci-keyboard.directive';

import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CiKeyboardSuggestionComponent } from './components/ci-keyboard-suggestion/ci-keyboard-suggestion.component';
import { CI_KEYBOARD_LAYOUTS } from './config/key.config';
import { lang } from './config/lang.config';
@NgModule({
  declarations: [
    CiKeyboardContainerComponent,
    CiKeyboardKeyComponent,
    CiKeyboardComponent,
    CiKeyboardDirective,
    CiKeyboardSuggestionComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    MatButtonModule,
    MatCommonModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    CiKeyboardContainerComponent,
    CiKeyboardDirective,
    CiKeyboardSuggestionComponent,
    CiKeyboardKeyComponent,
    CiKeyboardComponent,
  ],
  providers: [
    CiKeyboardService,
    { provide: CI_KEYBOARD_LAYOUTS, useValue: lang },
  ],
})
export class CiVirtualKeyboardModule {}
