import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarToggleBtn: Element;
  sidebar: Element;

  constructor() { }

  ngOnInit() {
    // Minimizo el sidebar cuando hago click en el boton sidebarToggle
    this.sidebar = document.getElementsByClassName("sidebar").item(0);
    this.sidebarToggleBtn = document.getElementById("sidebarToggle");
    this.sidebarToggleBtn.addEventListener('click', (event) => {
      this.sidebar.classList.toggle('toggled');
    })
    
  }



}
