import { eventCallback } from 'cutleryjs'
import { isOverflowing } from '.';

// const $tabs = document.querySelectorAll('.react-tabs .react-tabs__tab');

document.addEventListener('click', (ev) => {
    const target = ev.target.closest('.react-tabs .react-tabs__tab');
    if (target) target.scrollIntoView(false)
})

// document.addEventListener('scroll', (ev) => {
//     console.log(ev)
//     const target = ev.target.closest('react-tabs [role="tablist"]');
//     console.log('isOverflowing', isOverflowing(target))
// })