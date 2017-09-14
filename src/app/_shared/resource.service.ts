import { Injectable } from '@angular/core';
import {Resource} from './model';
import {RESOURCES} from './mock-data';


@Injectable()
export class ResourceService {
  getHeroes(): Promise<Resource[]> {
    return Promise.resolve(RESOURCES);
  }
  //
  getResources(): Promise<Resource[]> {
    return Promise.resolve(RESOURCES);
  }
}
