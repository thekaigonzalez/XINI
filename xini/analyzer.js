// XINI
// Author: Kai Gonzalez
// An object-oriented version of the INI file format.

module.exports.parseXINI = (str) => {
    let cfg = {}

    let buffer = "";
    let state = 0;
    let current_pos = cfg;
    let curnode;
    let name = "";

    for (let i = 0; i < str.length; ++i) {
        if (str[i] == '.' && state == 0) {
            if (current_pos[buffer] == null) current_pos[buffer] = {}


            if (current_pos[buffer] != null && typeof current_pos[buffer] == 'object') {
                current_pos = current_pos[buffer]
            }

            buffer = "";
        }
        else if (str[i] == '=' && state == 0) {
            state = 1;
            name = buffer;
            buffer = ""
        } else if (str[i] == '\n' && state == 1) {
            current_pos[name.trim()] = buffer.trim();
            current_pos = cfg
            name = "";
            buffer = "";
            state = 0
        } else if (str[i] == '\n' && state == 0) {
            continue;
        } else {
            buffer += str[i]
        }
    }
    if (buffer.length > 0 && state == 1) {
        current_pos[name.trim()] = buffer.trim();
        current_pos = cfg
        name = "";
        buffer = "";
        state = 0
    }

    return cfg
}