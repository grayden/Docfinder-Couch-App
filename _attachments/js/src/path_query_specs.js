describe ("Path Lookup", function() {

    var path;
    var query;
    beforeEach(function(){ 
        path = new path_p();
        query = new query_p();
    });

    it("Should be able to get the uri", function()
    {
        expect(query.db_uri).toBeDefined();
    });

});