import makeReducerHookPersist from 'utils/makeReducerHookPersist'

import config from '../../config.json'

const defaultSettings = {
  width: config.size.default.width,
  height: config.size.default.height,
  speed: config.speed.default,
}

export default makeReducerHookPersist('store:settings', defaultSettings)
