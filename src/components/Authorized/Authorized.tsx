/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-10 12:06:55
 */
import React from 'react';
import { Redirect } from 'umi'

import check from './CheckPermissions';
import type { IAuthorityType } from './CheckPermissions';
import type AuthorizedRoute from './AuthorizedRoute';
import type Secured from './Secured';
import { USER_ADMIN, USER_ANON, USER_MANAGER, USER_ENGINEER } from '@/const';

type AuthorizedProps = {
  authority: IAuthorityType;
  noMatch?: React.ReactNode;
};

type IAuthorizedType = React.FunctionComponent<AuthorizedProps> & {
  Secured: typeof Secured;
  check: typeof check;
  AuthorizedRoute: typeof AuthorizedRoute;
};

const Authorized: React.FunctionComponent<AuthorizedProps> = ({
  children,
  authority = ([USER_ADMIN, USER_ANON, USER_MANAGER, USER_ENGINEER]),
  noMatch = (<Redirect to='/user' />),
}) => {
  const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized as IAuthorizedType;
