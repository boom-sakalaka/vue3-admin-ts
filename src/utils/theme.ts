/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author: GZH
 * @Date: 2021-12-19 18:05:43
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 15:45:31
 * @FilePath: \vue3-admin-ts\src\utils\theme.ts
 * @Description: 生成主题色样式表相关
 */
import formula from '@/constant/formula.json'
import rgbHex from 'rgb-hex'
import axios from 'axios'
const color = require('css-color-function')
// import color from 'css-color-function'

/**
 * 生成的样式表写入到style中
 */
export const writeNewStyle = (newStyle: string): void => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

/**
 * 根据主题色，生成最新的样式表
 */
export const generateNewStyle = async (parimaryColor: string): Promise<string> => {
  // 根据主色生成值表
  const colors = genenrateColor(parimaryColor)
  // 获取当前element-plus 的默认样式表，并且把需要替换的色值打上标记
  let csstext = await getOriginStyle()
  // console.log(csstext)
  // 遍历 生成的色值表，进行全局替换
  Object.keys(colors).forEach((key) => {
    csstext = csstext.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
  })

  return csstext
}

/**
 * 根据主色生成值表
 * */
export const genenrateColor = (primary: string): any => {
  if (!primary) return
  const colors = {
    primary
  }

  Object.keys(formula).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = formula[key].replace(/primary/g, primary)
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors
}

/**
 * 获取当前element-plus 的默认样式表
 */
export const getOriginStyle = async (): Promise<any> => {
  // https://unpkg.com/element-plus@1.1.0-beta.19/dist/index.css
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

/**
 * 把需要进行替换的色值打上标记
 */
const getStyleTemplate = (data: any) => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  Object.keys(colorMap).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
