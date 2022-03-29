function toggleText() {
  text = document.getElementById('text');
  btn = document.querySelector('.toggle-text-button');  
  btn.onclick = function() {
    text.hidden === true ? text.hidden = false: text.hidden = true;
  };
}