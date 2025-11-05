# Mini-rakendus BDD/TDD põhimõtetel

**Grupp:** TAK24  
**Teema:** Todo nimekiri

## Kirjeldus

See projekt on väike Todo nimekirja rakendus, mis on loodud BDD (Behavior-Driven Development) ja TDD (Test-Driven Development) põhimõtete järgi. Rakendus kasutab Gherkini stsenaariume (Given When Then) ja on täielikult testidega kaetud.

## Funktsioonid

- ✅ Lisa ülesanne
- ✅ Märgi ülesanne tehtuks
- ✅ Loetle alles olevad ülesanded
- ✅ Leia ülesanne ID või pealkirja järgi

## Tehniline raam

- **Keel:** JavaScript (ES Modules)
- **BDD raamistik:** Cucumber.js
- **Unit-testide raamistik:** Vitest
- **Node.js:** 18.x või uuem

## Projekti struktuur

```
.
├── src/              # Rakenduse kood
│   └── todo.js      # TodoList klass
├── features/         # BDD feature failid
│   ├── todo.feature      # Ülesannete halduse stsenaariumid
│   └── veahaldus.feature # Veahalduse stsenaariumid
├── steps/           # Step definition'id
│   ├── todo.steps.js
│   └── veahaldus.steps.js
├── tests/           # Unit-testid
│   └── todo.test.js
├── .github/workflows/ # CI konfiguratsioon
│   └── ci.yml
├── package.json
└── README.md
```

## Paigaldamine

### Variant 1: Docker Compose (soovitatud)

1. Klooni repositoorium:
```bash
git clone <repo-url>
cd "Mini-rakendus BDD&TDD põhimõtetel"
```

2. Käivita testid Docker Compose'iga:
```bash
docker-compose up --build
```

See käivitab kõik testid (nii unit-testid kui ka BDD testid) Docker konteineris.

### Variant 2: Kohalik paigaldus

1. Klooni repositoorium:
```bash
git clone <repo-url>
cd "Mini-rakendus BDD&TDD põhimõtetel"
```

2. Paigalda sõltuvused:
```bash
npm install
```

## Käivitamine

### Unit-testid

```bash
npm run test
```

Jälgimise režiimis:
```bash
npm run test:watch
```

### BDD testid (Cucumber)

```bash
npm run test:bdd
```

### Kõik testid

```bash
npm run test:all
```

## BDD stsenaariumid

Rakendus sisaldab **2 feature faili** ja **6 stsenaariumi**:

### Feature: Ülesannete haldus (todo.feature)

#### 1. Lisatud ülesanne on nähtav
```gherkin
Given tühi nimekiri
When lisan ülesande "Osta piim"
Then loendis on 1 üksus
And üksus 1 pealkiri on "Osta piim"
And üksus 1 staatus on "open"
```

#### 2. Ülesande lõpetamine
```gherkin
Given nimekiri sisaldab ülesannet "Maksa arve"
When märgin "Maksa arve" tehtuks
Then "Maksa arve" staatus on "done"
```

#### 3. Loetle alles olevad ülesanded
```gherkin
Given nimekiri sisaldab ülesannet "Osta piim" staatusega "open"
And nimekiri sisaldab ülesannet "Maksa arve" staatusega "done"
And nimekiri sisaldab ülesannet "Küpseta kook" staatusega "open"
When loen alles olevad ülesanded
Then loendis on 2 üksus
And üksus 1 pealkiri on "Osta piim"
And üksus 2 pealkiri on "Küpseta kook"
```

### Feature: Veahaldus (veahaldus.feature)

#### 4. Tühi pealkiri põhjustab vea
```gherkin
Given tühi nimekiri
When proovin lisada ülesande tühja pealkirjaga
Then tuleb veateade "Ülesande pealkiri ei saa olla tühi"
```

#### 5. Olematu ülesande märkimine tehtuks
```gherkin
Given tühi nimekiri
When proovin märkida "Olematu ülesanne" tehtuks
Then ülesannet ei leitud
And nimekiri on endiselt tühi
```

#### 6. Tühi pealkiri tühikute puhul
```gherkin
Given tühi nimekiri
When proovin lisada ülesande "   "
Then tuleb veateade "Ülesande pealkiri ei saa olla tühi"
```

## Tööprotsess (BDD/TDD tsükkel)

1. **Kirjuta feature fail** - Defineeri käitumine Gherkini keeles
2. **Käivita BDD testid** - Need kukuvad (red)
3. **Lisa step definition'id** - Alguses pending staatuses
4. **Kirjuta unit-test** - Testi konkreetset loogikat (red)
5. **Rakenda kood** - Kuni testid on rohelised (green)
6. **Refaktoreeri** - Paranda koodi, testid peavad jääma roheliseks
7. **Korda** - Järgmise stsenaariumi jaoks

## API dokumentatsioon

### TodoList klass

#### `addTodo(title: string): Object`
Lisab uue ülesande nimekirja.
- **Parameetrid:** `title` - Ülesande pealkiri
- **Tagastab:** Lisatud ülesanne objekt (id, title, status)
- **Vead:** Viskab vea kui pealkiri on tühi

#### `markDone(title: string): Object|null`
Märgib ülesande tehtuks.
- **Parameetrid:** `title` - Ülesande pealkiri
- **Tagastab:** Uuendatud ülesanne või `null` kui ei leitud

#### `findByTitle(title: string): Object|undefined`
Leiab ülesande pealkirja järgi.
- **Parameetrid:** `title` - Ülesande pealkiri
- **Tagastab:** Ülesanne või `undefined`

#### `findById(id: number): Object|undefined`
Leiab ülesande ID järgi.
- **Parameetrid:** `id` - Ülesande ID
- **Tagastab:** Ülesanne või `undefined`

#### `getAllTodos(): Array`
Tagastab kõik ülesanded.
- **Tagastab:** Massiiv kõigist ülesannetest

#### `getOpenTodos(): Array`
Tagastab ainult avatud (open) ülesanded.
- **Tagastab:** Massiiv avatud ülesannetest

#### `clear(): void`
Tühjendab nimekirja.

#### `getCount(): number`
Tagastab ülesannete arvu.

## Näide kasutamisest

```javascript
import { TodoList } from './src/todo.js';

const todoList = new TodoList();

// Lisa ülesanne
const todo = todoList.addTodo('Osta piim');
console.log(todo); // { id: 1, title: 'Osta piim', status: 'open' }

// Märgi tehtuks
todoList.markDone('Osta piim');

// Loetle avatud ülesanded
const openTodos = todoList.getOpenTodos();
console.log(openTodos);
```

## CI/CD

Projekt kasutab GitHub Actions CI/CD põhimõtteid. Iga push ja pull request käivitab:

- Unit-testid (Vitest)
- BDD testid (Cucumber.js)
- Testid käivitatakse Node.js 18.x ja 20.x versioonidega

CI logi on saadaval GitHub Actions vahekaardil.

## Testide katvus

- ✅ **2 feature faili** (Ülesannete haldus, Veahaldus)
- ✅ **6 stsenaariumi** kokku (3 positiivset, 3 negatiivset)
- ✅ Kõik BDD stsenaariumid on implementeeritud
- ✅ Step definition'id on kaetud unit-testidega
- ✅ Kõik avalikud meetodid on testitud
- ✅ Veahaldus on testitud (negatiivsed stsenaariumid)
- ✅ CI/CD seadistatud GitHub Actions'iga
- ✅ Docker Compose toetatud

## Autorid

TAK24 grupp

## Litsents

MIT

