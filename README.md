# TODO App

# Project requirements

- Add and view tasks
- Delete a task
- Complete a task
- Set a priority for my tasks (clarifications: high, medium, low)
- View the tasks sorted by priority and name (clarifications: Name and priority sort are independent of each other. However, you may choose to further order by the other field if more than one item has the same value.)
- View the number of total and completed tasks

# Architecture

- Boilerplate: `Create React App`
- Styling: `Semantic UI`
- Static type checking: `TypeScript`
- Testing: `Jest` / `React Testing Library`
- Linting: `EsLint`
- Formatting: `Prettier`

# Install and running the app

Clone this project into your local machine.

In the project directory, you can run:

`yarn start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.

`yarn test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

# Improvements / to consider

- Improve responsive of the design (mobile devices)
- Introduce a CSS in JS type of library to define special styling not handling by SemanticUI directly into the react components instead of managing style files

# A note about testing:

Semantic UI library does not make it easy to query components (especially select, checkbox, etc...). We might have to use a special `data id` to be able to manipulate those components as part of our test suite.

Also, we need to test our pure components (functional), we could use react testing library or snapshots.
