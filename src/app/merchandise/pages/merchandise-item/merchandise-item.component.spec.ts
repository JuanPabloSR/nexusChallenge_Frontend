import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseItemComponent } from './merchandise-item.component';

describe('MerchandiseItemComponent', () => {
  let component: MerchandiseItemComponent;
  let fixture: ComponentFixture<MerchandiseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchandiseItemComponent]
    });
    fixture = TestBed.createComponent(MerchandiseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
