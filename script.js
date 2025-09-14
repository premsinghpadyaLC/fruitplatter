let data = null;
let selectedVariety = null;

document.addEventListener('DOMContentLoaded', async () => {
  const steps = document.querySelectorAll('.form-step');
  const nextBtns = document.querySelectorAll('.next-step');
  const prevBtns = document.querySelectorAll('.prev-step');
  const varietiesDiv = document.getElementById('varieties');
  const fruitOptions = document.getElementById('fruit-options');
  const previewDiv = document.getElementById('preview');

  // Arrangement inputs
  const attendeesInput = document.getElementById('attendees');
  const tablesInput = document.getElementById('tables');
  const tablesPerInput = document.getElementById('tablesPer');
  const groupsInput = document.getElementById('groups');
  const groupsPerInput = document.getElementById('groupsPer');
  const arrangeRadios = document.getElementsByName('arrangeType');

  // Client inputs
  const nameInput = document.getElementById('custName');
  const phoneInput = document.getElementById('custPhone');

  let currentStep = 1;

  // --- Error Handling ---
  function createErrorElement(input) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error-msg')) {
      error = document.createElement('div');
      error.className = 'error-msg';
      input.parentNode.insertBefore(error, input.nextSibling);
    }
    return error;
  }

  // --- Step Navigation ---
  function showStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    const activeStep = document.querySelector(`.form-step[data-step="${step}"]`);
    if (activeStep) activeStep.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function hideAllArrInputs() {
    attendeesInput.classList.add('hidden');
    tablesInput.classList.add('hidden');
    tablesPerInput.classList.add('hidden');
    groupsInput.classList.add('hidden');
    groupsPerInput.classList.add('hidden');
  }

  function toggleArrInput(value) {
    hideAllArrInputs();
    if (value === 'attendees') attendeesInput.classList.remove('hidden');
    else if (value === 'tables') {
      tablesInput.classList.remove('hidden');
      tablesPerInput.classList.remove('hidden');
    } else if (value === 'groups') {
      groupsInput.classList.remove('hidden');
      groupsPerInput.classList.remove('hidden');
    }
  }

  const initial = document.querySelector('input[name="arrangeType"]:checked');
  if (initial) toggleArrInput(initial.value);
  arrangeRadios.forEach(radio =>
    radio.addEventListener('change', () => toggleArrInput(radio.value))
  );

  // --- Validation ---
  function validateStep(step) {
    let valid = true;

    if (step === 1) {
      const selected = document.querySelector('input[name="arrangeType"]:checked').value;
      let valInput =
        selected === 'attendees' ? attendeesInput :
        selected === 'tables' ? tablesInput :
        groupsInput;

      const val = valInput.value.trim();
      const error = createErrorElement(valInput);
      if (!val || !/^\d+$/.test(val) || parseInt(val) <= 0) {
        error.innerHTML = `Please enter a valid number. <small>Veuillez entrer un nombre valide.</small>`;
        valid = false;
      } else error.innerHTML = '';

      if (selected === 'tables') {
        const perVal = tablesPerInput.value.trim();
        const perError = createErrorElement(tablesPerInput);
        if (!perVal || !/^\d+$/.test(perVal) || parseInt(perVal) <= 0) {
          perError.innerHTML = `Please enter valid people per table. <small>Veuillez entrer un nombre valide de personnes par table.</small>`;
          valid = false;
        } else perError.innerHTML = '';
      }

      if (selected === 'groups') {
        const perVal = groupsPerInput.value.trim();
        const perError = createErrorElement(groupsPerInput);
        if (!perVal || !/^\d+$/.test(perVal) || parseInt(perVal) <= 0) {
          perError.innerHTML = `Please enter valid people per group. <small>Veuillez entrer un nombre valide de personnes par groupe.</small>`;
          valid = false;
        } else perError.innerHTML = '';
      }
    }

    if (step === 2) {
      const error = createErrorElement(varietiesDiv);
      if (!selectedVariety) {
        error.innerHTML = `Please select a variety. <small>Veuillez sélectionner une variété.</small>`;
        valid = false;
      } else error.innerHTML = '';
    }

    if (step === 3) {
      const checkedFruits = document.querySelectorAll('#fruit-options input:checked');
      const error = createErrorElement(fruitOptions);
      if (checkedFruits.length === 0) {
        error.innerHTML = `Please select at least one fruit. <small>Veuillez sélectionner au moins un fruit.</small>`;
        valid = false;
      } else error.innerHTML = '';
    }

    if (step === 4) {
      const name = nameInput.value.trim();
      const nameError = createErrorElement(nameInput);
      if (!/^[a-zA-Z\s]{2,50}$/.test(name)) {
        nameError.innerHTML = `Please enter a valid name (letters only). <small>Veuillez entrer un nom valide (lettres seulement).</small>`;
        valid = false;
      } else nameError.innerHTML = '';

      let phone = phoneInput.value.trim().replace(/\s+/g, '');
      if (!phone.startsWith('+1')) phone = '+1' + phone;
      phoneInput.value = phone;

      const phoneError = createErrorElement(phoneInput);
      if (!/^\+1\d{10}$/.test(phone)) {
        phoneError.innerHTML = `Please enter a valid Canadian phone number. <small>Veuillez entrer un numéro de téléphone canadien valide.</small>`;
        valid = false;
      } else phoneError.innerHTML = '';
    }

    return valid;
  }

  // Step Navigation Events
  nextBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      if (!validateStep(currentStep)) return;
      if (currentStep < steps.length) {
        currentStep++;
        showStep(currentStep);
        updatePreview();
      }
    })
  );

  prevBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    })
  );

  showStep(currentStep);

  // --- Load varieties from JSON ---
  try {
    const res = await fetch('data/fruits.json');
    data = await res.json();
    renderVarieties();
  } catch (e) {
    console.error('Could not load fruits.json', e);
  }

  function renderVarieties() {
    varietiesDiv.innerHTML = '';
    data.varieties.forEach((v, idx) => {
      const div = document.createElement('div');
      div.className = 'var-card';
      div.innerHTML = `
        <input type="radio" name="variety" value="${v.id}" ${idx === 0 ? 'checked' : ''}>
        <img src="assets/images/${v.image}" alt="${v.name}">
        <strong>${v.name}</strong>
      `;
      div.addEventListener('click', () => {
        div.querySelector('input').checked = true;
        selectedVariety = v;
        renderFruitOptions(v);
      });
      varietiesDiv.appendChild(div);
      if (idx === 0) { selectedVariety = v; renderFruitOptions(v); }
    });
  }

  function renderFruitOptions(variety) {
    fruitOptions.innerHTML = '';
    variety.fruits.forEach(f => {
      const el = document.createElement('label');
      el.className = 'fruit-checkbox';
      el.innerHTML = `<input type="checkbox" value="${f.name}"> ${f.name}`;
      fruitOptions.appendChild(el);
    });
  }

  // --- Collect Order ---
  function collectOrder() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const fruits = Array.from(document.querySelectorAll('#fruit-options input:checked')).map(i => i.value);
    const arrangeType = document.querySelector('input[name="arrangeType"]:checked').value;
    const attendees = attendeesInput.value;
    const tables = tablesInput.value;
    const tablesPer = tablesPerInput.value;
    const groups = groupsInput.value;
    const groupsPer = groupsPerInput.value;

    let arrangeValue = '';
    if (arrangeType === 'attendees') arrangeValue = `${attendees} attendees`;
    if (arrangeType === 'tables') {
      const total = parseInt(tables) * parseInt(tablesPer);
      arrangeValue = `${tables} tables × ${tablesPer} per table (Total: ${total} attendees)`;
    }
    if (arrangeType === 'groups') {
      const total = parseInt(groups) * parseInt(groupsPer);
      arrangeValue = `${groups} groups × ${groupsPer} per group (Total: ${total} attendees)`;
    }

    return { name, phone, variety: selectedVariety?.name || '', fruits, arrangeType, arrangeValue };
  }

  function updatePreview() {
    const order = collectOrder();
    previewDiv.innerHTML = `
      <strong>Name of the Client:</strong> ${order.name} <br>
      <strong>Phone Number of the Client:</strong> ${order.phone} <br>
      <strong>Variety Chosen:</strong> ${order.variety} <br>
      <strong>Fruits to be included:</strong> ${order.fruits.join(', ')} <br>
      <strong>Arrangement Chosen:</strong> ${order.arrangeValue}
    `;
  }

// --- PDF Generation ---
const { jsPDF } = window.jspdf;

async function toDataURL(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function generatePDF(order) {
  const doc = new jsPDF('p', 'pt', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  const margin = 40;

  // Background image (optional)
  try {
    const bgImg = await toDataURL('assets/images/pdf-bg.jpg');
    doc.addImage(bgImg, 'JPEG', 0, 0, pageWidth, doc.internal.pageSize.height);
  } catch (e) {
    console.warn('PDF background not found', e);
  }

  // Header
  doc.setFillColor(46, 125, 50);
  doc.rect(0, 0, pageWidth, 70, 'F');
  doc.setFontSize(22);
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'bold');
  doc.text('Fresh Fruit Stall Booking Receipt', pageWidth / 2, 45, { align: 'center' });

  // Greeting
  let startY = 100;
  doc.setFontSize(14);
  doc.setTextColor('#000000');
  doc.text(`Dear ${order.name},`, margin, startY);
  doc.text("Thank you for booking with Fresh Fruit Stall. Below are your order details:", margin, startY + 20);

  // Order Table
  const tableData = [
    ['Client Name', order.name],
    ['Phone Number', order.phone],
    ['Variety Chosen', order.variety],
    ['Fruits Selected', order.fruits.join(', ') || 'N/A'],
    ['Arrangement', order.arrangeValue || 'N/A']
  ];

  doc.autoTable({
    startY: startY + 50,
    head: [['Order Detail', 'Information']],
    body: tableData,
    theme: 'grid',
    styles: { font: 'helvetica', fontSize: 12, cellPadding: 6 },
    headStyles: { fillColor: [46, 125, 50], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  // Variety Image (optional)
  if (selectedVariety?.image) {
    try {
      const imgData = await toDataURL(`assets/images/${selectedVariety.image}`);
      const tableBottom = doc.lastAutoTable.finalY + 20;
      doc.addImage(imgData, 'JPEG', pageWidth - 220, tableBottom, 160, 120);
    } catch (e) {
      console.warn('Variety image error', e);
    }
  }

  // Footer
  const afterTable = doc.lastAutoTable.finalY + 160;
  doc.setFontSize(12);
  doc.setTextColor('#2E7D32');
  doc.text("We look forward to delighting you with fresh arranged fruits.", margin, afterTable);

  doc.setFontSize(10);
  doc.setTextColor('#555555');
  doc.setFont('helvetica', 'italic');
  doc.text("Disclaimer: This is a booking receipt only. Please share this pdf with us. Final confirmation will be discussed over call.", margin, afterTable + 30);

  // File Save + Blob
  const fileName = `fruit-stall-order-${(order.name || 'guest').replace(/\s+/g, '_')}.pdf`;
  const pdfBlob = doc.output('blob');
  const pdfURL = URL.createObjectURL(pdfBlob);

  doc.save(fileName);
  return { fileName, pdfURL };
}

// --- Buttons ---
document.getElementById('generatePdf').addEventListener('click', async () => {
  if (!validateStep(currentStep)) return;
  const order = collectOrder();
  await generatePDF(order); // download PDF
});

document.getElementById('whatsappShare').addEventListener('click', async () => {
  if (!validateStep(currentStep)) return;
  const order = collectOrder();
  const { pdfURL } = await generatePDF(order); // generate PDF blob

  const msg = encodeURIComponent(
`Hi, this is ${order.name}.
Choosen Variety: ${order.variety}
Required Fruits: ${order.fruits.join(', ')}
Arrangement: ${order.arrangeValue}

Download your receipt here: ${pdfURL}`
  );

  window.open(`https://wa.me/+13435587818?text=${msg}`, '_blank');
});

});