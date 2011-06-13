describe("TaxonomyCircle" , function() {
    var taxonomyCircle;
    var paper;
    var taxonomy;
    beforeEach(function() {
        taxonomyCircle = new TaxonomyCircle();
        $("#testbed").empty();
        paper = Raphael($("#testbed").get(0), 450, 450);
        
        taxonomy = 
          [
           {"Gender": ["Male", "Female"]}, 
           {"Cars": 
                    [
                     {"2 door" : ["sports car", "Fiat 500"]} , 
                     {"Van"    : ["Toyota thing", "VW Bus"]}
                    ]
           },
           {"Countries":
                   [
                    {"Canada" : [ 
                                 {"Ontario": ["Toronto"]},
                                 {"Quebec": ["Sherbrooke","Montreal"]}
                                ]
                    }
                   ]
           }
          ];

    });
    it ("should handle taxonomies recursively",function()
    {
        console.log('a');
        taxonomyCircle.update({Cars:[{'2 door':["sports car", "Fiat 500"]}, {Van:["Toyota thing", "VW Bus"]}]});
        expect(taxonomyCircle.getRingDepth(3)).toEqual([{depth:1,value:"Cars"}]);

    });
   /*
    it("should get taxonomy depth", function() 
    {
        taxonomyCircle.update(taxonomy);
        expect(taxonomyCircle.taxonomyDepth()).toEqual(4);
    })
    it("should get ring depth", function()
    {
        taxonomyCircle.update(taxonomy);
        expect(taxonomyCircle.getRingDepth(4)).toEqual([ 
        {
            "Ontario": ["Toronto"]
            },

            {
            "Quebec": ["Sherbrooke","Montreal"]
            }
        ]);
    });

    it("should have a default x / y / size", function()
    {
        expect(taxonomyCircle.data.x).toBeDefined();
        expect(taxonomyCircle.data.y).toBeDefined();
        expect(taxonomyCircle.data.size).toBeDefined();
    })
    it("should be able to be drawn to paper", function()
    {     
        taxonomyCircle.update(taxonomy);
        taxonomyCircle.draw(paper);
        expect(taxonomyCircle.drawn()).toBeTruthy();
    });
    
    
    
    it("should accept taxonomy data", function()
    {
          
        taxonomyCircle.update(taxonomy);
        taxonomyCircle.draw(paper);
        
        taxonomyCircle.draw();
        
    });
    */
    
});