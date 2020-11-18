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

// Implements space-like features in game
function setSpaceMode(isSpaceModeOn) {
  console.log('Space mode:', isSpaceModeOn)
  if (isSpaceModeOn) {
    game.updateConfigSetting('GRAVITY', 0.3)
    game.updateConfigSetting('INVERT_DISTANCE', 0)
    game.updateConfigSetting('INVERT_FADE_DURATION', 1000)
    game.updateConfigSetting('MAX_CLOUDS', 1)
    game.updateConfigSetting('MAX_OBSTACLE_LENGTH', 6)
    game.updateConfigSetting('GAP_COEFFICIENT', 5)
  } else {
    game.updateConfigSetting('GRAVITY', CONFIG.GRAVITY)
    game.updateConfigSetting('INVERT_DISTANCE', CONFIG.INVERT_DISTANCE)
    game.updateConfigSetting(
      'INVERT_FADE_DURATION',
      CONFIG.INVERT_FADE_DURATION
    )
    game.updateConfigSetting('MAX_CLOUDS', CONFIG.MAX_CLOUDS)
    game.updateConfigSetting('MAX_OBSTACLE_LENGTH', CONFIG.MAX_OBSTACLE_LENGTH)
    game.updateConfigSetting('GAP_COEFFICIENT', CONFIG.GAP_COEFFICIENT)
  }
}

// Run game
const game = new Runner('.interstitial-wrapper', CONFIG)

// Dark mode feature
const darkMode = new DarkMode()

// When LD client is ready, evaluate flags
ldclient.on('ready', function () {
  // This callback receives no arguments...
  // So we need to call `variation` to fetch the flag value
  darkMode.setFeatureEnabled(ldclient.variation('dark-mode', false))

  // This has to be delayed until the game is ready... which is in the next tick
  setTimeout(() => setSpaceMode(ldclient.variation('space-mode', false)), 0)
})

// Respond to flag changes in real-time
ldclient.on('change:dark-mode', function (isFeatureEnabled) {
  darkMode.setFeatureEnabled(isFeatureEnabled)
})

ldclient.on('change:space-mode', setSpaceMode)
