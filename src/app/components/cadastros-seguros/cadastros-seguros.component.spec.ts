import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosSegurosComponent } from './cadastros-seguros.component';

describe('CadastrosSegurosComponent', () => {
  let component: CadastrosSegurosComponent;
  let fixture: ComponentFixture<CadastrosSegurosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrosSegurosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrosSegurosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
