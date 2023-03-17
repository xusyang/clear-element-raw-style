import fse from 'fs-extra'
import prettier from 'prettier'
import { globSync } from 'glob'

function format(cont: string) {
  return prettier.format(cont, { parser: 'css' })
}

export function clearElementRawClass(content: string) {
  const regex = /([\r\n]*|.*)\.el-[^\{]+\s*\{[^\}]*\}/g
  return format(content.replace(regex, ''))
}

/**
 * 删除 d-el-icon 的类
 * @param content
 * @returns
 */
export function clearElementTopClass(content: string) {
  const regex = /(\n|\r)\.d-el-icon\s*{[^}]*}/g
  return format(content.replace(regex, ''))
}

export function isContainElementClass(content: string) {
  return content.includes('.el-')
}

export function rewriteCss(filepath: string) {
  let cont = fse.readFileSync(filepath, 'utf-8')
  cont = format(cont)
  cont = clearElementRawClass(cont)
  cont = clearElementTopClass(cont)
  fse.writeFileSync(filepath, cont, 'utf-8')
  return isContainElementClass(cont)
}

export function clear(dir: string) {
  const result: boolean[] = []
  const paths = globSync(`${dir}/**/*.css`, {
    windowsPathsNoEscape: true,
  })
  paths.forEach((path) => {
    result.push(rewriteCss(path))
  })
  return result.every((x: boolean) => !x)
}
