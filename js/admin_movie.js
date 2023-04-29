const myTextarea = document.getElementById('raitingBox');

  myTextarea.addEventListener('input', function() {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    const isValid = regex.test(this.value);

    if (!isValid) {
      this.value = this.value.replace(/[^\d\.]/g, '');
    }
  });