
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { universite } from '../model/universite.model';
import { UniversiteService } from '../services/universite.service';
import { Classification } from '../model/classification.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-classification',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './recherche-par-classification.html'
})
export class RechercheParClassification implements OnInit {

  universities!: universite[];
  classifications!: Classification[];
  idClassification!: number;

  constructor(private universiteservice: UniversiteService) {}

  ngOnInit(): void {

    this.universiteservice.listeClassifications()
      .subscribe({
        next: (data) => {
          this.classifications = data;
          console.log(this.classifications);
        },
        error: (err) => {
          console.error('Erreur chargement classifications:', err);
        }
      });

    this.universities = [];
  }

  onChange(): void {

    console.log(this.idClassification);

    this.universiteservice.rechercherParClassification(this.idClassification)
      .subscribe({
        next: (data) => {
          this.universities = data;
        },
        error: (err) => {
          console.error('Erreur recherche universités:', err);
        }
      });
  }

  supprimeruniversite(universite: universite) {

    let conf = confirm("Etes-vous sûr ?");

    if (conf) {

      this.universiteservice.supprimerUniversite(universite.iduniversite)
        .subscribe(() => {

          this.onChange();

        });
    }
  }
}
