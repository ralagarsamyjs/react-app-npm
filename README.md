# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## purpose of the application

This application provides search functionality that can be used to search the NPM packages based on V1 API(https://registry.npmjs.org/). V1 search API supports only text based search which gives us back all the packges that contains the seach text anywhere in it's content. but what we want is to search the package name that matches with input search text. so package name filter will be applied on top of the searched results. Then final result will be displayed in a paginated table with info button for each resulted item.

## Package Info

info button will take us to new screen to select a particular version of package that will show the package info in detail.

## Pagination

V1 search API supports maximum of 250 result at a time, if result has more than 250 items for a particualr seach, then need to query the API by size of 250 with updated offset( first time offset is 0, next time it will be 250. it will go on until it reaches total). so decided to show the 10 pagination index consistantly with previous and next button. once it reaches end of current buffer, it will re query back with updated offset and the result will be appended in data buffer.

## Dependency packages

The below additioanl packages are used

1. react-router-dom
2. lodash
3. react-search
4. bootstrap css frame work
5. axios

## Unit Tests

Jest framework is integrated with react-create-app project out of the box.
Added the following unit tests

1. rendering heading properly
2. rendering search box, search text

## Notes

This project is created using below command
npx create-react-app {project_name} --template typescripts
