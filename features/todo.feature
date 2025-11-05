Feature: Ülesannete haldus

  Scenario: Lisatud ülesanne on nähtav
    Given tühi nimekiri
    When lisan ülesande "Osta piim"
    Then loendis on 1 üksus
    And üksus 1 pealkiri on "Osta piim"
    And üksus 1 staatus on "open"

  Scenario: Ülesande lõpetamine
    Given nimekiri sisaldab ülesannet "Maksa arve"
    When märgin "Maksa arve" tehtuks
    Then "Maksa arve" staatus on "done"

  Scenario: Loetle alles olevad ülesanded
    Given nimekiri sisaldab ülesannet "Osta piim" staatusega "open"
    And nimekiri sisaldab ülesannet "Maksa arve" staatusega "done"
    And nimekiri sisaldab ülesannet "Küpseta kook" staatusega "open"
    When loen alles olevad ülesanded
    Then loendis on 2 üksus
    And üksus 1 pealkiri on "Osta piim"
    And üksus 2 pealkiri on "Küpseta kook"

