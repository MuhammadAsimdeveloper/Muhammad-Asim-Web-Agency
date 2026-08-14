# Muhammad Asim Web Agency — Portfolio Demo Package

This package contains the main Muhammad Asim Web Agency site and two portfolio live demos:

1. `projects/muhammad-asim-web-agency/` — standalone agency portfolio demo
2. `projects/lahori-spice/` — fictional restaurant portfolio demo

## Portfolio behavior
- The Home page no longer contains the old project cards. Use the dedicated Portfolio page.
- Both portfolio cards use the same **Live Demo** button style.
- Both live demos include **Contact Our Agency**.
- Clicking **Contact Our Agency** from either live demo opens the main agency contact page at `../../contact.html`.
- Lahori Spice is a fictional portfolio/demo project, not a real restaurant client.

## Local preview
```bash
python -m http.server 8000
```
Open `http://127.0.0.1:8000/`.
