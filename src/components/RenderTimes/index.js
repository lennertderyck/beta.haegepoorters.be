const RenderTimes = ({ children, amount = 3 }) => [...Array(amount)].map(i => children)

export default RenderTimes