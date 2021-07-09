<h1 align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/novatalks/novatalks-website/main/public/images/logo.jpg" alt="Novatalks">
</h1>

<h1 align="center">
    Novatalks Website
</h1>
<p align="center">NextJs website with Prismic CMS, Typescript</p>

<p align="center">
 <a href="#about">About</a> •
 <a href="#tools-and-technologies">Tools and Technologies</a> •
 <a href="#spin-up">Spin Up</a> •
 <a href="#license">License</a> •
 <a href="#author">Author</a> •
</p>

## About

Website for Novatalks student group to showcase events, speakers, members, partner companies, and more.

---

// Talks é Avenir

## Tools and Technologies

Tools and technologies used:

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prismic CMS](https://prismic.io/) headless CMS for content management.
- [Styled-Components](https://styled-components.com/)
- [SASS](https://sass-lang.com/)
- [ESLint](https://eslint.org/) [1](https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js)
  [2](https://benjaminwfox.medium.com/next-js-setup-config-for-testing-linting-and-absolute-imports-605959d7bd6f#003c) [3](https://nextjs.org/docs/basic-features/eslint)
- [Use-dark-mode](https://github.com/donavon/use-dark-mode) to support `prefers-color-scheme: dark` natively.
- [react icons](https://react-icons.github.io/react-icons) to display icons.
- [react-world-flags](https://github.com/smucode/react-world-flags#readme) to display locale flags.
- [react-div-100vh](https://github.com/mvasin/react-div-100vh) to fill 100vh on mobile screens.
- [three.ja](https://threejs.org/), [react-three.fiber](https://github.com/pmndrs/react-three-fiber) to display an interactive 3D object.

---

## Spin Up

### **Requirements**

Install:

- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Create Prismic CMS account:

- [Prismic CMS](https://prismic.io/)

### **Clone Project**

```bash
# Clone Repo
$ git clone https://github.com/novatalks/novatalks-website
# Enter local folder
$ cd novatalks-website
```

### **Startup**

```bash
# Execute yarn to install dependencies
$ yarn

# Copy env template file and add the necessary tokens
$ cp .env.local.example .env.local

# Start development
$ yarn dev

```

### **Other**

```bash
# Start ESLint
$ yarn lint

# Build SSG
$ yarn build

# Start production website after build
$ yarn start

```

---

## License

MIT license. See [LICENSE](LICENSE).

---

## Author

Made for NovaTalks by Pedro Almeida -> www.ptalmeida.com

Initial template based on [Thalles Ian's Space-Traveling](https://github.com/thallesyam/space-traveling.git).
