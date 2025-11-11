import React, { useState, createContext, useContext } from 'react';

const RouterContext = createContext();

export const BrowserRouter = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('/home');
  const [params, setParams] = useState({});

  const navigate = (path, routeParams = {}) => {
    setCurrentRoute(path);
    setParams(routeParams);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within BrowserRouter');
  }
  return context;
};

export const useParams = () => {
  const { params } = useRouter();
  return params;
};

export const Link = ({ to, params, children, className }) => {
  const { navigate } = useRouter();
  
  return (
    <a                    
      href={to}           
      onClick={(e) => {   
        e.preventDefault();
        navigate(to, params);
      }}
      className={className}
    >
      {children}
    </a>                  
  );
};

export const Routes = ({ children }) => {
  const { currentRoute } = useRouter();
  
  const routes = React.Children.toArray(children);
  const matchedRoute = routes.find((route) => {
    const path = route.props.path;
    if (path && path.includes(':')) {
      const pathPattern = path.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pathPattern}$`);
      return regex.test(currentRoute);
    }
    return path === currentRoute;
  });
  
  return matchedRoute || null;
};

export const Route = ({ element }) => {
  return element;
};