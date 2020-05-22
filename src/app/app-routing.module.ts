import { ListarSegurosComponent } from './components/listar-seguros/listar-seguros.component';
import { CadastrosSegurosComponent } from './components/cadastros-seguros/cadastros-seguros.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cadastro',
  },
  {
    path: 'cadastro',
    component: CadastrosSegurosComponent,
  },
  {
    path: 'listar',
    component: ListarSegurosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
