import * as fs from 'fs'
import * as core from '@actions/core'
import {wait} from './wait'

const getPackageVersion = (): string => {
  const data = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf-8'}))

  return data.version
}

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(`package version: ${getPackageVersion()}`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
