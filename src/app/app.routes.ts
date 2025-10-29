import { Routes } from '@angular/router';
import { CadastroAnimalComponent } from './components/animais/cadastro-animal/cadastro-animal.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroClienteComponent } from './components/clientes/cadastro-cliente/cadastro-cliente.component';
import { CadastroServicoComponent } from './components/servicos/cadastro-servico/cadastro-servico.component';
import { ListarAnimalComponent } from './components/animais/listar-animal/listar-animal.component';
import { ListarClienteComponent } from './components/clientes/listar-cliente/listar-cliente.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animais/cadastro-animal', component: CadastroAnimalComponent },
    { path: 'clientes/cadastro-cliente', component: CadastroClienteComponent },
    { path: 'servicos/cadastro-servico', component: CadastroServicoComponent },
    { path: 'animais/listar-animais', component: ListarAnimalComponent },
    { path: 'clientes/listar-clientes', component: ListarClienteComponent },
];