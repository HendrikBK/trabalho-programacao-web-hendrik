import { Routes } from '@angular/router';
import { CadastroAnimalComponent } from './components/animais/cadastro-animal/cadastro-animal.component';
import { HomeComponent } from './components/home/home.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animais/cadastro-animal', component: CadastroAnimalComponent },
];