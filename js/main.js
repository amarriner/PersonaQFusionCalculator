var personaQ;

/*
 * Build search controls after loading JSON
 */ 
function activateSearch(json) {    
    if (typeof json != "undefined") {
        personaQ = json;
    }
    
    $("#select").empty();
    $("#fusion-result").empty();
    
    $("#select").append($('<div class="panel-heading"/>'));
    $("#select div.panel-heading").append($('<h3 class="panel-title"/>'));
    $("#select div.panel-heading h3.panel-title").append($('<span class="glyphicon glyphicon-search" aria-hidden="true"/>')).append("Select up to three Personas");
    $("#select").append($('<div class="panel-body"/>'));
    $("#select div.panel-body").append($('<div class="row"/>'));
    
    for (var k = 1; k <= 3; k++) {
        $("#select div.panel-body div.row").append($('<div id="p' + k + '" class="form-group col-md-4"/>'));
        $("#select div.panel-body div.row #p" + k).append($('<label for="persona' + k + '"/>').text("Persona " + k));
        $("#select div.panel-body div.row #p" + k).append($('<select id="persona' + k + '" class="form-control" />'));
    }
    
    getCredits();
    
    $("#persona1").change(function() { fuse(); } );
    $("#persona2").change(function() { fuse(); } );
    $("#persona3").change(function() { fuse(); } );
    
    $("#persona3").append($("<option />").val("").text("NONE"));
    $.each(personaQ["personas"].sort(personaSortNameAsc), function() {
      $("#persona1").append($("<option />").val(this["name"]).text(this["name"]));
      $("#persona2").append($("<option />").val(this["name"]).text(this["name"]));
      $("#persona3").append($("<option />").val(this["name"]).text(this["name"]));
    });
    
    fuse();
}

/*
 * Build controls for getting fusion ingredients 
 */
function activateIngredients() {
    $("#select").empty();
    $("#fusion-result").empty();
    
    $("#select").append($('<div class="panel-heading"/>'));
    $("#select div.panel-heading").append($('<h3 class="panel-title"/>'));
    $("#select div.panel-heading h3.panel-title").append($('<span class="glyphicon glyphicon-search" aria-hidden="true"/>')).append("Select a Persona");
    $("#select").append($('<div class="panel-body"/>'));
    $("#select div.panel-body").append($('<div class="row"/>'));
    
    $("#select div.panel-body div.row").append($('<div id="f-top" class="form-group col-md-12"/>'));
    $("#select div.panel-body div.row #f-top").append($('<label for="fused"/>').text("Persona"));
    $("#select div.panel-body div.row #f-top").append($('<select id="fused" class="form-control" />'));
    
    $("#fused").change(function() { getIngredients(); } );
    
    $.each(personaQ["personas"].sort(personaSortNameAsc), function() {
        $("#fused").append($("<option />").val(this["name"]).text(this["name"]));
    });
}

function getCredits() {
    $("#select").append($('<div class="credits panel-footer text-right"/>').html($("#credits").html()));
}

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
        // console.log(" - Outputting personas");
            
        buildPersonaList(personas, "#fusion-result", true);
    }
}

function getIngredients() {
    $("#fusion-result").empty();
    
    var persona = getPersonaByName($("#fused").val());
    // console.log("Finding ingredients for " + persona["name"]);
    
    setTimeout(function() {
        $.each(personaQ["personas"], function(i, first) {
            $.each(personaQ["personas"], function(j, second) {
                personas = getNormalFusion(first, second);
            
                if (personas) {
                    if (personas.indexOf(persona) >= 0) {
                        console.log("Found matching fusion for " + first["name"] + " and " + second["name"]);
                    }
                }
            });
        });
    }, 0);
}

/*
 * Building HTML component functions
 */

function buildArcanaModal(arcana) {
    $("#arcana-modal-label").text(arcana + " Arcana");
    
    var personas = new Array();
    $.each(personaQ["personas"], function(i) {
        if (this["arcana"] == personaQ["arcana"].indexOf(arcana)) {
            // console.log(' - Adding ' + this["name"] + " to modal");
            //$("#arcana-modal-body").append($("<div/>").text(this["name"]));
            personas.push(this);
        }
    });
    
    buildPersonaList(personas, "#arcana-modal-body");
    
    // console.log(' - Showing modal');
    $("#arcana-modal").modal('show');
    return false;
}

function buildPersonaModal() {
    $("#arcana-modal-label").text("Persona List");
 
    buildPersonaList(personaQ["personas"].sort(personaSortNameAsc), "#arcana-modal-body");
    
    // console.log(' - Showing modal');
    $("#arcana-modal").modal('show');
    return false;   
}

function buildPersonaList(personas, elementId, title) {
    var activeClass = " list-group-item-info";
    var arcana = personaQ["arcana"][personas[0]["arcana"]];
    
    $(elementId).html("");
    
    $(elementId).append(
        $('<ul class="list-group"/>').append(
            $('<li class="row list-group-item active"/>').append($('<div class="row"/>').append(
                $('<div class="col-xs-4 col-md-6"/>').append(title == true ? $('<span class="hidden-xs"/>').text('Arcana: ').add($("<span/>").text(arcana)) : "")).append( 
                $('<div class="col-xs-1"/>').text('Lvl')).append(
                $('<div class="col-xs-1"/>').text('HP')).append( 
                $('<div class="col-xs-1"/>').text('SP'))
            )
        )
    );
            
    $.each($(personas), function(i) {        
        $(elementId + " ul:first").append(buildPersonaListItem(this, (typeof this["active"] != "undefined" ? activeClass : "")));
        
        if (typeof this["active"] != "undefined") {
            this["active"] = undefined;
        }   
    });
}

function buildPersonaListItem(persona, active) {
    var item = $('<li class="row list-group-item' + active + '"/>').append(
        $('<div class="col-xs-4 col-md-6"/>').text(persona["name"])).append(
        $('<div class="col-xs-1"/>').text(persona["level"])).append( 
        $('<div class="col-xs-1"/>').text(persona["hp"])).append( 
        $('<div class="col-xs-1"/>').text(persona["sp"])).append(
        $('<div class="col-xs-3 text-right"/>').append(
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

function getPersonasByArcana(arcana) {
    // console.log("Getting personas by arcana (" + personaQ["arcana"][arcana] + ")");
    
    var personas = new Array();
    $.each(personaQ["personas"], function(i, value) {
        if (this["arcana"] == arcana) {
            personas.push(this);
        }
    });
    
    return personas;
}

function getPersonaByName(name) {
    // console.log("Getting persona by name (" + name + ")");
    var r = false;
    
    $.each(personaQ["personas"], function() {
        if (this["name"] == name) {
            r = this;
            // console.log(" - Found " + this["name"]);
        }
    });
    
    return r;
}

function getFusion(a, b, type) {
    type = (typeof type == "undefined" || $.inArray(type, ["normal", "triple"]) < 0) ? "normal" : type;

    // console.log("Getting [" + type + "] fusion for arcana: " + personaQ["arcana"][a] + ", " + personaQ["arcana"][b]);
    var r = false;

    if (a != b || a == b) {
        $.each(personaQ["fusions"][type], function() {
            
            if ($.inArray(a, this["arcana"]) >= "0" && $.inArray(b, this["arcana"]) >= "0") {
                r = this["result"];
                // console.log(" - [" + type + "] " + personaQ["arcana"][a] + " fused with " + personaQ["arcana"][b] + " results in " + personaQ["arcana"][r]);
            
            }
        });
    }
    
    return r;
}
    
function getNormalFusion(a, b) {
    // console.log("Getting normal fusion for: " + a["name"] + ", " + b["name"]);
    
    var arcana = getFusion(a["arcana"], b["arcana"]);
    
    if (arcana) {
        var active = undefined;
        var persona = undefined;
        var personas = new Array();
        
        var avg = (a["level"] + b["level"]) / 2;
        $.each(personaQ["personas"].sort(personaSortLevelAsc), function(i) {
            if (this["arcana"] == arcana) {
                // console.log(" - Found: " + this["name"]);
                personas.push(this);
                
                if (this["level"] > avg && (typeof active == "undefined")) {
                    active = this["name"];
                    personas[personas.length - 1]["active"] = true;
                    // console.log(' - Active persona: ' + this["name"]);
                }
            }
        });
    }
    
    return personas;
}

function getTripleFusion(a, b, c) {
    // console.log("Getting triple fusion for: " + a["name"] + ", " + b["name"] + ", " + c["name"]);
    var r = false;
    
    var active = undefined;
    var personas = sortPersonas(a, b, c);
    var arcana = getFusion(personas[0]["arcana"], personas[1]["arcana"]);
    r = getFusion(arcana, personas[2]["arcana"], "triple");
    r = (typeof r == "undefined") ? false : r;
    
    personas = new Array();
    if (r) {
        // console.log(" - Result: " + personaQ["arcana"][r]);
        
        var avg = (a["level"], b["level"], c["level"]) / 3;
        $.each(personaQ["personas"].sort(personaSortLevelAsc), function(i) {
            if (this["arcana"] == arcana && [a, b, c].indexOf(this) < 0) {
                // console.log(" - Found: " + this["name"]);
                personas.push(this);
                
                if (this["level"] > avg && (typeof active == "undefined")) {
                    active = this["name"];
                    personas[personas.length - 1]["active"] = true;
                    // console.log(" - Active persona: " + this["name"]);
                }
            }
        });
    }
    
    return personas;
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

function sortFindIndex(a, b) {
}

function sortPersonas(a, b, c) {
    // console.log("Sorting " + a["name"] + ", " + b["name"] + ", " + c["name"]);
    
    var p = new Array(a, b, c).sort(personaSortLevelAsc);
    
    // console.log(" - Level Sort: " + p[0]["name"] + ", " + p[1]["name"] + ", " + p[2]["name"]);

    if (p[1]["level"] == p[2]["level"]) {
        p = new Array(a) + new Array(b, c).sort(personaSortArcanaDesc);
        // console.log(" - Arcana Sort: " + + p[0]["name"] + ", " + p[1]["name"] + ", " + p[2]["name"]);
    }
    
    return p;
}
