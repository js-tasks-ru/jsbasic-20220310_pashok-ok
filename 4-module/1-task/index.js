function makeFriendsList(friends) {
  let ul = document.createElement('ul');    
  ul.innerHTML = friends.map(val =>
    `<li>${val.firstName} ${val.lastName}</li>`).join('') ;
  return ul;
}

