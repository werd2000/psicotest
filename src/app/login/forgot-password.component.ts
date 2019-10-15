import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    document.getElementById('page-top').classList.add('bg-gradient-primary');
  }

  ngOnDestroy(): void {
    document.getElementById('page-top').classList.remove('bg-gradient-primary');
  }
}
