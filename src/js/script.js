localStorage.getItem('config') == 'undefined' || localStorage.getItem('config') == null ? localStorage.setItem('config', JSON.stringify(configDefault)) : null;
var config = JSON.parse(localStorage.getItem('config'));
let greetTimeoutId;

console.log('Welcome to azhimn/new-tab version ' + config.version + '!');

function resetConfig() {
  localStorage.setItem('config', JSON.stringify(configDefault));
  return `Your saved config has been reset to currently installed new-tab config version.`;
}

function toggleVersionWarning() {
  config.versionWarning = !config.versionWarning;
  if (config.versionWarning) {
    return `Greet notification will now NOT be shown everytime you enter new-tab.`;
  }
  return `Greet notification will now BE shown everytime you enter new-tab.`;
}

function styleInit() {
  window.greet = document.getElementById('greet');
  window.style = document.documentElement.style;
  window.configStyle = config.config.style;

  style.setProperty('--color-background', configStyle.background);
  style.setProperty('--color-primary', configStyle.primary);
  style.setProperty('--color-accent', configStyle.accent);
  greet.innerHTML = config.config.greet;
}

window.onload = styleInit();

if (config.version != configDefault.version) {
  console.log(`Your new-tab config saved in Local Storage (${config.version}) has different version with current installed new-tab version (${configDefault.version}).`);
  console.log(`You may want to reset your current saved config in order for certain feature to work. See https://github.com/azhimn/new-tab for details.`);
  console.log(`Please type resetConfig() here to reset your saved config. (Changes made to new-tab config will be lost.)`);
  console.log(`Type toggleVersionWarning() here to disable this notification through Greet.`)
  if (config.versionWarning) {
    greetTimeout(`<code>Version issue detected, read console.</code>`);
  }
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
    searchConfig(param);
  } else if (command ==  'version') {
    greetTimeout(`Your <code>new-tab</code> version is <code>${config.version}</code>.`);
  } else if (!Object.keys(config.web).includes(command)) {
    greetTimeout(`Command <code>${command}</code> not found.`);
  } 
  else {
    searchWeb(command, param);
  }
}

function searchConfig(param) {
  if (!param) {
    greetTimeout(`Please specify the configuration option.`);
    return;
  }

  const configKeys = Object.keys(config.config);
  let configOption = param.split(' ');

  if (configKeys.includes(configOption[0])) {
    searchOption(configOption);
  } else {
    greetTimeout(`Option <code>${param}</code> not found.`);
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

function searchOption(configOption) {
  // Style
  if (configOption[0] == 'style') { 
    const entries = Object.entries(config.config.style); let choice;
    const keys = Object.keys(config.config.style);

    entries.forEach(element => {
      element.includes(configOption[1], 0) ? choice = configOption[1] : null;
    });

    if (!configOption[1]) {
      greetTimeout(`Please specify the property of <code>${configOption[0]}</code>.`);
      return;
    } else if (!keys.includes(configOption[1])) {
      greetTimeout(`Style property <code>${configOption[1]}</code> not found.`);
      return;
    } else if (!configOption[2]) {
      greetTimeout(`Please specify the value of <code>${configOption[1]}</code>.`);
      return;
    } else if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(configOption[2])) {
      greetTimeout(`Please input valid color hex value with prefix <code>#</code>.`);
      return;
    }
    config.config.style[configOption[1]] = configOption[2]
    greetTimeout(`<code>${configOption[2]}</code> has been set as <code>${configOption[1]}</code> color.`);
    styleInit();
    
  // Search Engine
  } else if (configOption[0] == 'engine') {
    const keys = Object.keys(config.config.engine);
    if (!configOption[1]) {
      greetTimeout(`Please specifiy the <code>${configOption[1]}</code> value.`);
      return
    } else if (!keys.includes(configOption[1])) {
      greetTimeout(`Search engine <code>${configOption[1]}</code> not found nor available.`);
      return
    }
    greetTimeout(`Search engine has been set to <code>${configOption[1]}</code>.`);
    config.config.engine.active = configOption[1];

  // Greet
  } else if (configOption[0] == 'greet') {
    if (!configOption[1]) {
      greetTimeout(`Please specifiy the <code>greet</code> value.`);
      return
    }
    let configOptionJoined = configOption.join(' ');
    let greetValue = configOptionJoined.substring(configOptionJoined.indexOf(' ') + 1);
    config.config.greet = greetValue;

    const configData = JSON.parse(localStorage.getItem('config'));
    configData.config.greet = greetValue;
    localStorage.setItem('config', JSON.stringify(configData));

    styleInit();
  }
}


function greetTimeout(text) {
  greet.innerHTML = text;

  if (greetTimeoutId) {
    clearTimeout(greetTimeoutId);
  }

  greetTimeoutId = setTimeout(() => {
    greet.innerHTML = config.config.greet;
    greetTimeoutId = null;
  }, 3000);
}
