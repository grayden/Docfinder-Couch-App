var labelType, useGradients, nativeTextSupport, animate;
var id = 'infovis';

var Log = {
  elem: true,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    //this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init() {
    daisy();
}

var daisy = function()
{
    var d = createStarburst(seedWizardNumber());
    
    $("#"+d.canvas.id).css("left","40%");
    $("#"+d.canvas.id).css("top","20%");
    
    var t = createStarburst(seedTopics(4));
    var g = createStarburst(seedGeographics(10));
    var n = createStarburst(seedNames(10));
    
    
}
var createStarburst = function(data)
{
    var sbId = 'sb_'+data.id;
    div = $('<div id="'+sbId+'" class="sb"></div>');
    div.css("left",(($(".sb").length * 300)+50)+"px");
    $("#"+id).append(div);
    return createsb(sbId,data);
    

}
var createsb = function(div,data)
{
    var sb = new $jit.Sunburst({
            injectInto: div,

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
            clearCanvas: false  
        });

    //load JSON data.
    sb.loadJSON(data);
    sb.compute();
    sb.refresh();   
    return sb;
}
var seedWizardNumber = function()
{
    return   {
       id: guid(),
       name: Math.floor(Math.random()*100000),
       data: { "$color": "#FAFAFA"},
       children: [
           {id:guid(),name:"Related",data :{}, children:seedChildDocs()},
           {id:guid(),name:"Geographics",data: {}, children:[]},
           {id:guid(),name:"Topics",data: {}, children:[]},
           {id:guid(),name:"Name",data: {}, children:[]}
       ]
    };

}
var seedChildDocs = function()
{
    var ret = [];
    for(var i = 0; i < Math.floor(Math.random()*20); i++)
    {
        ret.push({id:guid(),name:Math.floor(Math.random()*100000),data :{}, children:[]});
    }
    return ret;
}
var seedNames = function(count)
{
   var items = ["Chung, Kristina H.","Chen, Paige H.","Melton, Sherri E.","Hill, Gretchen I.","Puckett, Karen U.","Song, Patrick O.","Hamilton, Elsie A.","Bender, Hazel E.","Wagner, Malcolm A.","McLaughlin, Dolores C.","McNamara, Francis C.","Raynor, Sandy A.","Moon, Marion O.","Woodard, Beth O.","Desai, Julia E.","Wallace, Jerome A.","Lawrence, Neal A.","Griffin, Jean R.","Dougherty, Kristine O.","Powers, Crystal O.","May, Alex A.","Steele, Eric T.","Teague, Wesley E.","Vick, Franklin I.","Gallagher, Claire A.","Solomon, Marian O.","Walsh, Marcia A.","Monroe, Dwight O.","Connolly, Wayne O.","Hawkins, Stephanie A.","Middleton, Neal I.","Goldstein, Gretchen O.","Watts, Tim A.","Johnston, Jerome O.","Weeks, Shelley E.","Wilkerson, Priscilla I.","Barton, Elsie A.","Walton, Beth A.","Hall, Erica A.","Ross, Douglas O.","Chung, Donald H.","Bender, Katherine E.","Woods, Paul O.","Mangum, Patricia A.","Joseph, Lois O.","Rosenthal, Louis O.","Bowden, Christina O.","Barton, Darlene A.","Underwood, Harvey N.","Jones, William O.","Baker, Frederick A.","Merritt, Shirley E.","Cross, Jason R.","Cooper, Judith O.","Holmes, Gretchen O.","Sharpe, Don H.","Morgan, Glenda O.","Hoyle, Scott O.","Allen, Pat L.","Rich, Michelle I.","Rich, Jessica I.","Grant, Evan R.","Proctor, Melinda R.","Diaz, Calvin I.","Graham, Eugene R.","Watkins, Vickie A.","Hinton, Luis I.","Marsh, Allan A.","Hewitt, Melanie E.","Branch, Marianne R.","Walton, Natalie A.","O'Brien, Caroline '.","Case, Arlene A.","Watts, Kyle A.","Christensen, Calvin H.","Parks, Gary A.","Hardin, Samantha A.","Lucas, Sara U.","Eason, Stacy A.","Davidson, Gladys A.","Whitehead, Mike H.","Rose, Lynne O.","Sparks, Faye P.","Moore, Diana O.","Pearson, Leon E.","Rodgers, Ethel O.","Graves, Steve R.","Scarborough, Alison C.","Sutton, Sherri U.","Sinclair, Patsy I.","Bowman, Kelly O.","Olsen, Stacy L.","Love, Curtis O.","McLean, Dana C.","Christian, Jennifer H.","Lamb, Brett A.","James, Brandon A.","Chandler, Keith H.","Stout, Joann T."];
   return getRandomItems(items,count,{
       id: guid(),
       name: "Names",
       data: { $color: "#2CB1BF" },
       children : []
   });
};

var seedGeographics = function(count)
{
   var items = ["Canada","Toronto","Ontario","Montreal","Quebec","Germany","Berlin","USA","Cleveland","Ohio","New York","New York City","India","New Delhi","Haifa","Israel"];
   return getRandomItems(items,count,{
       id: guid(),
       name: "Geographics",
       data: { $color: "#AAD11E" },
       children : []
   });
};
var seedTopics = function(count)
{
   var items = ["Covenant","Abortion","Termination","Direct Teaching","IPG","Cluster Growth","Voting Rights","Prayers","Financial","Incorporation","Defense","Protection","Iran Diaspora"];
   return getRandomItems(items,count,{
       id: guid(),
       name: "Topics",
       data: { $color: "#E5D27F" },
       children : []
   });
}

getRandomItems = function(items,count, ret)
{
    for(var i = 0; i < count; i++)
    {
        ret.children.push(
            {
                id: guid(),
                name: items[Math.floor(Math.random()*items.length)],
                data: {},
                children: []
            });
    }
    return ret;
}
guid = function() 
{
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
