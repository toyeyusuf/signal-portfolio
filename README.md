# Signal Portfolio — Yusuf Olanrewaju Toye

> **From gears to cloud.** A signal-themed personal portfolio connecting my background in Mechanical Engineering with my work in networking, cloud technologies, technical training, and my current exploration of Agentic AI.

## Live portfolio

**[Visit the portfolio](https://main.d267x7fkb7rw7g.amplifyapp.com)**

## About the project

I built this portfolio for the **AWS Student Builder Challenge: Build Your Tech Superpower**. It tells the story behind my transition from Mechanical Engineering into networking and cloud technology.

The central idea is that the questions that interest me have stayed the same even as the systems I work with have changed: how does a system work, where can it fail, and how can it be made better?

Rather than presenting my experience as a conventional list of skills, the site uses a signal and network-inspired visual language to make the journey interactive.

## Features

- **Personal introduction:** An overview of my background, interests, and professional direction.
- **Career journey:** A five-stage timeline from Mechanical Engineering through Networking, Cloud and IoT, Teaching, and my current learning in Agentic AI.
- **Scratch-to-reveal cards:** Visitors can scratch cards to uncover certifications and technical skills. A reveal-all control is also available.
- **Project vending machine:** Visitors select a project and use the virtual coin interaction to reveal its details.
- **Packet-routing game:** An interactive network puzzle where visitors route a packet from a laptop through routers to a cloud destination. A successful route displays packet delivery and packet-loss feedback.
- **Responsive navigation:** Sections are accessible through desktop and mobile navigation.
- **Contact links:** Direct links to LinkedIn, GitHub, and email.

## Technology

| Technology / service | How it is used |
|---|---|
| Kiro IDE (Agentic AI) | AI-assisted development: I described the portfolio I wanted and worked with the agent to create the site. |
| HTML5 | Page structure and content |
| CSS3 | Layout, responsive styling, animations, and visual effects |
| JavaScript | Interactive cards, project vending machine, animated background, and packet-routing game |
| HTML Canvas | Particle background, scratch-card interaction, and packet game rendering |
| Google Fonts | Inter, Space Grotesk, and JetBrains Mono typography |
| GitHub | Source-code repository and version history |
| AWS Amplify Hosting | Hosting and publishing the public portfolio website |

This is a static front-end project. It does not require a JavaScript framework, application server, or database.

## AI-assisted development and deployment workflow

I used **Kiro IDE** as my agentic AI development environment. After setting up a new AWS cloud account and creating a **$20 budget**, I connected the agent to my cloud account and instructed it to help create an About Me portfolio that would be fun and interactive. The website source files—HTML, CSS, and JavaScript—were then uploaded to my GitHub repository.

To publish the site, I connected the GitHub repository to **AWS Amplify Hosting**, selected the `main` branch, kept the default frontend build settings, and deployed. Amplify made the portfolio available at its public URL.

One of the most useful parts of this workflow was the GitHub integration. After the first deployment, I made further code changes and pushed them to the connected repository. Amplify detected the updates and automatically started another deployment, so the live website stayed in sync with the repository without me manually repeating the deployment process.

In short:

1. Describe the application and desired experience to Kiro.
2. Work with the agent on the HTML, CSS, and JavaScript.
3. Upload and maintain the source code in GitHub.
4. Connect the repository and `main` branch to AWS Amplify.
5. Let Amplify deploy the site and automatically redeploy when changes are pushed.

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

- **Amplify app:** `signal-portfolio`
- **Production branch:** `main`
- **Source repository:** [toyeyusuf/signal-portfolio](https://github.com/toyeyusuf/signal-portfolio)
- **Deployment model:** Git-connected hosting with automatic redeployment when changes are pushed to the connected branch.

## Featured work shown in the portfolio

- **Web Server on Google Cloud:** A Terraform project provisioning a custom VPC, firewall rules, and a Compute Engine instance.
- **Reusable Terraform Modules:** A follow-up infrastructure project refactoring Google Cloud resources into reusable modules and using remote state management.
- **Wi-Fi 6 deployment:** Field engineering work involving switches, routers, and configuration across 500+ access points using Huawei iMaster NCE-Campus.
- **Networking and cloud education:** Training more than 600 students and designing hands-on AWS lab assessment material.

## What I learned

This project showed me how much faster development and delivery can become when agentic AI tools, source-code platforms, and cloud hosting are connected in one workflow. I had used other AWS services to host websites, but AWS Amplify was new to me. Seeing it deploy directly from GitHub—and automatically redeploy after I pushed code changes—gave me a practical understanding of a streamlined continuous-deployment workflow.

My main challenge was learning how to use Kiro effectively. I worked through that by reading its documentation and finding a way to communicate with and use the agent productively. Building the portfolio in a short period was a fascinating experience and showed me how these tools can reduce repetitive steps and leave more time for improving the solution.

## Connect

- **LinkedIn:** [yusuflarrytoye](https://linkedin.com/in/yusuflarrytoye)
- **GitHub:** [toyeyusuf](https://github.com/toyeyusuf)
- **Email:** [toyeyusuf506@gmail.com](mailto:toyeyusuf506@gmail.com)

---

Built by **Yusuf Olanrewaju Toye**.  
*Curiosity connects everything.*
