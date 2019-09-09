const sortByProp = (arr, prop) => {
  return arr.sort((a, b) => {
    if (a[prop] < b[prop]) return 1
    if (a[prop] > b[prop]) return -1

    return 0
  })
}

export default sortByProp