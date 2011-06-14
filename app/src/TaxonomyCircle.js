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
        
    var self = this;
    var texts = [];
    for (var i = this.taxonomyDepth();i > 0; i--)
    {
        var d2 = this.getRingDepth(i);
        var startAngle = 0;
        $.each(d2,function(k,v)
        {
            var size = self.data.size;
            var partition = 360 / d2.length;
            self.drawSection(v.value, size, startAngle, partition);
            var endAngle = partition+startAngle;
            texts.push(self.drawText(size,startAngle,endAngle, partition,v.value));
            startAngle += partition;
        });

        break;
    }
    $.each(texts,function(k,v){v.toFront();});
    
    
    this.isDrawn = true;
    
    
}
TaxonomyCircle.prototype.drawSection = function(txt,size,startAngle,partition)
{
    
    var s  = this.sector(this.data.x, this.data.y,size, startAngle, partition + startAngle, 
        {
                stroke: "#222", 
                "stroke-width": 1,
                gradient: "90-#CACACA-#AAAACA"
        });
};
TaxonomyCircle.prototype.drawText = function(size,startAngle,endAngle,partition,txt)
{
    var x1 = this.data.x + size * Math.cos(-startAngle * this.rad),
        x2 = this.data.x + size * Math.cos(-endAngle * this.rad),
        y1 = this.data.y + size * Math.sin(-startAngle * this.rad),
        y2 = this.data.y + size * Math.sin(-endAngle * this.rad);
            
    tX = (x1 + x2) /2;
    tY = (y1 + y2) /2;
    var t = this.paper.text(tX, tY, txt);
    t.attr({fill: "#FFF", "font-family": 'Arial', "font-size": "20px", "text-anchor":"middle"});
    t.rotate((startAngle + partition )/ (2 + endAngle + partition));
    return t;
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
TaxonomyCircle.prototype.getWholeTaxonomy = function()
{
    return this.getFlattenedTaxonomy(this.data.taxonomy,1,[]);
}
TaxonomyCircle.prototype.getRingDepth = function(depth)
{
    var flattened = this.getWholeTaxonomy();
    return $.grep(flattened,function(item) {return (item.depth == depth);});
}
TaxonomyCircle.prototype.getFlattenedTaxonomy = function(ar, depth, ret)
{
    var self = this;    
    if (self.isObject(ar))
    {
        for(k in ar)
        {
            ret.push({depth: depth, value : k});
            if (self.hasBranches(ar[k]))
                ret = self.getFlattenedTaxonomy(ar[k],depth + 1,ret);
        }
        
    }
    else if (self.isArray(ar))
    {
        $.each(ar,function(k,v)
        {
            if (self.isObject(v))
                ret = self.getFlattenedTaxonomy(v,depth,ret);
            else
                ret.push({depth: depth, value : v});
        });
    }    
    return ret;
}
TaxonomyCircle.prototype.hasBranches = function(obj)
{
    var self = this;
    
    if (self.isObject(obj) || self.isArray(obj))
            return true;
    
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
