# Building a simple football scores app with Angular and TypeScript - a tutorial

### What we'll be building

![](https://raw.githubusercontent.com/solms/football-scores/master/end-sc.png) 

### Singe-page applications

SPAs became trendy as the antithesis to server-side rendered websites. There are pros and cons, as always, but an SPA can create a smooth user experience that is difficult to replicate without such an approach. This is part of web applications' venture into the territory that was traditionally occupied by desktop applications. Web applications are generally criticised for being sluggish in comparison to desktop apps, but major advances in web technologies (notably NodeJS and Google's V8 engine, as well as frameworks like Angular and ReactJS) as well mainstream access to unprecedented computing power means that this is much less of an issue than it used to be.

SPAs function by loading a single HTML page on the client, and then updating the contents (and the DOM) dynamically - as opposed to retrieving an updated HTML page from the server whenever the user clicks anywhere.

### Setting up the dev environment

- Install `NodeJS` and `npm` by following the appropriate instructions [here](https://nodejs.org/en/download/).
- Install `TypeScript` from [here](https://www.typescriptlang.org/).
- Install the Angular CLI globally: `npm install -g @angular/cli`
- Create the scaffolding for you app: `ng new my-project`
- Serve the app locally using NodeJS: `cd my-project && ng serve`
- You can now visit `localhost:4200` in you web browser.

### Angular components

If you open up `my-project/src/app/app.component.ts` you should be greeted with something like the following:

```typescript
/** app.component.ts */
import { Component } from '@angular/core';  // #1

@Component({  // #2
  selector: 'app-root',  // #3
  templateUrl: './app.component.html',  // #4
  styleUrls: ['./app.component.css']  // #5
})
export class AppComponent {
  title = 'app';  // #6
}

```

Let's break this down a little bit:

1. Import the `Component` interface from the `@angular` module located in the `node_modules` folder.
2. The `@Component` decorator marks a class as an Angular component. The decorator is parameterised with an options object, of which we'll utilise only a few parameters.
3. The `selector` parameter defines what the HTML tags for that component will be - for example, this one will be injected into HTML using `<app-root> … </app-root>`. 
4. The `templateUrl` parameter takes a string argument that points to the HTML file that serves as the view part of the component. You could also use the `template` parameter to write HTML directly, as opposed to pointing to a file. This is generally not recommended, unless the view part is simply a line or two.
5. The `styleUrls` parameter takes a list of strings, where each string is a path to a CSS file.
6. Any member variables are also available to the HTML file associated with this component. In this example, `title` can be referenced from `app.component.html`.

### Starting off our app

Navigate to `app.component.html`. This is the entry-point to our application, and the highest level HTML you should be editing. Everything will be rendered within this context.

We will now delete the contents of this file, and replace it with the following:

```html
<div class="container">
  <h1>Live football scores</h1>
  <div class="score-card-list">
    <div class="score-card">
      <span>Team 1</span>
      <span>0 : 0</span>
      <span>Team 2</span>
    </div>
  </div>
</div>
```

Flip back to your web browser, and you should see that the page updated automagically. Great.

Visually you'll probably be disappointed at this stage, but it's a work in progress.

### Angular Material

[Angular Material](material.angular.io)  is a library that's maintained by a team from Google in order to provide easy-to-use [Material Design](material.io) components for Angular applications. The styling of these components can be tweaked to your heart's content, but it also provides an easy way to upgrade the look and feel of a prototype app with minimal effort.

Let's install the required libraries with `npm install --save @angular/material @angular/cdk @angular/animations`. This downloads the required files into your `node_modules` folder, and updates the `packages.json` file appropriately.

You'll also have to tell Angular to load the relevant components. You'll have to do some Googling about how this works (this is a 101 duct tape kind of tutorial), but basically you just have to modify the `app.modules.ts` file to include those modules you need.

First, add the animations like so:

```typescript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
```

Then add import the modules we need:

```typescript
import {MatButtonModule, MatCardModule} from '@angular/material';

@NgModule({
  ...
  imports: [MatButtonModule, MatCardModule],
  ...
})
```

Be aware that you'll need to import whichever components you which to use in your app. The reason for not including the entire library is to help `webpack` perform [tree shaking](https://webpack.js.org/guides/tree-shaking/), which basically entails leaving out unused pieces of code when bundling all of our code into a few `.js` minified files.

Once this is done we'll have access to a bunch of [predefined components](https://material.angular.io/components/categories), and you can simply import them as required. It's also worth noting that the [prebuilt themes](https://material.angular.io/guide/theming) are easy to use.

### Styling your application

In Angular, components are modular. Each component has its own CSS file(s), which only apply to that specific view. The one exception is the `styles.css` file found in the `src` directory which applies globally.

Styling is not a focus of this tutorial, so we'll try to avoid it as much as possible going forward. In order to feel _slightly_ better about what we're making, here is some simple CSS to copy and paste into the `styles.css` file (better practice would be adding relevant bits to appropriate components' CSS files, for future reference):

```css
// Outer wrapper div
.container {
  text-align: center;
}
// Wrapper for the score cards
.score-card-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
// Each score card
.score-card {
  width: 550px;
  display: flex !important;
}
// Home team score
.home {
  flex: 1;
  text-align: right;
}
// Away team score
.away {
  flex: 1;
  text-align: left;
}
// Score section of score card
.score {
  width: 100px;
}
```

Also update your HTML to include the classes:

```Html
...
<mat-card class="score-card">
  <span class="home">Team 1</span>
  <span class="score">0 : 0</span>
  <span class="away">Team 2</span>
</mat-card>
...
```

If you're confused about `flex`, I _highly_ recommend checking out [Flexbox Froggy](http://flexboxfroggy.com/).

### For-loops, and keeping code DRY

One of the advantages of using a framework like Angular is that we can implement some programming logic straight in the HTML. In our case, for-loops will makes life much easier.

Try out the following:

```Html
...
    <mat-card class="score-card" *ngFor="let team of ['Arsenal', 'Liverpool', 'Tottenham']; let i=index">
      <span class="home">{{ team }}</span>
      <span class="score">0 : 0</span>
      <span class="away">Team {{ i+1 }}</span>
    </mat-card>
...
```

This introduces a range of new concepts, and should produce something like the following:

![](https://raw.githubusercontent.com/solms/football-scores/master/for-loop.png)

**Concepts to note:**

- Angular for-loop syntax
- Setting the index variable
- HTML interpolation handlebars syntax: `{{ 'Some text = ' + a_number }}`

### Our first service

Services are used in order to abstract data access away from components. This allows components to remain lean and focused on supporting the view. Unit testing and code maintenance is simplified by maintaining this seperation of responsibility.

To generate a service using the CLI you can use `ng generate service football-data` (or `ng g s football-data` for people short on time). This will create two new files in your `project-dir/src/app` directory: `football-data.service.ts` and `football-data.service.spec.ts`. This follows Angular convention whereby test files get the `.spec.ts` extension. Although testing is useful and important, it falls outside the immediate scope of this tutorial so you can ignore it for the moment (sorry, @Cornel).

Add the following lines to `football-data.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable() // Designate this class as an injectable service
export class FootballDataService {
  
  // Token for accessing data on football-data.org (see: https://www.football-data.org/client/register)
  HEADERS = new HttpHeaders({ 'X-Auth-Token': 'dc25ff8a05123411sadgvde5bb16lklnmc7' });
  // Convenience constant
  COMPETITION_URL = 'http://api.football-data.org/v1/competitions/';
  // ID for the Premier League
  PL_ID = 445;
  
  constructor() { }
}
```

### A note on providers and services

Services are annotated with `@Injectable`, which tells the compiler that instances of the service can be injected into components. You also need to specify a provider for each service. The provider effectively provides a singleton at the level specified.

For example, you could add your service to the providers array in `app.module.ts`, which will result in a singleton instance of the service being exposed throughout the entire app. Otherwise you could add it to the providers list of a component, which will result in a singleton instance being made available to that component and any components within its context.

**Warning:** It becomes easy to create circular dependencies between services once your app grows larger. Be mindful of this. If (when) you ever get an error message that looks something like `Cannot resolve all parameters for MyDataService(?)`, it is probably related to circular dependency issues.

### Retrieving information

We'll be making use of the fantastic API freely available at [football-data.org](footbal-data.org). You'll need to get your own API key, but it's easy to do - just follow the instructions on the site. There is more in-depth documentation available, but 99% of what you need can be seen in the small examples listed [here](https://www.football-data.org/documentation).

For this example, all we really want to do is retrieve the game info for all games in the current round (a.k.a. "game week" or "match day"). The `/v1/competitions/{id}/fixtures` endpoint returns this information, but for all past rounds in the current season. In order to get the info for a single round, we need to set the `matchday` parameter, for example `/v1/competitions/{id}/fixtures?matchday=14`.

In order to get the current match day, we can ask for the league table, since it returns for the current match day by default.

First, we need to inject the `HttpClient` service into our `FootballDataService` in order to make use of Angular's http functions:

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
...
	constructor(private http: HttpClient) { }
...
```

**Important**: Adding a private variable to the constructor of an Angular service or component, along with the specific TypeScript type declaration, is enough information for Angular's black magic to work. The compiler will now inject the appropriate instance into this service, so you have access to it.

Let's add a function to retrieve the league table (and current match day) from the server:

```typescript
...
  getTable() {
    return this.http.get(this.COMPETITION_URL + this.PL_ID + '/leagueTable', 
                         { headers: this.HEADERS });
  }
...
```

TypeScript will help you out with this, but the method signature for Angular's `http.get` method looks as follows:

```typescript
/**
* Construct a GET request which interprets the body as JSON and returns it.
*
* @return an `Observable` of the body as an `Object`.
*/
get(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<Object>;
```

The question marks denote that parameters `headers`, `observe`, `params`, `reportProgress`, `responseType` and `withCredentials` are all optional as part of the optional object for `options`. We'll only be passing values for the `url` and `options.headers`.

### Observables

You might be wondering what the `getTable()` function we just created return. Well, it returns an `Observable` stream.  `Observable`s are essentially, as [Luuk Gruijs put it](https://hackernoon.com/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3), "lazy collections of multiple values over time". Which sounds crazy, but is actually fairly straightforward.

In short, an `Observable` stream is considered "cold" until it gets subscribed to - i.e. the variable is only loaded lazily once its output gets used. Once the stream is "hot" it will update all subscribers whenever its value changes. It is an alternative to using `Promise` for handling async situations in JavaScript.

In this case, the `GET` request will only be fired once the `Observable` variable gets subscribed to since the REST interface will only ever return a single value per call.

### The power of TypeScript

We can use the power of static typing in TypeScript to make this more explicit:

```typescript
...
import { Observable } from 'rxjs/Observable';
...
  getTable(): Observable<any> {
    return this.http.get(this.COMPETITION_URL + this.PL_ID + '/leagueTable', 
                         { headers: this.HEADERS });
  }
...
```

In fact, since the football-data.org documentation tells us exactly what to expect from the REST call, we can go one step further and model the object as well, in `src/app/models/leagueTable.ts`:

```typescript
import { Team } from './team';

export class LeagueTable {
  leagueCaption: string;
  matchday: number;
  standing: Team[];
}
```

And in `src/app/models/team.ts`:

```typescript
export class Team {
  teamName: string;
  crestURI: string;
  position: number;
  points: number;
  playedGames: number;
  home: { 
      goals: number; 
      goalsAgainst: number; 
      wins: number; 
      draws: number; 
      losses: number; 
  };
  away: { 
      goals: number; 
      goalsAgainst: number; 
      wins: number; 
      draws: number; 
      losses: number; 
  };
  draws: number;
  goalDifference: number;
  goals: number;
  goalsAgainst: number;
  losses: number;
  wins: number;
}
```

Which allows us to update the `football-data.service.ts` to:

```typescript
import 'rxjs/add/operator/map';
import { LeagueTable } from './models/leagueTable';
...
  getTable(): Observable<LeagueTable> {
    return this.http.get(this.COMPETITION_URL + this.PL_ID + '/leagueTable', 
      { headers: this.HEADERS })
      .map(res => res as LeagueTable);
  }
...
```

This will help us maintain our sanity by minimizing the mental model we need to keep up to date while working with complex objects, as the IDE can guide us along.

Side note: the `as` keyword simply tells TypeScript to trust us about the type of the object, rather than trying to figure it out via some sort of inspection. Dangerous but useful, like most interesting things.

### Using our new service

Okay, navigate back to `src/app/app.component.ts`, and add the following lines in order to inject the `FootballDataService` into the component:

```typescript
import { FootballDataService } from './football-data.service';
...
export class AppComponent {
  title = 'app';
  constructor(private footballData: FootballDataService) {}
}

```

Now we'll also add an `ngOnInit` method to the component. This is a standard lifecycle hook provided by Angular that fires after all data-bound properties of a component are initialized. It basically fires on initialisation of the object, but slightly later than the `constructor` method which fires before all the inputs and outputs to the component have been registered.

A common rule of thumb is to just always place code you want to invoke on initialisation in this special `ngOnInit` method, rather than the constructor. Add it to a component like so:

```typescript
import { Component, OnInit } from '@angular/core';
...
export class AppComponent implements OnInit {
  ...
  constructor(private footballData: FootballDataService) {}

  ngOnInit() {
    // Code you want to invoke on initialisation goes here
  }
...
```

In our case, we want to load the league table, so we can add something like this:

```typescript
...
  ngOnInit() {
    // Load league table from REST service
    this.footballData.getTable()
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }
...
```

If you open up the console in your web browser you should see something like this:

![](https://raw.githubusercontent.com/solms/football-scores/master/console-table.png)

Great. We now have a lot of cool data we could do something with in future (not least direct links to club crest images), but for now we're really just interested in the current matchday.

Let's now add another function to our data service in order to get the information for the current round of fixtures:

```typescript
...
import { GameWeek } from './models/gameWeek';
...
  getFixtures(matchDay: number): Observable<GameWeek> {
    return this.http.get(this.COMPETITION_URL + this.PL_ID + '/fixtures?matchday=' + matchDay, { headers: this.HEADERS })
      .map(res => res as GameWeek);
  }
...
```

with `GameWeek` and `Fixture` defined as follows:

```typescript
// src/app/models/gameWeek.ts
import { Fixture } from './fixture'
export class GameWeek {
  count: number;
  fixtures: Fixture[];
}
```

```typescript
// src/app/models/fixture.ts
export class Fixture {
  awayTeamName: string;
  date: string;
  homeTeamName: string;
  matchday: number;
  result: {
    goalsAwayTeam: number;
    goalsHomeTeam: number;
    halfTime: {
      goalsAwayTeam: number;
      goalsHomeTeam: number;
    }
  };
  status: 'SCHEDULED' | 'TIMED' | 'POSTPONED' | 'IN_PLAY' | 'CANCELED' | 'FINISHED';
  _links: {
    awayTeam: { href: string; };
    competition: { href: string; };
    homeTeam: { href: string; };
    self: { href: string; };
  };
}
```

### Getting fixture information

With our newly gained match day knowledge, we can ask the REST server for information about the current round of fixtures. However, we need to wait for the first REST call to complete first before doing the second. Some refactoring means that we can do so in the callback fairly easily:

```typescript
import { Component, OnInit } from '@angular/core';
import { FootballDataService } from './football-data.service';
import { LeagueTable } from './models/leagueTable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FootballDataService]
})
export class AppComponent implements OnInit {
  title = 'app';
  table: LeagueTable;
  gameweek: GameWeek;

  constructor(private footballData: FootballDataService) {}

  ngOnInit() {
    this.getTable();
  }

  getTable() {
    this.footballData.getTable()
      .subscribe(
        data => {
          this.table = data; // Note that we store the data locally
          this.getFixtures(data.matchday); // Call this function only after receiving data from the server
        },
        error => console.log(error)
      );
  }

  getFixtures(matchDay: number) {
    this.footballData.getFixtures(matchDay)
      .subscribe(
        data => this.gameweek = data, // Again, save locally
        error => console.log(error)
      );
  }

}
```

Now we're getting somewhere!

### Displaying data

Since we've set the data as a member variable on our TypeScript component, it can directly be accessed by the associated HTML. In fact, if you're using [Visual Studio Code](https://code.visualstudio.com/), Microsoft's open-source editor, you can add the [Angular Language Service](https://github.com/angular/vscode-ng-language-service) plugin to get _Javascript code completion in HTML_! Amazing. And it gets maintained by the Angular team.

Let's replace the dummy data from before:

```HTML
<div class="container">
  <h1>Live football scores</h1>
  <div class="score-card-list">
    <mat-card class="score-card" *ngFor="let fixture of gameweek.fixtures">
      <span class="home">{{ fixture.homeTeamName }}</span>
      <span class="score">{{ fixture.result.goalsHomeTeam }} : {{ fixture.result.goalsAwayTeam }}</span>
      <span class="away">{{ fixture.awayTeamName }}</span>
    </mat-card>
  </div>
</div>
```

Note the `gameweek?.fixtures` syntax: the `?` symbol acts as a short-hand for `if (gameweek != null) { return gameweek.fixtures } else { return null }`, and it is unbelievably useful when accessing variables that'll only get populated by asynchronous REST calls.

Et voila!

![](https://raw.githubusercontent.com/solms/football-scores/master/semi-final.png)

### Creating our own component

This next part isn't strictly necessary, but it illustrates an important Angular way of doing things, and will definitely help to keep our code modular and containable if we decide to take it forward (have a look at [NativeScript](https://www.nativescript.org/) as a way to create a native mobile app with Angular and TypeScript).

We're going to abtract the fixture score card into its own component. Start with some help from the CLI: `ng generate component score-card` (or `ng g c score-card`). This will create a `.ts`, `.html` and `.css` files in `src/app/score-card`.

Open up `score-card.component.ts` to be greeted by a familiar decorator:

```typescript
...
@Component({
  selector: 'app-score-card', // Note this!
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
...
```

Note the `selector` field - it tells us how to access the component (in this case using `<app-score-card></app-score-card>` tags).

Refactor our code by moving the meat from `app.component.html` to `score-card.component.html`:

```html
<!-- app.component.html -->
<div class="container">
  <h1>Live football scores</h1>
  <div class="score-card-list">
    <app-score-card *ngFor="let fixture of gameweek?.fixtures" [fixture]="fixture"></app-score-card>
  </div>
</div>
```

```html
<!-- score-card.component.html -->
<mat-card class="score-card">
    <span class="home">{{ fixture.homeTeamName }}</span>
    <span class="score">
      {{ fixture.result.goalsHomeTeam }} : {{ fixture.result.goalsAwayTeam }}
    </span>
    <span class="away">{{ fixture.awayTeamName }}</span>
</mat-card>
```

Note the `[fixture]="fixture"` bit inside the `<app-score-card>` tags. This is how we pass information between components.

**In Angular syntax, `[...]` denote inputs, `(…)` denote outputs, and `[(…)]` denotes a two-way binding.** `[(…)]` is also called "banana box syntax", and you will encounter it often in the form of `[(ngModel)]="someVariable"`. This implies a two-way binding between the value of a variable, and the value of a DOM object. This is a _key_ part of using Angular.

For example, we could map the value of an `input` tag directly to a variable that gets displayed on the screen, and the DOM would automatically get updated whenever the value of the `input` element changes:

```html
<p>
    What is your name?
    <input type="text" [(ngModel)]="name" />
</p>
<p>
    Your name: {{ name }}
</p>
```

You can check out an example Plunker [here](https://plnkr.co/edit/wdVU8yUPlTI9aPQJGDcU?p=preview).

Back to football: in order to receive the input value into the component, we also need to update `score-card.component.ts` as follows:

```typescript
import { Component, Input } from '@angular/core';
import { Fixture } from '../models/fixture';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent{

  @Input() fixture: Fixture; // Note the decorator

  constructor() { }
}
```

### Passing data between components

There are two obvious ways to pass data between components: using `@Input`/`@Output`, and using services.

**`@Input()`**

The first method is useful for passing data between parents and children, but can be tedious if data needs to travel through nested layers. Data can be passed to a child component using the `@Input` decorator. This input variable will be [passed by reference](https://stackoverflow.com/questions/373419/whats-the-difference-between-passing-by-reference-vs-passing-by-value) if it's an object, or passed by value if it's a primitive.

```typescript
// someComponent.ts
// ...
import { Input } from '@angular/core'
// ...
export class SomeComponent {
	
    // @Input() variables get set after the `constructor(...)`
    // method, but before `ngOnInit()` fires
    @Input() aNumber: number; // This gets set via parent HTML

    // ...
    
}
```

```html
<!-- someComponentParent.html -->
<h1>
    I am a parent where SomeComponent gets rendered
</h1>
<!-- Pass a value to the aNumber variable -->
<some-component [aNumber]="48"></some-component>
```

**`@Output()`**

Data can also be emitted from the child to a parent component using the `@Output()` decorator. This is not a directional binding, but rather an event emitter that fires on predefined times. A typical use case would be notifying the parent when a value is changed in the child.

```typescript
// someComponent.ts
// ...
import { Input, Output, EventEmitter } from '@angular/core'
// ...
export class SomeComponent {
	
    @Input() aNumber: number;    
    // Emits an event (of type `number`) to the parent
    @Output() numberChanged: EventEmitter<number> = new EventEmitter<number>();

    // ...
    
    // Event emitters need to be triggered manually
    // Any object can be emitted
    emitValueChanged(): void {
        this.numberChanged.emit(this.aNumber);
    }
}
```

```html
<!-- someComponentParent.html -->
<h1>
    I am a parent where SomeComponent gets rendered
</h1>
<!-- Pass a value to the aNumber variable -->
<some-component [aNumber]="48" (valueChanged)="aNumberChanged($event)"></some-component>
```

```typescript
// someComponentParent.ts
export class SomeParentComponent {
// ...

    aNumberChanged(updatedNumber: number): void {
		console.log(`aNumber changed to ${updatedNumber}`);
    }

// ...
}
```

**Using services**

There are many ways of using services to pass data between components. The details are beyond the scope of this tutorial, but it is worth noting the existence of such techniques, because it will probably be required in any relatively complex application.

The general pattern is to define an `Observable` stream in the service, to which components can push messages, or subscribe to be notified of new messages. This is effectively an [event bus](https://hackernoon.com/event-bus-implementation-s-d2854a9fafd5).

In the general case the messages need to be typed in order for listeners to be able to discern which are applicable. As a somewhat frivolous example, the service could emit a `PersonNameChangedEvent` which the `PersonComponent` could react on while the `LandingPageComponent` might choose to ignore this event entirely.

### CONCLUSION

Angular provides a monolithic and highly opinionated framework within to build applications. This provides the advantage of structure - the opinionated nature of the framework helps the user to design scalable apps from the get-go, and a lot of the complexity is hidden from the developer. On the other hand, using Angular (and TypeScript, for that matter) introduces a lot of boilerplate code that could slow you down if you're building a small application, so it is worth considering where the app is going before comitting to Angular.

The [Angular CLI](https://cli.angular.io/) has come a long way, however, and given how much of the heavy lifting it does I'll probably use Angular for almost every project in the near future.