import { loadEnv } from 'vite'

export const setEnv = (mode) => {
  mode = mode || "test"
  const define = {}
  const env = loadEnv(mode, process.cwd(), "")
  for(const k in env){
    if(k.includes('REACT_APP_')){ // filter env variables by REACT_APP_
      define[k] = JSON.stringify(env[k])
    }
  }
  return define
}