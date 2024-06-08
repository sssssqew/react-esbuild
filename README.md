This package includes the global command for starting React and Esbuild project. \
You can install packages by following command. \
It will only take a few milliseconds. Amazing !


# What is this?
***
This package can create react template with esbuild. \
It is similar to CRA (create-react-app) but much faster.


# Install 
***
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
***
#### how can i use environment variables?
Make .env file in root directory of your project. \
And Write your own environment variables like bellow.
```
REACT_APP_BASE_URL=http://127.0.0.1:8000/
```
And then use those in your source code like bellow.
```
import { REACT_APP_BASE_URL } from 'env'
console.log(REACT_APP_BASE_URL)
```
If you use version control system like git, Make .gitignore file too.
```
node_modules
build
.env
```




