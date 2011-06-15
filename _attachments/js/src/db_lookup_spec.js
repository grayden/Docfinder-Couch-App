console.log("Present!");

describe ("Couch_lookup", function() {

    berforeEach(function(){ });

    it("should get the uri", function()
    {
        expect(lookup_inst.view()).toBeTruthy();
    });

});
