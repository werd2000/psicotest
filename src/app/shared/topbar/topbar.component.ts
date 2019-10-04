import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  sidebarToggleTopBtn: Element;
  body: Element;
  sidebar: Element;

  constructor() { }

  ngOnInit() {
    // Oculto el sidebar cuando hago click en el boton sidebarToggleTop.
    // Se agrega la clase sidebar-toggled al body y la clase toggled al sidebar
    // Este botón aparece en dispositivos pequeños.
    // En dispositivos pequeños el sidebar se minimiza.
    this.body = document.getElementById('page-top');
    this.sidebar = document.getElementsByClassName("sidebar").item(0);
    this.sidebarToggleTopBtn = document.getElementById('sidebarToggleTop');
    this.sidebarToggleTopBtn.addEventListener('click', (event) => {
      this.body.classList.toggle('sidebar-toggled');
      this.sidebar.classList.toggle('toggled');
    });
    
  }

}
