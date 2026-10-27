# Portfolio scroll system: brief

**Self-authored under explicit creative delegation.** The owner asked for the
existing reveal animations to be replaced with a distinctive, art-directed
system and left the direction to the builder. Not interviewed. Evidence is the
existing site (content, palette, structure); everything below it is a decision.

## What this site is
Rohit Kumar Singh, Technical Project Manager, data and AI programs. Audience:
hiring managers and clients. Light paper ground, ink, one blue, one lime, Anton
display plus a sans. Sections: Resume, Experience, Case studies, Journey, Tools
built, Stack, Contact.

## Why not the skill's usual build
Scroll-craft's engine and kie.ai pipeline are for building a new marketing page
from scratch. This is an existing React/Next site that already ships Lenis and
Framer Motion, so the engine was not copied in (it would duplicate both). The
skill's method was used: feeling curve, one signature move, device variety,
mobile composed separately, and verification by scrolling.

## The idea
The work this person does is moving things from backlog to done. So the whole
page moves through one vocabulary: **everything crosses a reading line (about
62% down the screen) and goes backlog (muted) → in progress (developing) → done
(full colour)**, scrubbed by scroll, reversible, never triggered once and
forgotten. A heading, a card and a paragraph are parts of one machine.

## Devices (one job each)
| Where | Device | Why |
|---|---|---|
| Hero | Lines rise out of a mask, the lime full stop stamps, the portrait arch opens upward, depth between planes on scroll and pointer | Identity, immediately, then a hand-off |
| Hero to Resume | Ticker is a speedometer: faster scrolling down, runs backwards scrolling up | The signature move. Only this site |
| Every heading | Words rise in sequence; the accent word is drawn hollow and fills with colour later and higher | Plan becomes delivered |
| Cards and blocks | Develop from grey to colour and settle (opacity + scale; filter on desktop only) | Backlog to done |
| Section edges | Sheet: top corners relax square as the section lands | A hand-off between chapters |
| Stack cards | Illustration travels against its card (depth) | Cards read as windows |
| Case file | Switching a case prints the file on with wipes | Interaction, not scroll |
| Wayfinding | Desktop: chapter spine with playhead. Phone: header names the chapter and hides while reading down | Where am I |

## Feeling curve
1. Hero: confidence. Name and role land, line by line.
2. Resume: ease. Two plain actions.
3. **Experience (the peak, 2700px, the longest span):** momentum. The rail fills,
   each role card develops as the line reaches it.
4. Cases: curiosity. A foil to scratch.
5. Journey: warmth. A career drawn along a path.
6. Tools: competence. Seven agents, real numbers.
7. Stack: breadth, calm.
8. Contact: resolve. "Let's connect." fills in and the page stops.

**Peak, as said to a friend:** "His CV is a timeline that fills in as you read
it." Lives in Experience.

**Tell-someone sentence:** "It's the site where everything moves from backlog to
done as you scroll."

## Mobile (composed separately)
No scroll parallax, no sheet widening, no grayscale filter (opacity and scale
only), native touch momentum (Lenis smooths wheels only). Header hides on the
way down and returns on the way up, stays put after a nav jump.

## Reduced motion
Lenis is destroyed, the motion class is never set, every variable defaults to
"complete". The page is its finished self. (Also fixed a hydration error that
reduced-motion visitors hit on the original site.)

## Authored silence
Section bodies after they are done. The system only moves things that are
crossing the line.
