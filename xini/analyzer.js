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
            if (current_pos[buffer.trim()] == null) current_pos[buffer.trim()] = {}


            if (current_pos[buffer.trim()] != null && typeof current_pos[buffer.trim()] == 'object') {
                current_pos = current_pos[buffer.trim()]
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
        } else if (str[i] == '\n' && state == 1200) {
            state = 0;
            buffer = ""
        } else if (str[i] == '\n' && state == 0) {
            continue;
        } else if (str[i] == '\r') {
            continue
        } else if (str[i] == '-' && state == 0) {
            state = 1200;
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