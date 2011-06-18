var id = 'vis';
var graph;
function init() {    
    daisy();
}
var root;
var geo;
var paper; 
function RaphaelAdapter(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};
RaphaelAdapter.prototype.getBBox = function()
{
    return {x: this.x, y: this.y, width: this.width,height: this.height};
};
var daisy = function()
{
    paper = Raphael("paper", $("#paper").width(), $("#paper").height());

    
    root = createStarburst(seedWizardNumber(),
    {
        enable: true,
        onClick: function(node, eventInfo, e)
        {
            
            if (node.name == 'Geographics')
            {
                geo = createStarburst(seedGeographics(10));
                var polar = new $jit.Polar();
                polar.setp(node.startPos.theta,node.startPos.rho);

                var startCanvas = $("#"+e.target.id),
                    startPos = polar.getc(),       
                    startLineX = startCanvas.offset().left + (startCanvas.width() / 2) + startPos.x,
                    startLineY = startCanvas.offset().top  + (startCanvas.height() / 2) + startPos.y;
                
                
                var endCanvas = $("#"+geo.canvas.id),
                    endLineX = endCanvas.offset().left + (endCanvas.width() / 2),
                    endLineY = endCanvas.offset().top + (endCanvas.height() / 2);
//                paper.connection(new RaphaelAdapter(startLineX,startLineY,80,80), geo, "#fff");
                paper.path(["M",startLineX,startLineY,"L",endLineX,endLineY].join(",")).attr({stroke:"#FFF", "stroke-width": 2});
//                paper.circle(startLineX, startLineY, 60).attr({fill : "#F00"});
//                paper.circle(endLineX,endLineY, 60).attr({fill : "#F00"});                

                        

            }
        }
    });
    $("#"+root.canvas.id).css("left","40%");
    $("#"+root.canvas.id).css("top","20%");

    
    $(".sb").draggable({
        start: function()
        {
         // paper.clear();  
        },
        stop: function()
        {
         var data = root.json;
         $("#"+root.canvas.id).empty();
         root = createsb(root.canvas.id,data,
            {
                enable: true,
                onClick: function(node, eventInfo, e)
                {

                    if (node.name == 'Geographics')
                    {
                        
                        geo = createStarburst(seedGeographics(10));
                        var polar = new $jit.Polar();
                        polar.setp(node.startPos.theta,node.startPos.rho);

                        var startCanvas = $("#"+e.target.id),
                            startPos = polar.getc(),       
                            startLineX = startCanvas.offset().left + (startCanvas.width() / 2) + startPos.x,
                            startLineY = startCanvas.offset().top  + (startCanvas.height() / 2) + startPos.y;


                        var endCanvas = $("#"+geo.canvas.id),
                            endLineX = endCanvas.offset().left + (endCanvas.width() / 2),
                            endLineY = endCanvas.offset().top + (endCanvas.height() / 2);
                        paper.connection(new RaphaelAdapter(startLineX,startLineY,80,80), geo, "#fff");
                                       }
                }
            });
        }
    });
}
var createStarburst = function(data,evt)
{
    if (evt === undefined) evt = {};
    var sbId = 'sb_'+data.id;
    div = $('<div id="'+sbId+'" class="sb"></div>');
    div.css("left",(($(".sb").length * 300)+50)+"px");
    $("#"+id).append(div);
    return createsb(sbId,data,evt);
    

}
var createsb = function(div,data,evt)
{
    var sb = new $jit.Sunburst({
            injectInto: div,

            levelDistance: 40,
            Node: {
              overridable: true,
              type: 'gradient-multipie'
            },
            Events: evt,
            Label: {
              type: 'Native'
            },
            NodeStyles: {
              enable: true,
              
              type: 'Native',
              stylesClick: {
                'color': '#33dddd'
              },
              stylesHover: {
                'color': '#dd3333'
              }
            },
            clearCanvas: false  
        });

    //load JSON data.
    sb.loadJSON(data);    
    sb.refresh();   
    return sb;
}

$jit.Sunburst.prototype.getBBox = function()
{
    var c = $("#"+this.canvas.id);    
    console.log(c.offset().left + (c.width() / 2));
    return {x: c.offset().left + (c.width() / 2), 
            y: c.offset().top + (c.height() / 2), 
            width: c.width(),
            height: c.height()};
}


Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#FFF";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};