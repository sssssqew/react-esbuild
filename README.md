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

or

#### recommended
bun is a fast javascript runtime and package manager. 
it is much more faster than node ! \
If you want to use bun, install bun at first like bellow.

In window,
```
powershell -c "irm bun.sh/install.ps1 | iex"
```
In Linux & macOS,
```
curl -fsSL https://bun.sh/install | bash
```
And then install and create project like bellow.
```
bunx react-esbuild [project-name]
cd [project-name]
bun install
bun run start-js (development)
bun run build-js (production)
```

#### caution 
If you cannot download latest version when you use bunx,
It is because bunx cache previous version.

In window, go to path bellow in windows explorer and delete react-esbuild package.
```
C:\Users\Administrator\AppData\Local\Temp
```
![최신버전 다운로드 받는방법](https://github.com/sssssqew/react-esbuild/assets/9676553/8b896c11-a529-42f7-8e70-34774b44e2b7)

# FAQ

#### how can i use environment variables?
Make .env file in root directory of your project. \
And Write your own environment variables like bellow.
You should add REACT_APP_ prefix when you define variables.
```
REACT_APP_BASE_URL=http://127.0.0.1:8000/
```
And then use those in your source code like bellow.
```js
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
```js
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
or
```
bun run test (recommended)
```
#### Does this package support old browsers like IE?
Yes. This package can transfile javascript into ES5 (old syntax) by SWC. \ SWC is like babel. But it is much more faster!  
# test
![react-esbuild test video](https://github.com/sssssqew/react-esbuild/assets/9676553/94e09ce9-ee3d-4c12-bc3b-ad342f71d146)






