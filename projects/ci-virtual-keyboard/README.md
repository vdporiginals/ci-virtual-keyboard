# Install

npm i ci-virtual-keyboard --save

## Hướng dẫn sử dụng

1. Import module tại

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CiVirtualKeyboardModule } from 'ci-virtual-keyboard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CiVirtualKeyboardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. Sử dụng directive tại input để sử dụng phím ảo

```:angular2html
<input
    ciKeyboard
    [(ngModel)]="title"
  />
```


## Ý tưởng
[Đến từ thư viện][Idea]

## Development
Phát triển bởi phuong.vd@consultindochina.com

#### MIT License

[Idea]: https://github.com/Iris0905/angular-onscreen-material-keyboard