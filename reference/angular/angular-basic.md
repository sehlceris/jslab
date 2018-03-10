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

Every Angular app has at least one NgModule class, the root module, conventionally named AppModule. Is a piece of code that encapsulates Components, Directives, Services, Routes, and other things.

Typically, a module represents a specific feature or area of the application. Modules may be lazily-loaded if not needed at application start.

### What is a service, and when will you use it?

A service is a class that has the `@Injectable()` decorator, and is provided to the Angular DI system. Services can be injected into other services and components.

Typically, services encapsulate a specific set of functions or data, such as authentication and auth state, e.g. `auth.service.ts`

### What are pipes? Give me an example.

Pipes are utilized in Angular template HTML to modify the display or formatting of data. An example is the number pipe, which formats (adds commas) to your numbers depending on your locale.

```angular2html
<div>{{totalCost | number}}</div>
```

### What are the differences between reactive forms and template driven forms?

Template-driven forms are easier to start with and have less boilerplate code, but Reactive forms are more powerful and flexible.

Reactive forms allow you to better control the form values in code. They also allow you to more easily test the forms. Lastly, they enable reactive programming because the FormGroup provides a `form.valueChanges` `Observable` that can be subscribed to:

```typescript
this.form.valueChanges
        .map((value) => {
            value.firstName = value.firstName.toUpperCase();
            return value;
        })
        .filter((value) => this.form.valid)
        .subscribe((value) => {
           console.log(JSON.stringify(value);
        });
```

#### Template-driven forms

Import the FormsModule (template-driven forms)
```typescript
// app.module.ts
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent],
    imports: [FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

The HTML should specify a local reference for `ngForm`, and `ngSubmit` should send that form to the controller. Each input must have a name and may be bound to `ngModel`.
```angular2html
<form #myTemplateForm="ngForm" (ngSubmit)="onFormSubmit(myTemplateForm)">
    <input
    type="text"  
    [(ngModel)]="user.firstName"
    name="firstName"
    required
    >
</form>
```

The component is very simple and has just an `onFormSubmit` function which is passed a `NgForm`.
```typescript
// my.component.ts

@Component({})
export class MyComponent {
    user = { firstName: '' };
    
    onFormSubmit(form:NgForm) {
        
    }
}
```


#### Reactive Forms

```typescript
// app.module.ts
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent],
    imports: [ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

The HTML should have a `formGroup` directive that binds to `myForm`, which is a `FormGroup` inside the controller.
```angular2html
<form [formGroup]="myForm" (ngSubmit)="onFormSubmit()">
    <input
    type="text"
    formControlName="firstName"
    name="firstName"
    required
    >
</form>
```

```typescript
// my.component.ts


@Component({})
export class MyComponent {
    
    myForm: FormGroup;
    
    user = { firstName: '' };
    
    constructor() {
        this.myForm = new FormGroup({
            firstName: new FormControl('Chris', [Validators.required])
        })
    }
    
    onFormSubmit() {
        // this.myForm.valid
    }
}
```



### What is a dumb, or presentation, component? What are the benefits of using dumb components?

#### Dumb (Presentational) Component

Dumb components do not access the greater application state (such as data services or `@ngrx/store`). Instead, they have only inputs and outputs. All state they access is local to the component itself.

```typescript
@Component({})
export class MyDumbComponent {
    @Output('onDataChange') onDataChange = new EventEmitter<string>();
    @Input() title:string;
    constructor() {
        setTimeout(() => this.onDataChange.emit(this.title + ' WOO'), 500);
    }
}
```

Dumb components have the following advantages:
- More predictable during use. They will never unexpectedly alter or use the state of your greater application.
- More reusable. May be reused to display different sets of data in different parts of the application, or even other applications.

#### Smart Component

Smart components have access to and may manipulate the state of your greater application. They either have data services injected or stores injected into them.

```typescript
@Component({})
export class MySmartComponent implements OnInit {
    constructor(private myService: MyService, private store: Store<fromApp.AppState>) {
        
    }
    
    ngOnInit() {
        this.myService.pullSomeData();
        this.store.select('auth')
            .subscribe((authState) => { console.log(user.name) });
    }
}
```

Smart components are application-specific and are difficult to reuse.

### What is the Difference Between a Subject and BehaviorSubject?

`Subject` is a `RxJS` class that behaves like an event bus. Subjects can be subscribed to like a regular observable.

```typescript
const s = new Subject();
s.next('hello');
s.subscribe(value => console.log(value));
s.next('world!');
// "world" is printed, but not "hello"
```

A `BehaviorSubject` is a subclass of `Subject` that, when subscribed to, emits the last value of that `BehaviorSubject`, which is more useful in many situations.


```typescript
const s = new BehaviorSubject();
s.next('hello');
s.subscribe(value => console.log(value));
s.next('world!');
// both "hello" and "world" are printed
// also, the BehaviorSubject also has a getValue() function to retrieve the last value of the stream:
console.log(s.getValue());
```

### What's the difference between a Hot and Cold Observable?

Cold observables start running upon subscription, i.e., the observable sequence only starts pushing values to the observers when Subscribe is called. Values are also not shared among subscribers - a separate processing chain is used for each subscriber. This means that cold observables such as HTTP calls may run twice if they have two subscribers.

When an observer subscribes to a hot observable sequence, it will get all values in the stream that are emitted after it subscribes. The hot observable sequence is shared among all subscribers, and each subscriber is pushed the next value in the sequence. For example, even if no one has subscribed to a particular stock ticker, the ticker will continue to update its value based on market movement. When a subscriber registers interest in this ticker, it will automatically receive the next tick.

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

### How would you create an observable data service?

Create an injectable service that does NOT expose the internal Subject, but only the observable. This prevents clients from causing the subject to emit.

```typescript
@Injectable()
export class TodoStore {
    private _todos: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));

    public readonly todos: Observable<List<Todo>> = this._todos.asObservable();

    constructor(private todoBackendService: TodoBackendService) {
        this.loadInitialData();
    }
    
    addTodo(newTodo:Todo):Observable {
        let obs = this.todoBackendService.saveTodo(newTodo);
    
        obs.subscribe(
            res => {
                this._todos.next(this._todos.getValue().push(newTodo));
            });
        return obs;
    }
}
```