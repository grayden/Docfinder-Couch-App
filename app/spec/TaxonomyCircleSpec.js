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
          taxonomy = 
          [
           {"Gender": ["Male", "Female"]}, 
           {"Cars": 
                    [
                    'a' 
                    ]
           }
          ];

    });
    it("should be able to be drawn to paper", function()
    {     
        taxonomyCircle.update(taxonomy);
        taxonomyCircle.draw(paper);
        expect(taxonomyCircle.drawn()).toBeTruthy();
    });
    return;
    it ("should handle taxonomies recursively",function()
    {
        taxonomyCircle.update({"Cars":[{'2 door':["sports car", "Fiat 500"]}, {'Van':["Toyota thing", "VW Bus"]}]});
        expect(taxonomyCircle.getRingDepth(3)).toEqual([
         { depth : 3, value : 'sports car' }, 
         { depth : 3, value : 'Fiat 500' }, 
         { depth : 3, value : 'Toyota thing' }, 
         { depth : 3, value : 'VW Bus' }     
        ]);
    });
    it ("should get flattened taxonomies recursively",function()
    {
        var ar = {"Cars":[
                    {'2 door':["sports car", "Fiat 500"]}, 
                    {"Van":["Toyota thing", "VW Bus"]}
                  ]};
        expect(taxonomyCircle.getFlattenedTaxonomy(ar, 1, [])).toEqual(
        [{ depth : 1, value : 'Cars' }, 
         { depth : 2, value : '2 door' }, 
         { depth : 3, value : 'sports car' }, 
         { depth : 3, value : 'Fiat 500' }, 
         { depth : 2, value : 'Van' }, 
         { depth : 3, value : 'Toyota thing' }, 
         { depth : 3, value : 'VW Bus' } 
        ]);
        
    });
    it("should get taxonomy depth", function() 
    {
        taxonomyCircle.update(taxonomy);
        expect(taxonomyCircle.taxonomyDepth()).toEqual(4);
    });
    it("should have a default x / y / size", function()
    {
        expect(taxonomyCircle.data.x).toBeDefined();
        expect(taxonomyCircle.data.y).toBeDefined();
        expect(taxonomyCircle.data.size).toBeDefined();
    });
     
     
    it("should accept taxonomy data", function()
    {
          
        taxonomyCircle.update(taxonomy);
        taxonomyCircle.draw(paper);
        
        taxonomyCircle.draw();
        
    });    
});
