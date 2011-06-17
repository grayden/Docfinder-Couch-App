function TaxonomyCircle() {
    this.isDrawn = false;
    this.paper;
    this.rad = rad = Math.PI / 180;
}
TaxonomyCircle.prototype.data = {
    x : 220,
    y : 220,
    size : 120,
    taxonomy: []
}
TaxonomyCircle.prototype.draw = function(viz)
{
    var json = {
                "id":"372",
                "name":"n1",
                "data":{"height":0,"documents":[],"executors":[],"csystems":
[],"acts":[]},
                "children":[{
                        "id":"374",
                        "name":"n3",
                        "data":{"$type":"RoundEdgeRectangleWithHT","height":0,"documents":
['document1','document2','document3'],"executors":['executor1']},
                        "children":[{
                                "id":"704417904",
                                "name":"n2",
                                "data":{"height":0,"documents":[],"executors":[],"csystems":
[],"acts":[]}
                        }]
                }]
        }; 
   var st = new $jit.ST({
            injectInto: 'testbed',
            duration: 0,
            width: 1000, // arbitrary size
            height: 1000, // arbitrary size
            background: false,
            orientation: 'top',
            // orientation: 'left',
            levelDistance: 25,
            levelsToShow: 20,
            constrained: false,
            Node: {
                height: 25,
                width: 90,
                color:'#fff',
                lineWidth: 0,
                align:'center',
                type: 'rectangle',
                overridable: true
            },
            Edge: {
                type: 'bezier',
                lineWidth: 2,
                color:'#446',
                overridable: true
            },
            onAfterCompute: function(){
                var graph_nodes = st.graph.nodes;
                var x, y;
                /*
                for ( var i in graph_nodes )
                {
                    x = graph_nodes[i].pos.x;
                    y = graph_nodes[i].pos.y;
                    if ( x < st_left )
                        st_left = x;
                    if ( x > st_right )
                        st_right = x;
                    if ( y < st_top )
                        st_top = y;
                    if ( y > st_bottom )
                        st_bottom = y;
                }
                */
                console.log( 'onAfterCompute: left=' + st_left +',right=' + st_right + ',top=' + st_top + ',bottom=' + st_bottom );
            }
        });
        st.loadJSON(json);
        st.compute(); 
    return;
      var sb = new $jit.Sunburst({
        useCanvas: viz.canvas,
        //id container for the visualization
        //Distance between levels
        levelDistance: 50,
        //Change node and edge styles such as
        //color, width and dimensions.
        Node: {
          overridable: true,
          type: 'gradient-multipie'
        },
        //Select canvas labels
        //'HTML', 'SVG' and 'Native' are possible options
        Label: {
          type: 'Native'
        },
        //Change styles when hovering and clicking nodes
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
        //Add tooltips
        Tips: {
          enable: false,
          onShow: function(tip, node) {
          }
        },
        //implement event handlers
        Events: {
          enable: true,
          onClick: function(node) {
            if(!node) return;
            console.log(node.toSource());
            
            sb.tips.hide();
            //rotate
            sb.rotate(node, animate? 'animate' : 'replot', {
              duration: 1000,
              transition: $jit.Trans.Quart.easeInOut
            });
          }
        },
        clearCanvas: false  
    });
    
    //load JSON data.
    sb.loadJSON(this.data.taxonomy);
    //compute positions and plot.
    
    //console.log(sb.fx.plot());
    //sb.geom.translate(new $jit.Complex(0, 200), "start");
    sb.refresh();
    //end

    this.isDrawn = true;
    
    
}

TaxonomyCircle.prototype.getKey = function(obj)
{
    for(k in obj)
        return k;
}

TaxonomyCircle.prototype.drawn = function()
{
    return this.isDrawn;
}
TaxonomyCircle.prototype.update = function(taxonomy)
{
    this.data.taxonomy = taxonomy;
}
TaxonomyCircle.prototype.isObject = function(obj)
{
    if (this.isArray(obj)) return false;
    return (typeof obj === 'object');
}
TaxonomyCircle.prototype.isArray = function(obj)
{
    return (obj.constructor.toString().indexOf("Array") != -1);
}
