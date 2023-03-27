# An example of scalable and easily extensible REST API and FE UI tests framework

## Table of Contents

- [Architecture](#architecture)
- [Required presets](#presets)
- [How to run](#howto)
- [Project structure](#structure)



___
## 🛠️ Architecture
<a name="architecture"></a>
```
 ------------------------------------------------------------------------
|                               Architecture                             |
|-----------------|---------------|------------|-------------|-----------|
| REST API Testing| WEB UI driver | Execution  | Assertion   | Reporting |
|-----------------|---------------|------------|-------------|-----------|
|                 |               |            |             |           |
| Axios           | Playwright    | Codeceptjs | Jest Expect | Allure    |
|                 |               |            |             |           |
 -------------------------------------------------------------------------

 --------------------------------------------------------------------------
|                              Code Control                                |
|-----------------------------------------------|-------------|------------|
| Linter | Code formatting / Code style control | Commit hook | Unit tests |
|--------|--------------------------------------|-------------|------------|
| Eslint | Prettier & Eslint                    | Husky       | Jest       |
 --------------------------------------------------------------------------

```
<a name="presets"></a>
## 🧰 Required presets
* Docker
* Node.js
* Yarn
* JDK or JRE 8+ (For Allure reports only if you wanna host and see the web report locally)

<a name="howto"></a>
## ▶️ How to run

**to run UI functional tests locally**
```yarn test:ui:e2e```

**to run API tests locally**
```test:api```

**to open Allure report after test run**
```yarn run allure:open```
don't forget to clean output dir is you run tests several times and don't want to mess report
```yarn run allure:clean```

<a name="structure"></a>
## Project structure

- `.env.example` - required env variables 
- `services` - wrapped endpoints to use it both in api and ui tests
- `utils` - helpers
- `models` - data models to generate data by builders or to assign objects types
- `unit-test` - unit tests for the testing framework to check on pre commit
- `test\api\**.test.ts` - containing the api tests
- `test\ui\pages` - containing POM based classes which describes web pages
- `test\ui\**.test.ts` - containing the ui functional tests
- `testData.ts` - a were temporary deposition to store test data
