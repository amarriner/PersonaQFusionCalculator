var personaQ;

/*
 * Build controls after loading JSON
 */ 
function activate(json) {
    personaQ = json;
    
    $("#persona3").append($("<option />").val("").text("NONE"));
    $.each(personaQ["personas"].sort(personaSortNameAsc), function() {
      $("#persona1").append($("<option />").val(this["name"]).text(this["name"]));
      $("#persona2").append($("<option />").val(this["name"]).text(this["name"]));
      $("#persona3").append($("<option />").val(this["name"]).text(this["name"]));
    });
    
    fuse();
}

function fuse() {
    $("#fusion-result").html("");
    var p1 = getPersonaByName($("#persona1").val());
    var p2 = getPersonaByName($("#persona2").val());
    var p3 = getPersonaByName($("#persona3").val());
    
    if (p1 != p2 && ! p3) {
//        $("#fusion-result").html(
//            personaQ["arcana"][getNormalFusion(p1, p2)]
//        );
        getNormalFusion(p1, p2);
    }
    else if (p1 && p2 && p3 && (p1 != p2 && p1 != p3 && p2 != p3)) {
//        $("#fusion-result").html(
//            personaQ["arcana"][getTripleFusion(p1, p2, p3)]
//        );
        getTripleFusion(p1, p2, p3);
    }

}

/*
 * Building HTML component functions
 */

function buildPersonaList(arcana, personas, active) {
    var activeClass = " list-group-item-info";
    
    $("#fusion-result").html("");
    
    $("#fusion-result").append(
        $('<ul class="list-group"/>').append(
            $('<li class="row list-group-item active"/>').append($('<div class="row"/>').append(
                $('<div class="col-xs-7"/>').text("Arcana: " + personaQ["arcana"][arcana])).append( 
                $('<div class="col-xs-1"/>').text('Lvl')).append(
                $('<div class="col-xs-1"/>').text('HP')).append( 
                $('<div class="col-xs-1"/>').text('SP'))
            )
        )
    );
            
    $.each($(personas), function(i) {        
        $("#fusion-result ul:first").append(buildPersonaListItem(this, (active == this["name"] ? activeClass : "")));
    });
}

function buildPersonaListItem(persona, active) {
    var item = $('<li class="row list-group-item' + active + '"/>').append(
        $('<div class="col-xs-7"/>').text(persona["name"])).append(
        $('<div class="col-xs-1"/>').text(persona["level"])).append( 
        $('<div class="col-xs-1"/>').text(persona["hp"])).append( 
        $('<div class="col-xs-1"/>').text(persona["sp"])).append(
        $('<div class="col-xs-2"/>').append(
            $('<div class="dropdown"/>').append(
                $('<button class="btn btn-primary btn-xs" data-toggle="dropdown" aria-expanded="false"/>').text('Skills ').append(
                    $('<li class="caret"/>'))).append(
                $('<ul class="dropdown-menu dropdown-menu-right" role="menu"/>'))
    ));
    
    $.each(persona["skills"].sort(skillSortNameAsc), function(i) {
        $(item).find('.dropdown-menu').append($('<li/>').append($('<a href="#"/>').text(personaQ["skills"][this])));
    });
    
    return item
}

/*
 * Retrieval Functions
 */

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

function getFusion(a, b, type) {
    type = (typeof type == "undefined" || $.inArray(type, ["normal", "triple"]) < 0) ? "normal" : type;

    console.log("Getting [" + type + "] fusion for arcana: " + personaQ["arcana"][a] + ", " + personaQ["arcana"][b]);
    var r = false;

    if (a != b) {
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
        var active = undefined;
        var persona = undefined;
        var personas = new Array();
        
        var avg = (a["level"] + b["level"]) / 2;
        $.each(personaQ["personas"].sort(personaSortLevelAsc), function(i) {
            if (this["arcana"] == arcana) {
                console.log(" - Found: " + this["name"]);
                personas.push(this);
                
                if (this["level"] > avg && (typeof active == "undefined")) {
                    active = this["name"];
                    console.log(' - Active persona: ' + this["name"]);
                }
            }
        });
        
        
        if (personas.length > 0) {
            console.log(" - Outputting personas");
            
            buildPersonaList(arcana, personas, active);
        }
    }
    
    return arcana;
}

function getTripleFusion(a, b, c) {
    console.log("Getting triple fusion for: " + a["name"] + ", " + b["name"] + ", " + c["name"]);
    var r = false;
    
    var active = undefined;
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
                
                if (this["level"] > avg && (typeof active == "undefined")) {
                    active = this["name"];
                    console.log(" - Active persona: " + this["name"]);
                }
            }
        });
        
        if (personas.length > 0) {
            console.log(" - Outputting personas");
            
            buildPersonaList(arcana, personas, active);
        }
    }
    
    return r;
}

/*
 * Sorting Functions
 */
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
    return a["name"].charCodeAt(0) - b["name"].charCodeAt(0);
}

function personaSortNameDesc(a, b) {
    return b["name"].charCodeAt(0) - a["name"].charCodeAt(0);
}

function skillSortNameAsc(a, b) {
    var end = Math.min(a.length, b.length);
    var ndx = -1;
    
    for (var i = 0; i < end; i++) {
        if (personaQ["skills"][a][i] != personaQ["skills"][b][i]) {
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