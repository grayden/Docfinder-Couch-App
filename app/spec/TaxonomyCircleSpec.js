describe("TaxonomyCircle" , function() {
    var taxonomyCircle;
    var viz;
    var taxonomy;
    beforeEach(function() {
        taxonomyCircle = new TaxonomyCircle();
        $("#testbed").empty();
        /*
        viz = new $jit.RGraph({  
          injectInto: 'testbed',  
          width: 1500,  
          height: 900  
        });
        $jit.ST.Plot.NodeTypes.implement({
            //Create a new node type that renders an entire RGraph visualization
            'sunburst': {
              'render': function(node, canvas, animating) {
                  console.log('render-sb');
                var ctx = canvas.getCtx(), pos = node.pos.getc(true);
                ctx.save();
                ctx.translate(pos.x, pos.y);
                pie.plot();
                ctx.restore();
              }
            }
        });
        */
        taxonomy = {
          children: [
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
           },
           {
               id:"Cars",
               name: "Cars",
               data: {
                   "$angularWidth": 10,
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
          ],
            id: "MyTaxonomy",
            name: "My Taxonomy"
         };
    });

    it("should have a default x / y / size", function()
    {
        expect(taxonomyCircle.data.x).toBeDefined();
        expect(taxonomyCircle.data.y).toBeDefined();
        expect(taxonomyCircle.data.size).toBeDefined();
    });
    it("should be able to be drawn to paper", function()
    {     
        //taxonomyCircle.update(taxonomy);
        //taxonomyCircle.draw(viz);
        //expect(taxonomyCircle.drawn()).toBeTruthy();
        
        taxonomyCircle2 = new TaxonomyCircle();
        taxonomyCircle2.update(taxonomy);
        taxonomyCircle2.draw(viz);
        
    });
});

         
     