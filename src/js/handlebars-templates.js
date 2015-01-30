this["personaQTemplates"] = this["personaQTemplates"] || {};

this["personaQTemplates"]["accordionPersonaList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <div class=\"panel panel-default\">\r\n                <div class=\"panel-heading\" role=\"tab\" id=\"tab-"
    + escapeExpression(lambda((data && data.key), depth0))
    + "\">\r\n                    <h4 class=\"panel-title\">\r\n                        <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse"
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" aria-controls=\"collapse"
    + escapeExpression(lambda((data && data.key), depth0))
    + "\">\r\n                            "
    + escapeExpression(lambda((data && data.key), depth0))
    + "</a>\r\n                    </h4>\r\n                </div>\r\n                <div id=\"collapse"
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelleyby=\"tab-"
    + escapeExpression(lambda((data && data.key), depth0))
    + "\">\r\n                    <ul id=\"personas"
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" class=\"panel-body list-group\">\r\n";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </ul>\r\n                </div>\r\n            </div>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.personaListItem, '                            ', 'personaListItem', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">\r\n        <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> Persona List\r\n    </h3>\r\n</div>\r\n            \r\n<div class=\"panel-body\">\r\n    <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.letters : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\r\n</div>\r\n    \r\n";
  stack1 = this.invokePartial(partials.credits, '', 'credits', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});



this["personaQTemplates"]["arcanaList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.personaListItem, '            ', 'personaListItem', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">\r\n        <span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"/> "
    + escapeExpression(((helper = (helper = helpers.arcana || (depth0 != null ? depth0.arcana : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"arcana","hash":{},"data":data}) : helper)))
    + "\r\n    </h3>\r\n</div>\r\n            \r\n<div id=\"arcana-list\" class=\"panel-body\">\r\n    <ul class=\"list-group\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.personas : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </ul>\r\n</div>\r\n\r\n";
  stack1 = this.invokePartial(partials.credits, '', 'credits', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});



this["personaQTemplates"]["creditsPartial"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"credits panel-footer text-right\">\r\n    <div id=\"\" class=\"text-right\">\r\n        <span>\r\n            <small>\r\n                <ol class=\"breadcrumb\">\r\n                    <li><a href=\"https://github.com/amarriner/PersonaQFusionCalculator\">v0.7.0</a></li>\r\n                    <li>by <a href=\"https://twitter.com/amarriner\">@amarriner</a></li>\r\n                    <li>Based on \r\n                        <a href=\"http://www.gamefaqs.com/3ds/739685-persona-q-shadow-of-the-labyrinth/faqs/70843\">this FAQ</a>\r\n                    </li>\r\n                </ol>\r\n            </small>\r\n        </span>\r\n    </div>\r\n</div>";
  },"useData":true});



this["personaQTemplates"]["ingredientsControls"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <option value=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">\r\n        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"/> Ingredients\r\n    </h3>\r\n</div>\r\n            \r\n<div class=\"panel-body\">\r\n    <p class=\"exclaim bg-info text-info\">\r\n        <strong>\r\n            <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"/> "
    + escapeExpression(((helper = (helper = helpers.exclaim || (depth0 != null ? depth0.exclaim : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"exclaim","hash":{},"data":data}) : helper)))
    + "\r\n        </strong>\r\n    </p>\r\n                \r\n    <div class=\"row\">\r\n        <div id=\"f-top\" class=\"form-group col-md-12\">\r\n            <label for=\"fused\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> Persona</label>\r\n            <select id=\"fused\" class=\"form-control\">\r\n";
  stack1 = ((helper = (helper = helpers.eachSortedPersonas || (depth0 != null ? depth0.eachSortedPersonas : depth0)) != null ? helper : helperMissing),(options={"name":"eachSortedPersonas","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.eachSortedPersonas) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </select>\r\n        </div>\r\n    </div>\r\n            \r\n    <div class=\"row text-center\">\r\n        <strong class=\"text-info\">\r\n            <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> \r\n            This function is very much a work in progress!\r\n            <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\r\n        </strong>\r\n    </div>\r\n</div>\r\n    \r\n";
  stack1 = this.invokePartial(partials.credits, '', 'credits', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});



this["personaQTemplates"]["ingredientsList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <li class=\"row list-group-item\">\r\n            <div class=\"col-md-6\">"
    + escapeExpression(((helpers.getArcanaName || (depth0 && depth0.getArcanaName) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.arcana : depth0)) != null ? stack1['0'] : stack1), {"name":"getArcanaName","hash":{},"data":data})))
    + "</div>\r\n            <div class=\"col-md-6\">"
    + escapeExpression(((helpers.getArcanaName || (depth0 && depth0.getArcanaName) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.arcana : depth0)) != null ? stack1['1'] : stack1), {"name":"getArcanaName","hash":{},"data":data})))
    + "</div>\r\n        </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<ul class=\"list-group\">\r\n    <li class=\"row list-group-item active\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span> \r\n                <span class=\"hidden-xs\">Arcana: </span>\r\n                "
    + escapeExpression(((helper = (helper = helpers.arcana || (depth0 != null ? depth0.arcana : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"arcana","hash":{},"data":data}) : helper)))
    + "\r\n            </div>\r\n        </div>\r\n    </li>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});



this["personaQTemplates"]["personaListItemPartial"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return " list-group-item-info";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        <li><a onclick=\"showSkillModal('"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "');\"><abbr title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</abbr></a></li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "<li class=\"row list-group-item";
  stack1 = ((helpers.ifEq || (depth0 && depth0.ifEq) || helperMissing).call(depth0, ((stack1 = (data && data.root)) && stack1.active), (depth0 != null ? depth0.name : depth0), {"name":"ifEq","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n    <div class=\"col-xs-4 col-md-6\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\r\n    <div class=\"col-xs-1\">"
    + escapeExpression(((helper = (helper = helpers.level || (depth0 != null ? depth0.level : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"level","hash":{},"data":data}) : helper)))
    + "</div>\r\n    <div class=\"col-xs-1\">"
    + escapeExpression(((helper = (helper = helpers.hp || (depth0 != null ? depth0.hp : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hp","hash":{},"data":data}) : helper)))
    + "</div>\r\n    <div class=\"col-xs-1\">"
    + escapeExpression(((helper = (helper = helpers.sp || (depth0 != null ? depth0.sp : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sp","hash":{},"data":data}) : helper)))
    + "</div>\r\n                \r\n    <div class=\"col-xs-3 text-right\">\r\n        <div class=\"dropdown\">\r\n            <button class=\"btn btn-primary btn-xs\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                <span class=\"glyphicon glyphicon-fire\" aria-hidden=\"true\"></span> Skills <li class=\"caret\"></li>\r\n            </button>\r\n            <ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\">\r\n";
  stack1 = ((helpers.eachSortedSkills || (depth0 && depth0.eachSortedSkills) || helperMissing).call(depth0, (depth0 != null ? depth0.skills : depth0), {"name":"eachSortedSkills","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </ul>\r\n        </div>\r\n    </div>\r\n</li>";
},"useData":true});



this["personaQTemplates"]["personaList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span> <span class=\"hidden-xs\">Arcana: </span> "
    + escapeExpression(((helper = (helper = helpers.arcana || (depth0 != null ? depth0.arcana : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"arcana","hash":{},"data":data}) : helper)))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.personaListItem, '        ', 'personaListItem', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul class=\"list-group\">\r\n    <li class=\"row list-group-item active\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-4 col-md-6\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.title : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </div>\r\n            <div class=\"col-xs-1\">Lvl</div>\r\n            <div class=\"col-xs-1\">HP</div>\r\n            <div class=\"col-xs-1\">SP</div>\r\n        </div>\r\n    </li>\r\n    \r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.personas : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"usePartial":true,"useData":true});



this["personaQTemplates"]["searchControls"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <option value=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">\r\n        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"/> Search\r\n    </h3>\r\n</div>\r\n            \r\n<div class=\"panel-body\">\r\n    <p class=\"exclaim bg-info text-info\">\r\n        <strong>\r\n            <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"/> "
    + escapeExpression(((helper = (helper = helpers.exclaim || (depth0 != null ? depth0.exclaim : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"exclaim","hash":{},"data":data}) : helper)))
    + "\r\n        </strong>\r\n    </p>\r\n                \r\n    <div class=\"row\">\r\n        <div id=\"p1\" class=\"form-group col-md-4\">\r\n            <label for=\"persona1\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> Persona 1</label>\r\n            <select id=\"persona1\" class=\"form-control\">\r\n";
  stack1 = ((helper = (helper = helpers.eachSortedPersonas || (depth0 != null ? depth0.eachSortedPersonas : depth0)) != null ? helper : helperMissing),(options={"name":"eachSortedPersonas","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.eachSortedPersonas) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </select>\r\n        </div>\r\n                    \r\n        <div id=\"p1\" class=\"form-group col-md-4\">\r\n            <label for=\"persona2\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> Persona 2</label>\r\n            <select id=\"persona2\" class=\"form-control\">\r\n";
  stack1 = ((helper = (helper = helpers.eachSortedPersonas || (depth0 != null ? depth0.eachSortedPersonas : depth0)) != null ? helper : helperMissing),(options={"name":"eachSortedPersonas","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.eachSortedPersonas) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </select>\r\n        </div>\r\n\r\n        <div id=\"p1\" class=\"form-group col-md-4\">\r\n            <label for=\"persona3\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> Persona 3</label>\r\n            <select id=\"persona3\" class=\"form-control\">\r\n                <option value=\"\">NONE</option>\r\n";
  stack1 = ((helper = (helper = helpers.eachSortedPersonas || (depth0 != null ? depth0.eachSortedPersonas : depth0)) != null ? helper : helperMissing),(options={"name":"eachSortedPersonas","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.eachSortedPersonas) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </select>\r\n        </div>\r\n\r\n    </div>    \r\n</div>\r\n            \r\n";
  stack1 = this.invokePartial(partials.credits, '', 'credits', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});



this["personaQTemplates"]["skillControls"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">\r\n        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"/> Skill Search\r\n    </h3>\r\n</div>\r\n    \r\n<div class=\"panel-body\">\r\n    <p class=\"exclaim bg-info text-info\">\r\n        <strong>\r\n            <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"/> "
    + escapeExpression(((helper = (helper = helpers.exclaim || (depth0 != null ? depth0.exclaim : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"exclaim","hash":{},"data":data}) : helper)))
    + "\r\n        </strong>\r\n    </p>\r\n                \r\n    <div class=\"row\">\r\n        <div id=\"typeahead-container\" class=\"form-group col-md-12\">\r\n            <label for=\"skill-search-text-field\"><span class=\"glyphicon glyphicon-fire\" aria-hidden=\"true\"/> Skill</label>\r\n            <input type=\"text\" id=\"skill-search-text-field\" name=\"skill-search-text-field\" class=\"form-control typeahead\">\r\n        </div>\r\n    </div>\r\n                \r\n    <div class=\"row\">\r\n        <div id=\"autocomplete-container\" class=\"col-md-12\">\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["personaQTemplates"]["skillDetails"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "<div class=\"panel panel-info\">\r\n";
  },"3":function(depth0,helpers,partials,data) {
  return "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>    \r\n";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <div class=\"row\">\r\n        <div class=\"col-xs-3 col-sm-2 text-info\">\r\n            <strong>\r\n                <span class=\"glyphicon glyphicon-share-alt\" aria-hidden=\"true\"></span> Range\r\n            </strong>\r\n        </div>\r\n        \r\n        <div class=\"col-xs-9\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.skill : depth0)) != null ? stack1.range : stack1), depth0))
    + "</div>\r\n    </div>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <div class=\"row\">\r\n        <div class=\"col-xs-3 col-sm-2 text-info\">\r\n            <strong>\r\n                <span class=\"glyphicon glyphicon-yen\" aria-hidden=\"true\"></span> Cost\r\n            </strong>\r\n        </div>\r\n                    \r\n        <div class=\"col-xs-9\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.skill : depth0)) != null ? stack1.cost : stack1), depth0))
    + "</div>\r\n    </div>\r\n";
},"9":function(depth0,helpers,partials,data) {
  return "</div>\r\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.wrapper : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n<div class=\"modal-header panel-heading\">\r\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.wrapper : depth0), {"name":"unless","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <h4 class=\"modal-title text-uppercase\" id=\"skill-modal-label\">\r\n        <span class=\"glyphicon glyphicon-fire\" aria-hidden=\"true\"></span> "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.skill : depth0)) != null ? stack1.name : stack1), depth0))
    + "\r\n    </h4>\r\n</div>\r\n                \r\n<div id=\"skill-modal-body\" class=\"modal-body panel-body\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-3 col-sm-2 text-info\">\r\n            <strong>\r\n                <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span> Type\r\n            </strong>\r\n        </div>\r\n                    \r\n        <div class=\"col-xs-9\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.skill : depth0)) != null ? stack1.type : stack1), depth0))
    + "</div>\r\n    </div>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.skill : depth0)) != null ? stack1.range : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.skill : depth0)) != null ? stack1.cost : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\r\n            \r\n<div id=\"skill-modal-footer\" class=\"modal-footer panel-footer\">\r\n    <p>\r\n        <em>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.skill : depth0)) != null ? stack1.description : stack1), depth0))
    + "</em>\r\n    </p>\r\n</div>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.wrapper : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});