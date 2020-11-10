import { NgModule } from '@angular/core';
import { CiVirtualKeyboardComponent } from './ci-virtual-keyboard.component';
import { CiKeyboardContainerComponent } from './components/ci-keyboard-container/ci-keyboard-container.component';

@NgModule({
  declarations: [CiVirtualKeyboardComponent, CiKeyboardContainerComponent],
  imports: [],
  exports: [CiVirtualKeyboardComponent],
})
export class CiVirtualKeyboardModule {}
