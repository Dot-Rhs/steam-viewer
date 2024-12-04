
interface IProps {
    time: number
}

export const ShortDate = ({ time }: IProps) => {
    const createdDate = new Date(time * 1000);

    return (
        <>
            {`${ createdDate.getDate() } ${ createdDate.toLocaleString("en-GB", {
                timeZone: "UTC",
                month: "short"
            }) } ${ createdDate.getFullYear() }`}
        </>
    )
}