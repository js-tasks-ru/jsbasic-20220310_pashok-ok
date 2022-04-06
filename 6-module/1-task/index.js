
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();              
  }  

  render() {
    const el = document.createElement('div');   

    const newRows = this.rows.map(item => {
      return `<tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.salary}</td>
        <td>${item.city}</td>
        <td><button>X</button></td>
      </tr>`;
    }).join('');

    const tableGrid = `      
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
        <tbody> 
        ${newRows}       
        </tbody>
      </table>`;

    el.innerHTML = tableGrid;      

    el.addEventListener('click', event => {
      if (event.target.tagName === 'BUTTON') {
        event.target.parentElement.parentElement.remove();
      }
    });  

    return el;  
  }    
}
