import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
@Component({
  selector: 'ci-keyboard',
  templateUrl: './ci-keyboard.component.html',
  styleUrls: ['./ci-keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CiKeyboardComponent implements OnInit {
  ngOnInit() {}
}
