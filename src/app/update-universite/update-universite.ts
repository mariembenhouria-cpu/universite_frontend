
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { universite } from '../model/universite.model';
import { Classification } from '../model/classification.model';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-update-universite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-universite.html'
})
export class UpdateUniversiteComponent implements OnInit {

  currentUniversite!: universite;

  classifications: Classification[] = [];

  selectedClassificationId: number | null = null;

  loading = true;
  erreur = '';

  constructor(
    private universiteService: UniversiteService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(this.activatedRoute.snapshot.params['id']);

    // Charger les classifications
    this.universiteService.listeClassifications()
      .subscribe({
        next: (data) => {
          this.classifications = data;
        },
        error: (err) => {
          console.error(err);
          this.erreur = 'Erreur lors du chargement des classifications.';
        }
      });

    // Charger l'université par son ID
    this.universiteService.consulterUniversite(id)
      .subscribe({
        next: (data) => {

          this.currentUniversite = data;

          this.selectedClassificationId =
            data.classification?.idClassification ?? null;

          this.loading = false;

        },
        error: (err) => {
          console.error(err);
          this.erreur = 'Impossible de charger cette université.';
          this.loading = false;
        }
      });

  }

  updateUniversite(): void {

    const classification = this.classifications.find(
      clas => clas.idClassification == this.selectedClassificationId
    );

    if (!classification) {
      this.erreur = 'Veuillez choisir une classification.';
      return;
    }

    this.currentUniversite.classification = classification;

    this.universiteService.updateUniversite(this.currentUniversite)
      .subscribe({

        next: (data) => {
          console.log('Université modifiée avec succès', data);
          this.router.navigate(['/universities']);
        },

        error: (err) => {
          console.error('Erreur modification :', err);
          this.erreur = 'Erreur lors de la modification de l’université.';
        }

      });

  }

}
