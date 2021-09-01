import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  course= {
    cname:'',
    duration:'',
    fee:''}

    constructor(private _router: Router,public header: HeaderService, public nav: NavbarService) { }


  ngOnInit(): void {
    this.header.show();
    this.nav.hide();
  }
  onSubmit(){ 
    this._router.navigate(['/adminhome']);
  }
}
