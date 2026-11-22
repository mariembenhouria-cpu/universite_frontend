
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { universite } from '../model/universite.model';
import { Classification } from '../model/classification.model';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-update-universite',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
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
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(this.activatedRoute.snapshot.params['id']);

    console.log('ID reçu :', id);

    if (!id || isNaN(id)) {
      this.erreur = 'ID université invalide.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    forkJoin({

      universite: this.universiteService.consulterUniversite(id),

      classifications: this.universiteService.listeClassifications()

    }).subscribe({

      next: (data) => {

        console.log('Université reçue :', data.universite);
        console.log('Classifications reçues :', data.classifications);

        this.currentUniversite = data.universite;

        this.selectedClassificationId =
          data.universite.classification?.idClassification ?? null;

        this.classifications =
          data.classifications._embedded.classifications;

        this.loading = false;

        console.log('Loading :', this.loading);
        console.log('Université :', this.currentUniversite);

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('Erreur chargement :', err);

        this.erreur = 'Impossible de charger les informations.';
        this.loading = false;

        this.cdr.detectChanges();

      }

    });

  }

  updateUniversite(): void {

    this.erreur = '';

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

          console.log('Université modifiée avec succès :', data);

          this.router.navigate(['/universities']);

        },

        error: (err) => {

          console.error('Erreur modification :', err);

          this.erreur = 'Erreur lors de la modification de l’université.';

        }

      });

  }

}
