import React, { FC, useState } from 'react';
import { Menu, MenuTheme } from 'antd';
import './index.less';
import routes from '@/routes/index';
import { RouterType } from '@/routes/interface';
import { useHistory, Link } from 'react-router-dom';
import SvgIcon from '@/Compoents/SvgIcon';

interface menKey {
  selectKeys: Array<string>;
  keys: Array<string>;
}

interface Props {
  roles: string;
}

const { SubMenu } = Menu;

const getMenuKeys = (pathname: string): menKey => {
  let keys: Array<string> = [];
  let selectKeys: Array<string> = [];
  const getMenMap = (item, routesList) => {
    if (routesList && routesList.length > 0) {
      routesList.map((citem: RouterType) => {
        if (citem.path === pathname) {
          keys.push(item.key);
          selectKeys.push(citem.key);
        } else {
          getMenMap(citem, citem.children);
        }
        return citem;
      });
    }
  };
  getMenMap(routes[0], routes);
  return { selectKeys, keys };
};

const Mens: FC<Props> = (props: Props) => {
  const history = useHistory();
  const keys = getMenuKeys(history.location.pathname);
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(keys.selectKeys);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<Array<string>>(keys.keys);
  const [theme] = useState<MenuTheme>('light');
 
  const onHandleClick = event => {
    const key=event.keyPath[event.keyPath.length-1]
    setDefaultOpenKeys([key]);
    setSelectedKeys([event.key]);
  };
  return (
    <Menu
      className='menu-com'
      theme={ theme }
      style={ { width: 256 } }
      defaultSelectedKeys={ selectedKeys }
      defaultOpenKeys={ defaultOpenKeys }
      onClick={ onHandleClick }
      mode="inline">
      {routes
        .filter(route => {
          return (props.roles && props.roles.indexOf(route.key) !== -1)||false;
        })
        .map((route: RouterType) => {
          return (
            <SubMenu key={route.key} title={route.title} icon={<SvgIcon className={'icon-'+route.key} icon={route.key}/>}>
              {route.children
                .filter(route => {
                  return (props.roles && props.roles.indexOf(route.key) !== -1)||false;
                })
                .map((croute: RouterType) => {
                  return (
                    <Menu.Item key={croute.key} icon={<SvgIcon className={'icon-'+croute.key} icon={croute.key}/>}>
                      <Link to={croute.path}>{croute.title}</Link>
                    </Menu.Item>
                  );
                })}
            </SubMenu>
          );
        })}
    </Menu>
  );
};
export default Mens;
