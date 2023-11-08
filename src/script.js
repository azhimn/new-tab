function search(event) {
  const search = document.getElementById('search');
  const greet = document.getElementById('greet');
  const style = getComputedStyle(document.body)
  let searchValue = search.value;
  let greetValue = greet.value;
  
  // console.log(greet.style['color'] = style.getPropertyValue('--color-font-muted'));

  if (event.key == 'Enter') {
    const domainRegex = /^([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}$/;
    const urlRegex = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  
    if (domainRegex.test(searchValue)) {
      window.location.href = "https://" + searchValue;
    } else if (urlRegex.test(searchValue)) {
      window.location.href = searchValue;
    } else {
      window.location.href = "https://duckduckgo.com/?q=" + searchValue;
    }
  }
}

