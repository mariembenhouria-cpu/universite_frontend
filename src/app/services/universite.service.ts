
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

import { universite } from '../model/universite.model';
import { Classification } from '../model/classification.model';
import { ClassificationWrapped } from '../model/ClassificationWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  apiURL: string = 'http://localhost:8090/universities/api';
  apiURLClas: string = 'http://localhost:8090/universities/classifications';

  classifications: Classification[] = [];

  constructor(private http: HttpClient) {}

  // 1. Afficher toutes les universités
  listeUniversites(): Observable<universite[]> {
    return this.http.get<universite[]>(this.apiURL);
  }

  // 2. Ajouter une université
  ajouterUniversite(univ: universite): Observable<universite> {
    return this.http.post<universite>(
      this.apiURL,
      univ,
      httpOptions
    );
  }

  // 3. Supprimer une université
  supprimerUniversite(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiURL}/${id}`
    );
  }

  // 4. Consulter une université
  consulterUniversite(id: number): Observable<universite> {
    return this.http.get<universite>(
      `${this.apiURL}/${id}`
    );
  }

  // 5. Modifier une université
  updateUniversite(univ: universite): Observable<universite> {
    return this.http.put<universite>(
      `${this.apiURL}/${univ.iduniversite}`,
      univ,
      httpOptions
    );
  }

  // 6. Afficher les classifications
  listeClassifications(): Observable<Classification[]> {
    return this.http.get<ClassificationWrapped>(
      this.apiURLClas
    ).pipe(
      map(data => data._embedded.classifications),
      tap(data => this.classifications = data)
    );
  }

  // 7. Consulter une classification par ID
  consulterClassification(id: number): Classification | undefined {
    return this.classifications.find(
      clas => clas.idClassification === id
    );
  }

  // 8. Ajouter une classification
  ajouterClassification(clas: Classification): Observable<Classification> {
    return this.http.post<Classification>(
      this.apiURLClas,
      clas,
      httpOptions
    );
  }

  // 9. Rechercher les universités par classification
  rechercherParClassification(
    idClassification: number
  ): Observable<universite[]> {
    return this.http.get<universite[]>(
      `${this.apiURL}/universitesclass/${idClassification}`
    );
  }

  // 10. Rechercher une université par nom
  rechercherParNom(nom: string): Observable<universite[]> {
    return this.http.get<universite[]>(
      `${this.apiURL}/search/findByNomuniversite?nom=${encodeURIComponent(nom)}`
    );
  }
}
