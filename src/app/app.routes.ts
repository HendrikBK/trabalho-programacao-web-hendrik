import { Routes } from '@angular/router';
import { CadastroAnimalComponent } from './components/animais/cadastro-animal/cadastro-animal.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroClienteComponent } from './components/clientes/cadastro-cliente/cadastro-cliente.component';
import { CadastroServicoComponent } from './components/servicos/cadastro-servico/cadastro-servico.component';
import { ListarAnimalComponent } from './components/animais/listar-animal/listar-animal.component';
import { ListarClienteComponent } from './components/clientes/listar-cliente/listar-cliente.component';
import { ListarServicoComponent } from './components/servicos/listar-servico/listar-servico.component';
import { CadastroAgendamentoComponent } from './components/agendamentos/cadastro-agendamento/cadastro-agendamento.component';
import { ListarAgendamentosComponent } from './components/agendamentos/listar-agendamentos/listar-agendamentos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animais/cadastro-animal', component: CadastroAnimalComponent },
    { path: 'animais/listar-animais', component: ListarAnimalComponent },
    { path: 'animais/editar-animal/:id', component: CadastroAnimalComponent },
    { path: 'clientes/cadastro-cliente', component: CadastroClienteComponent },
    { path: 'clientes/listar-clientes', component: ListarClienteComponent },
    { path: 'clientes/editar-cliente/:id', component: CadastroClienteComponent },
    { path: 'servicos/cadastro-servico', component: CadastroServicoComponent },
    { path: 'servicos/listar-servicos', component: ListarServicoComponent },
    { path: 'servico/editar-servico/:id', component: CadastroServicoComponent },
    { path: 'agendamentos/cadastro-agendamento', component: CadastroAgendamentoComponent },
    { path: 'agendamentos/listar-agendamentos', component: ListarAgendamentosComponent },
    { path: 'agendamentos/editar-agendamento/:id', component: CadastroAgendamentoComponent },
];