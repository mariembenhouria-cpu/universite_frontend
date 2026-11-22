
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

  constructor(
    private universiteService: UniversiteService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.universiteService.listeClassifications()
      .subscribe(data => {
        this.classifications = data;
        console.log(data);
      });

  }

  addUniversite(): void {

    this.universiteService
      .ajouterUniversite(this.newUniversite)
      .subscribe({

        next: (data) => {
          console.log(data);
          this.router.navigate(['/universities']);
        },

        error: (err) => {
          console.error('Erreur ajout :', err);
        }

      });

  }

}
