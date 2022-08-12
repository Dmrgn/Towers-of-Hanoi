import { Hanoi } from "./hanoi.js";

const h = new Hanoi(4);

// move the first stack onto the 3rd stack
// with a depth of h.height (solve the puzzle)
h.moveStack(0, 2, h.height);