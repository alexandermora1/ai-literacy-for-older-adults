# SeniorKI

**A free, self-paced course that teaches AI literacy to Norwegian adults aged 60+.**
Live at **[seniorki.no](https://seniorki.no)**. No account, no login, no tracking.

![SeniorKI welcome screen on a tablet](docs/screenshots/welcome.jpg)

SeniorKI was the design artefact of my master's thesis in Universal Design of ICT at OsloMet (2026). It turns an existing research-based AI literacy curriculum for older adults ([Kaur et al., 2025](https://doi.org/10.1007/978-3-031-93412-4_12)) into an accessible web course. The course covers what AI is, how to use tools like ChatGPT, AI in the home, and how to spot AI-related scams.

The platform was designed with older adults, not just for them. It went through paper sketches, a Figma prototype and a coded prototype. Each version was tested with people from the target group (ages 60–83), and the findings shaped the next one.

**What this project shows:** user-centred design for an underserved group, usability testing and turning its findings into design decisions, accessibility (WCAG 2.1 AA), and a deliberately restrained approach to gamification.

🌐 [Try the course](https://seniorki.no) (Norwegian)

---

## Contents

- [My role](#my-role)
- [The problem](#the-problem)
- [The finished platform](#the-finished-platform)
- [Design process](#design-process)
- [Accessibility](#accessibility)
- [Evaluation](#evaluation)
- [What I would do next](#what-i-would-do-next)
- [Tech stack and running locally](#tech-stack-and-running-locally)

---

## My role

I did this project alone, as a single-researcher master's thesis.

- **Research and design:** literature review, paper sketches, Figma prototype, visual design system, and all design decisions.
- **User research:** recruitment, which included ten weeks of volunteering at a Seniornett digital help café. I also planned and ran every usability test and did the analysis.
- **Content:** I wrote the course content in Norwegian, based mainly on Store norske leksikon. An AI model then did a language-level review against a prompt describing the target group, and I approved the final text.
- **Implementation:** the React app was built with **Claude Code (AI-assisted development)** under my direction. I specified the behaviour, reviewed the output, and made manual changes where needed. Using AI for implementation let me make large design changes between test rounds that I could not have built by hand in the time available. I discuss the trade-offs, such as keeping an overview of AI-generated code, in section 5.1.7 of the thesis.

---

## The problem

AI now sits inside everyday products and services. Older adults are more exposed to digital exclusion than other groups. Research on Norwegians aged 60+ shows that most have *heard* of AI, but few feel they understand how it works (Kaur & Chen, 2023). That gap can lead to distrust, anxiety, and vulnerability to scams and misinformation.

Existing AI courses do not fit this group well. Most target younger or general audiences. Others teach a single product, like a voice assistant, and very few cover AI-related harms. SeniorKI is, to my knowledge, the first working implementation of Kaur et al.'s curriculum.

---

## The finished platform

The course is in Norwegian. Captions give English translations of key interface text.

### Welcome

![Welcome screen](docs/screenshots/welcome.jpg)

The first screen has a single call to action, *"Kom i gang"* (Get started). Below it, a reassurance line reads *"No account · No login · Completely free"* to lower the threshold for hesitant users. An earlier version had two buttons ("Get started" / "Continue where I left off"). Three of five testers tapped through without noticing the second option, so I removed it.

### Help and onboarding

![Help page](docs/screenshots/help.jpg)

The help page explains how the course is built (chapters → topics → quiz), where the content comes from, and how to adjust text size. New users see it before they start. It stays one tap away through a persistent *"Hjelp"* (Help) button. I added it after testers in round 1 said they were unsure what the platform actually was.

### Course overview

![Course overview with two completed chapters](docs/screenshots/course-overview.jpg)

All six chapters fit on one screen, laid out in a two-column grid, so users don't need to scroll. Completed chapters switch to solid green and show the stars earned. A one-line summary sits at the top, reading *"2 of 6 chapters completed · 5 of 15 stars · 4 of 10 badges"*.

Text size, *"Se fremgang"* (See progress) and *"Hjelp"* stay fixed at the top of every page. In round 1, every tester who scrolled down forgot that controls existed above the fold.

### Chapter overview

![Chapter overview for "Generativ KI"](docs/screenshots/chapter-overview.jpg)

The reading topics and the quiz are separated by three redundant cues:

- **Position:** topics on the left, quiz on the right.
- **Colour:** green for topics, purple for the quiz.
- **Explicit headings:** *"Start with the first topic and read them in order"* and *"Take the quiz once you've read all the topics"*.

This took two rounds of testing to get right; see [Design process](#design-process).

### Topic page

![Topic content page](docs/screenshots/topic.jpg)

Each topic page shows its position (*"Topic 2 of 3"*) and an estimated reading time. A thin bar under the header fills as the user scrolls. *"Neste emne"* (Next topic) stays inactive until the user reaches the bottom of the page. Both features came from round 2, where the oldest tester assumed a page had ended at the bottom of the screen.

### Quiz

![Quiz feedback: wrong answer in red, correct answer in green](docs/screenshots/quiz-feedback.jpg)

Answers appear as large cards in a 2×2 grid. Tapping a card selects it, and a separate *"Sjekk svar"* (Check answer) button confirms the answer. Testers in both rounds hesitated at this step. I kept it anyway because it lets users reconsider before committing, which matches Nielsen's error-prevention heuristic.

Feedback appears on the cards themselves. Colour is always paired with a text label (*"Feil"* / Wrong, *"Dette er det riktige svaret"* / This is the correct answer), so it also works for colourblind users. The wording *"Feil"* replaced the softer *"Ikke helt"* (Not quite) after a tester said: *"We are adults. We can handle it."*

### Quiz results

![Quiz results with stars, new badges and answer review](docs/screenshots/quiz-results.jpg)

The results page shows one star per correct answer, any newly earned badges, and a review of each question. For wrong answers, it shows the correct answer and a link back to re-read the topic.

### Badges

![Badge earned screen](docs/screenshots/badge-earned.jpg)

Badges are awarded on a dedicated screen, one at a time.

### Progress

![Progress page with per-chapter progress bars](docs/screenshots/progress.jpg)
![Badge collection](docs/screenshots/badges.jpg)

The progress page gathers per-chapter progress, total stars and badges, and the full badge collection. Earned badges appear in full colour. Unearned badges are muted and state how to earn them.

#### A note on gamification

Research on gamification for older learners points to visible progress and instant feedback as motivating. Competition tends to put them off (Gellner & Buchem, 2022). So SeniorKI has only stars, badges and a progress page. There are no leaderboards, streaks or timers.

---

## Design process

The project followed a user-centred design process in three stages: **paper sketches → Figma prototype → coded React prototype**. Two rounds of formative usability testing came before a final evaluation on the live site. All sessions ran on a tablet in landscape orientation and used think-aloud tasks. I did not record them, because recording would have made an already unfamiliar situation more stressful for participants.

### Before and after

<table>
<tr>
<th width="50%">Round 1 (Figma prototype)</th>
<th width="50%">Final version</th>
</tr>
<tr>
<td><img src="docs/screenshots/iter1-course-overview.jpg" alt="Round 1 course overview: single column of chapter cards with progress bars, a stepper at the top, and a 'scroll down for the rest' instruction"></td>
<td><img src="docs/screenshots/course-overview.jpg" alt="Final course overview: two-column grid of six chapter cards with a one-line progress summary"></td>
</tr>
<tr>
<td colspan="2"><b>Course overview.</b> The single column needed scrolling. Testers then forgot the buttons at the top. Nobody noticed the progress bars on the cards or the stepper. The final version removes both, moves detailed progress to its own page, and fits every chapter on one screen.</td>
</tr>
<tr>
<td><img src="docs/screenshots/iter1-chapter-overview.jpg" alt="Round 1 chapter overview: three topic cards stacked above two activity cards, with 'scroll down to see activities'"></td>
<td><img src="docs/screenshots/chapter-overview.jpg" alt="Final chapter overview: numbered topics on the left, quiz on the right, with explicit headings"></td>
</tr>
<tr>
<td colspan="2"><b>Chapter overview.</b> Topics were stacked above the activities, and users were told to "scroll down to see activities". Two testers pointed out that you scroll <i>down</i> by swiping <i>up</i>. All five confused topics with activities. The final version separates them by position, colour and explicit headings, and numbers the topics. The placeholder "What is a good question?" activity became a reading topic in the chapter.</td>
</tr>
<tr>
<td><img src="docs/screenshots/iter1-progress.jpg" alt="Round 1 rewards page: summary boxes for stars, chapters and badges, and illustrated robot badges"></td>
<td><img src="docs/screenshots/progress.jpg" alt="Final progress page with per-chapter progress bars"></td>
</tr>
<tr>
<td colspan="2"><b>Progress page.</b> When asked which badges they had, testers read the summary boxes and ignored the badges themselves. The final page leads with per-chapter progress, moved here from the course overview. I also replaced the illustrated robot badges with simpler icons. That was my own call rather than a test finding: the detailed illustrations became hard to tell apart at the smaller sizes a responsive layout needs.</td>
</tr>
</table>

### Round 1: Figma prototype (5 participants, ages 62–82)

| What I observed | What I changed |
|---|---|
| All 5 forgot the controls at the top of the page after scrolling down | Back, text size, progress and help buttons fixed to the top of every page |
| No one noticed the progress bars on chapter cards | Removed them; replaced with a one-line text summary, detailed progress moved to its own page |
| Removing the bars freed space in each card | Course overview became a two-column grid that fits without scrolling |
| 3 of 5 missed the second button on the welcome screen | Reduced to a single button |
| 2 of 5 were unsure what the platform was | New onboarding / help page |
| One tester asked for larger text | Text-size control on every page |
| "Ikke helt" (Not quite) felt patronising | Changed to "Feil" (Wrong) |
| All 5 confused *topics* with *activities* | No structural change yet; flagged as a wording problem |

### Round 2: coded prototype (3 participants, ages 60–83)

The fixed header worked. All three found the progress button without help, compared with none in round 1. All three also used the new text-size control immediately.

| What I observed | What I changed |
|---|---|
| Topic/activity confusion persisted, even though all three had read the onboarding text explaining it | Numbered topics and explicit headings (*read these in order → then take the quiz*) added to the chapter page, alongside the colour and position cues |
| The oldest tester thought a page ended at the bottom of the screen | Scroll-progress bar and a "Next" button that unlocks at the end of the page |

**The key lesson from round 2:** an explanation in the onboarding was not enough. The distinction had to be visible where people made the decision.

### What I kept despite feedback, and what I couldn't solve

- **The "Check answer" step** caused hesitation in both rounds. I kept it on purpose so users can correct mistakes before committing.
- **Giving up instead of exploring.** In both rounds, the oldest and least experienced testers stopped and waited for help when something was unclear. They didn't read or try other options. More on-screen text can't fix this, because these are the users least likely to read it. I think it points toward in-person support rather than a design fix (see [What I would do next](#what-i-would-do-next)).

---

## Accessibility

WCAG 2.1 AA was the target throughout. Private-sector websites in Norway are legally required to meet WCAG 2.0 AA, and older adults are disproportionately affected by inaccessible design.

- **Adjustable text:** all sizes are defined in `rem` and scaled through one multiplier. Users can choose six steps from 0.875× to 1.5×, and the choice is saved.
- **Never colour alone:** quiz feedback and the topic/quiz distinction always pair colour with text and position.
- **Large touch targets:** for example, the text-size control is split into two wide tap zones, not just the small − / + icons.
- **Semantic structure:** one `h1` per page, landmark regions, and Norwegian `aria-label`s on icon controls.
- **Testing:** I scanned six key pages with WAVE and found no structural errors. I checked contrast manually, and all text pairs pass AA. I also checked keyboard navigation manually. The only flags came from emoji star icons on the course overview.
- **Known gaps:** there has been no screen reader or expert accessibility testing, and no testing with users with disabilities. Base body text is 16px, below the ~18px recommended for older adults on tablets. The text-size control compensates for this.

---

## Evaluation

The live platform was evaluated with participants who used it on their own devices over up to two weeks. Seven completed a knowledge test before and after, a usability questionnaire, and open-ended questions.

The sample was small, and every participant had some prior relationship with me. The results are therefore **indicative, not conclusive**, and the most useful findings are qualitative:

- **Clear feedback mattered more than rewards.** Participants who commented on stars and badges said confirmation of right and wrong answers mattered more to them. As one put it: *"The most important thing was feedback on right and wrong answers. But some people do enjoy medals and stars."* This matches earlier research on older learners.
- **Nobody used the course over time.** No participant used the platform for more than two days, and several finished in one sitting. So the evaluation cannot say whether the gamification encourages people to come back, which was its main purpose.
- **The instructions worked.** Participants described them as clear and pitched at the right level. One participant with an IT background noted that people less interested in technology might find the course harder.
- **Attrition is itself a finding.** Of the people who dropped out, two gave low confidence with computers as their reason. The people the course is meant for may also be the hardest to get started.

---

## What I would do next

1. **Hands-on activities.** The source curriculum includes a practical activity for each module, such as trying a chatbot or a scam-spotting case study. I cut these for time. They are the biggest gap between the platform and its curriculum.
2. **Blended learning.** Pair the self-paced course with optional in-person sessions, for example at Seniornett's digital help cafés. This would reach the users who stall when something is unclear.
3. **Test gamification over a longer period,** with a study designed to capture repeat visits.

---

## Tech stack and running locally

- React + TypeScript, built with Vite
- Plain CSS with custom properties (design tokens for colour, type and spacing)
- Hosted on GitHub Pages with a custom domain
- No backend, no cookies, no analytics. Progress is stored only in the user's browser (`localStorage`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

The version submitted with the thesis is tagged [`v1.0-thesis`](https://github.com/alexandermora1/ai-literacy-for-older-adults/releases/tag/v1.0-thesis).

---

*Master's thesis: "Designing Playful and Accessible Learning Experiences to Enhance AI Literacy for Older Adults", Alexander Mora, OsloMet, 2026.*
