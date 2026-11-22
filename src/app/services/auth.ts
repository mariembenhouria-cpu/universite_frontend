import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class Auth {
  users: User[] = [{ "username": "admin", "password": "123", "roles": ['ADMIN'] },
  { "username": "mariem", "password": "123", "roles": ['USER'] }];
  public roles!: string[];
  public loggedUser!: string;//contient le nom du l'utilisateur connecté
  public isloggedIn: Boolean = false//indique si l'utilisateur est connecté ou non
  constructor(private router: Router) { }
  //déconnecter l'utilisateur
  logout() {
    this.isloggedIn = false;//utilisateur n'est pas connecté
    this.loggedUser = undefined!;//on efface le nom du l'utilisateur
    this.roles = undefined!;//on efface ses roles
    //localStorage:C'est un espace de stockage dans le navigateur qui permet de conserver des informations même après le rechargement de la page.
    localStorage.removeItem('loggedUser');//on supprime le nom sauvegardé dans le navigateur.
    localStorage.setItem('isloggedIn', String(this.isloggedIn));//on sauvegarde l'état de connexion (false)
    this.router.navigate(['/login']);
  }
  //La méthode SignIn() sert à vérifier si un utilisateur existe dans notre tableau users
  SignIn(user: User): Boolean {
    //on considère que l'utilisateur n'est pas encore vérifié
    let validUser: Boolean = false;
    //: Parcourir le tableau users
    //curUser représente chaque utilisateur du tableau pendant le parcours
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        //Utilisateur valide
        validUser = true;
        //Récupérer le nom
        this.loggedUser = curUser.username;
        //Changer l'état de connexion
        this.isloggedIn = true;
        //Récupérer les rôles:si l'utilisateur est admin :roles = ["ADMIN"];,Si l'utilisateur connecté est mariem :roles = ["USER"];
        this.roles = curUser.roles;
        //Sauvegarder le username:'loggedUser' : nom de la clé.
        //this.loggedUser : valeur à enregistrer
        localStorage.setItem('loggedUser', this.loggedUser);
        //Sauvegarder l'état de connexion
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }
  //isAdmin():Cette méthode permet de vérifier si l'utilisateur connecté possède le rôle ADMIN ou non.
  isAdmin(): Boolean {
    //Cette condition vérifie si this.roles n'a aucune valeur (undefined, null, etc.).
    if (!this.roles) //ou this.roles== undefiened
      return false;
    return (this.roles.indexOf('ADMIN') > -1);
  }
setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }
  getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }
}
