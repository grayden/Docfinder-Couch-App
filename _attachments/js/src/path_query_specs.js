describe ("Path Lookup", function() {
    var path;
    var query;
    beforeEach(function(){ 
        path = new path_proto();
        query = new query_proto();
    });

    it("Should be able to get the uri", function()
    {
        expect(query.db_uri).toBeDefined();
    });

});