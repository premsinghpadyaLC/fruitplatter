
```markdown
# 🍇 Fresh Fruit Platter — Event Booking Web App

A responsive, multi-step web application for booking customized fresh fruit platters for events such as weddings, birthdays, anniversaries, and corporate events.

---

## **Features**

- **Multi-step Form** for seamless booking:
  1. Select arrangement type (by attendees, tables, or groups)
  2. Choose stall variety
  3. Pick fruits for the platter
  4. Enter customer details
  5. Preview and confirm order
- **Dynamic Fruit & Variety Selection** loaded from JSON data.
- **Live Preview** of order before confirmation.
- **PDF Receipt Generation** with:
  - Customer details
  - Chosen fruits & variety
  - Arrangement summary
  - Optional images of selected variety
- **Direct WhatsApp Ordering** with pre-filled order details.
- **Validation** for numbers, names, and Canadian phone numbers.
- **User-friendly UI** with focus highlighting and error messages.
- Fully **responsive** design for mobile and desktop.

---

## **Technologies Used**

- HTML5, CSS3
- JavaScript (ES6)
- [jsPDF](https://github.com/parallax/jsPDF) & [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) for PDF generation
- JSON for storing fruit varieties and options

---

## **Folder Structure**

```

fresh-fruit-stall/
│
├─ assets/
│  ├─ images/         # Images for varieties & PDF backgrounds
│
├─ data/
│  ├─ fruits.json     # JSON data for varieties and fruits
│
├─ index.html         # Main web page
├─ styles.css         # Styling
├─ script.js          # JavaScript logic
└─ README.md          # Project documentation

````

---

## **Installation & Usage**

1. Clone the repository:

```bash
git clone https://github.com/premsinghpadyaLC/fruitplatter.git
cd fruitplatter
````

2. Open `index.html` in your browser.

3. Fill out the multi-step booking form:

   * Select arrangement type
   * Choose variety and fruits
   * Enter your name and Canadian phone number
   * Preview and generate your PDF receipt or order directly via WhatsApp

---

## **How It Works**

* **Step Navigation**: `Next` and `Back` buttons control the form steps.
* **Validation**: Ensures numbers, names, and phone numbers are correctly entered before proceeding.
* **Dynamic Rendering**: Fruit options change based on selected variety.
* **PDF Generation**: Uses `jsPDF` and `jsPDF-AutoTable` to create a downloadable receipt.
* **WhatsApp Sharing**: Prepares a message with order details and opens WhatsApp Web.

---

## **Future Enhancements**

* Add user authentication for returning clients
* Store orders in a backend database
* Add online payment integration
* Enhance UI with animations and accessibility improvements

---

## **Author**

**Premsingh Padya**
📧 Contact: [WhatsApp](https://wa.me/+13435587818)
📍 Ottawa, Canada

---

## **License**

This project is open-source and available under the MIT License.

```



Do you want me to do that too?
```
