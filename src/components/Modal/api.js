// api.js
export const sendApplication = async (formData) => {
  // Формируем текст письма
  const getReasonText = (reason) => {
    const reasons = {
      consultation: "Консультация",
      visit: "Выезд специалиста",
      project: "Расчет проекта",
      service: "Заказ услуги",
      callback: "Обратный звонок",
      other: "Другой вопрос",
    };
    return reasons[reason] || reason;
  };

  const form = new FormData();
  form.append("name", formData.name);
  form.append("phone", formData.phone);
  form.append(
    "message",
    `
    Причина: ${getReasonText(formData.reason)}
    Сообщение: ${formData.message || "—"}
  `,
  );
  form.append("_to", "ipzaidavs@gmail.com"); // ВАШ EMAIL
  form.append(
    "_subject",
    `Новая заявка с сайта - ${getReasonText(formData.reason)}`,
  );
  form.append("_replyto", formData.email || "no-reply@site.com");
  form.append("_template", "table");

  // Отправка через FormSubmit
  const response = await fetch(
    "https://formsubmit.co/ajax/ipzaidavs@gmail.com",
    {
      method: "POST",
      body: form,
    },
  );

  if (!response.ok) {
    throw new Error("Ошибка отправки");
  }

  return response.json();
};
