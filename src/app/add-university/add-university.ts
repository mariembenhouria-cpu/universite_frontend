
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { universite } from '../model/universite.model';
import { Classification } from '../model/classification.model';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-add-universite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-university.html'
})
export class AddUniversiteComponent implements OnInit {

  newUniversite = new universite();

  classifications: Classification[] = [];

  newIdclassification: number | null = null;

  loading = false;
  errorMessage = '';
  message = '';

  constructor(
    private universiteService: UniversiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerClassifications();
  }

  // Charger les classifications
  chargerClassifications(): void {

    this.loading = true;
    this.errorMessage = '';

    this.universiteService.listeClassifications().subscribe({

      next: (data) => {
        this.classifications = data._embedded.classifications;
        this.loading = false;
      },

      error: (err) => {
        console.error('Erreur chargement classifications :', err);
        this.errorMessage = 'Impossible de charger les classifications.';
        this.loading = false;
      }

    });
  }

  // Ajouter une université
  addUniversite(): void {

    const classificationChoisie = this.classifications.find(
      c => c.idClassification === this.newIdclassification
    );

    if (!classificationChoisie) {
      this.errorMessage = 'Veuillez choisir une classification.';
      return;
    }

    this.newUniversite.classification = classificationChoisie;

    this.universiteService.ajouterUniversite(this.newUniversite).subscribe({

      next: (data) => {
        console.log('Université ajoutée :', data);
        this.message = 'Université ajoutée avec succès !';
        this.router.navigate(['/universities']);
      },

      error: (err) => {
        console.error('Erreur ajout :', err);
        this.errorMessage = 'Erreur lors de l’ajout de l’université.';
      }

    });
  }

}
