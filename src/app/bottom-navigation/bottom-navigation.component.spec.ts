import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BottomNavigation } from "./bottom-navigation.component";

describe("BottomNavigation", () => {
  let component: BottomNavigation;
  let fixture: ComponentFixture<BottomNavigation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BottomNavigation]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
