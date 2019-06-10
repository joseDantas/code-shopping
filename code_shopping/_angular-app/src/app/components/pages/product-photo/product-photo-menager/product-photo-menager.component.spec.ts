import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotoMenagerComponent } from './product-photo-menager.component';

describe('ProductPhotoMenagerComponent', () => {
  let component: ProductPhotoMenagerComponent;
  let fixture: ComponentFixture<ProductPhotoMenagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotoMenagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotoMenagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
