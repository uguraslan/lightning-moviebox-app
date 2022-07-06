# Moviebox - A sample Lightning application

This is my first LightningJS application. It consists of 2 pages :

1. **Home** page
2. **Movie** page

The **Home** page displays a list of movies. Left/right arrow keys can be used to navigate through the list.
_Enter_ key can be used to open the movie page. Again, on the movie page, left/right arrow keys can be used to navigate through the list and by using _Enter_ key you can navigate to the selected movie page. _Backspace_ key can be used to go back to the home page.

## Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.
