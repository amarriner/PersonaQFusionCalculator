var activePersona;
var personaQ;
var Templates = {};

/* ------------------------- Handlebars Functions ------------------------------------- */

function compileTemplates() {
    $.each($("[type='text/x-handlebars-template']"), function(i) {
        Templates[$(this).attr("id")] = Handlebars.compile($(this).html());
    });
}

function registerHelpers() {
    // eachSortedSkills
    Handlebars.registerHelper('eachSortedSkills', function(skills, options) {
        var s = new Array();
        
        $.each(skills.sort(skillSortNameAsc), function(i) {
            s.push(personaQ["skills"][this]);
        });
            
        return options.fn(s);
    });
    
    // eachSortedPersonas
    Handlebars.registerHelper('eachSortedPersonas', function(options) {
        return options.fn(personaQ["personas"].sort(personaSortNameAsc));
    });
    
    // getArcanaName
    Handlebars.registerHelper('getArcanaName', function(arcana) {
        return personaQ["arcana"][arcana];
    });

    // ifEq
    Handlebars.registerHelper('ifEq', function(a, b, options) {
        return (a == b ? options.fn(this) : options.inverse(this));
    });
}

function registerPartials() {
    Handlebars.registerPartial("persona-list-item", $("#persona-list-item-partial").html());
    Handlebars.registerPartial("credits", $("#credits-partial").html());
}

/* -------------- Activation Functions for setting up various views ---------------------- */

/*
 * Build search controls after loading JSON
 */ 
function activateSearch(json) {    
    if (typeof json != "undefined") {
        personaQ = json;
    }
                                                                    
    $("#select").html(Templates["search-controls"]({
        exclaim: "Select up to three personas"
    }));
    
    $("#fusion-result").empty();
    
    $("#persona1").change(function() { fuse(); });
    $("#persona2").change(function() { fuse(); });
    $("#persona3").change(function() { fuse(); });
    
    fuse();
}

/*
 * Build controls for getting fusion ingredients 
 */
function activateIngredients() {
    $("#select").html(Templates["ingredients-controls"]({
        exclaim: "Find fusion ingredients for a Persona"
    }));
    $("#fusion-result").empty();
    $("#fused").change(function() { getIngredients(); } );
}

/*
 * Build a list of personas in an arcana
 */
function activateArcana(arcana) {
    $("#fusion-result").empty();
    
    $("#select").html(Templates["arcana-list"]({
        arcana: personaQ["arcana"][arcana],
        personas: getPersonasByArcana(arcana),
        title: true
    }));
    
    $("#fusion-result div.panel").append(Templates["credits-partial"]());
}

/*
 * Build list of personas
 */
function activatePersonas() {
    $("#fusion-result").empty();
    
    var letters = new Object();
    $.each(personaQ["personas"].sort(personaSortNameAsc), function(i) {
        if (! letters[this["name"][0]]) {
            letters[this["name"][0]] = new Array();
        }
        
        letters[this["name"][0]].push(this);
    });
    
    $("#select").html(Templates["accordion-persona-list"]({
        letters: letters
    }));
    
   $("#accordion div.panel div.panel-heading h4.panel-title a").click(function() {
        $(this).parent().parent().parent().toggleClass("panel-info");
    });
        
    $("#accordion").on("hidden.bs.collapse", function() { 
        $('#accordion div.panel div[aria-expanded="false"]').parent().removeClass("panel-info");
    });

}

/* ------------------------ Fusion Calculation Functions ------------------------------- */

function fuse() {
    $("#fusion-result").empty();
    var p1 = getPersonaByName($("#persona1").val());
    var p2 = getPersonaByName($("#persona2").val());
    var p3 = getPersonaByName($("#persona3").val());
    
    var personas = new Array();
    
    if (p1 != p2 && ! p3) {
        personas = getNormalFusion(p1, p2);
    }
    else if (p1 && p2 && p3 && (p1 != p2 && p1 != p3 && p2 != p3)) {
        personas = getTripleFusion(p1, p2, p3);
    }

    if (personas.length > 0) {
        console.log(" - Outputting personas");
            
        $("#fusion-result").html(Templates["persona-list"]({
            active: activePersona,
            arcana: personaQ["arcana"][personas[0]["arcana"]],
            personas: personas,
            title: true
        }));
    }
}

function getFusion(a, b, type) {
    type = (typeof type == "undefined" || $.inArray(type, ["normal", "triple"]) < 0) ? "normal" : type;

    console.log("Getting [" + type + "] fusion for arcana: " + personaQ["arcana"][a] + ", " + personaQ["arcana"][b]);
    var r = false;

    if (a != b || a == b) {
        $.each(personaQ["fusions"][type], function() {
            
            if ($.inArray(a, this["arcana"]) >= "0" && $.inArray(b, this["arcana"]) >= "0") {
                r = this["result"];
                console.log(" - [" + type + "] " + personaQ["arcana"][a] + " fused with " + personaQ["arcana"][b] + " results in " + personaQ["arcana"][r]);
            
            }
        });
    }
    
    return r;
}
    
function getNormalFusion(a, b) {
    console.log("Getting normal fusion for: " + a["name"] + ", " + b["name"]);
    
    var arcana = getFusion(a["arcana"], b["arcana"]);
    
    if (arcana) {
        activePersona = undefined;
        var persona = undefined;
        var personas = new Array();
        
        var avg = (a["level"] + b["level"]) / 2;
        $.each(personaQ["personas"].sort(personaSortLevelAsc), function(i) {
            if (this["arcana"] == arcana) {
                console.log(" - Found: " + this["name"]);
                personas.push(this);
                
                if (this["level"] > avg && (typeof activePersona == "undefined")) {
                    activePersona = this["name"];
                    personas[personas.length - 1]["active"] = true;
                    console.log(' - Active persona: ' + activePersona);
                }
            }
        });
    }
    
    return personas;
}

function getTripleFusion(a, b, c) {
    console.log("Getting triple fusion for: " + a["name"] + ", " + b["name"] + ", " + c["name"]);
    var r = false;
    
    activePersona = undefined;
    var personas = sortPersonas(a, b, c);
    var arcana = getFusion(personas[0]["arcana"], personas[1]["arcana"]);
    r = getFusion(arcana, personas[2]["arcana"], "triple");
    r = (typeof r == "undefined") ? false : r;
    
    personas = new Array();
    if (r) {
        console.log(" - Result: " + personaQ["arcana"][r]);
        
        var avg = (a["level"], b["level"], c["level"]) / 3;
        $.each(personaQ["personas"].sort(personaSortLevelAsc), function(i) {
            if (this["arcana"] == arcana && [a, b, c].indexOf(this) < 0) {
                console.log(" - Found: " + this["name"]);
                personas.push(this);
                
                if (this["level"] > avg && (typeof activePersona == "undefined")) {
                    activePersona = this["name"];
                    personas[personas.length - 1]["active"] = true;
                    console.log(" - Active persona: " + this["name"]);
                }
            }
        });
    }
    
    return personas;
}

/* ----------------------------- Retrieval Functions ----------------------------- */

function getPersonasByArcana(arcana) {
    console.log("Getting personas by arcana (" + personaQ["arcana"][arcana] + ")");
    
    var personas = new Array();
    $.each(personaQ["personas"], function(i, value) {
        if (this["arcana"] == arcana) {
            personas.push(this);
        }
    });
    
    return personas;
}

function getPersonaByName(name) {
    console.log("Getting persona by name (" + name + ")");
    var r = false;
    
    $.each(personaQ["personas"], function() {
        if (this["name"] == name) {
            r = this;
            console.log(" - Found " + this["name"]);
        }
    });
    
    return r;
}

function getIngredients() {
    $("#fusion-result").empty();
    
    var persona = getPersonaByName($("#fused").val());
    console.log("Finding ingredients for " + persona["name"]);
    
    var results = new Array();
    $.each(personaQ["fusions"]["normal"], function(i, value) {
        if (this["result"] == persona["arcana"]) {
            console.log(this["arcana"]);
            results.push(this);    
        }
    });
    
    if (results.length > 0) {
        console.log("Found results");
        
        $("#fusion-result").html(Templates["ingredients-list"]({
            arcana: personaQ["arcana"][persona["arcana"]],
            results: results
        }));
    }
}

/* ----------------------- Sorting Functions ----------------------- */

function personaSortArcanaAsc(a, b) {
    return a["arcana"] - b["arcana"];
}

function personaSortArcanaDesc(a,b) {
    return b["arcana"] - a["arcana"];
}

function personaSortLevelAsc(a, b) {
    return a["level"] - b["level"];
}

function personaSortLevelDesc(a, b) {
    return b["level"] - a["level"];
}

function personaSortNameAsc(a, b) {
    var end = Math.min(a["name"].length, b["name"].length);
    var ndx = -1;
    
    for (var i = 0; i < end; i++) {
        if (a["name"][i] != b["name"][i] && ndx == -1) {
            ndx = i;
        }
    }
    
    if (ndx == -1) {
        ndx = end;
        
        if (a.length <= ndx) {
            a.push(" ");
        }
        
        if (b.length <= ndx) {
            b.push(" ");
        }
    }
    
    return a["name"].charCodeAt(ndx) - b["name"].charCodeAt(ndx);
}

function personaSortNameDesc(a, b) {
    var end = Math.min(a["name"].length, b["name"].length);
    var ndx = -1;
    
    for (var i = 0; i < end; i++) {
        if (a["name"][i] != b["name"][i] && ndx == -1) {
            ndx = i;
        }
    }
    
    if (ndx == -1) {
        ndx = end;
        
        if (a.length <= ndx) {
            a.push(" ");
        }
        
        if (b.length <= ndx) {
            b.push(" ");
        }
    }
    
    return b["name"].charCodeAt(ndx) - a["name"].charCodeAt(ndx);
}

function skillSortNameAsc(a, b) {
    var end = Math.min(personaQ["skills"][a].length, personaQ["skills"][b].length);
    var ndx = -1;
    
    for (var i = 0; i < end; i++) {
        if (personaQ["skills"][a][i] != personaQ["skills"][b][i] && ndx == -1) {
            ndx = i;
        }
    }
    
    if (ndx == -1) {
        ndx = end;
        
        if (a.length <= ndx) {
            a.push(" ");
        }
        
        if (b.length <= ndx) {
            b.push(" ");
        }
    }
    
    return personaQ["skills"][a].charCodeAt(ndx) - personaQ["skills"][b].charCodeAt(ndx);
}

function sortPersonas(a, b, c) {
    console.log("Sorting " + a["name"] + ", " + b["name"] + ", " + c["name"]);
    
    var p = new Array(a, b, c).sort(personaSortLevelAsc);
    
    console.log(" - Level Sort: " + p[0]["name"] + ", " + p[1]["name"] + ", " + p[2]["name"]);

    if (p[1]["level"] == p[2]["level"]) {
        p = new Array(a) + new Array(b, c).sort(personaSortArcanaDesc);
        console.log(" - Arcana Sort: " + + p[0]["name"] + ", " + p[1]["name"] + ", " + p[2]["name"]);
    }
    
    return p;
}