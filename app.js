const SITE = {
  webApp: "https://whatsout-fcc29.web.app/",
  email: "bittersoftworks@gmail.com",
  phoneDisplay: "201-491-8531",
  phoneHref: "+12014918531",
  publisher: "Bitter Softworks",
  creator: "Eddy Davila",
  verified: "September 22, 2026",
};

const PERSONAS = {
  free: {
    accent: "#22e7ff",
    number: "01",
    icon: "⌖",
    label: "Free User",
    cardTitle: "Find what’s out.",
    outcome: "A fast way to discover nearby places and decide where to go next—without paying to begin.",
    qr: "../../assets/qr-free.png",
    destination: SITE.webApp,
    qrAction: "Scan to open the free web app",
    quick: [
      "Nearby map centered on your physical location",
      "Date and category search for places and events",
      "Closest-party prompt after nearby results load",
      "Free listening, account controls, and seven languages",
    ],
    cta: "Open the free experience",
    sections: [
      {
        title: "See what is nearby",
        benefits: [
          ["Location-first discovery", "Open a map around your physical location and search without first knowing a business name."],
          ["Search by category", "Look for restaurants, bars, hotels, venues, pharmacies, hospitals, liquor stores, and tourist spots within the standard 5 km search area."],
          ["Expand the search", "Use the rewarded option to expand an eligible nearby category search from 5 km to 10 km."],
          ["Closest-party prompt", "After nearby results load, What’s Out can highlight the closest loaded place and show its distance in miles."],
          ["Plan by date", "Event Mode lets you choose a date before looking for relevant activity."],
          ["Useful place details", "Open loaded markers to review available business details, features, ratings, and directions-related actions."],
        ],
      },
      {
        title: "Useful from the first visit",
        benefits: [
          ["Free music access", "Three built-in songs are available, with rewarded access supporting continued listening."],
          ["Secure account tools", "Signed-in users have profile, privacy, recovery, and account-management controls."],
          ["Seven languages", "The interface supports English, Spanish, German, French, Italian, Japanese, and Portuguese."],
          ["Smarter repeat visits", "Bounded searches and local caching reduce unnecessary work when suitable results are already available."],
        ],
      },
    ],
    notes: [
      "Location access, an internet connection, and a signed-in account may be required for some functions.",
      "Results reflect the listings and events available to the app; completeness is not guaranteed.",
      "A first search or a dense area can take longer depending on network quality, device performance, the number of listings, and service availability.",
      "The closest-party notice is an in-app prompt after results load, not a background push alert.",
      "Road routing and public-event discovery are implemented in source, but some free-user production paths remain release-gated and are not promised here as universally available.",
    ],
  },
  "user-plus": {
    accent: "#ff39b7",
    number: "02",
    icon: "✦",
    label: "User+",
    cardTitle: "Go beyond nearby.",
    outcome: "Explore more cities, participate socially, receive VIP invitations, and remove common free-tier limits.",
    qr: "../../assets/qr-user-plus.png",
    destination: "https://eddydavila.github.io/whatsout-bizcard/benefits/user-plus/",
    qrAction: "Scan to see every User+ benefit",
    quick: [
      "Everything in the free experience",
      "Explore 132 supported cities",
      "Profiles, posts, reactions, Lounge, and VIP invitations",
      "Unlimited remote radio and fewer advertising gates",
    ],
    cta: "Open What’s Out",
    sections: [
      {
        title: "Discover beyond your current location",
        benefits: [
          ["Explore 132 cities", "Choose from 132 supported city destinations, select a category, and deliberately search that area."],
          ["Map and list views", "Switch from map markers to a list built from the same loaded result set when scanning options is easier in a list."],
          ["Expanded access", "Use eligible expanded searches without the corresponding free-tier reward gate."],
          ["All free benefits", "Keep the nearby map, date search, category discovery, account controls, and multilingual interface."],
        ],
      },
      {
        title: "Join the community",
        benefits: [
          ["Public profile and posts", "Create a member presence and share posts inside the What’s Out community."],
          ["Likes and comments", "Respond to community content instead of only browsing it."],
          ["Radio Lounge", "Enter the member Lounge and participate in its chat experience."],
          ["VIP invitations", "Eligible invitations arrive in the private in-app inbox and can also trigger a push notification."],
          ["Unlimited remote radio", "Use the current User+ remote-radio experience without the free listening limit shown to basic accounts."],
          ["Fewer interruptions", "Bypass supported reward gates and experience reduced advertising compared with the free tier."],
        ],
      },
      {
        title: "Membership you control",
        benefits: [
          ["Monthly or annual options", "Choose the available Google Play membership period that fits you."],
          ["Verified entitlement", "Purchases are checked by the service before paid access is granted."],
          ["Restore purchases", "Restore an eligible subscription when reinstalling or moving to another supported device."],
        ],
      },
    ],
    notes: [
      "User+ purchase and subscription management are handled through Google Play on Android; this page does not process payment.",
      "City results depend on currently available data, search category, network conditions, and service availability.",
      "VIP invitations exist only when a participating business sends one to an eligible User+ account.",
      "Feature availability follows the current app version and active membership entitlement.",
    ],
  },
  "business-owner": {
    accent: "#ffc84a",
    number: "03",
    icon: "▦",
    label: "Business Owner",
    cardTitle: "Turn discovery into visits.",
    outcome: "Build an approved business presence, publish events, invite qualified guests, and operate admission from one system.",
    qr: "../../assets/qr-business-owner.png",
    destination: "https://eddydavila.github.io/whatsout-bizcard/benefits/business-owner/",
    qrAction: "Scan to see every owner benefit",
    quick: [
      "Register or claim an approved business profile",
      "Create, publish, share, edit, and expire events",
      "Send VIP invitations with inbox and push delivery",
      "Scan admission QR codes and choose VIP or regular entry",
    ],
    cta: "Open What’s Out",
    sections: [
      {
        title: "Create a credible business presence",
        benefits: [
          ["Register or claim your business", "Submit the business category, address, map location, hours, images, features, and verification documents for review."],
          ["Appear in discovery", "An approved, visible listing can participate in relevant map and category searches when it falls within the requested area."],
          ["Keep information current", "Use the owner dashboard to update business details, subject to the app’s approval rules."],
          ["Build trust", "Give customers one place to review available details, features, ratings, and events connected to the business."],
        ],
      },
      {
        title: "Promote and operate events",
        benefits: [
          ["Draft before publishing", "Create and refine an event draft without making it public."],
          ["Flexible publication", "Publish through an active business plan, an eligible one-event pass, or verified service credit where supported."],
          ["Event presentation", "Create a shareable event card and flyer so the event can travel beyond the app."],
          ["Event controls", "Edit active information, manage the event, and expire it when it is over."],
          ["Admission workflow", "Open the scanner, validate invitation QR codes, and record VIP or regular admission through the protected owner flow."],
        ],
      },
      {
        title: "Reach customers directly",
        benefits: [
          ["Targeted VIP invitations", "Send an invitation request to as many as 20 eligible recipients at a time, subject to service rate limits."],
          ["Inbox plus push", "Invitations remain in the member’s private inbox; supported devices can also receive a push notification."],
          ["Owner messaging", "Use the app’s protected owner and event workflows to coordinate with eligible members."],
          ["Sales attribution", "Use the supported attribution path when a sale or referral needs to be connected to its source."],
        ],
      },
      {
        title: "Choose a cost that fits the campaign",
        benefits: [
          ["Business plan options", "Use the currently offered monthly, six-month, or annual business products."],
          ["One-event alternative", "Publish a qualifying event without committing to a longer business plan when the current Play offering permits it."],
          ["Regional pricing", "Google Play presents supported local pricing and handles the transaction in the buyer’s market."],
          ["User+ included", "An active paid-owner entitlement includes supported User+ access for the owner account."],
        ],
      },
    ],
    notes: [
      "A business listing requires truthful information and approval; submission does not guarantee acceptance.",
      "Publishing an event requires a valid plan, pass, or supported verified credit at the time of publication.",
      "Search visibility depends on approval status, location, category, selected date, current data, and service availability.",
      "What’s Out provides discovery and operating tools; it does not guarantee attendance, revenue, or sales.",
      "Plans and prices shown in Google Play can vary by country, tax, currency, and current product configuration.",
    ],
  },
};

const qs = (selector) => document.querySelector(selector);
const agentCode = new URLSearchParams(location.search).get('agent');
const validAgentCode = /^[a-f0-9]{32}$/.test(agentCode || '') ? agentCode : null;
const withAgent = (url) => {
  const target = new URL(url, location.href);
  if (validAgentCode) target.searchParams.set('agent', validAgentCode);
  return target.href;
};

function brand(relative = "") {
  return `<a class="brand" href="${relative || "./"}"><img src="${relative}assets/icon.png" alt="What’s Out icon"><span><b>What’s Out</b><span>Human first systems · AI-level results</span></span></a>`;
}

function footer() {
  return `<footer class="footer"><span>© 2026 ${SITE.publisher}. What’s Out is created by ${SITE.creator}.</span><span>Benefits audited ${SITE.verified}.</span></footer>`;
}

function renderChooser() {
  const cards = Object.entries(PERSONAS).map(([id, p]) => `
    <a class="persona" href="${id === 'business-owner' ? withAgent(`card/${id}/`) : `card/${id}/`}" aria-label="Show the ${p.label} QR presentation">
      <span class="icon" aria-hidden="true">${p.icon}</span>
      <small>${p.number} · Persona BizCard</small>
      <h2>${p.label}</h2>
      <p>${p.outcome}</p>
      <strong>Show QR presentation →</strong>
    </a>`).join("");

  qs("#app").innerHTML = `<div class="shell">
    <header class="topbar">${brand()}<div class="ownerline">Presented by Eddy Davila<br>Founder and owner · Bitter Softworks</div></header>
    <section class="hero">
      <div><div class="eyebrow">In-person product presentation</div><h1>One app.<em>Three ways in.</em></h1><p class="lede">Choose who you are speaking with. The next screen becomes a focused digital business card with the right QR code, message, and benefits for that person.</p><div class="status">✓ Evidence-backed benefits · no inflated promises</div></div>
      <div class="hero-art" role="img" aria-label="What’s Out nightlife welcome screen"></div>
    </section>
    <p class="menu-label">Choose the person in front of you</p>
    <nav class="persona-grid" aria-label="Choose a customer persona">${cards}</nav>
    <p><a href="agent/">Sales agents: sign in to get your personal card →</a></p>
    ${footer()}
  </div>`;
}

function renderCard(id) {
  const p = PERSONAS[id];
  if (!p) return renderNotFound();
  const destination = id === 'business-owner' ? withAgent(p.destination) : p.destination;
  qs("#app").innerHTML = `<div class="card-shell" style="--accent:${p.accent}">
    <a class="back" href="${withAgent('../../')}">← Choose another persona</a>
    <article class="sales-card">
      <section>
        <div class="eyebrow">${p.number} · What’s Out for</div>
        <h1><span>${p.label}</span>${p.cardTitle}</h1>
        <p class="pitch">${p.outcome}</p>
        <ul class="quick-benefits">${p.quick.map((item) => `<li>${item}</li>`).join("")}</ul>
        <div class="card-tools">
          <a class="button primary" href="${id === 'business-owner' ? withAgent(`../../benefits/${id}/`) : `../../benefits/${id}/`}">See full benefits</a>
          <button class="button" type="button" data-copy="${destination}">Copy QR link</button>
        </div>
        <p class="proofline">Built by Eddy Davila · Bitter Softworks</p>
      </section>
      <section class="qr-panel" aria-label="Scannable QR code">
        <img src="${p.qr}" alt="QR code for ${p.label}">
        <h2>${p.qrAction}</h2>
        <p>${destination}</p>
        <a href="${destination}" target="_blank" rel="noopener">Open link</a>
      </section>
    </article>
  </div>`;
  bindCopy();
  if (id === 'business-owner' && validAgentCode) {
    const script = document.createElement('script');
    script.src = '../../vendor/qr-creator.min.js';
    script.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 660;
      const context = canvas.getContext('2d');
      context.fillStyle = '#fff'; context.fillRect(0, 0, 660, 660);
      const inner = document.createElement('canvas');
      QrCreator.render({text: destination, radius: 0, ecLevel: 'M', size: 540,
        fill: '#050718', background: '#fff'}, inner);
      context.drawImage(inner, 60, 60);
      qs('.qr-panel img').src = canvas.toDataURL('image/png');
      qs('.qr-panel img').hidden = false;
    };
    qs('.qr-panel img').hidden = true;
    document.head.appendChild(script);
  }
}

function renderBenefits(id) {
  const p = PERSONAS[id];
  if (!p) return renderNotFound();
  const sections = p.sections.map((section, index) => `
    <section class="section">
      <div class="section-head"><span>${String(index + 1).padStart(2, "0")} · BENEFITS</span><h2>${section.title}</h2></div>
      <div class="benefit-grid">${section.benefits.map(([title, body]) => `<article class="benefit"><h3>${title}</h3><p>${body}</p></article>`).join("")}</div>
    </section>`).join("");

  qs("#app").innerHTML = `<div class="benefit-shell" style="--accent:${p.accent}">
    <header class="topbar"><a class="back" href="${id === 'business-owner' ? withAgent(`../../card/${id}/`) : `../../card/${id}/`}">← Back to QR card</a><div class="ownerline">What’s Out · ${p.label}</div></header>
    <section class="benefit-hero">
      <div class="eyebrow">A complete, evidence-backed view</div>
      <h1>What <span class="label">${p.label}</span> gets</h1>
      <p class="lede">${p.outcome}</p>
      <div class="hero-actions"><a class="button primary" href="${SITE.webApp}" target="_blank" rel="noopener">${p.cta}</a><a class="button" href="mailto:${SITE.email}?subject=What%27s%20Out%20${encodeURIComponent(p.label)}">Ask Bitter Softworks</a></div>
    </section>
    ${id === 'business-owner' && validAgentCode ? `<section class="notes"><h2>Keep your agent connected</h2><p>Sign in with your What’s Out account to save this business referral. Use that same account for your business subscription on Android. Scanning alone does not save it. Your original saved agent remains attached; this applies only to business subscriptions.</p><a class="button primary" href="${withAgent('../../agent/?mode=customer')}">Save my business referral</a></section>` : ''}
    ${sections}
    <aside class="notes"><h2>Clear expectations</h2><ul>${p.notes.map((note) => `<li>${note}</li>`).join("")}</ul></aside>
    <section class="contact"><h2>Ready to talk?</h2><p>Contact Eddy Davila, founder and owner of Bitter Softworks, for a What’s Out walkthrough.</p><p><a href="mailto:${SITE.email}">${SITE.email}</a> · <a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a></p></section>
    ${footer()}
  </div>`;
}

function bindCopy() {
  const button = qs("[data-copy]");
  if (!button) return;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast("Link copied");
    } catch (_) {
      window.prompt("Copy this link:", button.dataset.copy);
    }
  });
}

function showToast(message) {
  const old = qs(".toast");
  if (old) old.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1800);
}

function renderNotFound() {
  qs("#app").innerHTML = `<div class="shell"><h1>Page not found.</h1><a class="button primary" href="/whatsout-bizcard/">Return to the BizCard</a></div>`;
}

const page = document.body.dataset.page;
const persona = document.body.dataset.persona;
if (page === "chooser") renderChooser();
else if (page === "card") renderCard(persona);
else if (page === "benefits") renderBenefits(persona);
else renderNotFound();
