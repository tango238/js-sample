var request = require('superagent')

function fetch(path) {
  return new Promise( 
    (resolve, reject) => {
      request.get("https://api.github.com" + path)
        .end((err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(JSON.parse(res.text));
            }
        });
    });
}

async function getRepos() {
  await fetch("/users/tango238")
    .then((obj)  => console.log(obj))
    .catch((err) => console.error(err));

  await fetch("/users/tango238/repos")
    .then((obj)  => console.log(obj))
    .catch((err) => console.error(err));
}

getRepos();
