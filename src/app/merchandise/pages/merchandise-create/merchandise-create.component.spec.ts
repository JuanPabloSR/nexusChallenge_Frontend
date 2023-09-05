import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseCreateComponent } from './merchandise-create.component';

describe('MerchandiseCreateComponent', () => {
  let component: MerchandiseCreateComponent;
  let fixture: ComponentFixture<MerchandiseCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchandiseCreateComponent]
    });
    fixture = TestBed.createComponent(MerchandiseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
