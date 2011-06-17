var labelType, useGradients, nativeTextSupport, animate;
var id = 'infovis';

var Log = {
  elem: true,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init() {
    //init data
    var rootSunburstJSON = {
      'id': 'sb0',
      'name': '',
      'data': {
          '$type': 'none'
      },
      'children':[
        {
            'id':'sb1',
            'name': '',
            'data': {
                '$angularWidth': 20,
                '$color': '#f55'
            },
            'children': []
        }
        
      ]
    };

    var sunburstJSON = {
      'id': 'root',
      'name': 'root',
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
            'id':'sb2',
            'name': '',
            'data': {
                '$angularWidth': 40,
                '$color': '#77f',
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
    //end
    
    var container = new $jit.RGraph({
        'injectInto': id,
        levelDistance: 15,
        withLabels: false,
        clearCanvas: false
    });
    //load graph.
    container.loadJSON(rootSunburstJSON);
    container.compute();
    //end
    
    //init st
    var tree = new $jit.ST({
        useCanvas: container.canvas,
        orientation: 'bottom',
        //Add node/edge styles
        Node: {
           type: 'sb',
           width: 60,
           height: 60
        },
        Edge: {
            color: '#999',
            type: 'quadratic:begin'
        },
        //Parent-children distance
        levelDistance: 200

    });
    //load json data
    tree.loadJSON(rootSunburstJSON);
    //compute node positions and layout
    tree.compute();
    //optional: make a translation of the tree
    tree.geom.translate(new $jit.Complex(0, 200), "start");
    //Emulate a click on the root node.
    tree.onClick(tree.root, {
        Move: {
            offsetY: -90
        }
    });

    $jit.ST.Plot.NodeTypes.implement({  
            'sb': {  
                    'render': function(node, canvas) {
                        console.log(node.data.toSource());
                        console.log('render sb');
                    }
            }
    });
    
    
    

    //end
}
function createsb(c,data)
{
    //console.log(c);
    //return;
    var sb = new $jit.Sunburst({
        useCanvas: c,
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
        //implement event handlers
        Events: {
          enable: false,
          onClick: function(node) {
            if(!node) return;
            // do something when you click on a sb
          }
        },
        clearCanvas: false  
    });
    
    //load JSON data.
    sb.loadJSON(data);
    //compute positions and plot.
    
    //console.log(sb.fx.plot());
    //sb.geom.translate(new $jit.Complex(0, 200), "start");
    sb.refresh();
    
}


$jit.ST.Plot.NodeTypes.implement({  
	'adv-rect': {  
		'render': function(node, canvas) {  
			var width = node.getData('width'),  
				height = node.getData('height'),  
				pos = this.getAlignedPos(node.pos.getc(true), width, height),  
				posX = pos.x + width/2,
				posY = pos.y + height/2,
				radius = node.getCanvasStyle("radius"),
				RoundRect = {
					'render': function(type, pos, width, height, radius, canvas) {
						var ctx = canvas.getCtx(),
							x = pos.x - width/2,
							y = pos.y - height/2;
	
						ctx.beginPath();  
						ctx.moveTo(x,y+radius);  
						ctx.lineTo(x,y+height-radius);  
						ctx.quadraticCurveTo(x,y+height,x+radius,y+height);  
						ctx.lineTo(x+width-radius,y+height);  
						ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);  
						ctx.lineTo(x+width,y+radius);  
						ctx.quadraticCurveTo(x+width,y,x+width-radius,y);  
						ctx.lineTo(x+radius,y);  
						ctx.quadraticCurveTo(x,y,x,y+radius);  
						ctx[type]();
					}	
				};

			if (radius > 0) {
				RoundRect.render('fill', {x: posX, y: posY}, width, height, radius, canvas);
				RoundRect.render('stroke', {x: posX, y: posY}, width, height, radius, canvas);
			} else {
				this.nodeHelper.rectangle.render('fill', {x: posX, y: posY}, width, height, canvas);  
				this.nodeHelper.rectangle.render('stroke', {x: posX, y: posY}, width, height, canvas);
			}  
		},
		'contains': function(node, pos) {
			var width = node.getData('width'),
				height = node.getData('height'),
				npos = this.getAlignedPos(node.pos.getc(true), width, height);
			return this.nodeHelper.rectangle.contains({x:npos.x+width/2, y:npos.y+height/2}, pos, width, height);
		}
	}
});