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