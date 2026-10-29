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

---

# "My journey": cinematic career landscape

Self-authored under delegation. The old timeline of cards and illustrations was
removed entirely (component, images and animation code).

**Grammar:** one landscape you travel through. Two sticky stages (one behind
the copy, one in front) hold a drawn scene; the copy scrolls between them in
natural flow, so wheel and touch scrolling are never taken over. The near ridge
in front means type rises from behind the hills.

**World:** drawn in code in the site's own palette (ink, lime, blue, paper,
one amber). No generated imagery: no image key was available, and flat
graphic shapes suit the brand better than a stock photograph.

**One number drives it:** the fractional act index. Skies cross-fade, a sun and
a moon arc across and set behind the land, ridges grow and flatten (mountains
for graduation, flat for the cities) and each landmark rises out of the ground
for its act: school, university, a city, a data city. Only transforms and
opacity move.

| Act | Feeling | Type mechanic |
|---|---|---|
| Arrival | Anticipation | Giant MY JOURNEY. rises from behind the near ridge |
| 2014 and 2016 | Beginning | A digit reel rolls 2014 to 2016 |
| 2020, degree | Ambition | You travel into a hollow 2020 that grows past you |
| 2020, British Telecom | Pressure, then footing | Lines start stretched and compress into place |
| Dec 2022, phData | Scale | The wordmark is lit like a building at night |
| Recognition | Pride | A lime star turns over a clear night sky |
| Certifications | Curiosity, then clarity | A pinned lens opens onto one drawing per credential |

**Peak:** the move from the university day into the dusk city (act 2 to 3).
**Handoff:** the next section's own ground rises from below as this one ends.

**Phones:** a separate composition, not a shrunk desktop: copy in the top of the
screen, landmarks in the lower half, smaller sun and moon, gentler stretch.
**Reduced motion or no JS:** the stages never show; the same words become plain
stacked bands in each act's own colour.

**Facts kept:** Class 10 (2014), Class 12 (2016), BCA at Brainware University,
Kolkata (2020), British Telecom (2020), phData (Dec 2022), the phData Innovation
Award and all seven certifications and courses. Added from the Experience
section on this same site: the BT role and dates, and the current phData role.

**Light mode (revision):** the site is light, so every sky is light too (pale
paper, lime dawn, soft blue day, golden hour, lavender evening) and all type is
ink with blue and lime accents. Hills are blue-tinted, the near ridge is brand
blue with a lime rim, the "moon" is a white disc with a blue ring, stars are
blue pinpoints, and the lit wordmark is ink letters with lime windows. Small
type was enlarged (ledes, captions, certification names).

**Certifications revision:** the constellation read as dots and lines, so it
was replaced with enamel medals hanging from two sagging lanyard ribbons (four,
then three; two per ribbon on phones). Each medal is one drawn object: offset
shadow, rim, enamel in a rotating site colour, stitched edge, issuer set round
the top edge, an icon (Claude, Scrum cycle, ITIL, LandingLens scan, Snowflake,
clipboard, database), a metal ring and a strap. As a ribbon arrives it draws
across and its medals drop and swing to rest, a damped pendulum scrubbed by
scroll (so it reverses). The land sinks during this act so the medals have the
sky. Names and issuers are real text below each medal.

**Certifications, second revision (the medals were decoration):** credentials are
information, so the act is short (about three screens) and built to be
explored, not watched. A pinned stage holds an index on one side and a lens on
the other. As you scroll, the lens iris opens from its centre onto the next
credential's drawing, which draws on as it opens and then plays while it is in
focus: an agent architecture (Claude Architect), a sprint ring with its
burndown (Scrum Master), a service loop (ITIL), detection boxes snapping onto
objects (Computer Vision), a snowflake over rising data bars (LandingLens on
Snowflake), a Gantt that builds itself (Project Management) and a star schema
with a query sweeping the fact rows (Data Warehouse). The index lights the
matching line; the full name and issuer print on beneath the lens.

**Interaction:** every index line is a real link that travels to its chapter
(mouse, touch or keyboard, with `aria-current` on the active one). On a fine
pointer the lens leans toward the cursor and the drawing inside shifts a little
more than the frame. Phones: the index becomes seven tappable markers and the
active one stretches. Without the scroll loop (reduced motion, no JS) the lens
is hidden and the same names are a plain list.
