const { run } = require('runjs');

function delete_path(dir_path) {
    const first_level= run(`vault kv list ${dir_path}`, {stdio: "pipe"});
    console.log(first_level);
}

module.exports = {delete_path};
