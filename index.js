const core = require('@actions/core');
const github = require('@actions/github');
const wait = require('./wait');
const fs = require('fs');
const path = require('path');
// const { execSync } = require('child_process');

// function executeCommand(cmd) {
//   return execSync(cmd).toString();
// }

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
    core.setOutput('message','Yo - here I am');
    const payload = JSON.stringify(github.context.payload, null, 2);
    console.log(`The payload is: ${payload}`);
    console.log('path', path.resolve('.'));
    core.setOutput('payload', payload)

    // fs.appendFile(path.resolve('/home/runner/work/test-my-action/test-my-action','CHANGELOG.md'), 'data to append', function (err) {
    fs.appendFile(path.resolve('../../../../../','CHANGELOG.md'), 'data to append', function (err) {
      if (err) {
        throw err
      }
      console.log('Saved!');
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run().then(r => r);
