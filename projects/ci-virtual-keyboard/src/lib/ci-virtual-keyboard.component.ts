import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ci-virtual-keyboard',
  template: ` <p>ci-virtual-keyboard works!!!!!!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CiVirtualKeyboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
