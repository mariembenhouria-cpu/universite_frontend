import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../model/User.model';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login implements OnInit {

  user: User = new User();
  erreur:boolean=false;
  constructor(private authService: Auth,private router: Router
  ) {}

  ngOnInit(): void {}

  onLoggedin() {
    console.log(this.user);
    //Cette ligne appelle la méthode SignIn() du service Auth pour vérifier les identifiants saisis et stocker le résultat (true si l'utilisateur est valide, sinon false) dans isValidUser.
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
        this.router.navigate(['/']);
    else
        //alert('Login ou mot de passe incorrecte!');
      this.erreur=true;
    }
  }