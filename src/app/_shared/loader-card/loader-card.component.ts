import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-card',
  templateUrl: 'loader-card.component.html',
  styleUrls: [
    '../../../assets/css/loader-styles.css'
  ]
})
export class LoaderCardComponent implements OnInit {
  @Input() color = '#FFFFFF';
  constructor() {
  }

  ngOnInit(): void {
  }

}
