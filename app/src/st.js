var labelType, useGradients, nativeTextSupport, animate;
var id = 'infovis';

var Log = {
  elem: true,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    //this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init() {
    //init data
    var rootSunburstJSON = {
      'id': 'sb0',
      'name': '',
      'data': {
          '$type': 'none',
          'sunburst':
                       {
                           id:"Cars",
                           name: "cars",
                           data: {
                               "$angularWidth": 200,
                               "$color": "#FAFAFA"
                               },
                           children: [
                                {
                                   id:"2-door",
                                   name: "2-door",
                                   data: {
                                       "$angularWidth": 50,
                                       "$color": "#BABBBB"
                                       },
                                   children: [
                                       {
                                       id:"farrariracecar",
                                       name: "Farrari race car",
                                       data: {
                                           "$angularWidth": 50,
                                           "$color": "#BABBBB"
                                           },
                                       children: []
                                       },
                                       {
                                       id:"Corvette",
                                       name: "Corvette",
                                       data: {
                                           "$angularWidth": 50,
                                           "$color": "#BABBBB"
                                           },
                                       children: []
                                       }
                                   ]
                               },
                               {
                                   data: {
                                       "$angularWidth": 50,
                                       "$color": "#CACCCC"
                                       },
                                   id:"Vans",
                                   name: "Vans"                                              
                               }
                            ]
                       }
      },
      'children':[
        {
            'id':'sb1',
            'name': '',
            'data': {
                '$angularWidth': 20,
                '$color': '#f55',
                'sunburst':
                       {
                           id:"Gender",
                           name: "Gender",
                           data: {
                               "$angularWidth": 200,
                               "$color": "#FAFAFA"
                               },
                           children: [
                               {
                                   data: {
                                       "$angularWidth": 50,
                                       "$color": "#BABBBB"
                                       },
                                   id:"male",
                                   name: "Male"
                               },
                               {
                                   data: {
                                       "$angularWidth": 50,
                                       "$color": "#CACCCC"
                                       },
                                   id:"fmale",
                                   name: "Female"                                              
                               }
                            ]
                       }
            },
            'children': []
        }
        
      ]
    };



    $jit.Hypertree.Plot.NodeTypes.implement({  
            'sb': {  

      'render': function(node, canvas) {
        var nconfig = this.node,
            dim = node.getData('dim'),
            p = node.pos.getc();
        dim = nconfig.transform? dim * (1 - p.squaredNorm()) : dim;
        p.$scale(node.scale);
/*
        if (dim > 0.2) {
          this.nodeHelper.circle.render('fill', p, dim, canvas);
        }
        */
       /*
                    bursts[node.data.id] = new $jit.Sunburst({
                                                useCanvas: canvas,

                                                levelDistance: 40,
                                                Node: {
                                                  overridable: true,
                                                  type: 'gradient-multipie'
                                                },
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
                        bursts[node.data.id].loadJSON(node.data.sunburst);
                        bursts[node.data.id].compute();
                        bursts[node.data.id].refresh();
                        */
      },
      'contains': function(node, pos) {
        var dim = node.getData('dim'),
            npos = node.pos.getc().$scale(node.scale);
        return this.nodeHelper.circle.contains(npos, pos, dim);
      },

                    'Arender': function(node, canvas) {
                        
                        
                        
                    
                    if (bursts[data.id] == undefined || true)
                    {
                        bursts[data.id] = new $jit.Sunburst({
                                                useCanvas: canvas,

                                                levelDistance: 40,
                                                Node: {
                                                  overridable: true,
                                                  type: 'gradient-multipie'
                                                },
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
                        bursts[data.id].loadJSON(node.data.sunburst);
                        bursts[data.id].compute();
                        bursts[data.id].refresh();
                    }
                    
                }
                    
                    
            }
    });
/*
    var container = new $jit.Hypertree(
    {
        //useCanvas : container.canvas,
        injectInto: id,
        clickedNodeId: "",
        clickedNodeName: "",
        Node:
        {
           type: 'sb',
           width: 100,
           height: 100
        },
        onAfterPlotLine: function() {
          
        },
        clearCanvas: true
    
    });

    //load json data
    container.loadJSON(rootSunburstJSON);
    //compute node positions and layout
    container.compute();
    container.onClick(container.root, {
        Move: {
            offsetY: -90
        }
    });
    */


var bursts = {};


var sb = new $jit.Sunburst({
        injectInto: "foobar",

        levelDistance: 40,
        Node: {
          overridable: true,
          type: 'gradient-multipie'
        },
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
sb.loadJSON(rootSunburstJSON.data.sunburst);
sb.compute();
sb.refresh();

}