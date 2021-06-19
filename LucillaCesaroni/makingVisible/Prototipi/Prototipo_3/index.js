var NounProject = require('the-noun-project'),
  nounProject = new NounProject({
    key: 'df1aef6a20c94c038231549acb42ab39',
    // prof: 14a95217f0c54bf7865b5abab4a4233a
    // luci: df1aef6a20c94c038231549acb42ab39
    secret: '542c87fcb6374388bd3f70b5cc7a6c89'
    // prof: 88edb25fd2b64b0bac2d3ef656efb160
    // luci:542c87fcb6374388bd3f70b5cc7a6c89
  });


const express = require('express') // Express.js, is a backend web application framework for Node.js
const app = express()
const port = 3000

app.use(express.static('public')); // nel mio progetto ci sara una cartella public dove andrà a pescare tutti gli indirizzi delle immagini

app.get('/:nomeicon', (req, res) => { // chiamate get a cui io rispondo
  const ricezione = req.params.nomeicon;
  console.log("hey: " + ricezione);

  const numero = ricezione.replace(/[^0-9]+/g,'') // prendo solo i numeri
  console.log("hey: " + numero);

  const nome = ricezione.replace(/[^a-zA-Z]+/g,''); // prendo solo le parole
  console.log("hey: " + nome);

  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  nounProject.getIconsByTerm(nome, {
    limit: 30
  }, function(err, data) {
    if (!err) {
      console.log(data.icons);
      res.send(JSON.stringify(data.icons[numero].preview_url));
    }
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//ctrl + c
