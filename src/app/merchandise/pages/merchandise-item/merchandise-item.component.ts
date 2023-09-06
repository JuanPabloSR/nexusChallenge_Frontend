import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from 'src/app/interfaces/merchandise-response-interface';
import { MerchandiseService } from '../../services/merchandise.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-merchandise-item',
  templateUrl: './merchandise-item.component.html',
  styleUrls: ['./merchandise-item.component.css']
})
export class MerchandiseItemComponent implements OnInit {
  isLoading: boolean = false;
  merchandise: Content | null = null;
  merchandiseId: number = 0;
  errorRequest: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private merchandiseService: MerchandiseService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.merchandiseId = +params['id'];
      this.loadMerchandise();
    });
  }

  loadMerchandise() {
    this.isLoading = true;
    this.merchandiseService.getMerchandiseId(this.merchandiseId).subscribe(
      (response) => {
        this.merchandise = response;
        this.isLoading = false;
      },
      (error) => {
        this.errorRequest = 'Error Request merchandise not exist';
        this.snackBar.open(this.errorRequest, 'Close', {
          duration: 2000,
        });
      }
    )
  }

}
