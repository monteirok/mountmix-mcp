export function ContactSection() {
  return (
    <section id="contact" style={{ background: "linear-gradient(180deg, #1e293b, #0f172a)", color: "white" }}>
      <div className="container grid" style={{ gap: "3rem" }}>
        <div>
          <h2 className="section-title" style={{ color: "white" }}>
            Ready to Elevate Your Celebration?
          </h2>
          <p className="section-subtitle" style={{ color: "rgba(226, 232, 240, 0.85)" }}>
            Share the details of your event and we’ll craft a custom bar proposal within 48 hours. Prefer to start with inspiration? Request our mountain cocktail
            planning guide for sample menus and timeline tips.
          </p>
          <div className="card" style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(148, 163, 184, 0.35)", color: "white" }}>
            <h3 style={{ marginTop: 0 }}>What happens next</h3>
            <ul style={{ margin: "1rem 0", paddingLeft: "1.2rem", lineHeight: 1.8 }}>
              <li>We schedule a discovery call to align on goals, venue logistics, and flavour profiles.</li>
              <li>Our team presents a tailored menu, package recommendation, and transparent pricing.</li>
              <li>Once booked, we coordinate with your planner and vendors, then deliver a seamless bar experience.</li>
            </ul>
          </div>
        </div>
        <form
          style={{
            display: "grid",
            gap: "1rem",
            background: "white",
            padding: "2.5rem",
            borderRadius: "18px",
            color: "var(--color-ink)",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.3)"
          }}
        >
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span>Full Name *</span>
              <input type="text" name="name" required style={inputStyle} placeholder="Your name" />
            </label>
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span>Email *</span>
              <input type="email" name="email" required style={inputStyle} placeholder="hello@you.com" />
            </label>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span>Phone</span>
              <input type="tel" name="phone" style={inputStyle} placeholder="Optional" />
            </label>
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span>Event Date *</span>
              <input type="date" name="date" required style={inputStyle} />
            </label>
          </div>
          <label style={{ display: "grid", gap: "0.4rem" }}>
            <span>Event Type *</span>
            <select name="eventType" required style={inputStyle}>
              <option value="">Select one</option>
              <option>Wedding</option>
              <option>Elopement</option>
              <option>Corporate / Gala</option>
              <option>Private Party</option>
              <option>Destination Event</option>
            </select>
          </label>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span>Guest Count *</span>
              <input type="number" name="guestCount" required style={inputStyle} placeholder="Approximate" min={10} />
            </label>
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span>Projected Beverage Budget *</span>
              <input type="text" name="budget" required style={inputStyle} placeholder="$5,000" />
            </label>
          </div>
          <label style={{ display: "grid", gap: "0.4rem" }}>
            <span>Event Location *</span>
            <input type="text" name="location" required style={inputStyle} placeholder="Venue or address" />
          </label>
          <label style={{ display: "grid", gap: "0.4rem" }}>
            <span>Tell us about your vision *</span>
            <textarea
              name="vision"
              required
              rows={4}
              style={{ ...inputStyle, resize: "vertical", padding: "0.75rem 1rem", fontFamily: "inherit" }}
              placeholder="Share themes, must-have cocktails, or logistics we should know."
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
            <input type="checkbox" name="guide" style={{ width: "1.1rem", height: "1.1rem" }} />
            <span>Send me the Mountain Cocktail Planning Guide PDF</span>
          </label>
          <button type="submit" className="btn-primary" style={{ width: "fit-content", padding: "0.85rem 2.5rem" }}>
            Submit & Start Planning
          </button>
        </form>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  borderRadius: "10px",
  border: "1px solid var(--color-mist)",
  padding: "0.65rem 0.85rem",
  fontSize: "1rem",
  fontFamily: "inherit"
};
