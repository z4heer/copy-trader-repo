import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHoldingsComponent } from './list-holdings.component';

describe('ListHoldingsComponent', () => {
  let component: ListHoldingsComponent;
  let fixture: ComponentFixture<ListHoldingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHoldingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHoldingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
