const filterItems = document.querySelectorAll('.cars-filter li');
const carItems = document.querySelectorAll('.car');
const carsContent = document.getElementById('cars-content');

filterItems.forEach(item => {
  item.addEventListener('click', () => {
    filterItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');

    const filterText = item.textContent.toLowerCase();

    carItems.forEach(car => {
      const carName = car.querySelector('h4').textContent.toLowerCase();

      if (filterText === 'все марки' || carName.startsWith(filterText)) {
        car.style.display = 'flex';
      } else {
        car.style.display = 'none';
      }
    });
    carsContent.scrollIntoView({behavior: 'instant'});
  });
});


document.getElementById('order-action').addEventListener('click', () => {
  // Получаем элементы полей формы
  const carField = document.querySelector('#order input#car');
  const nameField = document.querySelector('#order input#name');
  const phoneField = document.querySelector('#order input#phone');
  
  // Сначала сбрасываем все стили
  [carField, nameField, phoneField].forEach(field => {
      field.classList.remove('error', 'valid');
  });
  
  // Флаг валидности всей формы
  let isFormValid = true;
  
  // Валидация поля "Марка автомобиля"
  if (!carField.value.trim()) {
      carField.classList.add('error');
      isFormValid = false;
  } else {
      carField.classList.add('valid');
  }
  
  // Валидация поля "Имя"
  if (!nameField.value.trim()) {
      nameField.classList.add('error');
      isFormValid = false;
  } else {
      nameField.classList.add('valid');
  }

  // Валидация поля "Телефон" (добавлена проверка на минимальную длину)
  if (!phoneField.value.trim() || phoneField.value.trim().length < 10) {
      phoneField.classList.add('error');
      isFormValid = false;
  } else {
      phoneField.classList.add('valid');
  }

  // Если форма валидна
  if (isFormValid) {
      alert('Спасибо за заявку! Мы скоро свяжемся с вами');
      
      // Очищаем поля и сбрасываем стили
      [carField, nameField, phoneField].forEach(field => {
          field.value = '';
          field.classList.remove('valid');
      });
  }
});