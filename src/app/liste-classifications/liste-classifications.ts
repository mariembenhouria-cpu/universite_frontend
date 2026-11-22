
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversiteService } from '../services/universite.service';
import { Classification } from '../model/classification.model';
import { UpdateClassification } from '../update-classification/update-classification';

@Component({
  selector: 'app-liste-classifications',
  standalone: true,
  imports: [CommonModule, UpdateClassification],
  templateUrl: './liste-classifications.html',
  styles: []
})
export class ListeClassifications implements OnInit {

  classifications: Classification[] = [];

  ajout: boolean = true;

  updatedclassif: Classification = {
    idClassification: 0,
    nomClassification: ''
  };

  constructor(private universiteService: UniversiteService) {}

  // Charger la liste des classifications
  chargerClassifications(): void {
    this.universiteService.listeClassifications().subscribe({
      next: (data) => {
        this.classifications = data._embedded.classifications;
        console.log(this.classifications);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des classifications :', err);
      }
    });
  }

  ngOnInit(): void {
    this.chargerClassifications();
  }

  // Ajouter une classification
  classificationUpdated(cat: Classification): void {
    console.log('Classification reçue :', cat);

    this.universiteService.ajouterClassification(cat).subscribe({
      next: () => {
        this.chargerClassifications();
        this.ajout = true;
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout :', err);
      }
    });
  }

  // Sélectionner une classification à modifier
  updateClassification(cat: Classification): void {
    this.updatedclassif = { ...cat };
    this.ajout = false;
  }

}
