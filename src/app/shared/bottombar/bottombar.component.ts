import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent implements OnInit {

  scrollToTopBtn: any;


  constructor() { }

  ngOnInit() {
    // Cuando se prpduce el evento click en el botón de clase scroll-to-top.
    // coloco el scroll en 0,0 para volver al principio de la página.
    this.scrollToTopBtn = document.getElementById('scroll-to-top');
    this.scrollToTopBtn.addEventListener('click', ()=>{      
      window.scroll(0,0);
    });

    // Evaluo el scroll de la ventana y
    // cuando el scrollY es > 100 muestro el botón scroll-to-top
    // en caso contrario lo oculto.
    window.onscroll = ()=> {
      this.scrollToTopBtn = document.getElementById('scroll-to-top');
      if (window.scrollY > 100) {
        this.scrollToTopBtn.style.display="block";
      } else {
        this.scrollToTopBtn.style.display="none";
      }
    }
  }

}
