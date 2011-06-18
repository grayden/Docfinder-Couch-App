var id = 'vis';
function init() {    
    daisy();
}

//using Raphael for the background lines...
var paper; 

//keep track of the sunbursts on the canvas:
var sunbursts = {};

//keep track of the lines (paths)
var paths = [];
var getPath = function(startCanvas, srcNode, endCanvas)
{
    var polar = new $jit.Polar();
    polar.setp(srcNode.startPos.theta,srcNode.startPos.rho);
    var startPos = polar.getc(),       
        startLineX = startCanvas.offset().left + (startCanvas.width() / 2) + startPos.x,
        startLineY = startCanvas.offset().top  + (startCanvas.height() / 2) + startPos.y;
        endLineX = endCanvas.offset().left + (endCanvas.width() / 2),
        endLineY = endCanvas.offset().top + (endCanvas.height() / 2);
    
    // bezier curves would be a lot better here...
    return ["M",startLineX,startLineY,"L",endLineX,endLineY].join(",");

}
// redraw all the lines
var drawPaths = function()
{
    $.each(paths, function(k,v){
       paper.path(getPath($("#"+v[0]),v[1],$("#"+v[2]))).attr({stroke:"#FFF", "stroke-width": 2});
    });
}


function initDraggable()
{
    $(".sb").draggable({
        start: function()
        {
          paper.clear();  
          drawPaths();
        },
        drag: function()
        {
          paper.clear();  
          drawPaths();  
        },
        stop: function()
        {
         drawPaths();
         $.each(sunbursts, function(k,v)
         {
             var data = v.json;
             $("#"+v.canvas.id).empty();
             createsb(v.canvas.id,data,
             {
                enable: true,
                onClick: starburstOnClick
             });

         });
         
        }
    });
}

// initialize the daisy:
var daisy = function()
{
    paper = Raphael("paper", $("#paper").width(), $("#paper").height());
    var root = createStarburst(seedWizardNumber(),
    {
        enable: true,
        onClick: starburstOnClick
    });
    sunbursts[root.canvas.id] = root;
    $("#"+root.canvas.id).css("left","40%");
    $("#"+root.canvas.id).css("top","20%");
   
}
// starburst helpers
var starburstOnClick = function(node, eventInfo, e)
{
    if (node['_depth'] == 1)
    {
        //use reflection to pull in the see data
        var sb = createStarburst(eval('seed'+node.name+'(5)'),
        {
            enable: true,
            onClick: starburstOnClick
        });
        sunbursts[sb.canvas.id] = sb;
        paths.push([e.target.id,node,sb.canvas.id]);
        drawPaths();
    }    
}
var createStarburstContainer = function(data,evt)
{
    if (evt === undefined) evt = {};
    var sbId = 'sb_'+data.id;
    div = $('<div id="'+sbId+'" class="sb"></div>');
    div.css("left",(($(".sb").length * 300)+50)+"px");
    $("#"+id).append(div);
    initDraggable();
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
    sb.loadJSON(data);    
    sb.refresh();   
    return sb;
}