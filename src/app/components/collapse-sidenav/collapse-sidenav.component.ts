import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-collapse-sidenav',
  templateUrl: './collapse-sidenav.component.html',
  styleUrls: ['./collapse-sidenav.component.css']
})
export class CollapseSidenavComponent implements OnInit {

  user = 'abc@xyz.com';
  title = 'app';
  loggedIn = false;

  currentUser = 'Sateesh Kumar';
  version = 'v1.3.0';
  customStyle;

  // for menu select toggle
  menuItemsListMain: any;
  menuItemsListOptions: any;
  selected: any;
  subMenuSelected:any;

  constructor(private authenticationService: AuthenticationService) {
    authenticationService.userSource$.subscribe(user => {
      this.currentUser = user;
    });
    authenticationService.loggedInSource$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    // authenticationService.userSource$.subscribe(user => {
      // this.currentUser = localStorage.getItem('currentUser');
      // console.log('currentUser', this.currentUser);
      // this.loggedIn = !(!(this.currentUser));
    //  }
    // });
    // authenticationService.loggedInSource$.subscribe(loggedIn => {
    //   this.loggedIn = loggedIn;
    // });

    this.menuItemsListMain = [
      // {
      //   'name': 'Feed',
      //   'routeLink': '/feed',
      //   'icon': 'home',
      //   'subMenu': []
      // },
      {
        'name': 'Kyc',
        'routeLink': '/kyc',
        'icon': 'fingerprint',
        'subMenu': []
      },
      // {
      //   'name': 'Segments',
      //   'routeLink': '/segments',
      //   'icon': 'pie_chart',
      //   'subMenu': []
      // },
      // {
      //   'name': 'Campaigns',
      //   'routeLink': '/campaigns',
      //   'icon': 'flag',
      //   'subMenu': []
      // },
      // {
      //   'name': 'Performance',
      //   'routeLink': '/performance',
      //   'icon': 'history',
      //   'subMenu': []
      // },
      // {
      //   'name': 'Churn Report',
      //   'routeLink': '/datastory',
      //   'icon': 'creation',
      //   'subMenu': [
      //     {
      //     'name': 'Define Churn',
      //     'routeLink': '/datastory',
      //     'icon': 'file-document-box',
      //     'data': {
      //       'url': '../../assets/defining-churn.pdf'
      //     },
      //     'children': []
      //     },
      //     {
      //     'name': 'Business Health',
      //     'routeLink': '/datastory',
      //     'icon': 'clipboard-pulse-outline',
      //     'data': {
      //       'url': '../../assets/business-health.pdf'
      //     },
      //     'children': []
      //     },
      //     {
      //     'name': 'Marax Impact',
      //     'routeLink': '/datastory',
      //     'icon': 'creation',
      //     'data': {
      //       'url': '../../assets/marax-impact.pdf'
      //     },
      //     'children': []
      //     }
      //   ]
      // }
    ];

    this.menuItemsListOptions = [

    ];

  }

  // to select menu buttons of the sidenav
    selectMenu(item) {
      this.subMenuSelected = 0;
        this.selected = item;
      // if(item.name == 'Define Churn' || item.name == 'Business Health' || item.name == 'Marax Impact')
      //   this.subMenuSelected=1;
    //   if(this.subMenuSelected==0)
    //     this.authenticationService.intercom.trackEvent(`Menu ${item.name} Click`)
    }

    isActiveMenu(item) {
        return this.selected === item;
    }

  // to select option buttons of the sidenav
    selectOption(item) {
    //   if(this.subMenuSelected==0)
    //     this.authenticationService.intercom.trackEvent(`Menu ${item.name} Click`);
    //   this.selected = item;
    }

    isActiveOption(item) {
        return this.selected === item;
    }

  // on logout button click
  logout() {
    // this.loggedIn = false;
    // console.log(this.loggedIn);
    this.authenticationService.logout();
  }

  ngOnInit() {
    this.selectMenu(this.menuItemsListMain[0]);
    // this.currentUser = this.authenticationService.maraxUser;
    this.currentUser = localStorage.getItem('currentUser');
  }

}
