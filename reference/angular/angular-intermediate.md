# angular intermediate concepts

## How to Protect a Route for Authorized Users Only?

You can implement an auth guard.

```typescript
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<any>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .take(1)
      .map((authState) => {
        if (authState.user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
}
```

## What's a custom pipe and how might you use it?

A custom pipe is implemented by decorating a class with `@Pipe` and implementing the `transform` function from `PipeTransform` interface.

A custom pipe might be used, for example, to format file sizes (1MB, 2GB, 3KB, etc)
 
```typescript
import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];

@Pipe({
  name: 'formatFileSize'
})
export class FormatFileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, longForm: boolean): string {
    const units = longForm
      ? FILE_SIZE_UNITS_LONG
      : FILE_SIZE_UNITS;

    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);

    const size = sizeInBytes / Math.pow(1024, power); // size in new units
    const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
    const unit = units[power];

    return `${formattedSize} ${unit}`;
  }
}
```

## What's a Structural Directive?

A structural directive is a directive that alters the HTML of a component. Built-in structural directives are `ngFor` and `ngIf`. If used with an asterisk `*` then the directive wraps the host component in an `<ng-template>` tag and only appends the HTML to the page if the logic for the structural directive dictates.

The following two syntaxes are equivalent:

```angular2html
<div *ngIf="shouldAppendThis">Hello</div>
```

```angular2html
<ng-template [ngIf]="shouldAppendThis">
    <div>Hello</div>
</ng-template>
```

## Difference between RouterModule.forRoot() and RouterModule.forChild()?

You use `forRoot` if the router module is at the root of the application, e.g. `/dashboard`. You use `forChild` for child routes (inside child modules)

## Difference between a module's forRoot() and forChild() ?

Use `forRoot` if the module is at the root of the application. Use `forChild` if the module is a child module of the application (for example, a feature module, or a lazily-loaded module)

## Difference between touched, dirty, and pristine?

- `ng-touched` means the user has touched the form control (has clicked it or entered focus onto it)
- `ng-pristine` means the user has not altered the form control's value.
- `ng-dirty` means the user has altered the form control's value.

## What's an async pipe? What kind of data can be used with an async pipe?

## What is a pure pipe?

A pure pipe references the concept of a pure function: Given the same inputs, a pure pipe will always have the same outputs, because it does not have an internal state. Because of this, Angular is able to re-use the same pipe instance over and over.

An impure pipe has state stored inside of it (for example, the `async` pipe maintains subscriptions to observables) and thus Angular must create multiple copies of this pipe upon each use. A pipe is also considered impure if its inputs are mutable (e.g. an object or array), which can be modified without the pipe's knowledge. For this reason, `JsonPipe` and `SlicePipe` are also impure pipes.

## How to Mock a Service to inject into a unit test?

```typescript
import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";

class MockAuthService extends AuthService {
  isAuthenticated() {
    return 'Mocked';
  }
}


describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let testBedService: AuthService;
  let componentService: AuthService;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    // Configure the component with another set of Providers
    TestBed.overrideComponent(
        LoginComponent,
        {set: {providers: [{provide: AuthService, useClass: MockAuthService}]}}
    );

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // AuthService provided to the TestBed
    testBedService = TestBed.get(AuthService);

    // AuthService provided by Component, (should return MockAuthService)
    componentService = fixture.debugElement.injector.get(AuthService);
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([AuthService], (injectService: AuthService) => {
        expect(injectService).toBe(testBedService);
      })
  );

  it('Service injected via component should be and instance of MockAuthService', () => {
    expect(componentService instanceof MockAuthService).toBeTruthy();
  });
});
```

## What's the difference between a Core module, Feature module and a Shared module?

### Core Module

A core module is imported ONLY into your root `AppModule` - never any other modules. The purpose of the core module is a single place to define all global services/providers.

### Feature Module

A feature module encompasses a cohesive set of functionality. This could be based on a business domain, user workflow, or a collection of utilities.

### Shared Module

A shared module contains a list of components/directives that is commonly used by many modules across your application. It is a convenience module that saves the developer from typing a bunch of declarations/imports in other modules.

## Why does Angular use decorators?

Angular uses decorators to add metadata to classes. For example, `@Component` lets Angular know you intend to use the class as a view component. `@Injectable` lets Angular know that the class should be available to the `Injector`.

## What is async validation and how is it done?

Async validation on forms is commonly used to check things on the backend - for example, if a particular username is taken.

The validator is passed as the third argument of a `FormControl` constructor:

```typescript
this.myForm = this.fb.group({
  name: ['', Validators.required],
  email: [
    '',
    [Validators.required, Validators.email],
    this.validateEmailNotTaken.bind(this)
  ]
});
// ...
validateEmailNotTaken(control: AbstractControl) {
return this.signupService.checkEmailNotTaken(control.value).map(res => {
  return res ? null : { emailTaken: true };
});
}
```

## Why do we need Type definitions?

Type definitions, besides providing code-completion and IDE/compile time error checking, allows Angular's dependency injection system to know what class to inject.

## Why is it bad if a Shared module provides a service to a lazily-loaded module?

A lazily-loaded module has its own injector, and thus upon loading of the module, the service is created a second time (once for `AppModule` then again for `LazilyLoadedModule`).