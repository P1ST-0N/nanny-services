export const calcAge = (birthDate) => {
  const birthYear = birthDate.getUTCFullYear();
  const birthMonth = birthDate.getUTCMonth();
  const birthDay = birthDate.getUTCDate();

  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth();
  const currentDay = currentDate.getUTCDate();

  let age = currentYear - birthYear;

  if (currentMonth === birthMonth && currentDay < birthDay) {
    age -= 1;
  } else if (currentMonth < birthMonth) {
    age -= 1;
  }
  return age;
};
