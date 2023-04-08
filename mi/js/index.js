let pushGoods1 = document.querySelector('#pushGoods1')
let navGood2 = document.querySelector('#navGood2')
let navGood3 = document.querySelector('#navGood3')
let navGood4 = document.querySelector('#navGood4')
let navGood5 = document.querySelector('#navGood5')
let navGood6 = document.querySelector('#navGood6')
let navGood7 = document.querySelector('#navGood7')

navGood1.addEventListener('mouseenter', visible)
navGood1.addEventListener('mouseleave', hidden)

navGood2.addEventListener('mouseenter', visible)
navGood2.addEventListener('mouseleave', hidden)

navGood3.addEventListener('mouseenter', visible)
navGood3.addEventListener('mouseleave', hidden)

navGood4.addEventListener('mouseenter', visible)
navGood4.addEventListener('mouseleave', hidden)

navGood5.addEventListener('mouseenter', visible)
navGood5.addEventListener('mouseleave', hidden)

navGood6.addEventListener('mouseenter', visible)
navGood6.addEventListener('mouseleave', hidden)

navGood7.addEventListener('mouseenter', visible)
navGood7.addEventListener('mouseleave', hidden)

function visible() {
  pushGoods1.style.visibility = 'visible'
}
function hidden() {
  pushGoods1.style.visibility = 'hidden'
}
