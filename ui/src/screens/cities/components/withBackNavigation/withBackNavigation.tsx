import React from "react";

function withBackNavigation(WrappedPage) {
    return function (props) {
        const onNavigateBack = () => {
            props.history.goBack()
        }
        return (
            <div>
                <span className="back-nav__arrow" onClick={onNavigateBack} >{"<"}</span>
                <WrappedPage {...props} />
            </div>
        )
    }
}
export default withBackNavigation