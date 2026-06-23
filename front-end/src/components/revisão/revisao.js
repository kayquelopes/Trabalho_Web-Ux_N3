
  
  const state = {
    checkin:  new Date('2026-10-10'),
    checkout: new Date('2026-10-16'),
    adults: 1,
    children: 0,
    pricePerNight: 450
  };

  
  function fmt(d) {
    return d.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' });
  }

  function diffDays(a, b) {
    return Math.max(0, Math.round((b - a) / 86400000));
  }

  function formatBRL(v) {
    return v.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  
  function updateUI() {
    const days = diffDays(state.checkin, state.checkout);
    const total = days * state.pricePerNight;
    const inst  = total / 12;

    document.getElementById('adultCount').textContent = state.adults;
    document.getElementById('childCount').textContent = state.children;
    document.getElementById('totalPrice').textContent = formatBRL(total) + ' BRL';
    document.getElementById('installments').textContent =
      `ou em 12x de ${formatBRL(inst)}`;
  }

  /* BUUTTTTTTTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONNNNNN */
  function openModal(type) {
    if (type === 'dates') {
      document.getElementById('checkin').valueAsDate = state.checkin;
      document.getElementById('checkout').valueAsDate = state.checkout;
      document.getElementById('datesModal').classList.add('open');
    } else {
      document.getElementById('adultModal').textContent = state.adults;
      document.getElementById('childModal').textContent = state.children;
      document.getElementById('guestsModal').classList.add('open');
    }
  }

  function closeModal(type) {
    document.getElementById(type === 'dates' ? 'datesModal' : 'guestsModal').classList.remove('open');
  }

  
  function saveDates() {
    const ci = new Date(document.getElementById('checkin').value + 'T12:00:00');
    const co = new Date(document.getElementById('checkout').value + 'T12:00:00');
    if (co <= ci) { showToast('O check-out deve ser após o check-in.'); return; }
    state.checkin = ci;
    state.checkout = co;

   
    document.querySelectorAll('.detail-line')[0].innerHTML =
      `CHECK-IN: <span class="detail-value">${fmt(ci)}</span>`;
    document.querySelectorAll('.detail-line')[1].innerHTML =
      `CHECK-OUT: <span class="detail-value">${fmt(co)}</span>`;

    updateUI();
    closeModal('dates');
    showToast('Datas atualizadas ✓');
  }

  
  let tempAdult = 1, tempChild = 0;

  function adjustGuest(type, delta) {
    if (type === 'adult') {
      tempAdult = Math.max(1, (parseInt(document.getElementById('adultModal').textContent) || 1) + delta);
      document.getElementById('adultModal').textContent = tempAdult;
    } else {
      tempChild = Math.max(0, (parseInt(document.getElementById('childModal').textContent) || 0) + delta);
      document.getElementById('childModal').textContent = tempChild;
    }
  }

  function saveGuests() {
    state.adults   = parseInt(document.getElementById('adultModal').textContent);
    state.children = parseInt(document.getElementById('childModal').textContent);
    updateUI();
    closeModal('guests');
    showToast('Hóspedes atualizados ✓');
  }

  /* ── FUNCAO BOTAO PRXIMO ── */
  function handleNext() {
    showToast('Reserva confirmada! Redirecionando…');
  }

  
  document.querySelectorAll('.modal-backdrop').forEach(el => {
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
  });

  updateUI();
