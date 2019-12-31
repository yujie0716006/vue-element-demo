const statueBtn = (val) => {
  const statusObj = {
    '1': 'success',
    '0': 'warning',
    '-1': 'error'
  }
  return statusObj[val]
}
console.log('statueBtn(1)', statueBtn('-1'))
