import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  @Input() showBackButton: boolean = false;
  isSmallScreen: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize();

    // Escuchar cambios en el tamaño de la pantalla
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 768;
  }
}
