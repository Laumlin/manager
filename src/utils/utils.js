export default {
  formatDate(time) {
    if(!time) return
    const t = new Date(time)
    return t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
  }
}