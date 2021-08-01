import classNames from "classnames";
// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from '../../tailwind.config.js'

export const className = (...params) => ({ className: classNames(params) });
export const sortActivitiesByDate = (
    { period: { start: a }}, 
    { period: { start: b }},
) => {
    return new Date(a) - new Date(b)
}