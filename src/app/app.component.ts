import {Component, OnInit} from '@angular/core';
import {ResourceService} from './_shared/resource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [ResourceService]
})
export class AppComponent implements OnInit {
  resources: any;
  constructor(private resourceService: ResourceService) { }
  ngOnInit(): void {
    this.resourceService.getResources().then(data => {
      this.resources = data;
    });
  }
}
