import React from "react";

function withBackNavigation(WrappedPage) {
    return function (props) {
        const onNavigateBack = () => {
            props.history.goBack()
        }
        return (
            <div>
                <span onClick={onNavigateBack} >{"<"}</span>
                <WrappedPage {...props} />
            </div>
        )
    }
}
export default withBackNavigation