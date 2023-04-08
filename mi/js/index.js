let pushGoods1 = document.querySelector('#pushGoods1')
let navGood1 = document.querySelector('#navGood1')

navGood1.addEventListener('mouseenter', () => {
  pushGoods1.style.visibility = 'visible'
})
navGood1.addEventListener('mouseleave', () => {
  pushGoods1.style.visibility = 'hidden'
})
