
//normal loger

class Logger {

    constructor(name, style, level = 0) {
        this.name = name;
        this.style = style;
        this.level = level
    }

    msg = (message, message2) => {
        const space = "        ".substring(0, this.level);
        if (message2 !== undefined) {
            console.log(space + "%c " + this.name + " > %c " + message, this.style, "", message2);
        } else {
            console.log(space + "%c " + this.name + " > %c " + message, this.style, "");
        }
    }
}

//midleware para redux
export const reduxLoger = store => next => action => {
    console.log("  %c Store > %c acción:%c", "background:green; color:white", "background:#b6ffa7","", action);
    let result = next(action);

    console.log("  %c Store > %c estado:%c", "background:green; color:white", "background:#b6ffa7","", store.getState());
    return result;
}

export default Logger;