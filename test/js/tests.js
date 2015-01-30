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
            
            assert.notStrictEqual( typeof result, "undefined", " Found result (" + type + ") " + result);
            
            $.each(this.arcana, function(j) {
                var ingredient = personaQ.arcana[this];
                
                assert.notStrictEqual( typeof ingredient, "undefined", " Found ingredient (" + type + ") " + ingredient);
            });
        });
    }
    
    checkFusion("normal");
    checkFusion("triple");
});