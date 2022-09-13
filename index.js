const core = require('@actions/core');
const github = require('@actions/github');
const wait = require('./wait');


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
    console.log(`The payload is: ${payload}`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run().then(r => r);
