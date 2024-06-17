This package includes the global command for starting React and Esbuild project. \
You can install packages by following command. \
It will only take a few milliseconds. Amazing !


# What is this?
This package can create react template with esbuild. \
It is similar to CRA (create-react-app) but much faster.


# Install 
In Node.js (version 16+), install with npm:
```
npx react-esbuild [project-name]
```

or

```
npm i react-esbuild -g
react-esbuild [project-name]
```

# FAQ

#### how can i use environment variables?
Make .env file in root directory of your project. \
And Write your own environment variables like bellow.
You should add REACT_APP_ prefix when you define variables.
```
REACT_APP_BASE_URL=http://127.0.0.1:8000/
```
And then use those in your source code like bellow.
```
console.log(REACT_APP_BASE_URL)
```
If you use version control system like git, Make .gitignore file too.
```
node_modules
build
.env
```
#### how can i test my project?
Make *.test.js files (App.test.js, Button.test.js etc.) inside src folder.
And Write your own test code like bellow.
```
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the App component', () => {
    console.log(REACT_APP_BASE_URL)
    render(<App />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
})
```
And then execute test files like bellow.
```
npm test
```
# test
![react-esbuild test video](https://github.com/sssssqew/react-esbuild/assets/9676553/94e09ce9-ee3d-4c12-bc3b-ad342f71d146)






