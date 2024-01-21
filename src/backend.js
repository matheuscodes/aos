const fs = require("fs")
const express = require('express')
const cors = require('cors')
const port = 3001

const joined = {}

function load(file) {
  const read = JSON.parse(fs.readFileSync(file))
  read.origin = file
  return read
}

function refresh() {
  const files = recursive(["./storage"])[0]
  const purposess = files.filter(i => i.endsWith("purpose.json")).map(load)
  const epicss = files.filter(i => i.endsWith("epic.json")).map(load)
  const objectivess = files.filter(i => i.endsWith("objective.json")).map(load)
  const resultss = files.filter(i => i.endsWith("result.json")).map(load)

  const epics = {}
  const objectives = {}
  const results = {}

  purposess.forEach(purpose => {
    joined[purpose.uuid] = purpose
    joined[purpose.uuid].epics = {}
  })

  epicss.forEach(epic => {
    epics[epic.uuid] = epic
    joined[epic.purpose_uuid].epics[epic.uuid] = epic
    delete epic.purpose_uuid
    epic.objectives = {}
  })

  objectivess.forEach(objective => {
    objectives[objective.uuid] = objective
    epics[objective.epic_uuid].objectives[objective.uuid] = objective
    delete objective.epic_uuid
    objective.results = {}
  })

  resultss.forEach(result => {
    objectives[result.objective_uuid].results[result.uuid] = result
    delete result.objective_uuid
  })
}

const watching = {}
function watchDirectory(directory) {
  console.log(`Watching ${directory}`);
  fs.watch(directory, (eventType, fileName) => {
    if(fileName.includes('~')) return;
    // Pending optimization: ignore directory events.
    console.log(`File event ${eventType} on ${fileName}`);
    refresh();
  });
  watching[directory] = true;
}

function recursive(array) {
  if(array.length > 0) {
    const appended = array.map(item => {
      try {
        const subdirs = fs.readdirSync(item)
        // It is a directory
        if(!watching[item]) {
          watchDirectory(item);
        }
        if(subdirs.length > 0) {
          return recursive(subdirs.map(subitem => item + "/" + subitem)).flatMap(i => i)
        }
        return subdirs;
      } catch(e) {
        // console.log(e.message);
      }
      return item
    })
    return appended
  }
  return array
}

const application = express();
refresh();

application.use(cors())

application.use('/', express.static('./dist/app'))

application.get('/api/purposes', (req, res) => {
  res.send(JSON.stringify({
      "id": "local",
      "purposes": joined,
  }));
})

application.listen(port, () => {
  console.log(`Backend started on port ${port}`)
})
