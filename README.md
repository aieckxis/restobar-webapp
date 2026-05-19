# Blingzy's: The Sundown Bar — Single-Page Web Application

An architectural implementation of a responsive, client-side digital portal engineered for **Blingzy's The Sundown Bar**. This serverless enterprise solution integrates real-time mathematical transactional processing for point-of-table ordering alongside a transactional submission engine for guest reservations.

---

## 🛠️ System Architecture & Key Modules

* **Serverless Form Processing:** Leverages client-side SDK integration via **EmailJS** to handle asynchronous delivery of event payloads (orders and bookings) directly to a specified administrative inbox.
* **Reactive Financial Calculator:** Implements high-precision DOM value monitoring to process real-time calculations of subtotals, structured local service taxes (10%), and gross ticket values dynamically.
* **Component-Driven Asset Management:** Features a decoupled asset pipeline separating view layers (`index.html`), presentation parameters (`style.css`), and functional scripts (`app.js`) to support modular updates and clean Git versioning.
* **Adaptive Breakpoint Grid:** Developed using standard CSS flexbox and CSS grid matrices to ensure layout stability and complete operational parity on desktop, tablet, and mobile displays.

---

## ⚙️ Administrative Integration (EmailJS Pipeline)

To decouple this client application from database dependencies, form fields map directly to data payloads sent through an email forwarding pipeline. Follow these instructions to activate the backend system:

### 1. Integration Credentials Setup
1. Authenticate into your dashboard at [EmailJS.com](https://www.emailjs.com/).
2. Establish a connection with your target corporate SMTP or email client to register a **Service ID**.
3. Generate an Email Notification Template and document the generated **Template ID**.

### 2. Parameter Initialization
Navigate to `assets/js/app.js` and input your programmatic environment credentials into the designated variable definitions on lines 2 to 4:

```javascript
const PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";
const SERVICE_ID = "YOUR_SERVICE_ID_HERE";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE";