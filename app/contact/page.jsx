export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Phone: +962 790055163</p>
      <p>Email: info@vivaevents.com</p>

      <form style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
