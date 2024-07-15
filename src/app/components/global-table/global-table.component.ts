import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RegionTableComponent } from '../region-table/region-table.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-global-table',
  standalone: true,
  imports: [RegionTableComponent, NgIf],
  templateUrl: './global-table.component.html',
  styleUrl: './global-table.component.scss'
})
export class GlobalTableComponent implements OnInit {

  url: string = "getallpoints"
  region: string = this.route.snapshot.queryParams['region']
  

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

    this.setParam(this.region)
  }

  setParam(region: string) {
    
    if (!region || region == '') {
      this.region = "GLOBAL"
      this.url = "getallpoints"
    }

    if (region) {

      if (region == "NA") {
        this.url = "getallpointsregion/NA"
      }

      else if (region === "LAC") {
        this.url = "getallpointsregion/LAC"
      }

      else if (region == "EMEA") {
        this.url = "getallpointsregion/EMEA"
      }

      else if (region == "APJ") {
        this.url = "getallpointsregion/APJ"
      }

      else{
        this.region = "GLOBAL"
        this.url = "getallpoints"
      }
    
    }

  }
}
