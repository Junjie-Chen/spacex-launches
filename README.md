## Introduction

[SpaceX just launched a new GraphQL API](https://medium.com/open-graphql/launching-spacex-graphql-api-b3d7029086e0), and we thought it would be exciting to use that API to visualize all of their launches on a single page.

We built this out and it works OK, but it has a few issues and could use some love. That's where you come in!

## Your Task

While we don't use React ourselves (we're an Ember shop), this exercise is *not* intended to evaluate your expertise in our specific stack, or to provide a direct example of the code you would be working on. We're more interested in *how* you work and your approach to solving new problems in existing code. This is designed to mimic what you would be doing here fulltime: diving into the code, picking up some new technologies, and improving upon an existing platform. This project is just on a much smaller scale, and with more rockets. 🚀

We're hoping you will have time to pick one or more tasks off the list below and resolve them. We respect your home time and there's no need to accomplish everything on the list below, we're just looking to get a feel for your work, applied in a neutral space.

This repository has been set up just for you! You can commit your changes on a branch here, then open up a Pull Request and send us the link.

### Bugs (everyone creates bugs, we squash on Fridays)
 - 🐛 The launches aren't in chronological order! For example, [#57 (2018-03-06) appears before  #54 (2018-01-31)](https://i.imgur.com/UaLsFdy.png), which is not chronological. Where did we go wrong?
 - 🐛 If you open up the developer console, you'll see the error `"Warning: Each child in a list should have a unique "key" prop."` but [we're specifying a key](https://github.com/Junjie-Chen/spacex-launches/blob/e80ee21d6b0e6efdd8c7da7a5ab72f0368853a81/src/App.js#L58)! What gives?

### Front End
 - 💄 It'd be nice if it looked [more like this](https://i.imgur.com/VB2c48X.png), with alternating left/right timeline items, and maybe some color variation in the background of the rocket/bomb icon. To see the live version of that screenshot, [navigate here](https://themes.getbootstrap.com/preview/?theme_id=1696&show_new=) and click Pages > Timeline v2. All of the classes in this framework can be used automatically without changing anything.
 - ✨ The SpaceX GraphQL API, [which you can play with here](https://api.spacex.land/graphql/), has a "video_link" (under "links") which could be used to embed a video of the launch. That would be awesome!

### Back End
 - ✨ We would like to integrate with an external service to add comments to our launch data. It would be great to add a button that fetches and displays these comments, [something like this](https://i.imgur.com/rBkl87E.png). We've set up an endpoint for the frontend to call (look for `/comments/:launchId`), but we need you to fetch and parse the data. [See below](#comments-api) for more info on the comments API.

## Installation

You should be able to checkout this project and run `yarn` (if you have it!) or `npm install` to install the dependencies. You will need node v6+ to run this application. From there, simply run `yarn start` or `npm start` and then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Comments API

We're looking to load comments up from reddit for each launch. The SpaceX GraphQL API has a URL in the `reddit_launch` property in the `links` object on each launch. We can use this URL to get JSON-formatted comments from reddit. All you need to do is slice the thread title from the URL and append `.json` to retrieve the correct response, i.e., if the SpaceX GraphQL API returns `https://www.reddit.com/r/spacex/comments/hu6sci/rspacex_anasisii_official_launch_discussion/` then the comments can be retrieved from `https://www.reddit.com/r/spacex/comments/hu6sci.json` Note: The first object in the array is the opening post of the thread. The actual comment list is in the `data.children` array of the second object. We're only looking for top level comments, no need for the replies.

We're hoping the comments will look [something like this](https://i.imgur.com/rBkl87E.png). To see a live version of something similar to that screenshot, [navigate here](https://themes.getbootstrap.com/preview/?theme_id=1696&show_new=) and click Pages > Profile, and check "Latest Activity" in the bottom right. All of the classes in this framework can be used automatically without changing anything.

## Available Scripts

In the project directory, you can run:

### `npm start` / `yarn start`

Runs the app in the development mode and starts the server.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
The server will reload if any changes are made in `server.js`<br>
You will also see any lint errors in the console.

### `npm test` / `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

This project was bootstrapped with `create-react-app`, so you can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). Be sure to check out [hooks](https://reactjs.org/docs/hooks-intro.html).

Don't hesitate to ask any questions!
