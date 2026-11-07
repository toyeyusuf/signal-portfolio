# Signal Portfolio — Yusuf Olanrewaju Toye

> **From gears to cloud.** A signal-themed personal portfolio connecting my background in Mechanical Engineering with my work in networking, cloud technologies, technical training, and my current exploration of Agentic AI.

## Live portfolio

**[Visit the portfolio](https://main.d267x7fkb7rw7g.amplifyapp.com)**

## About the project

I built this portfolio to tell the story behind my transition from Mechanical Engineering into networking and cloud technology. The central idea is that the questions that interest me have stayed the same even as the systems I work with have changed: how does a system work, where can it fail, and how can it be made better?

Rather than presenting my experience as a conventional list of skills, the site uses a signal and network-inspired visual language to make the journey interactive.

## Features

- **Personal introduction:** An overview of my background, interests, and professional direction.
- **Career journey:** A five-stage timeline from Mechanical Engineering through Networking, Cloud and IoT, Teaching, and my current learning in Agentic AI.
- **Scratch-to-reveal cards:** Visitors can scratch cards to uncover certifications and technical skills. A reveal-all control is also available.
- **Project vending machine:** Visitors select a project and use the virtual coin interaction to reveal its details.
- **Packet-routing game:** An interactive network puzzle where visitors build a route from a laptop to the cloud while avoiding failed links.
- **Responsive navigation:** Sections are accessible through desktop and mobile navigation.
- **Contact links:** Direct links to LinkedIn, GitHub, and email.

## Technology

| Technology | How it is used |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Layout, responsive styling, animations, and visual effects |
| JavaScript | Interactive cards, project vending machine, animated background, and packet-routing game |
| HTML Canvas | Particle background, scratch-card interaction, and packet game rendering |
| Google Fonts | Inter, Space Grotesk, and JetBrains Mono typography |
| AWS Amplify Hosting | Hosting and publishing the public portfolio website |

This is a static front-end project. It does not require a JavaScript framework, application server, or database.

## Run locally

No build step or package installation is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/toyeyusuf/signal-portfolio.git
   cd signal-portfolio
   ```

2. Open `index.html` in a browser.

   Alternatively, start a simple local web server:

   ```bash
   python -m http.server 8000
   ```

   Then visit [http://localhost:8000](http://localhost:8000).

The site loads Google Fonts from the internet, so those fonts may fall back to system fonts when offline.

## Repository structure

```text
signal-portfolio/
├── index.html    # Portfolio content and page structure
├── styles.css    # Styling, layout, animations, and responsive rules
├── script.js     # Interactive features and client-side behavior
└── README.md     # Project documentation
```

## Deployment

The portfolio is published using **AWS Amplify Hosting** and is available at:

[https://main.d267x7fkb7rw7g.amplifyapp.com](https://main.d267x7fkb7rw7g.amplifyapp.com)

For the hackathon submission, include screenshots of the live portfolio and the relevant AWS Amplify deployment/configuration screens so reviewers can see the deployed result and the AWS service used.

## Featured work shown in the portfolio

- **Web Server on Google Cloud:** A Terraform project provisioning a custom VPC, firewall rules, and a Compute Engine instance.
- **Reusable Terraform Modules:** A follow-up infrastructure project refactoring Google Cloud resources into reusable modules and using remote state management.
- **Wi-Fi 6 deployment:** Field engineering work involving switches, routers, and configuration across 500+ access points using Huawei iMaster NCE-Campus.
- **Networking and cloud education:** Training more than 600 students and designing hands-on AWS lab assessment material.

## Connect

- **LinkedIn:** [yusuflarrytoye](https://linkedin.com/in/yusuflarrytoye)
- **GitHub:** [toyeyusuf](https://github.com/toyeyusuf)
- **Email:** [toyeyusuf506@gmail.com](mailto:toyeyusuf506@gmail.com)

---

Built by **Yusuf Olanrewaju Toye**.  
*Curiosity connects everything.*
