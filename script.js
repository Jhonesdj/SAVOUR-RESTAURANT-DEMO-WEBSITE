// SAVOUR is a portfolio demo. This creates a WhatsApp draft; it does not store or confirm bookings.
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('#navLinks');
  const menuToggle = document.querySelector('.menu-toggle');

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    nav?.classList.toggle('show', !isOpen);
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('show');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  }));

  const tabs = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('.menu-item[data-cat]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    tabs.forEach(button => {
      const active = button === tab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    items.forEach(item => {
      item.hidden = filter !== 'all' && item.dataset.cat !== filter;
    });
  }));

  const date = document.querySelector('#date');
  if (date) {
    const today = new Date();
    date.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  document.querySelector('#resForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const message = [
      'Hello, I would like to request a table (SAVOUR portfolio demo).',
      `Name: ${values.get('name')}`,
      `Email: ${values.get('email')}`,
      `Phone: ${values.get('phone')}`,
      `Preferred date: ${values.get('date')}`,
      `Guests / request: ${values.get('message')}`
    ].join('\n');
    const demoNumber = '2348000000000';
    window.open(`https://wa.me/${demoNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
});
