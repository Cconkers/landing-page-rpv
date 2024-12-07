import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkLightSwitcherComponent } from './dark-light-switcher.component';

describe('DarkLightSwitcherComponent', () => {
  let component: DarkLightSwitcherComponent;
  let fixture: ComponentFixture<DarkLightSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkLightSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkLightSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
