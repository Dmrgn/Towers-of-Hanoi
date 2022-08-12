import { Ring } from "./ring.js";

export class Hanoi {
    sticks = [[],[],[]];
    height = null;
    moveNumber = null;
    constructor(height) {
        this.moveNumber = 0;
        this.height = height;
        for (let i = 0; i < this.height; i++) {
            this.sticks[0].push(new Ring(this.height-i));
        }
    }
    // moves the top ring of stick [start] to 
    // the top of stick [end]
    move(start, end) {
        // console.log("Moving ring " + start + " to " + end);
        if (this.sticks[start].length < 1)
            console.error("Move can only be called on a stick with at least one ring.");
        const movingRing = this.sticks[start].pop();
        if (this.sticks[end].length > 1)
            if (this.sticks[end][this.sticks[end].length-1].size < movingRing.size)
                console.error("Move can only be called onto a ring with a lesser size.");
        this.sticks[end].push(movingRing);
        this.moveNumber++;
        console.log("Move Number", this.moveNumber, "move ring", start, "to ring", end,":");
        this.draw();
    }
    // draws the towers of hanoi to the console
    draw() {
        function abs_ceil(x) {
            if (x == 0) return 0;
            return (x/Math.abs(x))*Math.ceil(Math.abs(x));
        }
        function formatRow(tower, rings) {
            let output = "";
            rings = rings.map(x => x ?? new Ring(0));
            for (const ring of rings) {
                let piece = "";
                for (let i = 0; i < (tower.height-ring.size)/2; i++) {
                    piece+=".";
                }
                for (let i = 0; i < ring.size; i++) {
                    piece+="=";
                }
                for (let i = 0; i < (tower.height-ring.size)/2; i++) {
                    piece+=".";
                }
                piece = piece.slice(0, tower.height);
                output += piece + " ";
            }
            return output;
        }
        const largestDepth = Math.max(...this.sticks.map(x=>x.length));
        for (let i = largestDepth-1; i >= 0; i--) {
            console.log(formatRow(this, this.sticks.map(x=>x[i])));
        }
        console.log("");
    }
    // recursively moves a stack of rings
    // to the specified stick
    moveStack(fromIndex, toIndex, depth) {
        let possibles = [0,1,2];
        possibles.splice(fromIndex, 1);
        const opposite = (possibles[0] == toIndex ? possibles[1] : possibles[0])
        if (depth == 1) {
            this.move(fromIndex, toIndex);
            return toIndex;
        }
        const childIndex = this.moveStack(fromIndex, opposite, depth-1);
        this.move(fromIndex, toIndex);
        this.moveStack(childIndex, toIndex, depth-1);
        return toIndex;
    }
}