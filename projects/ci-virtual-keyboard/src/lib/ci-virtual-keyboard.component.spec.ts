import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiVirtualKeyboardComponent } from './ci-virtual-keyboard.component';

describe('CiVirtualKeyboardComponent', () => {
  let component: CiVirtualKeyboardComponent;
  let fixture: ComponentFixture<CiVirtualKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiVirtualKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiVirtualKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
