import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBreadcrumb } from '../providers/breadcrumbProvider';
function Breadcrumb() {
  const { breadcrumbs } = useBreadcrumb();
  const location = useLocation();

  // Split the pathname to get each part of the path
  const paths = location.pathname.split('/').filter((path) => path !== '');
  // Create breadcrumbs array by combining default route and custom updates
  const mergedBreadcrumbs = breadcrumbs.length
    ? [...paths.slice(0, paths.length - 1), breadcrumbs]
    : paths;
  return (
    paths.length > 0 && (
      <div className="w-100% mt-14 p-2 bg-gray-200">
        <Link to={'/'} className="uppercase">
          HOME {' > '}
        </Link>

        {mergedBreadcrumbs.map((path, index) => (
          <React.Fragment key={index}>
            {path !== '/' && (
              <Link to={`/${path}`} className="uppercase">
                {path}
              </Link>
            )}
            {index < mergedBreadcrumbs.length - 1 && ' > '}
          </React.Fragment>
        ))}
      </div>
    )
  );
}

export default Breadcrumb;
