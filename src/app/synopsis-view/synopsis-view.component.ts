import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.css']
})
export class SynopsisViewComponent implements OnInit {
  constructor(
    /**
     * Injecting data when opening a dialog
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Movie: { Title: String, Description: String }
    }
  ) { }

  ngOnInit(): void {
  }

}
