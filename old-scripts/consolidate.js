const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rinoas',
  database: 'aos',
  timezone: 'utc'
});

function clone(i) { return JSON.parse(JSON.stringify(i)) }

const purposes = {'null':{uuid:"null", definition: "Other", report: {monthly:{}}}}
const epics = {}
const objectives = {}
const results = {}

connection.query('SELECT * FROM purposes', (err,rows) => {
  if(err) throw err;
  rows.forEach(i =>{
    purposes[i.uuid] = clone(i);
    purposes[i.uuid].report = {
      monthly: {}
    }
  });
  connection.query('SELECT * FROM epics', (err,rows) => {
    if(err) throw err;
    rows.forEach(i => {
      epics[i.uuid] = clone(i);
      epics[i.uuid].report = {
        monthly: {}
      }
    });
    connection.query('SELECT * FROM objectives ORDER BY due_date DESC', (err,rows) => {
      if(err) throw err;
      rows.forEach(i => {
        objectives[i.uuid] = clone(i);
        objectives[i.uuid].report = {
          monthly: {}
        }
        objectives[i.uuid].compareto = {report:{monthly:{}}}
      });
      connection.query('SELECT * FROM results', (err,rows) => {
        if(err) throw err;
        rows.forEach(i => {
          results[i.uuid] = clone(i);
          results[i.uuid].efforts = [];
          results[i.uuid].report = {
            monthly: {}
          }
        });
        connection.query(`SELECT * FROM aos.efforts f LEFT JOIN aos.results r ON f.result_uuid = r.uuid LEFT JOIN aos.objectives o ON o.uuid = r.objective_uuid LEFT JOIN aos.epics e ON e.uuid = o.epic_uuid LEFT JOIN aos.purposes p ON p.uuid = e.purpose_uuid`, (err,rows) => {
          if(err) throw err;
          rows.forEach(i => {
            results[i.result_uuid].efforts.push(clone(i));
            function modToCom(effort) {
              return effort.modifier / ((effort.target || 0) - (effort.initial || 0))
            }
            function modToDed(effort) {
              return effort.time_spent / (effort.estimate || 0)
            }
            addToReport(results[i.result_uuid], i, modToCom, modToDed);
          });

          finalize();
        });
      });
    });
  });
});


function addToReport(destination, effort, modifierToCompletion, modifierToDedication) {
  const month = effort.date.toJSON().slice(0,7);
  if(!destination.report.monthly[month]){
    destination.report.monthly[month] = {
      time_spent: [],
      money_spent: [],
      mental_spent: [],
      stamina_spent: [],
      completions: [],
      dedications: []
    }
  }
  destination.report.monthly[month].time_spent.push(effort.time_spent);
  destination.report.monthly[month].money_spent.push(effort.money_spent);
  destination.report.monthly[month].mental_spent.push(effort.mental_spent);
  destination.report.monthly[month].stamina_spent.push(effort.stamina_spent);
  destination.report.monthly[month].completions.push(modifierToCompletion(effort));
  if(effort.estimate) {
    destination.report.monthly[month].dedications.push(modifierToDedication(effort));
  }
}


function addMonthly(destination, month, report, reduction) {
  if(!destination.report.monthly[month]){
    destination.report.monthly[month] = {
      time_spent: [],
      money_spent: [],
      mental_spent: [],
      stamina_spent: [],
      completions: [],
      dedications: []
    }
  }
  report.time_spent.forEach(i => destination.report.monthly[month].time_spent.push(i))
  report.money_spent.forEach(i => destination.report.monthly[month].money_spent.push(i))
  report.mental_spent.forEach(i => destination.report.monthly[month].mental_spent.push(i))
  report.stamina_spent.forEach(i => destination.report.monthly[month].stamina_spent.push(i))
  report.completions.forEach(i => destination.report.monthly[month].completions.push(i/reduction.total))
  if(reduction.estimated) {
    report.dedications.forEach(i => destination.report.monthly[month].dedications.push(i/reduction.estimated));
  }
}


// connection.query('SELECT * FROM aos.results r LEFT JOIN aos.objectives o ON o.uuid = r.objective_uuid LEFT JOIN aos.epics e ON e.uuid = o.epic_uuid LEFT JOIN aos.purposes p ON p.uuid = e.purpose_uuid', (err,rows) => {
//   if(err) throw err;
//   rows.forEach(i => objectives[i.uuid] = clone(i))
// });


const finalize = () => {
  Object.keys(results).forEach(r => {
    if(!objectives[results[r].objective_uuid].results) {
      objectives[results[r].objective_uuid].results = {}
    }
    objectives[results[r].objective_uuid].results[results[r].uuid] = clone(results[r])
  })
  Object.keys(objectives).forEach(o => {
    if(!epics[objectives[o].epic_uuid].objectives) {
      epics[objectives[o].epic_uuid].objectives = {}
    }
    epics[objectives[o].epic_uuid].objectives[objectives[o].uuid] = clone(objectives[o])
    if(objectives[o].results) {
      const results = Object.keys(objectives[o].results);
      Object.keys(objectives[o].results).forEach(i => {
        Object.keys(objectives[o].results[i].report.monthly).forEach(k => {
          const estimated = results.map(i => objectives[o].results[i]).reduce((sum, result) => {
            if(result.estimate) {
              return sum + 1;
            }
            return sum;
          }, 0)
          const total = results.length;
          addMonthly(epics[objectives[o].epic_uuid].objectives[objectives[o].uuid], k, objectives[o].results[i].report.monthly[k], {estimated,total})
        });
      });
    }
  });
  Object.keys(epics).forEach(e => {
    if(!purposes[epics[e].purpose_uuid].epics) {
      purposes[epics[e].purpose_uuid].epics = {}
    }
    purposes[epics[e].purpose_uuid].epics[epics[e].uuid] = clone(epics[e])
    if(epics[e].objectives) {
      const objectives = Object.keys(epics[e].objectives);
      objectives.forEach(o => {
        Object.keys(epics[e].objectives[o].report.monthly).forEach(k => {
          addMonthly(purposes[epics[e].purpose_uuid].epics[epics[e].uuid], k, epics[e].objectives[o].report.monthly[k], objectives.length)
        });
      });
    }
  })
  fs.writeFileSync('../app/src/assets/data.json', JSON.stringify(purposes,null,2));
  connection.end();
}

// setTimeout(finalize, 20000)
