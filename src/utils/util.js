import { default as Backendless } from 'backendless'

const util = {
  /**
   * 时间工具
   */
  dateTools: {
    /**
     * 按指定字符串格式化时间戳
     * @param fmt
     * @returns {*}
     */
    formatTimestamp(date, fmt) { // author: meizz
      date = new Date(date)
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    /**
     * 取当天开始的时间戳
     * @param date
     * @returns {*|number}
     */
    getStartTimestampOfDay(date) {
      date = new Date(date)
      date = date.setHours(0, 0, 0, 0)
      return date - 1
    },
    /**
     * 取当天开始的时间
     * @param date
     * @returns {*|number}
     */
    getStartTimeOfDay(date, fmt) {
      date = new Date(date)
      date = date.setHours(0, 0, 0, 0)
      return util.dateTools.formatTimestamp(date, fmt)
    },
    /**
     * 取当天结束的时间戳
     * @param date
     * @returns {*|number}
     */
    getEndTimestampOfDay(date) {
      date = new Date(date)
      date = date.setHours(23, 59, 59, 999)
      return date
    },
    /**
     * 取当天结束的时间
     * @param date
     * @returns {*|number}
     */
    getEndTimeOfDay(date, fmt) {
      date = new Date(date)
      date = date.setHours(23, 59, 59, 999)
      return util.dateTools.formatTimestamp(date, fmt)
    },
    /**
     * 取当月开始的时间戳
     * @param date
     * @returns {*|number}
     */
    getStartTimestampOfMonth(date) {
      date = new Date(date)
      date = new Date(date.setDate(1))
      date = date.setHours(0, 0, 0, 0)
      return date - 1
    },
    /**
     * 取当月开始的时间
     * @param date
     * @returns {*|number}
     */
    getStartTimeOfMonth(date, fmt) {
      date = new Date(date)
      date = new Date(date.setDate(1))
      date = date.setHours(0, 0, 0, 0)
      return util.dateTools.formatTimestamp(date, fmt)
    },
    /**
     * 取当月结束的时间戳
     * @param date
     * @returns {number}
     */
    getEndTimestampOfMonth(date) {
      date = new Date(date)
      date = new Date(util.dateTools.getNextMonth(date))
      date = new Date(date.setDate(1))
      date = util.dateTools.getStartTimestampOfMonth(date)
      return date
    },
    /**
     * 取当月结束的时间
     * @param date
     * @returns {number}
     */
    getEndTimeOfMonth(date, fmt) {
      date = new Date(date)
      date = new Date(util.dateTools.getNextMonth(date))
      date = new Date(date.setDate(1))
      date = util.dateTools.getStartTimestampOfMonth(date)
      return util.dateTools.formatTimestamp(date, fmt)
    },
    /**
     * 取当年开始的时间戳
     * @param date
     */
    getStartTimestampOfYear(date) {
      date = new Date(date)
      date = new Date(date.setMonth(0, 1))
      date = date.setHours(0, 0, 0, 0)
      return date - 1
    },
    /**
     * 取当年结束的时间戳
     * @param date
     */
    getEndTimestampOfYear(date) {
      date = new Date(date)
      date = new Date(date.setMonth(11, 31))
      date = date.setHours(23, 59, 59, 999)
      return date
    },
    /**
     * 取下个月的当前时间
     * @param date
     * @returns {Date}
     */
    getNextMonth(date) {
      var d = new Date(date)
      var year = d.getFullYear()
      var month = d.getMonth()
      if (month === 11) {
        month = 0
        year++
      } else {
        month++
      }
      d = new Date(d.setMonth(month))
      d = d.setFullYear(year)
      return d
    },
    /**
     * 取当前年
     * @param date
     * @returns {number}
     */
    getYearOfTimestamp(date) {
      var d = new Date(date)
      return d.getFullYear()
    },
    /**
     * 取当前年
     * @param date
     * @returns {number}
     */
    getDayOfTimestamp(date) {
      var d = new Date(date)
      return d.getDate()
    },
    /**
     * 取当前月份
     * @param date
     * @returns {number}
     */
    getMonthOfTimestamp(date) {
      var d = new Date(date)
      return d.getMonth() + 1
    },
    /**
     * 取一天开始时间
     * @param date
     * @returns {number}
     */
    formatTimeStart(date) { // author: SZD
      const d1 = new Date(date)
      d1.setHours(0, 0, 0, 0)
      return d1.getTime()
    },
    /**
     * 取一天结束时间
     * @param date
     * @returns {number}
     */
    formatTimeEnd(date) { // author: SZD
      const d2 = new Date(date)
      d2.setHours(23, 59, 59, 999)
      return d2.getTime()
    }
  },
  /**
   * 数字工具
   */
  numberTools: {
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    formatNumberLen(num, len) {
      num = num.toString()
      if (num.length < len) {
        var p = ''
        for (let i = 0; i < len - num.length; i++) {
          p += '0'
        }
        return p + num
      }
      return num
    },
    padleft(str, pad) {
      pad = pad || '00000'
      return pad.substring(0, pad.length - str.length) + str
    },
    createRandomNum() {
      return Math.ceil(Math.random() * 9999)
    },
    /**
     * N位随机数
     * @param num
     * @returns {number}
     */
    getRandomNum(num) {
      var rand = ''
      for (var i = 0; i < num; i++) {
        var r = Math.floor(Math.random() * 10)
        rand += r
      }
      return rand
    }
  },
  /**
   * 验证工具
   */
  regularTools: {
    /**
     * 是否是手机号
     * @param str
     * @returns {boolean}
     */
    isPhone(str) {
      return (str.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(str))
    },
    /**
     * 是否是Email
     * @param str
     * @returns {boolean}
     */
    isEmail(str) {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      return reg.test(str)
    },
    isRealNum(val) {
      // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
      if (val === '' || val == null) {
        return false
      }
      if (!isNaN(val)) {
        return true
      } else {
        return false
      }
    }
  },
  /**
   * 数组工具
   */
  arrayTools: {
    /**
     * 数组本身去重
     * @param a
     * @returns {Array}
     */
    getUnique(a) {
      var r = []
      for (let i = 0; i < a.length; i++) {
        var flag = true
        var temp = a[i]
        for (let j = 0; j < r.length; j++) {
          if (temp instanceof Object && r[j] instanceof Object) {
            if (temp.pk !== undefined && r[j].pk !== undefined) {
              if (temp.pk === r[j].pk) {
                flag = false
                break
              }
            }
          } else if (temp === r[j]) {
            flag = false
            break
          }
        }
        if (flag) {
          r.push(temp)
        }
      }
      return r
    },
    /**
     * 取两个数组交集
     * @param a
     * @param b
     * @returns {*|Array}
     */
    intersectArray(a, b) { // 交集
      var result = []
      for (var i = 0; i < b.length; i++) {
        var temp = b[i]
        for (var j = 0; j < a.length; j++) {
          if (temp === a[j]) {
            result.push(temp)
            break
          }
        }
      }
      return util.arrayTools.getUnique(result)
    },
    /**
     * 取两个数组并集
     * @param a
     * @param b
     * @returns {*|Array}
     */
    mergeArray(a, b) {
      return util.arrayTools.getUnique(a.concat(b))
    },
    /**
     * 取 in 条件所使用的字符串
     * @param arr
     * @returns {*}
     */
    getInStringOfObjectId(arr) {
      if (!arr.length) {
        return false
      }
      let str = '('
      for (const x in arr) {
        str += `'` + arr[x].objectId + `',`
      }
      str = str.substr(0, str.length - 1)
      str += ')'
      return str
    }
  },
  /**
   * 对象工具
   */
  objectTools: {
    /**
     * 深拷贝对象
     * @param obj
     */
    deepCopyObject(obj) {
      const s = window.JSON.stringify(obj)
      return window.JSON.parse(s)
    },
    deepCopyObjectWithoutJson(origin) {
      const originProto = window.Object.getPrototypeOf(origin)
      return window.Object.assign(window.Object.create(originProto), origin)
    },
    assignObject(target, source) {
      const originProto = window.Object.getPrototypeOf(source)
      const obj = window.Object.assign(window.Object.create(originProto), source)
      return window.Object.assign(target, obj)
    }
  },
  /**
   * 编号工具
   * */
  codeTools: {
    /**
     * 项目编号工具方法
     * */
    getNewProjectCode() {
      const CITY_CODE = 'SY'
      try {
        const project = Backendless.Data.of('Project').findLastSync({})
        if (project) {
          let no = project.projectNo.match(/(\d+)/)
          if (no && no[0]) {
            no = no[0] * 1
          } else {
            no = 0
          }
          return CITY_CODE + util.numberTools.padleft((no + 1).toString(), '000')
        } else {
          return CITY_CODE + '001'
        }
      } catch (error) {
        if (error.statusCode === 404) {
          return CITY_CODE + '001'
        }
      }
      throw new Error('获取新的项目编号异常')
    },
    getNewAreaCode() {
      const CITY_CODE = 'SY'
      const AREA_CODE = 'A'
      try {
        const last = Backendless.Data.of('Area').findLastSync({})
        if (last) {
          let no = last.areaNo.match(/(\d+)/)
          if (no && no[0]) {
            no = no[0] * 1
          } else {
            no = 0
          }
          return CITY_CODE + AREA_CODE + util.numberTools.padleft((no + 1).toString(), '000')
        } else {
          return CITY_CODE + AREA_CODE + '001'
        }
      } catch (error) {
        if (error.statusCode === 404) {
          return CITY_CODE + AREA_CODE + '001'
        }
      }
      throw new Error('获取新的项目编号异常')
    }
  }
}
export default util
