import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherPanelComponent } from './publisher-panel.component';

describe('PublisherPanelComponent', () => {
  let component: PublisherPanelComponent;
  let fixture: ComponentFixture<PublisherPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
