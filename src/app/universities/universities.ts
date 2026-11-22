
import { CommonModule } from '@angular/common';
import {Component,OnInit,ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { universite } from '../model/universite.model';
import { UniversiteService } from '../services/universite.service';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-universities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './universities.html',
  styles: []
})
export class UniversitiesComponent implements OnInit {

  universities: universite[] = [];

  loading = false;
  erreur = '';

  constructor(
    private universiteService: UniversiteService,
    public authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerUniversites();
  }

  // Charger toutes les universités
  chargerUniversites(): void {

    this.loading = true;
    this.erreur = '';

    console.log('Début du chargement...');

    this.universiteService.listeUniversites()
      .pipe(
        finalize(() => {

          this.loading = false;

          console.log('Requête terminée.');
          console.log('Loading :', this.loading);
          console.log('Nombre universités :', this.universities.length);

          this.cdr.detectChanges();

        })
      )
      .subscribe({

        next: (data) => {

          console.log('Données reçues :', data);

          this.universities = data;

        },

        error: (err) => {

          console.error('Erreur HTTP :', err);

          this.erreur = 'Impossible de charger les universités.';

        }

      });
  }

  // Modifier une université
  modifieruniversite(u: universite): void {

    this.router.navigate([
      '/updateuniversite',
      u.iduniversite
    ]);

  }

  // Supprimer une université
  supprimeruniversite(u: universite): void {

    const conf = confirm(
      'Êtes-vous sûr de vouloir supprimer cette université ?'
    );

    if (conf) {

      this.universiteService
        .supprimerUniversite(u.iduniversite)
        .subscribe({

          next: () => {

            alert('Université supprimée avec succès !');

            this.chargerUniversites();

          },

          error: (err) => {

            console.error('Erreur suppression:', err);

            alert('Erreur lors de la suppression !');

          }

        });

    }
  }

}
