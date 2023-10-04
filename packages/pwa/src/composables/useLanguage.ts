// const loadMessages = async ()
import { useI18n } from 'vue-i18n'

export default () => {
  const { locale, t } = useI18n()

  console.log(t('hello'))

  return {
    locale,
  }
}
