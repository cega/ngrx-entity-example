import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
		<app-article></app-article>
     `
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}
