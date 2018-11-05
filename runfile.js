const { run } = require('runjs');

function delete_path(root_path) {
    const child_paths = JSON.parse(run(`vault kv list -format json ${root_path}`, {stdio: "pipe"}));
    for (const child_path of child_paths) {
        try {
          run(`vault kv get -format json ${root_path}${child_path}`);
          run(`vault kv delete -versions=1 ${root_path}${child_path}`);
          run(`vault kv destroy -versions=1 ${root_path}${child_path}`);
          run(`vault kv metadata delete ${root_path}${child_path}`);
        } catch (e) {
          delete_path(`${root_path}${child_path}`);
          run(`vault kv delete -versions=1 ${root_path}${child_path}`);
          run(`vault kv destroy -versions=1 ${root_path}${child_path}`);
          run(`vault kv metadata delete ${root_path}${child_path}`);
        }
    }
}

module.exports = {delete_path};
