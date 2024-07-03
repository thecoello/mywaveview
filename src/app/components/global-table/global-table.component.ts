import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RegionTableComponent } from '../region-table/region-table.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-global-table',
  standalone: true,
  imports: [RegionTableComponent],
  templateUrl: './global-table.component.html',
  styleUrl: './global-table.component.scss'
})
export class GlobalTableComponent implements OnInit {

  title: string = "Global"
  url: string = "getallpoints"
  region: string = this.route.snapshot.queryParams['region']
  

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.region)
    this.setParam(this.region)
  }

  setParam(region: string) {
   
    if (region) {
      if (!region) {
        this.url = "getallpoints"
        this.title = "GLOBAL"
      }

      if (region == "NA") {
        this.url = "getallpointsregion/NA"
        this.title = "NA"
      }

      if (region === "LAC") {
        this.url = "getallpointsregion/LAC"
        this.title = "LAC"
      }

      if (region == "EMEA") {
        this.url = "getallpointsregion/EMEA"
        this.title = "EMEA"
      }

      if (region == "APJ") {
        this.url = "getallpointsregion/APJ"
        this.title = "APJ"
      }
    }



  }
}
