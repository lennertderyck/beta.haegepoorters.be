import { FC, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    amount?: number;
};

const RenderTimes: FC<Props> = ({ children, amount = 3 }) => {
    return (
        <>
            {[...Array(amount)].map(() => children)}
        </>
    )
}

export default RenderTimes