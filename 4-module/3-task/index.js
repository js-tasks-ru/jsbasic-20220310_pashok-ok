function highlight(table) {
   
  for (i = 1; i < table.childNodes[3].childNodes.length;) {
    let row = table.childNodes[3].childNodes[i];
        
    if (row.childNodes[7].getAttribute('data-available') === 'true') {
      row.classList.add("available");
    } else if (row.childNodes[7].getAttribute('data-available') === 'false') {
      row.classList.add("unavailable") ;     
    } else {
      
      row.hidden = true;      
    }

    if (row.childNodes[5].innerHTML === "m") {
      row.className += " male";
    } else if (row.childNodes[5].innerHTML === "f") {
      row.className += " female";
    }

  
    
    
    if (row.childNodes[3].innerHTML < 18) {
      row.style.textDecoration = 'line-through';
    }

    i += 2;
  }
}
