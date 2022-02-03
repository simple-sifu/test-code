function ShowDialog(display: boolean) {
  const element = document.querySelector('.ConsentManager');
  if (element) {
    if (display) {
      element.classList.remove('hide');
    } else {
      element.classList.add('hide');
    }
  }
}

export default ShowDialog;
