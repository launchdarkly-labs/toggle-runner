/**
 *  Lesson 2: Dark mode feature
 *
 *  Usage:
 *    const darkMode = new DarkMode;
 *    darkMode.setFeatureEnabled(isFeatureEnabled); // turns on dark mode button
 **/
function DarkMode() {
  const buttonLabel = this.isDarkModeOn() ? 'Light mode' : 'Dark mode'

  this.body = document.getElementsByTagName('body')[0]
  this.button = document.createElement('button')
  this.button.id = 'dark-mode'
  this.button.appendChild(document.createTextNode(buttonLabel))

  this.button.addEventListener('click', this.toggle.bind(this))

  this.controls = document.createElement('div')
  this.controls.id = 'controls'
  this.controls.appendChild(this.button)

  this.setDarkModeOn(this.isDarkModeOn())
}

DarkMode.prototype.isDarkModeOn = function () {
  return localStorage.getItem('dark-mode') == 'true'
}

DarkMode.prototype.setFeatureEnabled = function (isFeatureEnabled) {
  if (isFeatureEnabled) {
    this.body.insertBefore(this.controls, document.getElementById('resources'))
  } else {
    this.body.contains(this.controls)
      ? this.body.removeChild(this.controls)
      : null
    this.setDarkModeOn(false)
  }
}

DarkMode.prototype.toggle = function () {
  this.setDarkModeOn(!this.isDarkModeOn())
}

DarkMode.prototype.setDarkModeOn = function (isDarkModeOn) {
  if (isDarkModeOn) {
    this.body.classList.add('dark-mode')
    this.button.innerHTML = 'Light mode'
    localStorage.setItem('dark-mode', true)
  } else {
    this.body.classList.remove('dark-mode')
    this.button.innerHTML = 'Dark mode'
    localStorage.setItem('dark-mode', false)
  }
}
