
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { universite } from '../model/universite.model';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-recherche-par-nom-universite',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-nom-universite.html',
  styles: ``
})
export class RechercheParNomUniversite implements OnInit {

  nomUniversite!: string;
  universities!: universite[];
  allUniversities!: universite[];
  searchTerm!: string;

  constructor(private universiteService: UniversiteService) {}

  ngOnInit(): void {
    this.chargerUniversites();
  }

  chargerUniversites(): void {
    this.universiteService.listeUniversites().subscribe(univs => {
      console.log(univs);
      this.universities = univs;
      this.allUniversities = univs;
    });
  }

  rechercherUniversites(): void {
    if (this.nomUniversite == "") {
      this.ngOnInit();
    }
    else {
      this.universiteService.rechercherParNom(this.nomUniversite)
        .subscribe(univs => {
          console.log(univs);
          this.universities = univs;
        });
    }
  }

  onKeyUp(filterText: string): void {
    this.universities = this.allUniversities.filter(item =>
      item.nomuniversite.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  supprimeruniversite(u: universite): void {
    let conf = confirm("Etes-vous sûr ?");

    if (conf) {
      this.universiteService.supprimerUniversite(u.iduniversite)
        .subscribe(() => {
          this.chargerUniversites();
        });
    }
  }
}
