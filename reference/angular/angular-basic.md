# angular basics

## terminology

### What are the differences between AngularJS (angular 1.x) and Angular (Angular 2.x and beyond)?

- Angular 2+ is a complete rewrite compared to AngularJS.
- Angular 2+ utilizes TypeScript internally, and it is strongly encouraged to use TypeScript with your project.
- Angular 2+ is faster and has better mobile support.
- Angular 2+ does away with controllers, instead replacing them with Components.
- Angular 2+ uses `Zone.js` to run change detection instead of `$scope`.
- Dependency injection is accomplished using TypeScript's Types. After compilation, this type information is retained using `Reflect.metadata`


### What is a component? Why would you use it?

A component is a directive that displays UI. Components always have a HTML template or templateUrl. You use components to encapsulate a piece of UI functionality in your app.

### What is the minimum definition of a component?

You use the `@Component` decorator with either a `template` or `templateUrl`. The selector is optional (you may show a component using a Route instead)

```
@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit, OnDestroy {
}
```

### What is a module, and what does it contain?



### What is a service, and when will you use it?

### What are the lifecycle hooks for components and directives?

### What are pipes? Give me an example.

### What are the differences between reactive forms and template driven forms?

### What is a dumb, or presentation, component? What are the benefits of using dumb components?


## building a simple app

### How do components communicate with each other?

Components may utilize inputs and outputs.

Definition:
```typescript
import {Input, Output, EventEmitter} from '@angular/core';
class MyComponent {
    @Input('myInput') myInput: string;
    @Output() myOutput = new EventEmitter<string>();
    
    constructor() {}
}
```

Usage:
```angular2html
<app-my-component
    [myInput]="'hello'"
    (myOutput)="onMyOutput($event)"
></app-my-component>
```

Components may also use services or `@ngrx/store` to subscribe to and make changes to data.

### How would you use http to load data from server?

Use Angular's built-in Httpclient inside of a service or an effect.

```typescript
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class MyService {
    constructor(private httpClient: HttpClient) {
        
    }
    
    login(email, password) {
        const uri = 'https://localhost/login';
        const headers = new HttpHeaders({
          'x-email': email,
          'x-password': password,
          'x-token': ''
        });
        return this.httpClient.get<{ Token: string }>(uri, {headers})
          .map((response: { Token: string }) => {
            return response.Token;
          })
    }
}
```

### How do you create routes?

Routes are created as their own separate module (which in turn imports the `RouterModule`), and then imported into the main app or feature module.

`app-routing.module.ts`
```typescript
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth/auth-guard.service';

import {LoginComponent} from './auth/login/login.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {
}
```

`app-module.ts`
```typescript
@NgModule({
  declarations: [],
  imports: [AppRoutingModule],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### How can you get the current state of a route?

Inject the `ActivatedRoute` to the constructor of your service or component:

```typescript
export class MyComponent {
    constructor(private router: Router, private route: ActivatedRoute) {
        
    }
    
    ngOnInit() {
        this.router.navigate(['../sibling'], {relativeTo: this.route});
    }
}
```

### How do you create two-way data binding?

`<input [(ngModel)]="myProperty">`

### How do you load external libraries?

To use external libraries, simply run `npm install --save thelibrary` and then utilize the ES6 import syntax inside your TypeScript: `import * as thelibrary from 'thelibrary'`

### How would you display form validation errors?

First, the inputs of the form must have validators attached to them. The method to do this is different for template-driven forms vs reactive forms.

After adding validators, Angular automatically styles each form element with certain classes.

- `ng-touched` is set if the form is touched.
- `ng-untouched` is set if the form has not been touched.
- `ng-valid` is set if the form is valid.
- `ng-invalid` is set if the form is invalid.
- `ng-pending` is set if the form is pending.
- `ng-pristine` is set if the form is pristine.
- `ng-dirty` is set if the form is dirty.
- `ng-submitted` is set if the form was submitted.

### Which lifecycle hook would you use to unsubscribe an observable?

`ngOnDestroy`.

Angular comes with the following lifecycle hooks:

#### Directives and Components

- `ngOnChanges` whenever data-bound input properties change
- `ngOnInit` after constructor and after first `ngOnChanges`
- `ngDoCheck` whenever change-detection is run; utilized to act upon changes that Angular itself doesn't handle
- `ngOnDestroy` called right before Angular destroys the directive/component. Unsubscribe Observables and detach event handlers to avoid memory leaks.

#### Components Only
- `ngAfterContentInit` called after external content is projected (and after the first `ngDoCheck`)
- `ngAfterContentChecked` called after projected content is checked
- `ngAfterViewInit` called after Angular initializes the component's views and child views / the view that a directive is in. Called once after the first `ngAfterContentChecked`
- `ngAfterViewChecked` called after Angular checks the component's views and child views / the view that a directive is in. Called after the `ngAfterViewInit` and every subsequent `ngAfterContentChecked`

### How are services injected to your application?

Services are injected via Angular's dependency injection system. To be injected, the service must have the `@Injectable()` decorator: A marker metadata that marks a class as available to `Injector` for creation.

Services are injected into other services and components by specifying them as private variables in your constructor's declaration.

```typescript
@Component({}})
export class MyComponent {
    constructor(private httpClient: HttpClient)
}
```

Whereas previous DI schemes involved using strings to identify classes, Angular 2+ uses TypeScript's Types. The Types of services are stored using `Reflect.metadata`, which stores metadata about an object.

### How would you create route parameters and access them from a component?

Route parameters are defined in the routing module, using a colon and then the name of the route parameter/

```
const appRoutes: Routes = [
  {
    path: 'users/:id',
    component: UserDetailComponent
  }
];
```

Accessing a route parameter is accomplished by injecting the `ActivatedRoute` and subscribing to the route params observable:

```typescript
export class MyComponent {
    constructor(private activatedRoute: ActivatedRoute){}
    
    ngOnInit() {
        this.activatedRoute.params
            .subscribe((params) => {
                console.log(params[id]);
            });
    }
}
```