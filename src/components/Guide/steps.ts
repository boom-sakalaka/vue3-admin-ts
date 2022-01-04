/*
 * @Author: GZH
 * @Date: 2021-12-26 20:41:15
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-04 21:55:13
 * @FilePath: \vue3-admin-ts\src\components\Guide\steps.ts
 * @Description:
 */
interface IPopover {
  title: string
  description: string
  position: string
}
interface IStep {
  element: string
  popover: IPopover
}
const steps = (i18n: { t: (arg0: string) => any }): IStep[] => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: i18n.t('msg.guide.guideTitle'),
        description: i18n.t('msg.guide.guideDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18n.t('msg.guide.hamburgerTitle'),
        description: i18n.t('msg.guide.hamburgerDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: i18n.t('msg.guide.breadcrumbTitle'),
        description: i18n.t('msg.guide.breadcrumbDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18n.t('msg.guide.searchTitle'),
        description: i18n.t('msg.guide.searchDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18n.t('msg.guide.fullTitle'),
        description: i18n.t('msg.guide.fullDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: i18n.t('msg.guide.themeTitle'),
        description: i18n.t('msg.guide.themeDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18n.t('msg.guide.langTitle'),
        description: i18n.t('msg.guide.langDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: i18n.t('msg.guide.tagTitle'),
        description: i18n.t('msg.guide.tagDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18n.t('msg.guide.sidebarTitle'),
        description: i18n.t('msg.guide.sidebarDesc'),
        position: 'right-center'
      }
    }
  ]
}

export default steps
