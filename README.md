# SciFi — Science & Innovation Hub 🚀

A modern, professional science and innovation hub website inspired by [CFI IIT Madras](https://cfi.iitm.ac.in/), featuring **33 specialized clubs and societies** across **10 academic schools**.

![SciFi Branding](https://via.placeholder.com/1200x600/ffffff/c21807?text=SCI+Φ+Science+&+Innovation+Hub)

## ✨ Features

- **🎓 33 Specialized Clubs**: Organized by academic departments (BioTech, CSE, Management, etc.).
- **🏫 School-Based Navigation**: Interactive filtering to explore clubs by their respective schools.
- **👩‍🏫 Faculty Mentorship**: Integration of faculty advisors for all 33 clubs.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile viewing.
- **⚡ SPA Architecture**: Smooth, fast navigation without full page reloads.
- **🎨 Modern Aesthetics**: Premium Black + Red theme with glassmorphism and scroll-reveal animations.
- **🏆 Comprehensive Tracking**: Sections for Achievements, Events, Media, and Alumni.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure for SEO and accessibility.
- **CSS3**: Custom design tokens, CSS variables, and complex animations.
- **Vanilla JavaScript (ES6+)**: Dynamic data rendering and SPA routing.
- **Font Awesome 6**: Rich iconography across the entire hub.

## 📁 Project Structure

```text
├── index.html        # Main entry point and SPA structure
├── styles.css        # Complete design system & responsive styling
├── data.js           # Structured data for all 33 clubs and activities
├── app.js            # Main application logic and routing engine
└── .github/          # GitHub Actions for automated deployment
```

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/scifi-hub.git
   cd scifi-hub
   ```
2. **Run a local server**:
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Or using Node.js (npx)
   npx serve .
   ```
3. **Open in browser**: Visit `http://localhost:3000`

## 🌍 Deployment

This project is ready for **GitHub Pages**.

1. Create a new repository on GitHub.
2. Push the files to the `main` branch.
3. Enable GitHub Pages in Repository Settings -> Pages.
4. Set the source to 'GitHub Actions' (already configured in `.github/workflows/deploy.yml`).

---
Developed with ❤️ for the **SciFi Hub Community**.
