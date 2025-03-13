import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilityGameComponent } from './compatibility-game.component';

describe('CompatibilityGameComponent', () => {
  let component: CompatibilityGameComponent;
  let fixture: ComponentFixture<CompatibilityGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompatibilityGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompatibilityGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
