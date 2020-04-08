const data = require("../app/src/assets/data.json")
const fs = require('fs')

for(purpose in data) {
  delete data[purpose].compareto
  delete data[purpose].report
  for(epic in data[purpose].epics) {
    delete data[purpose].epics[epic].compareto
    delete data[purpose].epics[epic].report
    for(objective in data[purpose].epics[epic].objectives) {
      delete data[purpose].epics[epic].objectives[objective].compareto
      delete data[purpose].epics[epic].objectives[objective].report
      for(result in data[purpose].epics[epic].objectives[objective].results) {
        delete data[purpose].epics[epic].objectives[objective].results[result].compareto
        delete data[purpose].epics[epic].objectives[objective].results[result].report
      }
    }
  }
}
fs.writeFileSync('app/src/assets/clean.json', JSON.stringify(data,null,2));
