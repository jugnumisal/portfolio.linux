# Welcome to my Portfolio Website

*Visit [www.jugnumisal.com](https://www.jugnumisal.com) to checkout my website.*

## Description:
This website template is highly customizable, easy-to-use, powered by Next.js.

It takes minutes to create your own website using this template. You only need to work with **one** file: `config.json`. After you clone this repository, simply run `yarn install && yarn dev` and start editing `config.json` to build your website!

## Steps:

1. Clone this repository

```bash
git clone https://github.com/jugnumisal/portfolio.linux.git && cd portfolio.linux
```

2. Install dependencies and start developing there:

```bash
yarn install && yarn dev
```

3. Start editing `config.json` and try saving and see the updated changes!

> 90% of this website configurations are done through the `config.json` file.

```javascript
{
  "readmeUrl": // create a Github README and link it here!
  "title": // title of the website
  "name": // your name, included in 'about' command
  "ascii": // ascii art to display
  "social": {
    "github": // your handle
    "linkedin": // your handle
  },
  "email": // your email
  "ps1_hostname": "liveterm" // hostname in prompt
  "ps1_username": "visitor", // username in prompt
  "resume_url": "../resume.pdf", // path to your resume
  "non_terminal_url": "W",
  "colors": {
    "light": {
      ...
    },
    "dark": {
      ... // you can use existing templates in themes.json or use your own!
    }
  }
}
```

> #### Feel free to change it as you see fit!


## More Configurations

### Themes

You can change the themes by changing the colors in `config.json` with the theme color you like! The themes are based on [this website](https://glitchbone.github.io/vscode-base16-term/#/).


![img](Preview.png)

### Favicons

Favicons are located in `public/`, along with the other files you may want to upload to your website. I used this [website](https://www.favicon-generator.org/) to generate favicons.

### Banner

You may also want to change the output of the `banner` command. To do that, simply paste your generated banner in `src/utils/bin/commands.ts`. I used this [website](https://www.asciiart.eu/text-to-ascii-art) to generate my banner.

## Advanced Configuration

If you want to further customize your page, feel free to change the source code to your liking!

## 🌐 Deploy on Vercel

The easiest way to deploy a Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

You can install `vercel` cli and follow the instruction [here](https://vercel.com/docs/concepts/deployments/overview).

You can also connect your github account to vercel and have vercel automatically deploy the github repository for you.

## Credit

Based on Cveinnt's LiveTerm awesome [Terminal](https://github.com/Cveinnt/LiveTerm).
