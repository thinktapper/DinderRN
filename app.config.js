const IS_DEV = process.env.APP_VARIANT === 'development'

export default {
  name: IS_DEV ? 'Dinder (Dev)' : 'Dinder',
  slug: 'dinder',
  ios: {
    bundleIdentifier: IS_DEV ? 'com.dinder.dev' : 'com.thinktapper.dinder',
  },
  android: {
    package: IS_DEV ? 'com.dinder.dev' : 'com.thinktapper.dinder',
  },
  extra: {
    eas: {
      projectId: '9a8d4dc4-0f50-49bf-a432-cb0540b72035',
    },
  },
}
