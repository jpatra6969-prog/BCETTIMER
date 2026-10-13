import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Hourglass } from "lucide-react";
import background from "@/assets/odyssey-background-map.png";
import logo from "@/assets/bcet-logo.png";
import odysseyEmblem from "@/assets/odyssey-emblem.png";
import falconLogo from "@/assets/falcon-logo-background.png";
import sponsorYamaha from "@/assets/sponsors/sponsor_yamaha.png";
import sponsorTvs from "@/assets/sponsors/sponsor_tvs.png";
import sponsorRoastly from "@/assets/sponsors/sponsor_roastly.jpg";
import sponsorOhoride from "@/assets/sponsors/sponsor_ohoride.png";
import sponsorNalco from "@/assets/sponsors/sponsor_nalco.png";
import sponsorSureSuccess from "@/assets/sponsors/sponsor_suresuccess.jpg";
import sponsorSecond from "@/assets/sponsors/sponsor_second.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ODYSSEY — The 24-Hour Inter-College Hackathon" },
      {
        name: "description",
        content:
          "One journey. Twenty-four hours. ODYSSEY brings college innovators together to build beyond the ordinary.",
      },
      { property: "og:title", content: "ODYSSEY — The 24-Hour Hackathon" },
      {
        property: "og:description",
        content:
          "An inter-college odyssey of ideas, invention, and ambition. The countdown begins.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [remaining, setRemaining] = useState(24 * 60 * 60);
  const [timerStarted, setTimerStarted] = useState(false);
  useEffect(() => {
    if (!timerStarted) return;

    const deadline = Date.now() + 24 * 60 * 60 * 1000;
    const interval = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerStarted]);
  const time = [
    { label: "HOURS", value: Math.floor(remaining / 3600) },
    { label: "MINUTES", value: Math.floor((remaining % 3600) / 60) },
    { label: "SECONDS", value: remaining % 60 },
  ];
  return (
    <section className="odyssey-hero" aria-label="ODYSSEY inter-college hackathon">
      <img className="hero-art" src={background} alt="" fetchPriority="high" />
      <img className="hero-falcon" src={falconLogo} alt="Falcon logo" />
      <header className="hero-nav">
        <span className="hero-brand">
          <img className="hero-logo" src={logo} alt="BCET emblem" width="421" height="560" />
        </span>
        <div className="nav-center">
          <div className="hero-eyebrow">A journey beyond the ordinary</div>
          <h1 className="hero-title" aria-label="ODYSSEY">
            <img className="hero-title-emblem" src={odysseyEmblem} alt="" aria-hidden="true" />
            <span>DYSSEY</span>
          </h1>
          <p className="hero-tagline">Every great idea begins with a voyage.</p>
          <p className="hero-description">
            One arena. Limitless possibilities.
            <br />
            24 hours to turn your vision into a legacy.
          </p>
          <div className="countdown-heading">
            <Hourglass aria-hidden="true" />
            {remaining === 0
              ? "THE VOYAGE IS COMPLETE"
              : timerStarted
                ? "THE 24-HOUR CHALLENGE"
                : "READY TO BEGIN?"}
          </div>
        </div>
      </header>
      <main className="hero-main">
        <div
          className="countdown"
          role="timer"
          aria-label={`${Math.floor(remaining / 3600)} hours, ${Math.floor((remaining % 3600) / 60)} minutes, ${remaining % 60} seconds remaining`}
        >
          <div className="time-display" aria-hidden="true">
            {time.map((unit, index) => (
              <div className="contents" key={unit.label}>
                {index > 0 && <span className="time-colon">:</span>}
                <div className="time-unit">
                  <div className="time-face">
                    <span className="time-number">
                      {String(unit.value)
                        .padStart(2, "0")
                        .split("")
                        .map((digit, digitIndex) => (
                          <span className="time-digit" key={`${digitIndex}-${digit}`}>
                            {digit}
                            <span className="time-digit-flap" aria-hidden="true">
                              {digit}
                            </span>
                          </span>
                        ))}
                    </span>
                    <span className="time-seam" />
                    <span className="time-hinge time-hinge-left" />
                    <span className="time-hinge time-hinge-right" />
                  </div>
                  <span className="time-label">{unit.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="countdown-progress" aria-hidden="true">
            <span style={{ width: `${(remaining / (24 * 60 * 60)) * 100}%` }} />
          </div>
          {!timerStarted && remaining > 0 && (
            <button
              className="countdown-start-button"
              type="button"
              onClick={() => setTimerStarted(true)}
            >
              Start the timer
            </button>
          )}
        </div>
        <div className="hero-motto">
          <span>IMAGINE</span>
          <span className="motto-divider" />
          <span>BUILD</span>
          <span className="motto-divider" />
          <span>TRANSCEND</span>
        </div>
        <div className="hero-sponsors" aria-label="Our Sponsors">
          <span className="sponsors-title">OUR SPONSORS</span>
          <div className="sponsors-track">
            <div className="sponsor-card">
              <img src={sponsorYamaha} alt="Yamaha Racing - Sai Ananta Automobiles" />
            </div>
            <div className="sponsor-card">
              <img src={sponsorTvs} alt="Balasore TVS" />
            </div>
            <div className="sponsor-card">
              <img src={sponsorRoastly} alt="Roastly" />
            </div>
            <div className="sponsor-card">
              <img src={sponsorOhoride} alt="Oho Ride" />
            </div>
            <div className="sponsor-card">
              <img src={sponsorNalco} alt="Nalco" />
            </div>
            <div className="sponsor-card">
              <img src={sponsorSureSuccess} alt="Sure Success" />
            </div>
            <div className="sponsor-card sponsor-card-second">
              <img src={sponsorSecond} alt="Second sponsor" />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
