import { Component } from '@angular/core';
import { Servico } from '../../../models/servico.model';
import { ServicoService } from '../../../services/servicos.service';

@Component({
  selector: 'app-listar-servico',
  imports: [],
  templateUrl: './listar-servico.component.html',
  styleUrl: './listar-servico.component.css'
})
export class ListarServicoComponent {
  servicos: Servico[] = [];

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    this.getAllServicos();
  }

  getAllServicos() {
      this.servicoService.getAllServicos().then((servicos: Servico[]) => {
        this.servicos = servicos;
      })
    }
}
