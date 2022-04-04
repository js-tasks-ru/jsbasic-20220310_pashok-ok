function showSalary(users, age) {
  let resultStr = '';
  for (val of users) {
    if (val.age <= age) {
      resultStr += (`${val.name}, ${val.balance}\n`);      
    }

  }
  return resultStr.slice(0, resultStr.length - 1);
}
