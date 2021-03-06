import React from "react";
import { Route } from "react-router-dom";
function PrimaryLayout({ component: Component, role, ...props }) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <div style={{ paddingTop: "24px" }} className="main">
            <Component {...routerProps} />
          </div>
        </>
      )}
    />
  );
}

export default PrimaryLayout;
