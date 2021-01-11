import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
export default {
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.dispatch('app/ToggleDevice', 'desktop')
          $store.dispatch('app/setSidebar', false)
          break
        case DEVICE_TYPE.TABLET:
          $store.dispatch('app/ToggleDevice', 'tablet')
          $store.dispatch('app/setSidebar', true)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.dispatch('app/ToggleDevice', 'mobile')
          $store.dispatch('app/setSidebar', false)
          break
      }
    })
  }
}
