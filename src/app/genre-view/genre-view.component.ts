import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.css']
})
export class GenreViewComponent implements OnInit {
  constructor(
    /**
     * Injecting data when opening a dialog
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Genre: { Name: String, Description: String }
    }
  ) { }

  ngOnInit(): void {
  }

}
