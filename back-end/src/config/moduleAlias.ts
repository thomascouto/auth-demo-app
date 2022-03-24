import { addAlias } from 'module-alias'
import { resolve } from 'path'

const ENV = resolve(process.env.TS_NODE_DEV === undefined ? 'dist' : 'src')

addAlias('@', ENV)
