/*
 * @Author: Dad
 * @Date: 2021-03-16 18:03:23
 * @LastEditTime: 2021-03-27 10:08:48
 * @LastEditors: Dad
 * @Description: 
 */
import { Redirect, Route } from 'umi';

import React from 'react';
import Authorized from './Authorized';
import type { IAuthorityType } from './CheckPermissions';

type AuthorizedRouteProps = {
  currentAuthority: string;
  component: React.ComponentClass<any, any>;
  render: (props: any) => React.ReactNode;
  redirectPath: string;
  authority: IAuthorityType;
};

const AuthorizedRoute: React.SFC<AuthorizedRouteProps> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
  >
    <Route
      {...rest}
      render={(props: any) => (Component ? <Component {...props} /> : render(props))}
    />
  </Authorized>
);

export default AuthorizedRoute;
