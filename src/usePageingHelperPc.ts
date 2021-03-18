/*
 * @Author: sweet
 * @Date: 2021-03-18 11:40:42
 * @LastEditors: sweet
 * @LastEditTime: 2021-03-18 11:42:30
 * @Description: file content
 */

import { useState } from 'react'

export const usePagingHelper = <T>(paramLimit: number, paramOffset: number) => {
  const [offset, setOffset] = useState<number>(paramOffset)  // 起始的位置
  const [limit] = useState<number>(paramLimit)  // 每一页的长度
  const [count, setCount] = useState<number>(0)  // 总数据的长度
  const [currentPage, setCurrentPage] = useState<number>(0)  // 当前的页数
  const [allData, setAllData] = useState<T[]>([])  // 假分页时的总数据
  const [currentPageData, setCurrentPageData] = useState<T[]>([])  // 当前分页下的数据

  const canPageUp = (): boolean => { // 是否可以向上翻页
    return currentPage > 0
  }

  const canPageDown = (): boolean => { // 是否可以向后翻页
    return offset + limit < count
  }

  /**
   * 假分页时可以传入data， 真分页时不要传
   */
  const setDataSource = (allData: T[]) => {
    setAllData(allData)
    setCount(allData.length)
    setCurrentPageData(allData.slice(offset, offset + limit))
  }

  const pageUp = (): T[] => { // 上一页
    if (canPageUp()) {
      let end = offset
      let start = offset - limit
      setCurrentPageData(allData.slice(start, end))
      setCurrentPage(currentPage - 1)
      setOffset(start)
    }
    return currentPageData
  }

  const pageDown = (): T[] => { // 下一页
    if (canPageDown()) {
      setCurrentPage(currentPage + 1)
      setOffset(offset + limit)
      setCurrentPageData(allData.slice(offset, offset + limit))
    }
    return currentPageData
  }

  const jumpTo = (pageNum: number): T[] => { // 跳转到某一页
    if (pageNum > count / limit ) {
      throw new Error("超出了跳转最大页数");
    }
    setCurrentPage(pageNum)
    setOffset((pageNum - 1) * limit)
    setCurrentPageData(allData.slice(offset, offset + limit))
    return currentPageData
  }

  return {
    offset,
    limit,
    count,
    currentPage,
    allData,
    currentPageData,
    setDataSource,
    setCount,
    canPageUp,
    canPageDown,
    pageUp,
    pageDown,
    jumpTo
  }
}