localStorage.getItem('config') == 'undefined' || localStorage.getItem('config') == null ? localStorage.setItem('config', JSON.stringify(configDefault)) : null;
var config = JSON.parse(localStorage.getItem('config'));
console.log('Welcome to azhimn/new-tab version ' + config.ver + '!');

window.onload = function styleInit() {
  let style = document.documentElement.style;
  let configStyle = config.config.style;
  let greet = document.getElementById('greet');

  style.setProperty('--color-background', configStyle.background);
  style.setProperty('--color-primary', configStyle.primary);
  style.setProperty('--color-mute', configStyle.mute);
  greet.innerHTML = config.config.style.greet;
}

function search(event) {
  const search = document.getElementById('search');

  if (event.key == 'Enter') {
    search.value.charAt(0) == '!' ? searchCommand(search.value) : searchEngine(search.value);
  }
}


function searchEngine(searchValue) {
  const domainRegex = /^([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}$/;
  const urlRegex = /^(http|https|ftp|file):\/\/[^\s/$.?#].[^\s]*$/i;

  if (searchValue.charAt(0) == '!') {
  } else if (domainRegex.test(searchValue)) {
    window.location.href = "https://" + searchValue;
  } else if (urlRegex.test(searchValue)) {
    window.location.href = searchValue;
  } else {
    let activeEngine = config.config.engine.active;
    let searchEngine = config.config.engine[activeEngine];

    window.location.href = searchEngine + searchValue;
  }
}

function searchCommand(searchValue) {
  const prefix = searchValue.indexOf('!');
  const space = searchValue.indexOf(' ');
  let command, param;

  if (space == -1) {
    command = searchValue.substring(prefix + 1);
  } else {
    command = searchValue.substring(prefix + 1, space);
    param = searchValue.substring(space + 1);
  }

  if (command == config.config.command) {
    // wip
  } else {
    searchWeb(command, param);
  }
}

function searchWeb(command, param) {
  const url = config.web[command].url;
  const search = config.web[command].param.search;

  if (search.charAt(0) == '/') {
    param ? window.location.href = url + search + param : window.location.href = config.web[command].url;
  } else {
    param ? window.location.href = search + param : window.location.href = config.web[command].url;
  }
}
