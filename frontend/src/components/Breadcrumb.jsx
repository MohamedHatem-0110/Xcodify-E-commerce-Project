import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  // Split the pathname to get each part of the path
  const paths = location.pathname.split("/").filter((path) => path !== "");
  const finalPath = paths[paths.length - 1];

  return (
    <div className="mx-10 my-5">
      {paths.length > 0 && (
        <Link to={`/`} className="uppercase">
          HOME{" > "}
        </Link>
      )}
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {path !== "/" && (
            <Link to={`/${path}`} className="uppercase">
              {path}
            </Link>
          )}
          {index < paths.length - 1 && " > "}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumb;
