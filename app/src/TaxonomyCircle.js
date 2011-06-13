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
TaxonomyCircle.prototype.draw = function(paper)
{
    if (paper != undefined) 
        this.paper = paper;
        
    //console.log(this.data.taxonomy[0].Gender);
    this.drawRing(this.data.taxonomy[1].Cars, this.data.size + 50, 360/3,360/3);
    this.drawRing(this.data.taxonomy, this.data.size);
    this.isDrawn = true;
    
    
}

TaxonomyCircle.prototype.drawRing = function(ring,size, ringLimit, startAngle)
{
    if (ringLimit == undefined)
        ringLimit = 360;
    if (startAngle == undefined)
        startAngle = 0;
    var partition = ringLimit / ring.length;
    texts = [];
    for (var i = 0; i < ring.length; i++)
    {
        var s  = this.sector(this.data.x, this.data.y,size, startAngle, partition + startAngle, 
        {
                stroke: "#222", 
                "stroke-width": 1,
                gradient: "90-#CACACA-#AAAACA"
        });
        var r = size;
        var endAngle = partition + startAngle;
        var x1 = this.data.x + r * Math.cos(-startAngle * this.rad),
            x2 = this.data.x + r * Math.cos(-endAngle * this.rad),
            y1 = this.data.y + r * Math.sin(-startAngle * this.rad),
            y2 = this.data.y + r * Math.sin(-endAngle * this.rad);

        
        tX = (x1 + x2) /2;
        tY = (y1 + y2) /2;
        var t = this.paper.text(tX, tY, this.getKey(ring[i]));
        t.attr({fill: "#FFF", "font-family": 'Arial', "font-size": "20px", "text-anchor":"middle"});
        t.rotate((startAngle + partition )/ (2 + endAngle + partition));
        
        texts.push(t);

        startAngle += partition;
    }    
    $.each(texts,function(k,v)
    {
       v.toFront(); 
    });
}
TaxonomyCircle.prototype.sector = function(cx, cy, r, startAngle, endAngle, params) 
{
        var x1 = cx + r * Math.cos(-startAngle * this.rad),
            x2 = cx + r * Math.cos(-endAngle * this.rad),
            y1 = cy + r * Math.sin(-startAngle * this.rad),
            y2 = cy + r * Math.sin(-endAngle * this.rad);
        return this.paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
}
TaxonomyCircle.prototype.getKey = function(obj)
{
    for(k in obj)
        return k;
}
TaxonomyCircle.prototype.taxonomyDepth = function()
{
    return this.getDepth(this.data.taxonomy, 2);
}
TaxonomyCircle.prototype.getRingDepth = function(depth)
{
    var flattened = this.getFlattenedTaxonomy(this.data.taxonomy,0,[]);
    console.log(flattened.toSource());
    return flattened;
}
TaxonomyCircle.prototype.getFlattenedTaxonomy = function(ar, depth, ret)
{
    var self = this;    
    depth++;
    console.log('loop:');
    console.log(ar.toSource());
    //if (self.isObject(ar))
    //    ar = [ar];
    
    if (self.isObject(ar))
    {
        for(k in ar)
        {
            ret.push({depth: depth, value : k});
            if (self.hasBranches(ar[k]))
            {
                console.log(true);
            }
            else
                console.log(false);
        }
        
    }
    return ret;
    /*
    $.each(ar,function(k,v)
    { 
        if (self.isObject(v))
        {
            ret.push({depth: depth, value : self.getKey(v)});
            //ret = ret.concat(self.getFlattenedTaxonomy(v, depth, []));
        }
        if (self.isArray(v))
        {
            $.each(v,function(l,w)
            {
                ret.push({depth: depth, value : w});
            });
        }
        
    });
    return ret;
    */
}
TaxonomyCircle.prototype.hasBranches = function(obj)
{
    var self = this;
    
    $.each(obj,function(l,v)
    {
        if (self.isObject(v) || self.isArray(v))
            return true;
        $.each(v,function(k,w)
        {
            if (self.isObject(w) || self.isArray(w))
                return true;
        });
    });
    return false;
}
TaxonomyCircle.prototype.getDepth = function(obj, depth)
{
    var self = this;    
    $.each(obj,function(k,v)
    {
        $.each(v,function(l,w)
        {
            
            if (self.isObject(w[0]))
            {
                return self.getDepth(w, depth++);
            }
        });
    });
    return depth;
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
