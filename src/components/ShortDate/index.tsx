

export const ShortDate = ({ time }) => {
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