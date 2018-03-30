var Dot = function(_x, _y) {
    this.x = _x;
    this.y = _y;
}

var container = [];

function mousePressed() {
    var vector = new Dot(mouseX, mouseY);
    container.push(vector);
}

function drawPoints() {
    for (var index = 0; index < container.length; index++) {
        fill(255);
        noStroke();
        ellipse(container[index].x, container[index].y, 18, 18)
    }
}

function setup() {
    console.clear;
    createCanvas(window.innerWidth, window.innerHeight);
    console.clear;
}

function draw() {
    background(123);
    drawPoints();
    var reachedPoints = []
    var unreachedPoints = [];
    for (var index = 0; index < container.length; index++) {
        unreachedPoints.push(container[index]);
    }
    reachedPoints.push(unreachedPoints[0]);
    unreachedPoints.splice(0, 1)

    while (unreachedPoints.length > 0) {
        var lowest = 100000;
        var rIndex; // Index of reached vertice
        var uIndex; // Index of unreached vertice
        var found = false;
        for (var index = 0; index < reachedPoints.length; index++) {
            for (var inner = 0; inner < unreachedPoints.length; inner++) {
                var reachedPt = reachedPoints[index];
                var unreachedPt = unreachedPoints[inner];
                var distance = dist(unreachedPt.x, unreachedPt.y, reachedPt.x, reachedPt.y);
                if (distance < lowest) {
                    lowest = distance;
                    rIndex = index;
                    uIndex = inner;
                    found = true;
                }
            }
        }
        stroke(255);
        strokeWeight(2)
        line(reachedPoints[rIndex].x, reachedPoints[rIndex].y, unreachedPoints[uIndex].x, unreachedPoints[uIndex].y)
        reachedPoints.push(unreachedPoints[uIndex]);
        unreachedPoints.splice(uIndex, 1);
    }
}