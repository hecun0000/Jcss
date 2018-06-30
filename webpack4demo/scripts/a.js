import acss from "./a.css";
import c from "./c.js";

const a = {
    init() {
        console.log("a init bbaaa");
    },

    cinit() {
        c.init()
    }
}


export default a;
