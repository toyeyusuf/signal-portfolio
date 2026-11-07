# Hackathon Project Write-up — Signal Portfolio

## Project title

**Signal Portfolio — From Gears to Cloud**

## Project links

- **Live website:** https://main.d267x7fkb7rw7g.amplifyapp.com
- **GitHub repository:** https://github.com/toyeyusuf/signal-portfolio
- **AWS hosting service:** AWS Amplify Hosting
- **Development tool:** Kiro IDE

## 1. Project overview

I created Signal Portfolio for the **AWS Student Builder Challenge: Build Your Tech Superpower**. It is my personal portfolio website, designed to introduce who I am, present my technical skills and projects, and tell the story of my professional journey in a way that is more memorable than a conventional résumé-style page.

The idea behind the portfolio is captured in the phrase **“From gears to cloud.”** My academic background is in Mechanical Engineering, but my professional interests have expanded into networking, cloud technologies, IoT, technical training, and now Agentic AI. The underlying curiosity is consistent: understanding how systems work, identifying where they fail, and finding ways to improve them.

I wanted visitors to do more than scroll through a list of qualifications. The website uses a signal and network-inspired visual theme to make exploring my background an interactive experience.

## 2. How I built it: Kiro and AI-assisted development

I began by downloading **Kiro IDE** to use as my agentic AI development tool. I then created a new AWS cloud account, which came with a pre-created project, and configured a **$20 budget** to keep an eye on potential spending.

After setting up the account, I connected the agent to my cloud account and gave it instructions to help me create an About Me portfolio that would be fun and interactive. I worked with the agent to develop the website and its front-end files: HTML, CSS, and JavaScript. I then uploaded those files to my GitHub repository.

This gave me a practical opportunity to explore an AI-assisted development workflow: describing the experience I wanted, using an agent to help build it, and keeping the resulting source code in a repository that could be connected to cloud hosting.

## 3. AWS deployment: GitHub connected to Amplify

I chose **AWS Amplify Hosting** to publish the portfolio. I had used other AWS services to host websites before, but Amplify was new to me, so trying it was an interesting part of the project.

My deployment process was:

1. Upload the portfolio files to the GitHub repository: [toyeyusuf/signal-portfolio](https://github.com/toyeyusuf/signal-portfolio).
2. Open AWS Amplify and connect it to the GitHub repository containing the portfolio.
3. Select the `main` branch as the production branch.
4. Leave the frontend build settings at their default values.
5. Start the deployment and wait for Amplify to publish the application.
6. Open the public URL provided by Amplify and verify that the website was live.

**Live deployment:** [https://main.d267x7fkb7rw7g.amplifyapp.com](https://main.d267x7fkb7rw7g.amplifyapp.com)

The most interesting part came after the first deployment. I made further changes to the code and pushed them to GitHub. Amplify detected the changes in the connected repository and automatically triggered another deployment. I did not have to repeat the initial deployment process manually.

This was my practical introduction to a simple continuous integration and continuous deployment (CI/CD) workflow: GitHub stores the source code, and Amplify publishes updates when changes are pushed to the connected branch.

## 4. The creative feature: an interactive signal experience

I wanted the portfolio to do more than display information. I designed its interactions around the idea of exploring a network.

### Animated signal background

The opening section uses an animated network-particle visual to establish the signal theme and introduce the portfolio.

### Scratch-to-reveal cards

The skills section uses scratch-card interactions. Visitors can scratch cards to uncover certifications and technical skills. A reveal-all option is also available. The certifications displayed include AWS Certified AI Practitioner, Google Associate Cloud Engineer, Huawei Cloud Solutions Architect (HCIP), and ISC2 Certified in Cybersecurity (CC).

### Project vending machine

The projects section is presented as a vending machine. Visitors select a project and use a virtual coin interaction to reveal its description and technologies. The metaphor makes exploring my work feel playful while keeping the project information organized.

### Packet-routing game

The site includes a network-routing game. Visitors route a packet from a laptop through a network of routers to a cloud destination. A successful route displays a packet-delivered message and packet-loss result. This feature reflects my networking background and gives visitors a simple, interactive way to engage with a networking concept.

The screenshot evidence I captured includes a successful delivery showing **0% packet loss**.

## 5. Portfolio content

The website includes the core areas of a personal portfolio:

- **About Me:** My background, professional interests, and experience.
- **Career journey:** Five stages—Mechanical Engineering, Networking, Cloud and IoT, Teaching, and Agentic AI.
- **Skills and certifications:** Technical skills, professional certifications, and areas I am currently learning.
- **Projects and achievements:** Infrastructure learning projects, field engineering experience, and technical training.
- **Contact:** Links to my LinkedIn, GitHub, and email.

The About section also highlights experience including training more than 600 students and work involving more than 500 Wi-Fi access points.

## 6. Technology used

- **Kiro IDE:** Agentic AI development environment used to help create the portfolio.
- **HTML5:** Page structure and content.
- **CSS3:** Visual design, responsive layout, and animations.
- **JavaScript:** Interactive features and client-side behavior.
- **HTML Canvas:** Animated particle background, scratch-card surfaces, and packet-routing game rendering.
- **GitHub:** Source-code repository and the connection point for Amplify deployments.
- **AWS Amplify Hosting:** Hosting and publishing the portfolio at a public URL.

The project is a static front-end website. It does not use a separate backend or database.

## 7. What I learned

This project helped me see how much faster application development and delivery can become when agentic AI tools, source-code repositories, and cloud hosting are connected in one workflow.

Many organisations build and run solutions on cloud platforms such as AWS. Understanding how development tools and source-control platforms connect to cloud deployment services is therefore valuable. With a workflow involving an agentic AI tool and a repository platform such as GitHub or GitLab, developers can work on an application, update its code, push changes, and have a connected deployment service publish those changes. This can reduce repetitive manual steps and leave more time to focus on improving the solution.

I also learned how straightforward it can be to publish a static website with AWS Amplify. I had used other AWS website-hosting services, so seeing Amplify deploy directly from GitHub—and automatically redeploy after a code update—was a particularly useful new experience.

Most importantly, I experienced the value of connecting tools into a workflow rather than treating development, source control, and deployment as isolated tasks.

## 8. Challenges and how I addressed them

My main challenge was **learning how to use Kiro effectively**. Since I was new to the tool, I initially needed to understand its workflow and how to work with the agent to get the result I wanted.

I addressed this by reading the Kiro documentation and experimenting until I found a way to use the tool effectively. Once I understood how to work with it, I was able to make progress on the portfolio within a relatively short period.

Designing and building the website was a fascinating experience. It was rewarding to see an idea become a working, interactive portfolio so quickly.

## 9. Evidence and screenshots

I captured screenshots of the actual deployed application and AWS console for the project evidence:

1. **AWS Amplify app overview:** Shows the `signal-portfolio` app, the `main` production branch, deployed status, and the Amplify domain.
2. **Live portfolio:** Shows the website open at its public Amplify URL.
3. **Introduction / hero section:** Shows the portfolio identity, professional title, and animated network visual.
4. **About section:** Shows the “From gears to cloud” story and experience highlights.
5. **Career journey:** Shows the five career stages.
6. **Skills and certifications:** Shows the scratch-to-reveal certification and technical-skill cards.
7. **Packet-routing game:** Shows a successful packet delivery from the laptop through routers to the cloud, with 0% packet loss.

These screenshots are intended to demonstrate both the deployed result and the features visitors can explore.

## 10. Closing reflection

Signal Portfolio is both a professional introduction and a reflection of how I approach technology: with curiosity, experimentation, and a desire to understand how systems connect.

This challenge gave me the opportunity to try Kiro as an agentic AI development tool and AWS Amplify as a hosting service I had not used before. It also showed me how connecting an AI-assisted development workflow, GitHub, and cloud hosting can make it faster to build, update, and publish an application.

I wanted visitors to see not only the tools I have worked with, but also the journey that brought me here and the direction in which I am continuing to grow.

**Curiosity connects everything.**
