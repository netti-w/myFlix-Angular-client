import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.css']
})
export class DirectorViewComponent implements OnInit {
  constructor(
    /**
     * Injecting data when opening a dialog
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Director: { Name: String, Bio: String, Birth: Date, Death: Date }
    }
  ) { }

  ngOnInit(): void {
  }

}
