QUnit.test( "Persona JSON exists", function( assert ) {
    assert.ok( typeof personaQ !== "undefined", "Passed!" );
});

QUnit.test( "Persona skills JSON exists", function( assert ) {
    assert.ok( typeof personaQSkills !== "undefined", "Passed!" );
});

QUnit.test("All skill details exist in skills JSON and map to skills array in persona JSON", function( assert ) {
    function validSkill(skillName) {
        assert.notStrictEqual( typeof getSkillByName(skillName), "undefined", " Found " + skillName);
    }
    
    $.each(personaQ.skills, function(i) {
        validSkill(this);
    });
});

QUnit.test("All fusions have valid arcana ID numbers", function( assert ) {
    
    function checkFusion(type) {
        $.each(personaQ.fusions[type], function(i) {
            var result = personaQ.arcana[this.result];
            
            assert.notStrictEqual( typeof result, "undefined", "Found result (" + type + ") " + result);
            
            $.each(this.arcana, function(j) {
                var ingredient = personaQ.arcana[this];
                
                assert.notStrictEqual( typeof ingredient, "undefined", "Found ingredient (" + type + ") " + ingredient);
            });
        });
    }
    
    checkFusion("normal");
    checkFusion("triple");
});

QUnit.test("All persona have valid arcana ID numbers", function( assert ) {
    $.each(personaQ.personas, function(i) {
        var arcana = personaQ.arcana[this.arcana];
        
        assert.notStrictEqual( typeof arcana, "undefined", "Found arcana " + arcana + " for persona " + this.name );
    });
});

QUnit.test("All persona have valid skill ID numbers", function( assert ) {
    $.each(personaQ.personas, function(i, persona) {
        
        $.each(persona.skills, function(j, skillId) {
            var skill = personaQ.skills[skillId];
        
            assert.notStrictEqual( typeof skill, "undefined", "Found skill " + skill + " for persona " + persona.name );
        });
    });
});