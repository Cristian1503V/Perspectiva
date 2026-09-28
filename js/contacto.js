document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#contact-status');
  if (!form || !status) return;

  const messages = {
    nombre: 'Escribe tu nombre.',
    email: 'Escribe un correo electrónico válido.',
    asunto: 'Indica el asunto de tu mensaje.',
    mensaje: 'Describe tu mensaje en al menos 20 caracteres.'
  };

  const validateField = (field) => {
    const error = document.querySelector(`#${field.id}-error`);
    const invalid = !field.value.trim() || (field.id === 'email' && !field.validity.valid) || (field.id === 'mensaje' && field.value.trim().length < 20);
    field.setAttribute('aria-invalid', String(invalid));
    if (error) error.textContent = invalid ? messages[field.id] : '';
    return !invalid;
  };

  [...form.elements].filter((element) => element.matches('input, textarea')).forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = [...form.elements].filter((element) => element.matches('input, textarea'));
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      setStatus(status, 'Revisa los campos marcados antes de enviar.', 'error');
      return;
    }
    form.reset();
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
    document.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
    setStatus(status, 'Mensaje enviado. Te responderemos al correo que registraste.', 'success');
  });
});
