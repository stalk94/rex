(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

/**
 * box-box collision
 * @param {number} x1 top-left corner of first box
 * @param {number} y1 top-left corner of first box
 * @param {number} w1 width of first box
 * @param {number} h1 height of first box
 * @param {number} x2 top-left corner of second box
 * @param {number} y2 top-left corner of second box
 * @param {number} w2 width of second box
 * @param {number} h2 height of second box
 */
module.exports = function boxBox(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
}

},{}],2:[function(require,module,exports){
'use strict'

/**
 * box-circle collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 */
module.exports = function boxCircle(xb, yb, wb, hb, xc, yc, rc)
{
    var hw = wb / 2
    var hh = hb / 2
    var distX = Math.abs(xc - (xb + wb / 2))
    var distY = Math.abs(yc - (yb + hb / 2))

    if (distX > hw + rc || distY > hh + rc)
    {
        return false
    }

    if (distX <= hw || distY <= hh)
    {
        return true
    }

    var x = distX - hw
    var y = distY - hh
    return x * x + y * y <= rc * rc
}

},{}],3:[function(require,module,exports){
var circleOutlineBox = require('./circleOutline-box')

/**
 * circleOutline-box (axis-aligned) collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x top-left corner of box
 * @param {number} y top-left corner of box
 * @param {number} width of box
 * @param {number} height of box
 * @param {number} thickness of circle outline
 */
module.exports = function boxCircleOutline(x, y, width, height, xc, yc, rc, thickness)
{
    return circleOutlineBox(xc, yc, rc, x, y, width, height, thickness)
}
},{"./circleOutline-box":14}],4:[function(require,module,exports){
var ellipseBox = require('./ellipse-box')

/**
 * box-ellipse (axis-oriented rectangle) collision
 * @param {number} xb top-left corner of rectangle
 * @param {number} yb top-left corner of rectangle
 * @param {number} wb width of rectangle
 * @param {number} hb height of rectangle
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 */
module.exports = function boxEllipse(xb, yb, wb, hb, xe, ye, rex, rey)
{
    return ellipseBox(xe, ye, rex, rey, xb, yb, wb, hb)
}
},{"./ellipse-box":17}],5:[function(require,module,exports){
'use strict'

var lineBox = require('./line-box')

/**
 * box-line collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 */
module.exports = function boxLine(xb, yb, wb, hb, x1, y1, x2, y2)
{
    return lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
}

},{"./line-box":25}],6:[function(require,module,exports){
'use strict'

/**
 * box-point collision
 * @param {number} x1 top-left corner of box
 * @param {number} y1 top-left corner of box
 * @param {number} w1 width of box
 * @param {number} h1 height of box
 * @param {number} x2 of point
 * @param {number} y2 of point
 * @return {boolean}
 */
module.exports = function boxPoint(x1, y1, w1, h1, x2, y2)
{
    return x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1
}

},{}],7:[function(require,module,exports){
'use strict'

var polygonBox = require('./polygon-box')

/**
 * box-polygon collision
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @param {number[]} points of polygon
 */
module.exports = function boxPolygon(xb, yb, wb, hb, points)
{
    return polygonBox(points, xb, yb, wb, hb)
}

},{"./polygon-box":40}],8:[function(require,module,exports){
'use strict'

var boxCircle = require('./box-circle')

/**
 * circle-box (axis-oriented rectangle) collision
 * from http://stackoverflow.com/a/402010/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} xb top-left corner of rectangle
 * @param {number} yb top-left corner of rectangle
 * @param {number} wb width of rectangle
 * @param {number} hb height of rectangle
 */
module.exports = function circleBox(xc, yc, rc, xb, yb, wb, hb)
{
    return boxCircle(xb, yb, wb, hb, xc, yc, rc)
}

},{"./box-circle":2}],9:[function(require,module,exports){
'use strict'

/**
 * circle-circle collision
 * @param {number} x1 center of circle 1
 * @param {number} y1 center of circle 1
 * @param {number} r1 radius of circle 1
 * @param {number} x2 center of circle 2
 * @param {number} y2 center of circle 2
 * @param {number} r2 radius of circle 2
 * @return {boolean}
 */
module.exports = function circleCircle(x1, y1, r1, x2, y2, r2)
{
    var x = x1 - x2
    var y = y2 - y1
    var radii = r1 + r2
    return x * x + y * y <= radii * radii
}

},{}],10:[function(require,module,exports){
var ellipseCircle = require('./ellipse-circle')

/**
 * circle-ellipse collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @return {boolean}
 */
module.exports = function circleEllipse(xc, yc, rc, xe, ye, rex, rey)
{
    return ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
}

},{"./ellipse-circle":18}],11:[function(require,module,exports){
'use strict'

var lineCircle = require('./line-circle')

/**
 * circle-line collision
 * from http://stackoverflow.com/a/10392860/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @return {boolean}
 */
module.exports = function circleLine(xc, yc, rc, x1, y1, x2, y2)
{
    return lineCircle(x1, y1, x2, y2, xc, yc, rc)
}

},{"./line-circle":26}],12:[function(require,module,exports){
'use strict'

/**
 * circle-point collision
 * @param {number} x1 center of circle
 * @param {number} y1 center of circle
 * @param {radius} r1 radius of circle
 * @param {number} x2 point
 * @param {number} y2 point
 * @return {boolean}
 */
module.exports = function circlePoint(x1, y1, r1, x2, y2)
{
    var x = x2 - x1
    var y = y2 - y1
    return x * x + y * y <= r1 * r1
}

},{}],13:[function(require,module,exports){
'use strict'

var polygonCircle = require('./polygon-circle')

/**
 * circle-polygon collision
 * from http://stackoverflow.com/a/402019/1955997
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
module.exports = function circlePolygon(xc, yc, rc, points, tolerance)
{
    return polygonCircle(points, xc, yc, rc, tolerance)
}

},{"./polygon-circle":41}],14:[function(require,module,exports){
var circlePoint = require('./circle-point')
var boxCircle = require('./box-circle')

/**
 * circleOutline-box (axis-aligned) collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x top-left corner of box
 * @param {number} y top-left corner of box
 * @param {number} width of box
 * @param {number} height of box
 * @param {number} thickness of circle outline
 */
module.exports = function circleOutlineBox(xc, yc, rc, x, y, width, height, thickness)
{
    thickness = thickness || 1
    var count = 0
    count += circlePoint(xc, yc, rc, x, y) ? 1 : 0
    count += circlePoint(xc, yc, rc, x + width, y) ? 1 : 0
    count += circlePoint(xc, yc, rc, x, y + height) ? 1 : 0
    count += circlePoint(xc, yc, rc, x + width, y + height) ? 1 : 0

    // if no corners are inside the circle, then intersects only if box encloses circle-outline
    if (count === 0)
    {
        return boxCircle(x, y, width, height, xc, yc, rc)
    }

    // if one corner is inside and one corner is outside then box intersects circle-outline
    if (count >= 1 && count <= 3)
    {
        return true
    }

    // last check is if box is inside circle, need to check that a corner is not inside the inner circle
    if (count === 4)
    {
        return !circlePoint(xc, yc, rc - thickness, x, y) ||
            !circlePoint(xc, yc, rc - thickness, x + width, y) ||
            !circlePoint(xc, yc, rc - thickness, x, y + height) ||
            !circlePoint(xc, yc, rc - thickness, x + width, y + height)
    }
}
},{"./box-circle":2,"./circle-point":12}],15:[function(require,module,exports){
var lineCircle = require('./line-circle')
var circlePoint = require('./circle-point')

/**
 * circleOutline-line collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x1 of point 1 of line
 * @param {number} y1 of point 1 of line
 * @param {number} x2 of point 2 of line
 * @param {number} y2 of point 2 of line
 * @param {number} thickness of circle outline
 */
module.exports = function circleOutlineLine(xc, yc, rc, x1, y1, x2, y2, thickness)
{
    thickness = thickness || 1
    return lineCircle(x1, y1, x2, y2, xc, yc, rc) && !(circlePoint(xc, yc, rc - thickness, x1, y1) && circlePoint(xc, yc, rc - thickness, x2, y2))
}
},{"./circle-point":12,"./line-circle":26}],16:[function(require,module,exports){
var circlePoint = require('./circle-point')

/**
 * circleOutline-point collision
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} thickness of circle outline
 */
module.exports = function circleOutlinePoint(xc, yc, rc, x, y, thickness)
{
    thickness = thickness || 1
    return circlePoint(xc, yc, rc, x, y) && !circlePoint(xc, yc, rc - thickness, x, y)
}
},{"./circle-point":12}],17:[function(require,module,exports){
var ellipseLine = require('./ellipse-line')
var boxPoint = require('./box-point')

/**
 * ellipse-box (axis-oriented rectangle) collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 */
module.exports = function ellipseBox(xe, ye, rex, rey, xb, yb, wb, hb)
{
    return boxPoint(xb, yb, wb, hb, xe, ye) ||
        ellipseLine(xe, ye, rex, rey, xb, yb, xb + wb, yb) ||
        ellipseLine(xe, ye, rex, rey, xb, yb + hb, xb + wb, yb + hb) ||
        ellipseLine(xe, ye, rex, rey, xb, yb, xb, yb + hb) ||
        ellipseLine(xe, ye, rex, rey, xb + wb, yb, xb + wb, yb + hb)
}
},{"./box-point":6,"./ellipse-line":21}],18:[function(require,module,exports){
var ellipseHelper = require('./ellipse-helper')

/**
 * ellipse-circle collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 * @return {boolean}
 */
module.exports = function ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
{
    return ellipseHelper.ellipseCircle(xe, ye, rex, rey, xc, yc, rc)
}

},{"./ellipse-helper":20}],19:[function(require,module,exports){
var ellipseHelper = require('./ellipse-helper')

/**
 * ellipse-ellipse collision
 * @param {number} x1 center of ellipse 1
 * @param {number} y1 center of ellipse 1
 * @param {number} r1x radius-x of ellipse 1
 * @param {number} r1y radius-y of ellipse 1
 * @param {number} x2 center of ellipse 2
 * @param {number} y2 center of ellipse 2
 * @param {number} r2x radius of ellipse 2
 * @param {number} r2y radius of ellipse 2
 * @return {boolean}
 */
module.exports = function ellipseEllipse(x1, y1, r1x, r1y, x2, y2, r2x, r2y)
{
    return ellipseHelper.ellipseEllipse(x1, y1, r1x, r1y, x2, y2, r2x, r2y)
}

},{"./ellipse-helper":20}],20:[function(require,module,exports){
// from http://yehar.com/blog/?p=2926

var MAX_ITERATIONS = 10
var innerPolygonCoef, outerPolygonCoef, initialized

function initialize()
{
    innerPolygonCoef = []
    outerPolygonCoef = []
    for (var t = 0; t <= MAX_ITERATIONS; t++)
    {
        var numNodes = 4 << t
        innerPolygonCoef[t] = 0.5 / Math.cos(4 * Math.acos(0) / numNodes)
        outerPolygonCoef[t] = 0.5 / (Math.cos(2 * Math.acos(0) / numNodes) * Math.cos(2 * Math.acos(0) / numNodes))
    }
    initialized = true
}

function iterate(x, y, c0x, c0y, c2x, c2y, rr)
{
    for (var t = 1; t <= MAX_ITERATIONS; t++)
    {
        var c1x = (c0x + c2x) * innerPolygonCoef[t]
        var c1y = (c0y + c2y) * innerPolygonCoef[t]
        var tx = x - c1x
        var ty = y - c1y
        if (tx * tx + ty * ty <= rr)
        {
            return true
        }
        var t2x = c2x - c1x
        var t2y = c2y - c1y
        if (tx * t2x + ty * t2y >= 0 && tx * t2x + ty * t2y <= t2x * t2x + t2y * t2y &&
            (ty * t2x - tx * t2y >= 0 || rr * (t2x * t2x + t2y * t2y) >= (ty * t2x - tx * t2y) * (ty * t2x - tx * t2y)))
        {
            return true
        }
        var t0x = c0x - c1x
        var t0y = c0y - c1y
        if (tx * t0x + ty * t0y >= 0 && tx * t0x + ty * t0y <= t0x * t0x + t0y * t0y &&
            (ty * t0x - tx * t0y <= 0 || rr * (t0x * t0x + t0y * t0y) >= (ty * t0x - tx * t0y) * (ty * t0x - tx * t0y)))
        {
            return true
        }
        var c3x = (c0x + c1x) * outerPolygonCoef[t]
        var c3y = (c0y + c1y) * outerPolygonCoef[t]
        if ((c3x - x) * (c3x - x) + (c3y - y) * (c3y - y) < rr)
        {
            c2x = c1x
            c2y = c1y
            continue
        }
        var c4x = c1x - c3x + c1x
        var c4y = c1y - c3y + c1y
        if ((c4x - x) * (c4x - x) + (c4y - y) * (c4y - y) < rr)
        {
            c0x = c1x
            c0y = c1y
            continue
        }
        var t3x = c3x - c1x
        var t3y = c3y - c1y
        if (ty * t3x - tx * t3y <= 0 || rr * (t3x * t3x + t3y * t3y) > (ty * t3x - tx * t3y) * (ty * t3x - tx * t3y))
        {
            if (tx * t3x + ty * t3y > 0)
            {
                if (Math.abs(tx * t3x + ty * t3y) <= t3x * t3x + t3y * t3y || (x - c3x) * (c0x - c3x) + (y - c3y) * (c0y - c3y) >= 0)
                {
                    c2x = c1x
                    c2y = c1y
                    continue
                }
            } else if (-(tx * t3x + ty * t3y) <= t3x * t3x + t3y * t3y || (x - c4x) * (c2x - c4x) + (y - c4y) * (c2y - c4y) >= 0)
            {
                c0x = c1x
                c0y = c1y
                continue
            }
        }
        return false
    }
    return false // Out of iterations so it is unsure if there was a collision. But have to return something.
}

// Test for collision between an ellipse of horizontal radius w0 and vertical radius h0 at (x0, y0) and
// an ellipse of horizontal radius w1 and vertical radius h1 at (x1, y1)
function ellipseEllipse(x0, y0, w0, h0, x1, y1, w1, h1)
{
    if (!initialized)
    {
        initialize()
    }

    var x = Math.abs(x1 - x0) * h1
    var y = Math.abs(y1 - y0) * w1
    w0 *= h1
    h0 *= w1
    var r = w1 * h1

    if (x * x + (h0 - y) * (h0 - y) <= r * r || (w0 - x) * (w0 - x) + y * y <= r * r || x * h0 + y * w0 <= w0 * h0
        || ((x * h0 + y * w0 - w0 * h0) * (x * h0 + y * w0 - w0 * h0) <= r * r * (w0 * w0 + h0 * h0) && x * w0 - y * h0 >= -h0 * h0 && x * w0 - y * h0 <= w0 * w0))
    {
        return true
    }
    else
    {
        if ((x - w0) * (x - w0) + (y - h0) * (y - h0) <= r * r || (x <= w0 && y - r <= h0) || (y <= h0 && x - r <= w0))
        {
            return iterate(x, y, w0, 0, 0, h0, r * r)
        }
        return false
    }
}

// Test for collision between an ellipse of horizontal radius w and vertical radius h at (x0, y0) and
// a circle of radius r at (x1, y1)
function ellipseCircle(x0, y0, w, h, x1, y1, r)
{
    if (!initialized)
    {
        initialize()
    }
    var x = Math.abs(x1 - x0)
    var y = Math.abs(y1 - y0)

    if (x * x + (h - y) * (h - y) <= r * r || (w - x) * (w - x) + y * y <= r * r || x * h + y * w <= w * h
        || ((x * h + y * w - w * h) * (x * h + y * w - w * h) <= r * r * (w * w + h * h) && x * w - y * h >= -h * h && x * w - y * h <= w * w))
    {
        return true
    }
    else
    {
        if ((x - w) * (x - w) + (y - h) * (y - h) <= r * r || (x <= w && y - r <= h) || (y <= h && x - r <= w))
        {
            return iterate(x, y, w, 0, 0, h, r * r)
        }
        return false
    }
}

module.exports = {
    ellipseCircle: ellipseCircle,
    ellipseEllipse: ellipseEllipse
}
},{}],21:[function(require,module,exports){
/**
 * ellipse-line collision
 * adapted from http://csharphelper.com/blog/2017/08/calculate-where-a-line-segment-and-an-ellipse-intersect-in-c/
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 */
module.exports = function ellipseLine(xe, ye, rex, rey, x1, y1, x2, y2)
{
    x1 -= xe
    x2 -= xe
    y1 -= ye
    y2 -= ye

    var A = Math.pow(x2 - x1, 2) / rex / rex + Math.pow(y2 - y1, 2) / rey / rey
    var B = 2 * x1 * (x2 - x1) / rex / rex + 2 * y1 * (y2 - y1) / rey / rey
    var C = x1 * x1 / rex / rex + y1 * y1 / rey / rey - 1
    var D = B * B - 4 * A * C
    if (D === 0)
    {
        var t = -B / 2 / A
        return t >= 0 && t <= 1
    }
    else if (D > 0)
    {
        var sqrt = Math.sqrt(D)
        var t1 = (-B + sqrt) / 2 / A
        var t2 = (-B - sqrt) / 2 / A
        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)
    }
    else
    {
        return false
    }
}
},{}],22:[function(require,module,exports){
/**
 * ellipse-point collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @param {number} x1 point
 * @param {number} y1 point
 * @return {boolean}
 */
module.exports = function ellipsePoint(xe, ye, rex, rey, x1, y1)
{
    var x = Math.pow(x1 - xe, 2) / (rex * rex)
    var y = Math.pow(y1 - ye, 2) / (rey * rey)
    return x + y <= 1
}

},{}],23:[function(require,module,exports){
var polygonEllipse = require('./polygon-ellipse')

/**
 * ellipse-polygon collision
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 */
module.exports = function ellipsePolygon(xe, ye, rex, rey, points)
{
    return polygonEllipse(points, xe, ye, rex, rey)
}
},{"./polygon-ellipse":42}],24:[function(require,module,exports){
module.exports = {
    circlePoint: require('./circle-point'),
    circleCircle: require('./circle-circle'),
    circleLine: require('./circle-line'),
    circleBox: require('./circle-box'),
    circlePolygon: require('./circle-polygon'),
    circleEllipse: require('./circle-ellipse'),
    // circleCircleOutline: require('./circle-circleOutline'),

    circleOutlineBox: require('./circleOutline-box'),
    circleOutlineLine: require('./circleOutline-line'),
    circleOutlinePoint: require('./circleOutline-point'),
    // circleOutlineCircle: require('./circleOutline-circle'),

    polygonPoint: require('./polygon-point'),
    polygonLine: require('./polygon-line'),
    polygonPolygon: require('./polygon-polygon'),
    polygonBox: require('./polygon-box'),
    polygonCircle: require('./polygon-circle'),
    polygonEllipse: require('./polygon-ellipse'),

    boxPoint: require('./box-point'),
    boxBox: require('./box-box'),
    boxLine: require('./box-line'),
    boxPolygon: require('./box-polygon'),
    boxCircle: require('./box-circle'),
    boxEllipse: require('./box-ellipse'),
    boxCircleOutline: require('./box-circleOutline'),

    pointBox: require('./point-box'),
    pointPolygon: require('./point-polygon'),
    pointCircle: require('./point-circle'),
    pointLine: require('./point-line'),
    pointEllipse: require('./point-ellipse'),
    pointCircleOutline: require('./point-circleOutline'),

    lineLine: require('./line-line'),
    lineBox: require('./line-box'),
    linePolygon: require('./line-polygon'),
    lineCircle: require('./line-circle'),
    linePoint: require('./line-point'),
    lineEllipse: require('./line-ellipse'),
    lineCircleOutline: require('./line-circleOutline'),

    ellipsePoint: require('./ellipse-point'),
    ellipseLine: require('./ellipse-line'),
    ellipseBox: require('./ellipse-box'),
    ellipseCircle: require('./ellipse-circle'),
    ellipseEllipse: require('./ellipse-ellipse'),
    ellipsePolygon: require('./ellipse-polygon')
}
},{"./box-box":1,"./box-circle":2,"./box-circleOutline":3,"./box-ellipse":4,"./box-line":5,"./box-point":6,"./box-polygon":7,"./circle-box":8,"./circle-circle":9,"./circle-ellipse":10,"./circle-line":11,"./circle-point":12,"./circle-polygon":13,"./circleOutline-box":14,"./circleOutline-line":15,"./circleOutline-point":16,"./ellipse-box":17,"./ellipse-circle":18,"./ellipse-ellipse":19,"./ellipse-line":21,"./ellipse-point":22,"./ellipse-polygon":23,"./line-box":25,"./line-circle":26,"./line-circleOutline":27,"./line-ellipse":28,"./line-line":29,"./line-point":30,"./line-polygon":31,"./point-box":34,"./point-circle":35,"./point-circleOutline":36,"./point-ellipse":37,"./point-line":38,"./point-polygon":39,"./polygon-box":40,"./polygon-circle":41,"./polygon-ellipse":42,"./polygon-line":43,"./polygon-point":44,"./polygon-polygon":45}],25:[function(require,module,exports){
'use strict'

var boxPoint = require('./box-point')
var lineLine = require('./line-line')

/**
 * line-box collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number} xb top-left of box
 number @param {number} yb top-left of box
 number @param {number} wb width of box
 number @param {number} hb height of box
 */
module.exports = function lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
{
    if (boxPoint(xb, yb, wb, hb, x1, y1) || boxPoint(xb, yb, wb, hb, x2, y2))
    {
        return true
    }
    return lineLine(x1, y1, x2, y2, xb, yb, xb + wb, yb) ||
        lineLine(x1, y1, x2, y2, xb + wb, yb, xb + wb, yb + hb) ||
        lineLine(x1, y1, x2, y2, xb, yb + hb, xb + wb, yb + hb) ||
        lineLine(x1, y1, x2, y2, xb, yb, xb, yb + hb)
}

},{"./box-point":6,"./line-line":29}],26:[function(require,module,exports){
'use strict'

/**
 * line-circle collision
 number @param {number} x1 point 1 of line
 number @param {number} y1 point 1 of line
 number @param {number} x2 point 2 of line
 number @param {number} y2 point 2 of line
 number @param {number} xc center of circle
 number @param {number} yc center of circle
 number @param {number} rc radius of circle
 */
module.exports = function lineCircle(x1, y1, x2, y2, xc, yc, rc)
{
    var ac = [xc - x1, yc - y1]
    var ab = [x2 - x1, y2 - y1]
    var ab2 = dot(ab, ab)
    var acab = dot(ac, ab)
    var t = acab / ab2
    t = (t < 0) ? 0 : t
    t = (t > 1) ? 1 : t
    var h = [(ab[0] * t + x1) - xc, (ab[1] * t + y1) - yc]
    var h2 = dot(h, h)
    return h2 <= rc * rc
}

function dot(v1, v2)
{
    return (v1[0] * v2[0]) + (v1[1] * v2[1])
}

},{}],27:[function(require,module,exports){
var circleOutlineLine = require('./circleOutline-line')

/**
 * line-circleOutline collision
 * @param {number} x1 of point 1 of line
 * @param {number} y1 of point 1 of line
 * @param {number} x2 of point 2 of line
 * @param {number} y2 of point 2 of line
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} thickness of circle outline
 */
module.exports = function lineCircleOutline(x1, y1, x2, y2, xc, yc, rc, thickness)
{
    return circleOutlineLine(xc, yc, rc, x1, y1, x2, y2, thickness)
}
},{"./circleOutline-line":15}],28:[function(require,module,exports){
var ellipseLine = require('./ellipse-line')

/**
 * line-ellipse collision
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rx radius-x of ellipse
 * @param {number} ry radius-y of ellipse
 */
module.exports = function lineEllipse(x1, y1, x2, y2, xe, ye, rex, rey)
{
    return ellipseLine(xe, ye, rex, rey, x1, y1, x2, y2)
}
},{"./ellipse-line":21}],29:[function(require,module,exports){
'use strict'

const lineToPolygon = require('./lineToPolygon')
const polygonPolygon = require('./polygon-polygon')
const linePolygon = require('./line-polygon')
const lineToLine = require('./lineToLine')

/**
 * line-line collision
 * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
 * @param {number} x1 first point in line 1
 * @param {number} y1 first point in line 1
 * @param {number} x2 second point in line 1
 * @param {number} y2 second point in line 1
 * @param {number} x3 first point in line 2
 * @param {number} y3 first point in line 2
 * @param {number} x4 second point in line 2
 * @param {number} y4 second point in line 2
 * @param {number} [thickness1] of line 1 (the line is centered in its thickness--see demo)
 * @param {number} [thickness2] of line 2 (the line is centered in its thickness--see demo)
 * @return {boolean}
 */
module.exports = function lineLine(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
{
    if (thickness1 || thickness2)
    {
        return lineLineThickness(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
    }
    else
    {
        return lineToLine(x1, y1, x2, y2, x3, y3, x4, y4)
    }
}

function lineLineThickness(x1, y1, x2, y2, x3, y3, x4, y4, thickness1, thickness2)
{
    if (thickness1 && thickness2)
    {
        return polygonPolygon(lineToPolygon(x1, y1, x2, y2, thickness1), lineToPolygon(x3, y3, x4, y4, thickness2))
    }
    else if (thickness1)
    {
        return linePolygon(x3, y3, x4, y4, lineToPolygon(x1, y1, x2, y2, thickness1))
    }
    else if (thickness2)
    {
        return linePolygon(x1, y1, x2, y2, lineToPolygon(x3, y3, x4, y4, thickness1))
    }
}
},{"./line-polygon":31,"./lineToLine":32,"./lineToPolygon":33,"./polygon-polygon":45}],30:[function(require,module,exports){
'use strict'

function distanceSquared(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

/**
 * line-point collision
 * from https://stackoverflow.com/a/17693146/1955997
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @param {number} xp point
 * @param {number} yp point
 * @param {number} [tolerance=1]
 * @return {boolean}
 */
module.exports = function linePoint(x1, y1, x2, y2, xp, yp, tolerance)
{
    tolerance = tolerance || 1
    return Math.abs(distanceSquared(x1, y1, x2, y2) - (distanceSquared(x1, y1, xp, yp) + distanceSquared(x2, y2, xp, yp))) <= tolerance
}
},{}],31:[function(require,module,exports){
var polygonPoint = require('./polygon-point')
var lineLine = require('./lineToLine')

/**
 * line-polygon collision
 @param {number} x1 point 1 of line
 @param {number} y1 point 1 of line
 @param {number} x2 point 2 of line
 @param {number} y2 point 2 of line
 @param {number[]} points of polygon
 @param {tolerance=1} maximum distance of point to polygon's edges that triggers collision (see pointLine)
 */
module.exports = function linePolygon(x1, y1, x2, y2, points, tolerance)
{
    var length = points.length

    // check if first point is inside the shape (this covers if the line is completely enclosed by the shape)
    if (polygonPoint(points, x1, y1, tolerance))
    {
        return true
    }

    // check for intersections for all of the sides
    for (var i = 0; i < length; i += 2)
    {
        var j = (i + 2) % length
        if (lineLine(x1, y1, x2, y2, points[i], points[i + 1], points[j], points[j + 1]))
        {
            return true
        }
    }
    return false
}

},{"./lineToLine":32,"./polygon-point":44}],32:[function(require,module,exports){
'use strict'

/**
 * lineToLine helper function (to avoid circular dependencies)
 * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
 * @param {number} x1 first point in line 1
 * @param {number} y1 first point in line 1
 * @param {number} x2 second point in line 1
 * @param {number} y2 second point in line 1
 * @param {number} x3 first point in line 2
 * @param {number} y3 first point in line 2
 * @param {number} x4 second point in line 2
 * @param {number} y4 second point in line 2
 * @return {boolean}
 */
module.exports = function lineToLine(x1, y1, x2, y2, x3, y3, x4, y4)
{
    var s1_x = x2 - x1
    var s1_y = y2 - y1
    var s2_x = x4 - x3
    var s2_y = y4 - y3
    var s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y)
    var t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y)
    return s >= 0 && s <= 1 && t >= 0 && t <= 1
}
},{}],33:[function(require,module,exports){
'use strict'

/**
 * turns a line into a polygon using thickness
 * @param {number} x1 first point of line
 * @param {number} y1 first point of line
 * @param {number} x2 second point of line
 * @param {number} y2 second point of line
 * @param {number} thickness of line
 */
module.exports = function lineToPolygon(x1, y1, x2, y2, thickness)
{
    const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2
    const half = thickness / 2
    const cos = Math.cos(angle) * half
    const sin = Math.sin(angle) * half
    return [
        x1 - cos, y1 - sin,
        x2 - cos, y2 - sin,
        x2 + cos, y2 + sin,
        x1 + cos, y1 + sin
    ]
}
},{}],34:[function(require,module,exports){
'use strict'

var boxPoint = require('./box-point')

/**
 * point-box collision
 * @param {number} x1 point
 * @param {number} y1 point
 * @param {number} xb top-left corner of box
 * @param {number} yb top-left corner of box
 * @param {number} wb width of box
 * @param {number} hb height of box
 * @return {boolean}
 */
module.exports = function pointBox(x1, y1, xb, yb, wb, hb)
{
    return boxPoint(xb, yb, wb, hb, x1, y1)
}

},{"./box-point":6}],35:[function(require,module,exports){
'use strict'

var circlePoint = require('./circle-point')

module.exports = function pointCircle(x1, y1, xc, yc, rc)
{
    return circlePoint(xc, yc, rc, x1, y1)
}

},{"./circle-point":12}],36:[function(require,module,exports){
var circleOutlinePoint = require('./circleOutline-point')

/**
 * point-circleOutline collision
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {radius} rc radius of circle
 * @param {number} thickness of circle outline
 */
module.exports = function pointCircleOutline(x, y, xc, yc, rc, thickness)
{
    return circleOutlinePoint(x, y, xc, yc, rc, thickness)
}
},{"./circleOutline-point":16}],37:[function(require,module,exports){
var ellipsePoint = require('./ellipse-point')

/**
 * point-ellipse collision
 * @param {number} x1 point
 * @param {number} y1 point
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {radius} rex radius-x of ellipse
 * @param {radius} rey radius-y of ellipse
 * @return {boolean}
 */
module.exports = function pointEllipse(x1, y1, xe, ye, rex, rey)
{
    return ellipsePoint(xe, ye, rex, rey, x1, y1)
}
},{"./ellipse-point":22}],38:[function(require,module,exports){
'use strict'

var linePoint = require('./line-point')

/**
 * point-line collision
 * @param {number} xp point
 * @param {number} yp point
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @return {boolean}
 */
module.exports = function pointLine(xp, yp, x1, y1, x2, y2)
{
    return linePoint(x1, y1, x2, y2, xp, yp)
}

},{"./line-point":30}],39:[function(require,module,exports){
'use strict'

var polygonPoint = require('./polygon-point')

/**
 * polygon-point collision
 * based on https://stackoverflow.com/a/17490923/1955997
 * @param {number} x1
 * @param {number} y1
 * @param {number[]} points
 * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
 * @return {boolean}
 */
module.exports = function pointPolygon(x1, y1, points, tolerance)
{
    return polygonPoint(points, x1, y1, tolerance)
}

},{"./polygon-point":44}],40:[function(require,module,exports){
'use strict'

var polygonPolygon = require('./polygon-polygon')

/**
 * polygon-box collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of box
 * @param {number} y of box
 * @param {number} w of box
 * @param {number} h of box
 */
module.exports = function polygonBox(points, x, y, w, h)
{
    var points2 = [x, y, x + w, y, x + w, y + h, x, y + h]
    return polygonPolygon(points, points2)
}

},{"./polygon-polygon":45}],41:[function(require,module,exports){
var polygonPoint = require('./polygon-point')
var lineCircle = require('./line-circle')

/**
 * polygon-circle collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} xc center of circle
 * @param {number} yc center of circle
 * @param {number} rc radius of circle
 * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
 */
module.exports = function polygonCircle(points, xc, yc, rc, tolerance)
{
    if (polygonPoint(points, xc, yc, tolerance))
    {
        return true
    }
    var count = points.length
    for (var i = 0; i < count - 2; i += 2)
    {
        if (lineCircle(points[i], points[i + 1], points[i + 2], points[i + 3], xc, yc, rc))
        {
            return true
        }
    }
    return lineCircle(points[0], points[1], points[count - 2], points[count - 1], xc, yc, rc)
}

},{"./line-circle":26,"./polygon-point":44}],42:[function(require,module,exports){
var polygonPoint = require('./polygon-point')
var lineEllipse = require('./line-ellipse')

/**
 * polygon-ellipse collision
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} xe center of ellipse
 * @param {number} ye center of ellipse
 * @param {number} rex radius-x of ellipse
 * @param {number} rey radius-y of ellipse
 */
module.exports = function polygonEllipse(points, xe, ye, rex, rey)
{
    if (polygonPoint(points, xe, ye))
    {
        return true
    }
    var count = points.length
    for (var i = 0; i < count - 2; i += 2)
    {
        if (lineEllipse(points[i], points[i + 1], points[i + 2], points[i + 3], xe, ye, rex, rey))
        {
            return true
        }
    }
    return lineEllipse(points[0], points[1], points[count - 2], points[count - 1], xe, ye, rex, rey)
}
},{"./line-ellipse":28,"./polygon-point":44}],43:[function(require,module,exports){
var linePolygon = require('./line-polygon')

/**
 * polygon-line collisions
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x1 first point in line
 * @param {number} y1 first point in line
 * @param {number} x2 second point in line
 * @param {number} y2 second point in line
 * @param {tolerance=1} maximum distance of point to polygon's edges that triggers collision (see pointLine)
 * @return {boolean}
 */
module.exports = function polygonLine(points, x1, y1, x2, y2, tolerance)
{
    return linePolygon(x1, y1, x2, y2, points, tolerance)
}

},{"./line-polygon":31}],44:[function(require,module,exports){
'use strict'

const linePoint = require('./line-point')

/**
 * polygon-point collision
 * based on https://stackoverflow.com/a/17490923/1955997
 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
 * @param {number} x of point
 * @param {number} y of point
 * @param {number} [tolerance=1] maximum distance of point to polygon's edges that triggers collision (see pointLine)
 */
module.exports = function polygonPoint(points, x, y, tolerance)
{
    var length = points.length
    var c = false
    var i, j
    for (i = 0, j = length - 2; i < length; i += 2)
    {
        if (((points[i + 1] > y) !== (points[j + 1] > y)) && (x < (points[j] - points[i]) * (y - points[i + 1]) / (points[j + 1] - points[i + 1]) + points[i]))
        {
            c = !c
        }
        j = i
    }
    if (c)
    {
        return true
    }
    for (i = 0; i < length; i += 2)
    {
        var p1x = points[i]
        var p1y = points[i + 1]
        var p2x, p2y
        if (i === length - 2)
        {
            p2x = points[0]
            p2y = points[1]
        }
        else
        {
            p2x = points[i + 2]
            p2y = points[i + 3]
        }
        if (linePoint(p1x, p1y, p2x, p2y, x, y, tolerance))
        {
            return true
        }
    }
    return false
}

},{"./line-point":30}],45:[function(require,module,exports){
'use strict'

/**
 * polygon-polygon collision
 * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
 * @param {number[]} points1 [x1, y1, x2, y2, ... xn, yn] of first polygon
 * @param {number[]} points2 [x1, y1, x2, y2, ... xn, yn] of second polygon
 * @return {boolean}
 */
module.exports = function polygonPolygon(points1, points2)
{
    var a = points1
    var b = points2
    var polygons = [a, b]
    var minA, maxA, projected, minB, maxB, j
    for (var i = 0; i < polygons.length; i++)
    {
        var polygon = polygons[i]
        for (var i1 = 0; i1 < polygon.length; i1 += 2)
        {
            var i2 = (i1 + 2) % polygon.length
            var normal = { x: polygon[i2 + 1] - polygon[i1 + 1], y: polygon[i1] - polygon[i2] }
            minA = maxA = null
            for (j = 0; j < a.length; j += 2)
            {
                projected = normal.x * a[j] + normal.y * a[j + 1]
                if (minA === null || projected < minA)
                {
                    minA = projected
                }
                if (maxA === null || projected > maxA)
                {
                    maxA = projected
                }
            }
            minB = maxB = null
            for (j = 0; j < b.length; j += 2)
            {
                projected = normal.x * b[j] + normal.y * b[j + 1]
                if (minB === null || projected < minB)
                {
                    minB = projected
                }
                if (maxB === null || projected > maxB)
                {
                    maxB = projected
                }
            }
            if (maxA < minB || maxB < minA)
            {
                return false
            }
        }
    }
    return true
}

},{}],46:[function(require,module,exports){
var util = require('../src/util')
var bind = util.bind
var each = util.each
var create = util.create
var slice = util.slice

module.exports = eventsPlugin

function eventsPlugin() {
	var pubsub = _newPubSub()

	return {
		watch: watch,
		unwatch: unwatch,
		once: once,

		set: set,
		remove: remove,
		clearAll: clearAll
	}

	// new pubsub functions
	function watch(_, key, listener) {
		return pubsub.on(key, bind(this, listener))
	}
	function unwatch(_, subId) {
		pubsub.off(subId)
	}
	function once(_, key, listener) {
		pubsub.once(key, bind(this, listener))
	}

	// overwrite function to fire when appropriate
	function set(super_fn, key, val) {
		var oldVal = this.get(key)
		super_fn()
		pubsub.fire(key, val, oldVal)
	}
	function remove(super_fn, key) {
		var oldVal = this.get(key)
		super_fn()
		pubsub.fire(key, undefined, oldVal)
	}
	function clearAll(super_fn) {
		var oldVals = {}
		this.each(function(val, key) {
			oldVals[key] = val
		})
		super_fn()
		each(oldVals, function(oldVal, key) {
			pubsub.fire(key, undefined, oldVal)
		})
	}
}


function _newPubSub() {
	return create(_pubSubBase, {
		_id: 0,
		_subSignals: {},
		_subCallbacks: {}
	})
}

var _pubSubBase = {
	_id: null,
	_subCallbacks: null,
	_subSignals: null,
	on: function(signal, callback) {
		if (!this._subCallbacks[signal]) {
			this._subCallbacks[signal] = {}
		}
		this._id += 1
		this._subCallbacks[signal][this._id] = callback
		this._subSignals[this._id] = signal
		return this._id
	},
	off: function(subId) {
		var signal = this._subSignals[subId]
		delete this._subCallbacks[signal][subId]
		delete this._subSignals[subId]
	},
	once: function(signal, callback) {
		var subId = this.on(signal, bind(this, function() {
			callback.apply(this, arguments)
			this.off(subId)
		}))
	},
	fire: function(signal) {
		var args = slice(arguments, 1)
		each(this._subCallbacks[signal], function(callback) {
			callback.apply(this, args)
		})
	}
}

},{"../src/util":49}],47:[function(require,module,exports){
var eventsPlugin = require('./events')

module.exports = [eventsPlugin, observePlugin]

function observePlugin() {
	return {
		observe: observe,
		unobserve: unobserve
	}

	function observe(_, key, callback) {
		var subId = this.watch(key, callback)
		callback(this.get(key))
		return subId
	}
	function unobserve(_, subId) {
		this.unwatch(subId)
	}
}

},{"./events":46}],48:[function(require,module,exports){
var util = require('./util')
var slice = util.slice
var pluck = util.pluck
var each = util.each
var bind = util.bind
var create = util.create
var isList = util.isList
var isFunction = util.isFunction
var isObject = util.isObject

module.exports = {
	createStore: createStore
}

var storeAPI = {
	version: '2.0.12',
	enabled: false,
	
	// get returns the value of the given key. If that value
	// is undefined, it returns optionalDefaultValue instead.
	get: function(key, optionalDefaultValue) {
		var data = this.storage.read(this._namespacePrefix + key)
		return this._deserialize(data, optionalDefaultValue)
	},

	// set will store the given value at key and returns value.
	// Calling set with value === undefined is equivalent to calling remove.
	set: function(key, value) {
		if (value === undefined) {
			return this.remove(key)
		}
		this.storage.write(this._namespacePrefix + key, this._serialize(value))
		return value
	},

	// remove deletes the key and value stored at the given key.
	remove: function(key) {
		this.storage.remove(this._namespacePrefix + key)
	},

	// each will call the given callback once for each key-value pair
	// in this store.
	each: function(callback) {
		var self = this
		this.storage.each(function(val, namespacedKey) {
			callback.call(self, self._deserialize(val), (namespacedKey || '').replace(self._namespaceRegexp, ''))
		})
	},

	// clearAll will remove all the stored key-value pairs in this store.
	clearAll: function() {
		this.storage.clearAll()
	},

	// additional functionality that can't live in plugins
	// ---------------------------------------------------

	// hasNamespace returns true if this store instance has the given namespace.
	hasNamespace: function(namespace) {
		return (this._namespacePrefix == '__storejs_'+namespace+'_')
	},

	// createStore creates a store.js instance with the first
	// functioning storage in the list of storage candidates,
	// and applies the the given mixins to the instance.
	createStore: function() {
		return createStore.apply(this, arguments)
	},
	
	addPlugin: function(plugin) {
		this._addPlugin(plugin)
	},
	
	namespace: function(namespace) {
		return createStore(this.storage, this.plugins, namespace)
	}
}

function _warn() {
	var _console = (typeof console == 'undefined' ? null : console)
	if (!_console) { return }
	var fn = (_console.warn ? _console.warn : _console.log)
	fn.apply(_console, arguments)
}

function createStore(storages, plugins, namespace) {
	if (!namespace) {
		namespace = ''
	}
	if (storages && !isList(storages)) {
		storages = [storages]
	}
	if (plugins && !isList(plugins)) {
		plugins = [plugins]
	}

	var namespacePrefix = (namespace ? '__storejs_'+namespace+'_' : '')
	var namespaceRegexp = (namespace ? new RegExp('^'+namespacePrefix) : null)
	var legalNamespaces = /^[a-zA-Z0-9_\-]*$/ // alpha-numeric + underscore and dash
	if (!legalNamespaces.test(namespace)) {
		throw new Error('store.js namespaces can only have alphanumerics + underscores and dashes')
	}
	
	var _privateStoreProps = {
		_namespacePrefix: namespacePrefix,
		_namespaceRegexp: namespaceRegexp,

		_testStorage: function(storage) {
			try {
				var testStr = '__storejs__test__'
				storage.write(testStr, testStr)
				var ok = (storage.read(testStr) === testStr)
				storage.remove(testStr)
				return ok
			} catch(e) {
				return false
			}
		},

		_assignPluginFnProp: function(pluginFnProp, propName) {
			var oldFn = this[propName]
			this[propName] = function pluginFn() {
				var args = slice(arguments, 0)
				var self = this

				// super_fn calls the old function which was overwritten by
				// this mixin.
				function super_fn() {
					if (!oldFn) { return }
					each(arguments, function(arg, i) {
						args[i] = arg
					})
					return oldFn.apply(self, args)
				}

				// Give mixing function access to super_fn by prefixing all mixin function
				// arguments with super_fn.
				var newFnArgs = [super_fn].concat(args)

				return pluginFnProp.apply(self, newFnArgs)
			}
		},

		_serialize: function(obj) {
			return JSON.stringify(obj)
		},

		_deserialize: function(strVal, defaultVal) {
			if (!strVal) { return defaultVal }
			// It is possible that a raw string value has been previously stored
			// in a storage without using store.js, meaning it will be a raw
			// string value instead of a JSON serialized string. By defaulting
			// to the raw string value in case of a JSON parse error, we allow
			// for past stored values to be forwards-compatible with store.js
			var val = ''
			try { val = JSON.parse(strVal) }
			catch(e) { val = strVal }

			return (val !== undefined ? val : defaultVal)
		},
		
		_addStorage: function(storage) {
			if (this.enabled) { return }
			if (this._testStorage(storage)) {
				this.storage = storage
				this.enabled = true
			}
		},

		_addPlugin: function(plugin) {
			var self = this

			// If the plugin is an array, then add all plugins in the array.
			// This allows for a plugin to depend on other plugins.
			if (isList(plugin)) {
				each(plugin, function(plugin) {
					self._addPlugin(plugin)
				})
				return
			}

			// Keep track of all plugins we've seen so far, so that we
			// don't add any of them twice.
			var seenPlugin = pluck(this.plugins, function(seenPlugin) {
				return (plugin === seenPlugin)
			})
			if (seenPlugin) {
				return
			}
			this.plugins.push(plugin)

			// Check that the plugin is properly formed
			if (!isFunction(plugin)) {
				throw new Error('Plugins must be function values that return objects')
			}

			var pluginProperties = plugin.call(this)
			if (!isObject(pluginProperties)) {
				throw new Error('Plugins must return an object of function properties')
			}

			// Add the plugin function properties to this store instance.
			each(pluginProperties, function(pluginFnProp, propName) {
				if (!isFunction(pluginFnProp)) {
					throw new Error('Bad plugin property: '+propName+' from plugin '+plugin.name+'. Plugins should only return functions.')
				}
				self._assignPluginFnProp(pluginFnProp, propName)
			})
		},
		
		// Put deprecated properties in the private API, so as to not expose it to accidential
		// discovery through inspection of the store object.
		
		// Deprecated: addStorage
		addStorage: function(storage) {
			_warn('store.addStorage(storage) is deprecated. Use createStore([storages])')
			this._addStorage(storage)
		}
	}

	var store = create(_privateStoreProps, storeAPI, {
		plugins: []
	})
	store.raw = {}
	each(store, function(prop, propName) {
		if (isFunction(prop)) {
			store.raw[propName] = bind(store, prop)			
		}
	})
	each(storages, function(storage) {
		store._addStorage(storage)
	})
	each(plugins, function(plugin) {
		store._addPlugin(plugin)
	})
	return store
}

},{"./util":49}],49:[function(require,module,exports){
(function (global){(function (){
var assign = make_assign()
var create = make_create()
var trim = make_trim()
var Global = (typeof window !== 'undefined' ? window : global)

module.exports = {
	assign: assign,
	create: create,
	trim: trim,
	bind: bind,
	slice: slice,
	each: each,
	map: map,
	pluck: pluck,
	isList: isList,
	isFunction: isFunction,
	isObject: isObject,
	Global: Global
}

function make_assign() {
	if (Object.assign) {
		return Object.assign
	} else {
		return function shimAssign(obj, props1, props2, etc) {
			for (var i = 1; i < arguments.length; i++) {
				each(Object(arguments[i]), function(val, key) {
					obj[key] = val
				})
			}			
			return obj
		}
	}
}

function make_create() {
	if (Object.create) {
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			return assign.apply(this, [Object.create(obj)].concat(assignArgsList))
		}
	} else {
		function F() {} // eslint-disable-line no-inner-declarations
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			F.prototype = obj
			return assign.apply(this, [new F()].concat(assignArgsList))
		}
	}
}

function make_trim() {
	if (String.prototype.trim) {
		return function trim(str) {
			return String.prototype.trim.call(str)
		}
	} else {
		return function trim(str) {
			return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
		}
	}
}

function bind(obj, fn) {
	return function() {
		return fn.apply(obj, Array.prototype.slice.call(arguments, 0))
	}
}

function slice(arr, index) {
	return Array.prototype.slice.call(arr, index || 0)
}

function each(obj, fn) {
	pluck(obj, function(val, key) {
		fn(val, key)
		return false
	})
}

function map(obj, fn) {
	var res = (isList(obj) ? [] : {})
	pluck(obj, function(v, k) {
		res[k] = fn(v, k)
		return false
	})
	return res
}

function pluck(obj, fn) {
	if (isList(obj)) {
		for (var i=0; i<obj.length; i++) {
			if (fn(obj[i], i)) {
				return obj[i]
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn(obj[key], key)) {
					return obj[key]
				}
			}
		}
	}
}

function isList(val) {
	return (val != null && typeof val != 'function' && typeof val.length == 'number')
}

function isFunction(val) {
	return val && {}.toString.call(val) === '[object Function]'
}

function isObject(val) {
	return val && {}.toString.call(val) === '[object Object]'
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],50:[function(require,module,exports){
module.exports = [
	// Listed in order of usage preference
	require('./localStorage'),
	require('./oldFF-globalStorage'),
	require('./oldIE-userDataStorage'),
	require('./cookieStorage'),
	require('./sessionStorage'),
	require('./memoryStorage')
]

},{"./cookieStorage":51,"./localStorage":52,"./memoryStorage":53,"./oldFF-globalStorage":54,"./oldIE-userDataStorage":55,"./sessionStorage":56}],51:[function(require,module,exports){
// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

var util = require('../src/util')
var Global = util.Global
var trim = util.trim

module.exports = {
	name: 'cookieStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var doc = Global.document

function read(key) {
	if (!key || !_has(key)) { return null }
	var regexpStr = "(?:^|.*;\\s*)" +
		escape(key).replace(/[\-\.\+\*]/g, "\\$&") +
		"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
	return unescape(doc.cookie.replace(new RegExp(regexpStr), "$1"))
}

function each(callback) {
	var cookies = doc.cookie.split(/; ?/g)
	for (var i = cookies.length - 1; i >= 0; i--) {
		if (!trim(cookies[i])) {
			continue
		}
		var kvp = cookies[i].split('=')
		var key = unescape(kvp[0])
		var val = unescape(kvp[1])
		callback(val, key)
	}
}

function write(key, data) {
	if(!key) { return }
	doc.cookie = escape(key) + "=" + escape(data) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/"
}

function remove(key) {
	if (!key || !_has(key)) {
		return
	}
	doc.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
}

function clearAll() {
	each(function(_, key) {
		remove(key)
	})
}

function _has(key) {
	return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie)
}

},{"../src/util":49}],52:[function(require,module,exports){
var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'localStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

function localStorage() {
	return Global.localStorage
}

function read(key) {
	return localStorage().getItem(key)
}

function write(key, data) {
	return localStorage().setItem(key, data)
}

function each(fn) {
	for (var i = localStorage().length - 1; i >= 0; i--) {
		var key = localStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return localStorage().removeItem(key)
}

function clearAll() {
	return localStorage().clear()
}

},{"../src/util":49}],53:[function(require,module,exports){
// memoryStorage is a useful last fallback to ensure that the store
// is functions (meaning store.get(), store.set(), etc will all function).
// However, stored values will not persist when the browser navigates to
// a new page or reloads the current page.

module.exports = {
	name: 'memoryStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var memoryStorage = {}

function read(key) {
	return memoryStorage[key]
}

function write(key, data) {
	memoryStorage[key] = data
}

function each(callback) {
	for (var key in memoryStorage) {
		if (memoryStorage.hasOwnProperty(key)) {
			callback(memoryStorage[key], key)
		}
	}
}

function remove(key) {
	delete memoryStorage[key]
}

function clearAll(key) {
	memoryStorage = {}
}

},{}],54:[function(require,module,exports){
// oldFF-globalStorage provides storage for Firefox
// versions 6 and 7, where no localStorage, etc
// is available.

var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'oldFF-globalStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var globalStorage = Global.globalStorage

function read(key) {
	return globalStorage[key]
}

function write(key, data) {
	globalStorage[key] = data
}

function each(fn) {
	for (var i = globalStorage.length - 1; i >= 0; i--) {
		var key = globalStorage.key(i)
		fn(globalStorage[key], key)
	}
}

function remove(key) {
	return globalStorage.removeItem(key)
}

function clearAll() {
	each(function(key, _) {
		delete globalStorage[key]
	})
}

},{"../src/util":49}],55:[function(require,module,exports){
// oldIE-userDataStorage provides storage for Internet Explorer
// versions 6 and 7, where no localStorage, sessionStorage, etc
// is available.

var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'oldIE-userDataStorage',
	write: write,
	read: read,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var storageName = 'storejs'
var doc = Global.document
var _withStorageEl = _makeIEStorageElFunction()
var disable = (Global.navigator ? Global.navigator.userAgent : '').match(/ (MSIE 8|MSIE 9|MSIE 10)\./) // MSIE 9.x, MSIE 10.x

function write(unfixedKey, data) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.setAttribute(fixedKey, data)
		storageEl.save(storageName)
	})
}

function read(unfixedKey) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	var res = null
	_withStorageEl(function(storageEl) {
		res = storageEl.getAttribute(fixedKey)
	})
	return res
}

function each(callback) {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		for (var i=attributes.length-1; i>=0; i--) {
			var attr = attributes[i]
			callback(storageEl.getAttribute(attr.name), attr.name)
		}
	})
}

function remove(unfixedKey) {
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.removeAttribute(fixedKey)
		storageEl.save(storageName)
	})
}

function clearAll() {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		storageEl.load(storageName)
		for (var i=attributes.length-1; i>=0; i--) {
			storageEl.removeAttribute(attributes[i].name)
		}
		storageEl.save(storageName)
	})
}

// Helpers
//////////

// In IE7, keys cannot start with a digit or contain certain chars.
// See https://github.com/marcuswestin/store.js/issues/40
// See https://github.com/marcuswestin/store.js/issues/83
var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
function fixKey(key) {
	return key.replace(/^\d/, '___$&').replace(forbiddenCharsRegex, '___')
}

function _makeIEStorageElFunction() {
	if (!doc || !doc.documentElement || !doc.documentElement.addBehavior) {
		return null
	}
	var scriptTag = 'script',
		storageOwner,
		storageContainer,
		storageEl

	// Since #userData storage applies only to specific paths, we need to
	// somehow link our data to a specific path.  We choose /favicon.ico
	// as a pretty safe option, since all browsers already make a request to
	// this URL anyway and being a 404 will not hurt us here.  We wrap an
	// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
	// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
	// since the iframe access rules appear to allow direct access and
	// manipulation of the document element, even for a 404 page.  This
	// document can be used instead of the current document (which would
	// have been limited to the current path) to perform #userData storage.
	try {
		/* global ActiveXObject */
		storageContainer = new ActiveXObject('htmlfile')
		storageContainer.open()
		storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
		storageContainer.close()
		storageOwner = storageContainer.w.frames[0].document
		storageEl = storageOwner.createElement('div')
	} catch(e) {
		// somehow ActiveXObject instantiation failed (perhaps some special
		// security settings or otherwse), fall back to per-path storage
		storageEl = doc.createElement('div')
		storageOwner = doc.body
	}

	return function(storeFunction) {
		var args = [].slice.call(arguments, 0)
		args.unshift(storageEl)
		// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
		// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
		storageOwner.appendChild(storageEl)
		storageEl.addBehavior('#default#userData')
		storageEl.load(storageName)
		storeFunction.apply(this, args)
		storageOwner.removeChild(storageEl)
		return
	}
}

},{"../src/util":49}],56:[function(require,module,exports){
var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'sessionStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll
}

function sessionStorage() {
	return Global.sessionStorage
}

function read(key) {
	return sessionStorage().getItem(key)
}

function write(key, data) {
	return sessionStorage().setItem(key, data)
}

function each(fn) {
	for (var i = sessionStorage().length - 1; i >= 0; i--) {
		var key = sessionStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return sessionStorage().removeItem(key)
}

function clearAll() {
	return sessionStorage().clear()
}

},{"../src/util":49}],57:[function(require,module,exports){
window.store = require('store/src/store-engine').createStore(require('store/storages/all'), require('store/plugins/observe'));
window.intersects = require('intersects');

console.log(store)
},{"intersects":24,"store/plugins/observe":47,"store/src/store-engine":48,"store/storages/all":50}]},{},[57]);
