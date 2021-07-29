# QuickCoder.com
Fullstack application concept focused on typing practice.

### Client:
- development tools: yarn, typescript, webpack and eslint
- framework: react
- state management: redux,
- styling: styled-components
- data fetching: axios
- routing: react-router

### Server
- development tools: yarn, typescript, 
- framework/server: express - apollo-server-express middleware for graphql
- graphql management: type-graphql
- database management: typeorm
- database provider: postgresql
- security: jwt, argon2, zxcvbn

#### Changes from previous versions:
- **API/FETCHING** - Migrated from apollo-client to axios => better interaction with redux, faster development
- **STYLES** - Sass stylesheets replaced with Styled Components => improved conditional/prop styles, cleaner code structure
- **RESOLVERS** - Separated files for every mutation/query.
- **ANIMATIONS** - Replaced multi-rendering redux keyframes with css transitions combined with in/out states.
- **CODE ASPECT** - Multiple code refractors, index files, better folder structure

