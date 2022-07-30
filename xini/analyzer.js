// XINI
// Author: Kai Gonzalez
// An object-oriented version of the INI file format.

module.exports.traverseClass = (obj, str) => {
    if (obj == null || typeof obj != "object") return null

    let place = "";
    let curnode;

    for (let i = 0; i < str.length; ++i) {
        if (str[i] == '.') {
            if (curnode == null) {
                curnode = obj[place]
            } else {

                if (curnode[place] != null && typeof curnode[place] != 'object')
                    return curnode[place]
                else {
                    if (debug) {
                        console.log("debug: deepslate: traversing node " + place)
                    }
                    curnode = curnode[place]
                }
            }
            place = "";
        }
        else {
            place = place + str[i];
        }
    }

    if (place.length > 0 && curnode[place] != null) return curnode[place]

    return curnode;

}

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
        } else if (str[i] == '&' && state == 1) {
            state = -1;
            buffer = ""
        } else if (str[i] == '\n' && state == 1) {
            current_pos[name.trim()] = buffer.trim();
            current_pos = cfg
            name = "";
            buffer = "";
            state = 0
        } else if (str[i] == '\n' && state == -1) {
            var ref = this.traverseClass(cfg, buffer.trim())

            if (ref == null)
                console.warn("warning: reference not found.")

            current_pos[name.trim()] = ref;
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
    } else if (buffer.length > 0 && state == -1) {
        var ref = this.traverseClass(cfg, buffer.trim())

        if (ref == null)
            console.warn("warning: reference not found.")

        current_pos[name.trim()] = ref;
        current_pos = cfg
        name = "";
        buffer = "";
        state = 0
    }

    return cfg
}

module.exports.version = "1.2"