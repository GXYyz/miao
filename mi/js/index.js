const budsTab = document.querySelector('#budsTab')
const watchsTab = document.querySelector('#watchsTab')

const buds = document.querySelector('#buds')
const watchs = document.querySelector('#watchs')

budsTab.addEventListener('mouseenter', (e) => {
  e.target.className = 'active'
  watchsTab.className = ''

  buds.style.display = 'flex'
  watchs.style.display = 'none'
})
watchsTab.addEventListener('mouseenter', (e) => {
  e.target.className = 'active'
  budsTab.className = ''

  buds.style.display = 'none'
  watchs.style.display = 'flex'
})
