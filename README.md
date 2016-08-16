# CSV Simple Search

http://devprogress.us/csv-simple-search

## Trello cards

- [CSV Search Interface Tool](https://trello.com/c/IPXKBVOS)

## Slack channels

- [dev-csv-simple-search](https://devprogress.slack.com/messages/dev-csv-simple-search)

## Dev Setup

- `npm install` to install dependencies.
- `npm run dev` to start dev server acessible via `localhost:8080`. Hot-reloading and recompiling should automatically be enabled.
- `npm run build` to build production version (in dist).

## Contributing

- all source files are in `/src`.
- new CSS files can be added (if needed) by: `import 'filename.css'`. They will be automatically included in the index.html file with appropriate vendor prefixes added (so no need to add your own). They will still cascade so be careful of naming collisions.
- @alexyaseen is happy to answer any React or ES6 questions.

## Deploying

**only deploy from `master`, and only if all tests are passing**

- `npm run deploy` will automatically run `npm run build` on your current branch and then push the contents of the dist folder to the `gh-pages` branch. Running this command will result in a deploy to the live website, so please use caution before running.
