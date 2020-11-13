import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { wordList } from '../../config/key.dic';
export interface WordList {
  text: string;
  source: string;
}
@Component({
  selector: 'ci-keyboard-suggestion',
  templateUrl: './ci-keyboard-suggestion.component.html',
  styleUrls: ['./ci-keyboard-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CiKeyboardSuggestionComponent implements OnInit, OnChanges {
  @Input() listKeySuggestion;
  @Input() input;
  wordDic = wordList;
  historyWord = JSON.parse(localStorage.getItem('history_word'));
  currentSuggestion: BehaviorSubject<WordList[]> = new BehaviorSubject<
    WordList[]
  >([]);
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.listKeySuggestion) {
      from(changes.listKeySuggestion.currentValue)
        .pipe(
          distinctUntilChanged(),
          debounceTime(600),
          switchMap((query: string) => {
            this.currentSuggestion.next([]);
            if (query === null || query === '') {
              return;
            } else {
              // if (this.historyWord) {
              //   this.wordDic = this.historyWord;
              //   return this.wordDic
              //   .filter((a: any) => {
              //     return this.escapeUnicode(a)
              //       .toLowerCase()
              //       .startsWith(
              //         this.escapeUnicode(
              //           changes.listKeySuggestion.currentValue.toLowerCase()
              //         )
              //       );
              //   })
              //   .slice(0, 15);
              // } else {
              //   this.wordDic = wordList;
              return this.wordDic
                .filter((a: WordList) => {
                  return a.text.toLowerCase().startsWith(
                    // this.escapeUnicode(
                    changes.listKeySuggestion.currentValue.toLowerCase()
                    // )
                  );
                })
                .slice(0, 15);
            }
            // }
          })
        )
        .subscribe(
          (res) => {
            this.currentSuggestion.next(
              this.currentSuggestion.getValue().concat(res)
            );
          },
          (err) => {
            console.log(err);
          },
          () => {
            // console.log('complete');
          }
        );
    }
  }

  changeWord(word) {
    const inputArray = this.input.nativeElement.value.split(' ');
    inputArray[inputArray.length - 1] = word;
    this.input.nativeElement.value = inputArray.join(' ') + ' ';
    localStorage.setItem(
      'history_word',
      JSON.stringify(this.input.nativeElement.value.split(' '))
    );
    setTimeout(() => {
      this.input.nativeElement.dispatchEvent(
        new Event('input', { bubbles: true })
      );
    });
  }

  escapeUnicode(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    // console.log(str);
    return str;
  }
}
