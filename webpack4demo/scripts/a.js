import acss from "./a.css";
import c from "./c.js";

const a = {
    init() {
        console.log("this is a ssh test ");
    },

    cinit() {
        c.init()
    }
}


export default a;
