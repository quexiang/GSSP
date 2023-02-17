/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var width = document.getElementById('div_gpmap').offsetWidth
var height = width*9/16 //document.getElementById('div_gpmap').offsetHeight

function generatePoints(table) {
    var latArr = [];
    var lngArr = [];
    var lngIndex = 2;
    var latIndex = 3;

    for (var j = 1; j < table.length; ++j) {
        latArr.push(table[j][latIndex]);
        lngArr.push(table[j][lngIndex]);
    }

    var pointSet = new Set();
    for (var k = 0; k < latArr.length; ++k) {
        var lat = parseFloat(latArr[k]);
        var lng = parseFloat(lngArr[k]);
        if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            pointSet.add(lng + "," + lat);
        }
    }
    var points = "";
    for (let item of pointSet) {
        points += item + ",";
    }
    points = points.substring(0, points.length - 1);
    return points;
}

function initGraph(time, points) {
    //var width = 900;
    //var height = 400;
    var scale0 = (width - 1) / 2 / Math.PI;
    var eScale0 = (width - 1) / 2 / Math.PI,
            oScale0 = (width - 1) / 4;
    var svg = d3.select("body svg");
    svg.selectAll("svg > *").remove();
    var projRect = d3.geo.equirectangular()
            .scale(scale0)
            .rotate([0.1, 0, 0])
            .translate([width/2 , height / 2])
            .precision(.1);
    projection = projRect;
    path = d3.geo.path().projection(projRect);
    coastlinsLayer = svg.append('g');
    geometryLayer = svg.append('g');
    var graticuleLayer = svg.append('g');
    var graticule = d3.geo.graticule();
    graticuleLayer.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path);
    reconstruct(time, points);
}

//d3 showing
function reconstructPoints(time, points) {
    var url = "https://gws.gplates.org/reconstruct/reconstruct_points/?points=" + points + "&time=" + time + "&model=SETON2012";
    $("#request-url").html("<strong>Request URL:</strong> <br> <a href=\"" + url + "\" target=\"_blank\">" + url);
    d3.json(url, function (error, data) {
        $("#raw-data").html('<strong>Returned Raw Data:</strong> <pre>' + JSON.stringify(data, undefined, 4) + '</pre>');
        geometryLayer.selectAll("*").remove();
        var circle = d3.geo.circle();
        d3.selectAll(".pathPoint").remove();
        reconstructedPoints = [];
        data.coordinates.forEach(function (d) {
            reconstructedPoints.push([d[0], d[1]]);
            drawPoint(d);
        });
    });
}

function reconstruct(time, points) {
    d3.json("https://gws.gplates.org/reconstruct/static_polygons/?time=" + time + '&model=PALEOMAP', function (error, topology) {
        coastlinsLayer.selectAll(".coastline").remove();
        coastlinsLayer.selectAll(".coastline")
                .data(topology.features)
                .attr("class", "coastlines")
                .attr("d", path)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", "coastline")
                .on('mouseover', function (d, i) {
                    d3.select(this).style('fill-opacity', .7);
                    d3.select(this).style('stroke', 'red');
                    d3.select(this).style('stroke-width', '1px');
                })
                .on('mouseout', function (d, i) {
                    d3.select(this).style({
                        'fill-opacity': .5
                    });
                    d3.select(this).style('stroke', 'blue');
                    d3.select(this).style('stroke-width', '.25px');
                });
    });
    reconstructPoints(time, points);
}


function drawPoint(d, angle) {
    var _angle = angle || 1;
    geometryLayer.append("circle")
            .datum([d[0], d[1]])
            .attr("cx", function (d) {
                return projection(d)[0];
            })
            .attr("cy", function (d) {
                return projection(d)[1];
            })
            .attr("r", 3)
            //.attr("d",path)
            .style("fill", "red")
            .attr("class", "pathPoint")
            .append("svg:title")
            .text(function (d) {
                return "Longitude: " + d[0] + "\nLatitude: " + d[1]
            });
}