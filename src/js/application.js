var activePersona;

var deepLinks = {};
deepLinks.index = function() { activateSearch(); };
deepLinks.search = function() { activateSearch(); };
deepLinks.ingredients = function() { activateIngredients(); };
deepLinks.skills = function(name) { activateSkills(unslugify(name)); };
deepLinks.personas = function() { activatePersonas(); };
deepLinks.arcana = function(name) { activateArcana(personaQ.arcana.indexOf(unslugify(name))); };
                    
/*
 * Initial pageload stuff
 */
$(document).ready(function() {
    // Register Handlebars stuff
    registerHelpers();
    registerPartials();
                
    // Fix issue where bootstrap menu doesn't close on mobile when a link is clicked
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') !== 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });
                        
    // Filling out arcana dropdown
    $("#arcana-navbar").empty();
    $.each(personaQ.arcana.sort(), function(i) {
        $("#arcana-navbar").append($("<li/>").append($('<a class="deep-link" href="#/arcana/' + slugify(this) + '"/>').text(this)));
    });
                
    // Setting up deep linking
    $("a.deep-link").address(function() {
        
        return goDeepLink($(this).attr('href').replace(/^#/, ''));
        
    }).init(function() {
        
        return goDeepLink($.address.path());
        
    });
});

/*
 * Process deep link value 
 */
function goDeepLink(link) {
    var key = link.replace(/^\//, "");
    // console.log(key + " " + link);
    
    if (typeof key === "undefined" || key === "") {
        key = "index";
    }
    // console.log(key + " " + link);
    
    var param;
    key = key.split("/")[0];
    
    // console.log(key + " " + link);
    
    if (link.split("/").length > 1) {
        param = link.split("/")[link.split("/").length - 1];
    }
    
    // console.log(key + " " + link);
    
    deepLinks[key](param);
    
    // console.log(key + " " + link);
    return link;
}

/*
 * Return slug version of string 
 */
function slugify(name) {
    var r;
    if (name) {
        r = name.toLowerCase().replace(" ", "-");
    }
    
    return r;
}

/*
 * Return unslug version of string
 */
function unslugify(name) {
    var r = "";
    $.each(name.split("-"), function() {
        if (typeof this !== "undefined") {
            if (r !== "") {
                r += " ";
            }
        
            r += this[0].toUpperCase() + this.substring(1, this.length);
        }
    });
    
    return r;
}

/* ------------------------- Handlebars Functions ------------------------------------- */

function registerHelpers() {
    // eachSortedSkills
    Handlebars.registerHelper('eachSortedSkills', function(skills, options) {
        var s = [];
        
        $.each(skills.sort(skillSortNameAsc), function(i) {
            s.push(getSkillByName(personaQ.skills[this]));
        });
            
        return options.fn(s);
    });
    
    // eachSortedPersonas
    Handlebars.registerHelper('eachSortedPersonas', function(options) {
        return options.fn(personaQ.personas.sort(personaSortNameAsc));
    });
    
    // getArcanaName
    Handlebars.registerHelper('getArcanaName', function(arcana) {
        return personaQ.arcana[arcana];
    });

    // ifEq
    Handlebars.registerHelper('ifEq', function(a, b, options) {
        return (a === b ? options.fn(this) : options.inverse(this));
    });
}

function registerPartials() {
    Handlebars.registerPartial("personaListItem", personaQTemplates.personaListItemPartial);
    Handlebars.registerPartial("credits", personaQTemplates.creditsPartial);
}

/* -------------- Activation Functions for setting up various views ---------------------- */

/*
 * Build search controls after loading JSON
 */ 
function activateSearch() {    
                                                    
    $("#select").html(personaQTemplates.searchControls({
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
    $("#select").html(personaQTemplates.ingredientsControls({
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
    
    $("#select").html(personaQTemplates.arcanaList({
        arcana: personaQ.arcana[arcana],
        personas: getPersonasByArcana(arcana),
        title: true
    }));
}

/*
 * Build list of personas
 */
function activatePersonas() {
    $("#fusion-result").empty();
    
    var letters = {};
    $.each(personaQ.personas.sort(personaSortNameAsc), function(i) {
        if (! letters[this.name[0]]) {
            letters[this.name[0]] = [];
        }
        
        letters[this.name[0]].push(this);
    });
    
    $("#select").html(personaQTemplates.accordionPersonaList({
        letters: letters
    }));
    
   $("#accordion div.panel div.panel-heading h4.panel-title a").click(function() {
        $(this).parent().parent().parent().toggleClass("panel-info");
    });
        
    $("#accordion").on("hidden.bs.collapse", function() { 
        $('#accordion div.panel div[aria-expanded="false"]').parent().removeClass("panel-info");
    });

}

/*
 * Build skill search controls
 */ 
function activateSkills(name) {    
    // console.log(name);
    $("#fusion-result").empty();
    
    $("#select").html(personaQTemplates.skillControls({
        exclaim: "Start typing a skill name to search"
    }));

    $("#typeahead-container .typeahead").typeahead({
        hint: true,
        highlight: true,
        minLength: 2
    },
    {
        name: 'skills',
        displayKey: 'value',
        source: substringMatcher(personaQ.skills.sort())
    });
                
    $("#skill-search-text-field").focus().bind('typeahead:selected', function() {
        var a = "/skills/" + slugify($(this).val());
        $.address.path(a);
        goDeepLink(a);
    });
    
    if (typeof name !== "undefined" && name !== "") {
        
        skill = getSkillByName(name);
        
        if (skill) {
            $("#fusion-result").html(personaQTemplates.skillDetails({
                skill: skill,
                slug: slugify(name),
                wrapper: true
            }));  
        }
    }
}

/* 
 * Lifted from typehead.js docs to build suggestion list
 */
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};

/*
 * Put appropriate skill details in modal, then show it
 */
function showSkillModal(skillName) {
    $("#skill-modal-content").html(personaQTemplates.skillDetails({
        skill: getSkillByName(skillName)
    }));
    
    $("#skill-modal").modal("show");
    return false;
}

/* ------------------------ Fusion Calculation Functions ------------------------------- */

function fuse() {
    $("#fusion-result").empty();
    var p1 = getPersonaByName($("#persona1").val());
    var p2 = getPersonaByName($("#persona2").val());
    var p3 = getPersonaByName($("#persona3").val());
    
    var personas = [];
    
    if (p1 !== p2 && ! p3) {
        personas = getNormalFusion(p1, p2);
    }
    else if (p1 && p2 && p3 && (p1 !== p2 && p1 !== p3 && p2 !== p3)) {
        personas = getTripleFusion(p1, p2, p3);
    }

    if (personas.length > 0) {
        // console.log(" - Outputting personas (" + activePersona + ")");
            
        $("#fusion-result").html(personaQTemplates.personaList({
            active: activePersona,
            arcana: personaQ.arcana[personas[0].arcana],
            personas: personas,
            slug: slugify(personaQ.arcana[personas[0].arcana]),
            title: true
        }));
    }
}

function getFusion(a, b, type) {
    type = (typeof type === "undefined" || $.inArray(type, ["normal", "triple"]) < 0) ? "normal" : type;

    // console.log("Getting [" + type + "] fusion for arcana: " + personaQ.arcana[a] + ", " + personaQ.arcana[b]);
    var r = false;

    if (a !== b || a === b) {
        $.each(personaQ.fusions[type], function() {
            
            if ($.inArray(a, this.arcana) >= "0" && $.inArray(b, this.arcana) >= "0") {
                r = this.result;
                // console.log(" - [" + type + "] " + personaQ.arcana[a] + " fused with " + personaQ.arcana[b] + " results in " + personaQ.arcana[r]);
            
            }
        });
    }
    
    return r;
}
    
function getNormalFusion(a, b) {
    // console.log("Getting normal fusion for: " + a.name + ", " + b.name);
    
    var arcana = getFusion(a.arcana, b.arcana);
    var persona;
    var personas = [];
    
    if (arcana) {
        activePersona = undefined;
        
        var avg = (a.level + b.level) / 2;
        $.each(personaQ.personas.sort(personaSortLevelAsc), function(i) {
            if (this.arcana === arcana) {
                // console.log(" - Found: " + this.name);
                personas.push(this);
                
                if (this.level > avg && (typeof activePersona === "undefined")) {
                    activePersona = this.name;
                    personas[personas.length - 1].active = true;
                    // console.log(' - Active persona: ' + activePersona);
                }
            }
        });
    }
    
    return personas;
}

function getTripleFusion(a, b, c) {
    // console.log("Getting triple fusion for: " + a.name + ", " + b.name + ", " + c.name);
    var r = false;
    
    activePersona = undefined;
    var personas = sortPersonas(a, b, c);
    var arcana = getFusion(personas[0].arcana, personas[1].arcana);
    r = getFusion(arcana, personas[2].arcana, "triple");
    r = (typeof r === "undefined") ? false : r;
    
    personas = [];
    if (r) {
        // console.log(" - Result: " + personaQ.arcana[r]);
        
        var avg = (a.level, b.level, c.level) / 3;
        $.each(personaQ.personas.sort(personaSortLevelAsc), function(i) {
            if (this.arcana === arcana && [a, b, c].indexOf(this) < 0) {
                // console.log(" - Found: " + this.name);
                personas.push(this);
                
                if (this.level > avg && (typeof activePersona === "undefined")) {
                    activePersona = this.name;
                    personas[personas.length - 1].active = true;
                    // console.log(" - Active persona: " + this.name);
                }
            }
        });
    }
    
    return personas;
}

/* ----------------------------- Retrieval Functions ----------------------------- */

function getIngredients() {
    $("#fusion-result").empty();
    
    var persona = getPersonaByName($("#fused").val());
    // console.log("Finding ingredients for " + persona.name);
    
    var results = [];
    $.each(personaQ.fusions.normal, function(i, value) {
        if (this.result === persona.arcana) {
            // console.log(this.arcana);
            results.push(this);    
        }
    });
    
    if (results.length > 0) {
        // console.log("Found results");
        
        $("#fusion-result").html(personaQTemplates.ingredientsList({
            arcana: personaQ.arcana[persona.arcana],
            results: results
        }));
    }
}

function getPersonasByArcana(arcana) {
    // console.log("Getting personas by arcana (" + personaQ.arcana[arcana] + ")");
    
    var personas = [];
    $.each(personaQ.personas, function(i, value) {
        if (this.arcana === arcana) {
            personas.push(this);
        }
    });
    
    return personas;
}

function getPersonaByName(name) {
    // console.log("Getting persona by name (" + name + ")");
    var r = false;
    
    $.each(personaQ.personas, function() {
        if (this.name === name) {
            r = this;
            // console.log(" - Found " + this.name);
        }
    });
    
    return r;
}

function getSkillByName(name) {
    var r = false;
    
    $.each(personaQSkills, function(i) {
        if (this.name === name) {
            r = this;
        }
    });
    
    return r;
}

/* ----------------------- Sorting Functions ----------------------- */

function personaSortArcanaAsc(a, b) {
    return a.arcana - b.arcana;
}

function personaSortArcanaDesc(a,b) {
    return b.arcana - a.arcana;
}

function personaSortLevelAsc(a, b) {
    return a.level - b.level;
}

function personaSortLevelDesc(a, b) {
    return b.level - a.level;
}

function personaSortNameAsc(a, b) {
    var end = Math.min(a.name.length, b.name.length);
    var ndx = -1;
    
    for (var i = 0; i < end; i++) {
        if (a.name[i] !== b.name[i] && ndx === -1) {
            ndx = i;
        }
    }
    
    if (ndx === -1) {
        ndx = end;
        
        if (a.length <= ndx) {
            a.push(" ");
        }
        
        if (b.length <= ndx) {
            b.push(" ");
        }
    }
    
    return a.name.charCodeAt(ndx) - b.name.charCodeAt(ndx);
}

function personaSortNameDesc(a, b) {
    var end = Math.min(a.name.length, b.name.length);
    var ndx = -1;
    
    for (var i = 0; i < end; i++) {
        if (a.name[i] !== b.name[i] && ndx === -1) {
            ndx = i;
        }
    }
    
    if (ndx === -1) {
        ndx = end;
        
        if (a.length <= ndx) {
            a.push(" ");
        }
        
        if (b.length <= ndx) {
            b.push(" ");
        }
    }
    
    return b.name.charCodeAt(ndx) - a.name.charCodeAt(ndx);
}

function skillSortNameAsc(a, b) {
    var end = Math.min(personaQ.skills[a].length, personaQ.skills[b].length);
    var ndx = -1;
    
    for (var i = 0; i < end; i++) {
        if (personaQ.skills[a][i] !== personaQ.skills[b][i] && ndx === -1) {
            ndx = i;
        }
    }
    
    if (ndx === -1) {
        ndx = end;
        
        if (a.length <= ndx) {
            a.push(" ");
        }
        
        if (b.length <= ndx) {
            b.push(" ");
        }
    }
    
    return personaQ.skills[a].charCodeAt(ndx) - personaQ.skills[b].charCodeAt(ndx);
}

function sortPersonas(a, b, c) {
    // console.log("Sorting " + a.name + ", " + b.name + ", " + c.name);
    
    var p = [a, b, c].sort(personaSortLevelAsc);
    
    // console.log(" - Level Sort: " + p[0].name + ", " + p[1].name + ", " + p[2].name);

    if (p[1].level === p[2].level) {
        p = new Array(a) + new Array(b, c).sort(personaSortArcanaDesc);
        // console.log(" - Arcana Sort: " + p[0].name + ", " + p[1].name + ", " + p[2].name);
    }
    
    return p;
}