import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoStatisticComponent } from './to-do-statistic.component';

describe('ToDoStatisticComponent', () => {
  let component: ToDoStatisticComponent;
  let fixture: ComponentFixture<ToDoStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
