import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkeventComponent } from './workevent.component';

describe('WorkeventComponent', () => {
  let component: WorkeventComponent;
  let fixture: ComponentFixture<WorkeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkeventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
