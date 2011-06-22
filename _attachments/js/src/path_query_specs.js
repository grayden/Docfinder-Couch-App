describe ("Path Lookup", function() {

    var path;
    beforeEach(function(){ 
        path = new path_p();
    });

    it("Should be able to get the uri", function()
    {
        expect(path.db_uri).toBeDefined();
    });

});