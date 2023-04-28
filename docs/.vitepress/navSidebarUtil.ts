/**
 * 这是侧栏和导航自动动态生成配置文件
 */
import path from 'path'
import { readdirSync, statSync } from 'fs'

/**
 * 判断是否为markdown文件
 *
 * @param   {string}  fileName  文件名
 *
 * @return  {[boolean]}         有返回值则表示是markdown文件,否则不是
 */
function isMarkdownFile(fileName: string) {
  return fileName.match(/.+\.md$/)
}

/**
 * 这是动态侧栏配置
 */
interface SidebarGenerateConfig {
  /**
   * 需要遍历的目录. 默认:articles
   */
  dirName?: string
  /**
   * 忽略的文件名. 默认: index.md
   */
  ignoreFileName?: string
  /**
   * 忽略的文件夹名称. 默认: ['demo','asserts']
   */
  ignoreDirNames?: string[]
}

export function getSidebar() {
  let result = {}
  const dirNames = ['articles', 'blog', 'guide']
  dirNames.forEach(function (item) {
    result = Object.assign(result, getSidebarData({ dirName: item }))
  })
  return result
}
function getSidebarData(sidebarGenerateConfig: SidebarGenerateConfig = {}) {
  const {
    dirName,
    // dirName = 'articles',
    ignoreFileName = 'index.md',
    ignoreDirNames = ['demo', 'asserts']
  } = sidebarGenerateConfig
  // 获取目录的绝对路径
  const dirFullPath = path.resolve(__dirname, `../${dirName}`)
  const allDirAndFileNameArr = readdirSync(dirFullPath)
  const obj = {}
  allDirAndFileNameArr.map(dirName => {
    let subDirFullName = path.join(dirFullPath, dirName)
    const property = subDirFullName.split('docs')[1].replace(/\\/g, '/') + '/'
    const arr = getSideBarItemTreeData(
      subDirFullName,
      1,
      2,
      ignoreFileName,
      ignoreDirNames
    )
    obj[property] = arr
  })
  return obj
}

interface SideBarItem {
  text: string
  collapsible?: boolean
  collapsed?: boolean
  items?: SideBarItem[]
  link?: string
}
function getSideBarItemTreeData(
  dirFullPath: string,
  level: number,
  maxLevel: number,
  ignoreFileName: string,
  ignoreDirNames: string[]
): SideBarItem[] {
  // 获取所有文件名和目录名
  const allDirAndFileNameArr = readdirSync(dirFullPath)
  const result: SideBarItem[] = []
  allDirAndFileNameArr.map((fileOrDirName: string, idx: number) => {
    const fileOrDirFullPath = path.join(dirFullPath, fileOrDirName)
    const stats = statSync(fileOrDirFullPath)
    if (stats.isDirectory()) {
      if (!ignoreDirNames.includes(fileOrDirName)) {
        // 当前为文件夹
        const dirData: SideBarItem = {
          text: fileOrDirName,
          collapsed: false
        }
        if (level !== maxLevel) {
          dirData.items = getSideBarItemTreeData(
            fileOrDirFullPath,
            level + 1,
            maxLevel,
            ignoreFileName,
            ignoreDirNames
          )
        }
        if (dirData.items) {
          dirData.collapsible = true
        }
        result.push(dirData)
      }
    } else if (
      isMarkdownFile(fileOrDirName) &&
      ignoreFileName !== fileOrDirName
    ) {
      // 当前为文件
      const matchResult = fileOrDirName.match(/(.+)\.md/)
      const text = matchResult ? matchResult[1] : fileOrDirName
      const fileData: SideBarItem = {
        text,
        link: fileOrDirFullPath
          .split('docs')[1]
          .replace('.md', '')
          .replace(/\\/g, '/')
      }
      result.push(fileData)
    }
  })
  return result
}

/**
 * 这是动态导航设置
 */
interface NavGenerateConfig {
  /**
   * 是否启用路由匹配显示激活状态. 默认:false
   */
  enableDirActiveMatch: boolean
  /**
   * 需要遍历的目录. 默认:articles
   */
  dirName?: string
  /**
   * 最大遍历层级. 默认:1
   */
  maxLevel?: number
}

export function getNavData(navGenerateConfig: NavGenerateConfig) {
  // const { enableDirActiveMatch, dirName = 'articles', maxLevel = 1 } = navGenerateConfig
  const { enableDirActiveMatch, dirName, maxLevel = 1 } = navGenerateConfig
  const dirFullPath = path.resolve(__dirname, `../${dirName}`)
  const result = getNavDataArr(dirFullPath, 1, maxLevel, enableDirActiveMatch)
  //  console.log('navData')
  //  console.log(result)
  return result
}
// export type NavItem = NavItemWithLink | NavItemWithChildren

//   export interface NavItemWithLink {
//     text: string
//     link: string

//     /**
//      * `activeMatch` is expected to be a regex string. We can't use actual
//      * RegExp object here because it isn't serializable
//      */
//     activeMatch?: string
//     target?: string
//     rel?: string
//   }

//   export interface NavItemChildren {
//     text?: string
//     items: NavItemWithLink[]
//   }

//   export interface NavItemWithChildren {
//     text?: string
//     items: (NavItemChildren | NavItemWithLink)[]

//     /**
//      * `activeMatch` is expected to be a regex string. We can't use actual
//      * RegExp object here because it isn't serializable
//      */
//     activeMatch?: string
//   }

interface NavItem {
  text: string
  link: string
  activeMatch?: string
  children?: NavItem[]
}
// 将link?:string改为源码相同——link:string.link是否有未定义的情况呢？当且仅当配置中未忽略某一无md文件的文件夹名
// 应该控制这种情况不要发生
/**
 * 获取顶部导航数据
 *
 * @param   {string}     dirFullPath  当前需要遍历的目录绝对路径
 * @param   {number}     level        当前层级
 * @param   {number[]}   maxLevel     允许遍历的最大层级
 * @param   {boolean}    enableActiveMatch 是否启用路由匹配显示激活状态
 *
 * @return  {NavItem[]}               导航数据数组
 */
function getNavDataArr(
  dirFullPath: string,
  level: number,
  maxLevel: number,
  enableActiveMatch: boolean
): NavItem[] {
  // 获取所有文件名和目录名
  const allDirAndFileNameArr = readdirSync(dirFullPath)
  const result: NavItem[] = []
  allDirAndFileNameArr.map((fileOrDirName: string, idx: number) => {
    const fileOrDirFullPath = path.join(dirFullPath, fileOrDirName)
    const stats = statSync(fileOrDirFullPath)
    const link = fileOrDirFullPath
      .split('docs')[1]
      .replace('.md', '')
      .replace(/\\/g, '/')
    const text = fileOrDirName.match(/^[0-9]{2}-.+/)
      ? fileOrDirName.substring(3)
      : fileOrDirName
    if (stats.isDirectory()) {
      // 当前为文件夹
      const dirData: NavItem = {
        text,
        link: `${link}/`
      }
      if (level !== maxLevel) {
        dirData.children = getNavDataArr(
          fileOrDirFullPath,
          level + 1,
          maxLevel,
          enableActiveMatch
        )
      }
      if (enableActiveMatch) {
        dirData.activeMatch = link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/'
        //  dirData.activeMatch='/articles/AI相关/'
        // dirData.activeMatch = link.substring(1)
      }
      result.push(dirData)
    } else if (isMarkdownFile(fileOrDirName)) {
      // 当前为文件
      const fileData: NavItem = {
        text,
        link: link
      }
      if (enableActiveMatch) {
        fileData.activeMatch = link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/'
        // fileData.activeMatch='articles/AI相关'
        // fileData.activeMatch = link.substring(1)
        // fileData.activeMatch='articles/C++'
      }
      result.push(fileData)
    }
  })
  return result
}
/**
 * 记录一个正则表达式的坑，在赋值时，
 * 若开始是'/articles/AI相关/',则会形成 //articles/AI相关//
 * 因此要去掉头部和尾部反斜杠，只包含字符串内容即可
 * 具体机制有待研究。。。
 *
 */
/**
 * 上条bug错误，应该是C++字符串中的+问题，应该进行转义
 * 使用转义方法：replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
 * escapeRegExp("All of these should be escaped: \ ^ $ * + ? . ( ) | { } [ ]");
 * "All of these should be escaped: \\ \^ \$ \* \+ \? \. \( \) \| \{ \} \[ \] "
 */
/**
 * 记录项目新问题：动态生成的目录在项目构建时就已经将大纲定死
 * 若在项目构建后正在运行时进行文件夹改动，在侧栏不会随之变化
 * 除非重新构建项目
 */
