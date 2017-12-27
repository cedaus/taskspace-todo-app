import {Component, OnInit} from '@angular/core';
import {ResourceService} from '../_shared/resource.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [],
  providers: [ResourceService]
})
export class ContentComponent implements OnInit {
  resources: any;
  constructor(private resourceService: ResourceService) { }
  ngOnInit(): void {
    this.resourceService.getResources().then(data => {
      this.resources = data;
    });
  }
}
