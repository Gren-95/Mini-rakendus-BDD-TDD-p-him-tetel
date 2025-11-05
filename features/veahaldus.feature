Feature: Veahaldus

  Scenario: Tühi pealkiri põhjustab vea
    Given tühi nimekiri
    When proovin lisada ülesande tühja pealkirjaga
    Then tuleb veateade "Ülesande pealkiri ei saa olla tühi"

  Scenario: Olematu ülesande märkimine tehtuks
    Given tühi nimekiri
    When proovin märkida "Olematu ülesanne" tehtuks
    Then ülesannet ei leitud
    And nimekiri on endiselt tühi

  Scenario: Tühi pealkiri tühikute puhul
    Given tühi nimekiri
    When proovin lisada ülesande "   "
    Then tuleb veateade "Ülesande pealkiri ei saa olla tühi"

