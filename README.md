# Our Universe | A Digital Sanctuary for Dipanjana

This is a premium, interactive relationship portal (the "Love Hub") built for **Dipanjana** by **Saptak**. 

Originally created as a 22nd birthday surprise website, this project has been fully overhauled into an ongoing digital sanctuary filled with love letters, interactive memories, canvas games, and creative builders, all packaged in a mature, organic **Sage & Champagne** theme.

---

## 🌟 Overhauled Features

### 1. 🏠 Home Dashboard & Relationship Timer
- **Live Relationship Ticker**: An exact down-to-the-second counter calculating the time spent loving each other.
- **Daily Compliment Jar**: An interactive glass jar. Clicking it triggers a gold star animation and draws a sweet personalized compliment.
- **Ambient Soundtrack**: Plays a relaxing, romantic melody (`ambient.mp3`) with play/pause, mute, and visual volume controllers.

### 2. ✉️ Time-Locked Love Letters
- **Interactive Envelopes**: Displays a grid of letters. Future letters are padlocked with live countdown timers.
- **3D Envelope Animation**: Clicking unlocked letters initiates a 3D fold-out animation where the envelope flap opens and the letter slides up.
- **Soundtrack Integration**: Letters can be attached to custom songs (via YouTube/Spotify) which can be played in a Picture-in-Picture popup.

### 3. 📸 Flip Polaroid Scrapbook
- **Polaroid Deck**: Displays all 44 photos from the original project with a realistic polaroid layout.
- **3D Flip Interaction**: Tapping a photo flips it over to show a handwritten memory caption, date, and buttons to play its corresponding song.
- **Albums Filter**: Sort memories easily between *Romantic Journey* and *Friendly/Family Memories*.

### 4. 🎟️ HTML5 Canvas Scratch Cards
- **Scratch-off Interaction**: Features realistic scratch tickets covered in a metallic champagne gold coating. Drag your mouse or finger to scratch off the layer!
- **Love Vouchers**: Offers redeemable cards (e.g., *Coffee Date*, *Home-Cooked Meal*, *Warm Cuddles*). Scratched tickets can be marked as redeemed with a stamp and tracked.

### 5. 🌸 Digital Bouquet Builder
- **Digital Flower Vase**: Select from wrapping styles (Cream linen, Gold foil, Pink silk, Forest velvet) and ribbon bows.
- **Stem Tray**: Click to arrange Roses, Sunflowers, Lilies, Dandelions, and Tulips, scaling and rotating them dynamically.
- **Showcase Cabinet**: Save your assembled bouquets with dedicated tags into your persistent digital garden showcase.

### 6. 🎂 Relive Birthday Cake
- The original interactive birthday cake. Tap/click to blow out the candle, triggering the smoke effect and the custom sound. Dynamically calculates and displays her exact age.

### 7. ✍️ Admin Writing Desk
- Secure admin desk allowing the composer (Saptak) to:
  - Compose new love letters, set titles, content, soundtracks, and future release lock-dates.
  - Manage the Compliment Jar (add/delete compliments).
  - Adjust the relationship start date for the ticker.
  - Reset and cover scratch-off vouchers.
  - Export a backup JSON configuration of the portal.

---

## 🔑 Access Credentials

This site has **no password hints** on the frontend to maintain secrecy:
- **Her Entry Passcode**: `0804` or `0408` (Representing your anniversary date, April 8th). Takes her directly to the dashboard.
- **Your Entry (Admin Bypass)**: `2112` or `1221` (Representing her birthday, December 21st). Logs Saptak directly into the Admin Writing Desk.

---

## 🛠️ Tech Stack & Local Setup

- **Core**: React, Vite
- **Styling**: Tailwind CSS (CDN loaded), Custom CSS transitions, and 3D animations (`src/index.css`)
- **Icons**: Lucide React
- **Audio**: HTML5 Audio API

### To Run Locally:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
