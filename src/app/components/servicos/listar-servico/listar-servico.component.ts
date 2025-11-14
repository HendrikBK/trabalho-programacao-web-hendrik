import { Component } from '@angular/core';
import { Servico } from '../../../models/servico.model';
import { ServicoService } from '../../../services/servicos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-servico',
  imports: [],
  templateUrl: './listar-servico.component.html',
  styleUrl: './listar-servico.component.css'
})
export class ListarServicoComponent {
  servicos: Servico[] = [];

  constructor(private servicoService: ServicoService, private router: Router) { }

  ngOnInit() {
    this.getAllServicos();
  }

   editServico(id: number) {
    this.router.navigate(['/servicos/editar-servico', id]);
  }

  getAllServicos() {
      this.servicoService.getAllServicos().then((servicos: Servico[]) => {
        this.servicos = servicos;
      })
    }

    

  deleteServico(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicoService.deleteServico(id).then(() => {
          this.getAllServicos();
        });
        Swal.fire('Excluído!', 'O serviço foi excluído com sucesso.', 'success');
      }
    });
  }
}
