import Vue from 'vue'
Vue.directive('show-word-limit', {
  inserted: function (el) {
    const parentElement = el.parentElement
    const input = parentElement.querySelector('input') || parentElement.querySelector('textarea')
    const maxLength = input.getAttribute('maxlength')
    const nowLength = input.value.length
    const limitLength = document.createElement('span')
    limitLength.setAttribute('class', 'show-word-limit')
    parentElement.style.position = 'relative'
    limitLength.innerText = `${nowLength}/${maxLength}`
    parentElement.appendChild(limitLength)
  },
  update: function (el) {
    const parentElement = el.parentElement
    const input = parentElement.querySelector('input') || parentElement.querySelector('textarea')
    const maxLength = input.getAttribute('maxlength')
    const nowLength = input.value.length
    const limitLength = parentElement.querySelector('.show-word-limit')
    limitLength.innerText = `${nowLength}/${maxLength}`
  }
})
