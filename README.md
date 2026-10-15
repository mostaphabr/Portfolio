<div align="center">

# Mustapha Boutrhaline — Portfolio

**Full Stack Web Developer** · React · Laravel · Django · AI chatbots & n8n automation

[![View live site](https://img.shields.io/badge/View_live_site-f46c38?style=for-the-badge)](https://mostaphabr.github.io/Portfolio/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No frameworks](https://img.shields.io/badge/frameworks-none-0b0b0b?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/hosted_on-GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)

</div>

---

## About

My personal portfolio: a fast, single-page site built with plain HTML, CSS and JavaScript, with no frameworks and no build step. It presents my projects, experience, tech stack and services, and lets visitors download my CV or contact me directly.

## Features

- **Light and dark mode.** Follows the visitor's system setting, remembers their choice and never flashes the wrong theme on load. Switching reveals the new theme in a circle that grows from the toggle (View Transitions API), with a color fade in older browsers.
- **Purposeful animations.** Masked headline reveal, count-up stats, staggered scroll reveals, animated project illustrations and a sliding nav indicator.
- **Respects reduced motion.** Every animation is turned off for visitors who enable *Reduce motion* in their system settings.
- **Fully responsive.** Works from 320px phones to wide desktops. On touch screens the theme switch moves into the nav.
- **Working contact form.** Messages go straight to my inbox through Formspree, without a page reload, with a hidden spam trap.
- **Lightweight.** One HTML page, one stylesheet and one script, all minified.

## Sections

| Section | What's inside |
| --- | --- |
| **Home** | Intro, CV download and key stats |
| **Projects** | Einstein Air Services (website, AI chatbot and SEO), AI-powered SEO blogging workflow (n8n), SportClub sports pitch booking platform (Laravel) |
| **Experience** | Freelance work, education and languages |
| **Tech stack** | React, JavaScript, Laravel, Django, Tailwind / Bootstrap, MySQL, Git, REST and AI APIs, n8n, technical SEO |
| **Services** | Web apps, AI chatbots and agents, workflow automation, SEO and content |
| **Contact** | Contact form and direct links |

## Built with

- **HTML5**: one semantic page
- **CSS3**: custom properties for the theme, Grid, Flexbox and keyframe animations
- **Vanilla JavaScript**: IntersectionObserver, View Transitions API, `localStorage` and `matchMedia`
- **[Formspree](https://formspree.io/)**: contact form delivery
- **[Inter](https://rsms.me/inter/)** from Google Fonts and **[Devicon](https://devicon.dev/)** for the tech logos
- **GitHub Pages**: hosting

## Project structure

```
Portfolio/
├── index.html                  # the whole page
├── README.md
└── files/
    ├── style.css               # styles (edit this one)
    ├── style.min.css           # minified styles, loaded by the page
    ├── script.js               # scripts (edit this one)
    ├── script.min.js           # minified scripts, loaded by the page
    ├── logo.jpg                # profile photo
    ├── favicon.svg
    └── BoutrhalineMustapha.pdf # CV
```

## Run it locally

```bash
git clone https://github.com/mostaphabr/Portfolio.git
cd Portfolio
python -m http.server 8000   # or: npx serve
```

Then open <http://localhost:8000>. A local server, rather than opening the file directly, keeps the contact form working.

## Making changes

`index.html` loads the **minified** files. After editing `style.css` or `script.js`, rebuild them:

```bash
npx -p csso-cli csso files/style.css --no-restructure -o files/style.min.css
npx terser files/script.js -c -m -o files/script.min.js
```

The theme colors are at the top of `style.css`: dark mode in `:root` and light mode in `:root[data-theme="light"]`.

## Deployment

The site is hosted on **GitHub Pages** straight from this repository. Pushing to `main` publishes the changes.

## Contact

- **Email:** [mustapha8contact@gmail.com](mailto:mustapha8contact@gmail.com)
- **LinkedIn:** [mostapha-web-developer](https://www.linkedin.com/in/mostapha-web-developer)
- **GitHub:** [@mostaphabr](https://github.com/mostaphabr)

Open to full-time roles, internships and freelance projects.

---

<sub>© 2026 Mustapha Boutrhaline. The code is free to learn from. The personal content (text, photo and CV) is not for reuse.</sub>
