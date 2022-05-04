/*
 console
 require
 */
/**
 * Init Alpha Vantage with your API key.
 *
 * @param {String} key
 *   Your Alpha Vantage API key.
 */
// this changes each day
var getId = function (ele) { return document.getElementById(ele); };
var require;
var p = [];
var dayArray = [];
alpha.data.daily("amzn", "compact").then(function (data) {
    Object.keys(data["Time Series (Daily)"]).forEach(function (item) {
        dayArray.push(item);
    });
    var i;
    for (i = 0; i < dayArray.length; i = i + 1) {
        p.push(JSON.parse(data["Time Series (Daily)"][dayArray[i]]["4. close"]));
    }
    var reversed = dayArray.reverse();
    p.reverse();
     console.log(p);
    // var getId = function (ele) { return document.getElementById(ele); };
    var y;
    var x;
    var phi;
    var r = 1;
    var dots = [];
    var draw = function () {
        var i;
        var c = getId("can");
        // y = c.clientHeight / 2 + 2000;
        // x = c.clientWidth / 2 + 2000;
        // y = c.clientHeight / 2;
        // x = c.clientWidth / 2;
        // console.log(c.clientHeight/2)
        y = getId("can").clientHeight / .775;
        x = getId("can").clientWidth / .775;
        var ctx = c.getContext("2d");
        // mark origin
        ctx.scale(0.4, 0.4);
        //  console.log(x, y);
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, 3, 3);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "blue";
        for (i = 0; i < 4000; i = i + 1) {
            var theta = ((Math.sqrt(i) * 180) - 225) % 360;
            ctx.fillRect(x - (i * r) * Math.cos(theta * Math.PI / 180), y - (i * r) * Math.sin(theta * Math.PI / 180), 15, 15);
            if (theta * Math.PI / 180 === 2.356194490192345) {
                ctx.fillStyle = "red";
                ctx.fillRect(x - (i * r) * Math.cos(theta * Math.PI / 180), y - (i * r) * Math.sin(theta * Math.PI / 180), 20, 20);
                dots.push(i * r);
                ctx.fillStyle = "blue";
            }
        }
        var lastPhi;
        var finalPhi;
        var countRed = 0;
        var countGreen = 0;
        var angle = [];
        // first point define spot black
        phi = ((Math.sqrt(p[0]) * 180) - 225) % 360;
        console.log(p[0], phi);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(x - p[0] * Math.cos(phi * Math.PI / 180), y - p[0] * Math.sin(phi * Math.PI / 180), 40, 40);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        var spot = "black";
        var lastSpot = spot;
        var lastValue = p[0];
        p.shift();
        // check direction of next value
        if (p[0] < lastValue) {
            spot = "red";
        }
        else {
            spot = "green";
        }
        // now fill rest
        p.forEach(function (value, index) {
            phi = ((Math.sqrt(value) * 180) - 225) % 360;
            // if (value > 1681 && value < 2704) {l
            if (value > 3000 && value < 3100) {
                if (value < lastValue) {
                    spot = "red";
                    ctx.fillStyle = "red";
                    ctx.fillRect(x - value * Math.cos(phi * Math.PI / 180), y - value * Math.sin(phi * Math.PI / 180), 70, 70);
                    ctx.stroke();
                    // you have to update before return
                    if (lastSpot === "red" || lastSpot === "black") {
                        lastSpot = spot;
                        lastValue = value;
                        lastPhi = phi;
                        return;
                    }
                    else {
                        ctx.strokeStyle = "red";
                        ctx.lineWidth = 10;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.arc(x, y, value + (10 * index), -(180 - lastPhi) * Math.PI / 180, -(180 - phi) * Math.PI / 180, true);
                        ctx.lineTo(x, y);
                        ctx.closePath();
                        ctx.stroke();
                        countRed = countRed + 1;
                        angle.push(lastPhi);
                        console.log("reverse - red", countRed, lastValue, value, "reverse on", lastPhi, "end on", phi, lastSpot, spot);
                    }
                }
                else {
                    ctx.fillStyle = "#00ff00";
                    ctx.fillRect(x - value * Math.cos(phi * Math.PI / 180), y - value * Math.sin(phi * Math.PI / 180), 70, 70);
                    ctx.stroke();
                    spot = "green";
                    if (lastSpot === "black" || lastSpot === "green") {
                        lastSpot = spot;
                        lastPhi = phi;
                        lastValue = value;
                        return;
                    }
                    else {
                        ctx.beginPath();
                        ctx.strokeStyle = "blue";
                        ctx.lineWidth = 10;
                        ctx.moveTo(x, y);
                        // last phi should always be to the right (clockwise) and therefore always the greater angle
                        ctx.arc(x, y, value - (2 * index), -(180 - lastPhi) * Math.PI / 180, -(180 - phi) * Math.PI / 180, false);
                        ctx.lineTo(x, y);
                        ctx.closePath();
                        ctx.stroke();
                        countGreen = countGreen + 1;
                        angle.push(lastPhi);
                        console.log("reverse - green", countGreen, lastValue, value, "reverse on", lastPhi, "end on", phi, lastSpot, spot);
                    }
                    // update before next for each
                    lastSpot = spot;
                    spot = "green";
                }
                lastSpot = spot;
                lastValue = value;
                lastPhi = phi;
            }
        });
        // now, draw the ending angle and circle the point
        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;
        console.log(p[p.length - 1]);
        finalPhi = ((Math.sqrt(p[p.length - 1]) * 180) - 225) % 360;
        ctx.beginPath();
        ctx.arc(x - p[p.length - 1] * Math.cos(finalPhi * Math.PI / 180), y - p[p.length - 1] * Math.sin(finalPhi * Math.PI / 180), 50, 0, 2 * Math.PI);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        angle.sort(function (a, b) { return a - b; });
        console.log(angle);
    };
    draw();
});
var getInfo = function (e) {
    // let y = e.target;
    var xx = e.clientX;
    var yy = e.clientY;
    // console.log(xx, yy);
};
window.addEventListener("click", getInfo, false);
// begin dragable
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var dragItem = getId("can");
var dragStart = function (e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    if (e.target === dragItem) {
        active = true;
    }
};
var dragEnd = function (e) {
    initialX = currentX;
    initialY = currentY;
    active = false;
};
var setTranslate = function (xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
};
var drag = function (e) {
    if (active === true) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, dragItem);
    }
};
getId("can").addEventListener("mousedown", dragStart, false);
getId("can").addEventListener("mouseup", dragEnd, false);
getId("can").addEventListener("mousemove", drag, false);