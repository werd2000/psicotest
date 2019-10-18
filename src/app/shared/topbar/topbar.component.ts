import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService, UsuarioService } from 'src/app/services/index.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {

  sidebarToggleTopBtn: Element;
  body: Element;
  sidebar: Element;
  usuario: Usuario;
  suscriptor: Subscription[] = [];

  constructor(
    private autauthenticationService: AuthenticationService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.suscriptor.push(this.autauthenticationService.getStatus().subscribe( (data) => {
      // console.log(data);
      if (data === null) {
        this.router.navigate(['/login']);
      } else {
        this.usuarioService.getUserById(data.uid).valueChanges()
          .subscribe( (user) => {
            this.usuario = user;
          });
      }
    }));
  }

  ngOnInit() {
    // Oculto el sidebar cuando hago click en el boton sidebarToggleTop.
    // Se agrega la clase sidebar-toggled al body y la clase toggled al sidebar
    // Este botón aparece en dispositivos pequeños.
    // En dispositivos pequeños el sidebar se minimiza.
    this.body = document.getElementById('page-top');
    this.sidebar = document.getElementsByClassName('sidebar').item(0);
    this.sidebarToggleTopBtn = document.getElementById('sidebarToggleTop');
    this.sidebarToggleTopBtn.addEventListener('click', (event) => {
      this.body.classList.toggle('sidebar-toggled');
      this.sidebar.classList.toggle('toggled');
    });
  }

  ngOnDestroy(): void {
    this.suscriptor.forEach( (elem) => {
      elem.unsubscribe();
    });
  }

  logout() {
    this.autauthenticationService.logOut()
    .then( (data) => {
      this.router.navigate(['/login']);
    })
    .catch( (error) => {
      console.error(error);
    });
  }

}
