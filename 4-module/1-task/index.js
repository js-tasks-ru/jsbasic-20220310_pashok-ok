function makeFriendsList(friends) {
  let table = document.createElement('ul');
  
  for (val of friends) {
    let string = document.createElement('li');
    string.innerHTML(`${val.firstName} ${val.lastName}`);
    table.appendChild(string);
  }
  return table;
}

console.log(friends([
  {
    firstName: 'Artsiom',
    lastName: 'Mezin'
  },
  {
    firstName: 'Ilia',
    lastName: 'Kantor'
  },
  {
    firstName: 'Christopher',
    lastName: 'Michael'
  }
]))