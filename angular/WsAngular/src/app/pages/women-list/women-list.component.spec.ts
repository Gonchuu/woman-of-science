import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenListComponent } from './women-list.component';

describe('WomenListComponent', () => {
  let component: WomenListComponent;
  let fixture: ComponentFixture<WomenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomenListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
