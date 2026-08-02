# OpenTrade Venator fidelity ledger

Accepted visual references are the supplied desktop `screen.png` exports for Dashboard, Tactical Arena, Compete, and Profile. Their matching `code.html` files provide copy and layout details; Kinetic Apex is the supporting design-system reference.

| Comparison point | Concept | Final implementation | Resolution |
| --- | --- | --- | --- |
| Desktop shell | 256 px navigation, 736 px content, 288 px command rail | Same 1280 px logical canvas split | Matched |
| Hero | 320 px arena image with magenta glow, grid, and angled treatment | Localized reference asset with equivalent crop and overlays | Matched |
| Type and color | Anybody display face, Lexend UI copy, black and `#EA4C89` | Local font packages and shared CSS tokens | Matched |
| Dashboard | Two progression cards beneath the arena hero | Same copy, progress values, geometry, and status treatment | Matched |
| Tactical Arena | Daily status, four drills, add-game control, two locked modes | Same hierarchy with functional local selection dialog | Matched |
| Compete | Brief, eligibility form, nine campus rankings | Same visible content with honest local-only validation and status | Matched |
| Profile | Account card, preferences, rewards, milestones | Same visible state with locally persisted toggles | Matched |
| Responsive behavior | No mobile reference supplied | Rails become accessible navigation and command drawers without horizontal overflow | Intentional extension |
| Navigation state | Profile reference incorrectly highlights Arena | Each route exposes the correct active destination | Intentional correction |
| Command rail extension | Accepted references leave unused black space below Active Quests | User-requested Market, Discord, and legal resources occupy that lower space without changing the 288 px rail | Intentional extension |
| Utility hierarchy | Tactical rail uses uppercase 12 px labels, dark rows, hard borders, and magenta focus states | Market and referral labels plus 44 px link rows reuse those tokens; legal copy remains compact and readable | Matched system |
| Link contract | No resource links exist in the supplied references | Exact user-supplied US, India, Discord, and legal HTTPS destinations are preserved | Intentional extension |
| Short-height behavior | Fixed desktop reference is 1024 px tall | Command Center body scrolls internally when shorter; header and operator identity remain fixed | Intentional extension |

No supplied above-the-fold copy was replaced. The new legal sentence is reproduced verbatim, and the requested footer does not alter Arena, Compete, Profile, operator, or stat content.
