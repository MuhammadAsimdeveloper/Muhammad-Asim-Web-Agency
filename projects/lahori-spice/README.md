# Lahori Spice Restaurant — V5 Portfolio Demo

Lahori Spice is a **fictional restaurant website created as a development portfolio project**.

## V5 improvements

- Real food photographs bundled locally inside `images/`
- No image hotlinking is required for the built-in menu
- Fully responsive mobile, laptop and desktop layout
- Three-line hamburger menu on mobile
- Search and category filtering
- Working cart with quantity controls
- Checkout form validation
- Cash-on-delivery option
- Demo card payment using `4242 4242 4242 4242`
- Demo mobile-wallet payment
- Local Admin Portal
- Upload a food picture from phone gallery/camera
- Image compression before saving
- Add/delete custom foods
- All demo data works without Supabase

## Important payment note

The card/wallet flow is a **simulation for your portfolio**. It does not charge real money and does not contact a payment gateway.

For a real restaurant, integrate a legitimate payment provider through a secure backend. Never put payment secret keys in front-end JavaScript.

## Real food photographs

The included photographs are real web photographs used for the portfolio demo. Their source pages should be checked for current licensing/usage terms before commercial reuse.

Sources used:
- Chicken Karahi: Foodpanda image from Tandoor Restaurant DHA, Lahore.
- Seekh Kebab: Foodpanda image from Zaytoon Bar BQ, Karachi.
- Chicken Biryani: Foodpanda image from TAQWA FOOD'S, Karachi.
- Chicken Tikka: Foodpanda image from Waheed Tikka, Lahore.
- Mutton Karahi: Migrationology photo page, Pakistan.
- Naan: World Holiday Vibes photo page.

For a public/commercial portfolio, replace any third-party restaurant/menu photography with photos you own or images explicitly licensed for your intended use.

## Run in Termux

```bash
cd ~/lahori-spice-restaurant
python -m http.server 8080
```

Open:

```text
http://127.0.0.1:8080
```

Admin:

```text
http://127.0.0.1:8080/admin.html
```

## Deploy later

This is a static website and can be deployed to Vercel, GitHub Pages, Netlify, or another static host.

The project does not require Supabase for the portfolio demo version.
