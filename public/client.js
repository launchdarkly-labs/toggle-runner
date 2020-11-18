const ldclient = LDClient.initialize(
  window.LD_CLIENT_SIDE_ID,
  { anonymous: true, custom: { userAgent: navigator.userAgent } },
  { bootstrap: window.LD_FLAGS }
)

const CONFIG = {
  ACCELERATION: 0.001,
  BG_CLOUD_SPEED: 0.2,
  BOTTOM_PAD: 10,
  CLEAR_TIME: 3000,
  CLOUD_FREQUENCY: 0.5,
  GAMEOVER_CLEAR_TIME: 750,
  GAP_COEFFICIENT: 0.6,
  GRAVITY: 0.6,
  INITIAL_JUMP_VELOCITY: 12,
  INVERT_FADE_DURATION: 12000,
  INVERT_DISTANCE: 700,
  MAX_BLINK_COUNT: 3,
  MAX_CLOUDS: 6,
  MAX_OBSTACLE_LENGTH: 3,
  MAX_OBSTACLE_DUPLICATION: 2,
  MAX_SPEED: 13,
  MIN_JUMP_HEIGHT: 35,
  MOBILE_SPEED_COEFFICIENT: 1.2,
  RESOURCE_TEMPLATE_ID: 'audio-resources',
  SPEED: 6,
  SPEED_DROP_COEFFICIENT: 3,
}

// Run game
new Runner('.interstitial-wrapper', CONFIG)

// Dark mode feature
const darkMode = new DarkMode()

// When LD client is ready, evaluate flags
ldclient.on('ready', function () {
  // This callback receives no arguments...
  // So we need to call `variation` to fetch the flag value
  darkMode.setFeatureEnabled(ldclient.variation('dark-mode', false))
})

// Respond to flag changes in real-time
ldclient.on('change:dark-mode', function (isFeatureEnabled) {
  darkMode.setFeatureEnabled(isFeatureEnabled)
})
