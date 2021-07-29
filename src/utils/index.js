import classNames from "classnames";
// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from '../../tailwind.config.js'

export const className = (...params) => ({ className: classNames(params) });
// export const twConfig = resolveConfig(tailwindConfig);