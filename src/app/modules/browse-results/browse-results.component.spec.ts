import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseResultsComponent } from './browse-results.component';

describe('BrowseResultsComponent', () => {
  let component: BrowseResultsComponent;
  let fixture: ComponentFixture<BrowseResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
