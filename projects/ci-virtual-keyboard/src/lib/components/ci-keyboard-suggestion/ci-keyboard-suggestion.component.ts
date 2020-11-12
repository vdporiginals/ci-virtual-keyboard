import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { from } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { langArray } from '../../config/lang-array';
import { lang } from '../../config/lang.config';

@Component({
  selector: 'ci-keyboard-suggestion',
  templateUrl: './ci-keyboard-suggestion.component.html',
  styleUrls: ['./ci-keyboard-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CiKeyboardSuggestionComponent implements OnInit, OnChanges {
  langArray = langArray;
  @Input() listKeySuggestion;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.listKeySuggestion);
    console.log(changes.listKeySuggestion.currentValue);

    from(changes.listKeySuggestion.currentValue)
      .pipe(
        distinctUntilChanged(),
        debounceTime(600),
        switchMap((query: string) => {
          if (query === null || query === '') {
            return;
          } else {
            console.log(
              query,
              langArray.filter((a) =>
                a
                  .toLowerCase()
                  .startsWith(
                    this.slugString(
                      changes.listKeySuggestion.currentValue
                    ).toLowerCase()
                  )
              )
            );
            return langArray.filter((a) =>
              this.slugString(a)
                .toLowerCase()
                .startsWith(
                  changes.listKeySuggestion.currentValue.toLowerCase()
                )
            );
          }
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
  }

  slugString(slug) {
    let result;
    result = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    result = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    result = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    result = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    result = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    result = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    result = slug.replace(/đ/gi, 'd');
    return result;
  }
}
