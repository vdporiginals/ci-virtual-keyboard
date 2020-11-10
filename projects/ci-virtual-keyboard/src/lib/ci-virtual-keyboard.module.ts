import { NgModule } from '@angular/core';
import { CiKeyboardContainerComponent } from './components/ci-keyboard-container/ci-keyboard-container.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { CiKeyboardKeyComponent } from './components/ci-keyboard-key/ci-keyboard-key.component';
import { CiKeyboardComponent } from './components/ci-keyboard/ci-keyboard.component';
import { CiKeyboardSuggestionComponent } from './components/ci-keyboard-suggestion/ci-keyboard-suggestion.component';
import { CiVirtualKeyboardService } from 'ci-virtual-keyboard';
@NgModule({
  declarations: [
    CiKeyboardContainerComponent,
    CiKeyboardKeyComponent,
    CiKeyboardComponent,
    CiKeyboardSuggestionComponent,
  ],
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: [
    CiKeyboardContainerComponent,
    CiKeyboardSuggestionComponent,
    CiKeyboardKeyComponent,
    CiKeyboardComponent,
  ],
  providers: [CiVirtualKeyboardService],
})
export class CiVirtualKeyboardModule {}
