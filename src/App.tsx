import {FC} from "react";
import config, {Menu as IMenu} from "./route/config";
import 'antd/dist/antd.css';
import {Menu} from "antd";
import {HashRouter as Router, Switch, Route, Link, Redirect, useLocation} from "react-router-dom";

const {menus} = config;

const RenderContent: FC<IMenu> = (props) => {
    const {children, Component, path} = props;
    const location = useLocation();
    console.log("location", location);
    console.log("path", path);

    if (children) {
        return (
            <>
                <Router>
                    <Menu mode="horizontal">
                        {
                            children.map((child) => {
                                return (
                                    <Menu.Item key={child.path}>
                                        <Link to={child.path}>
                                            {child.text}
                                        </Link>
                                    </Menu.Item>
                                );
                            })
                        }
                    </Menu>
                    <Switch>
                        {
                            children.map((child) => (
                                <Route exact key={child.path} path={child.path} component={child.Component ? child.Component : () => <></>}></Route>
                            ))
                        }
                    </Switch>
                </Router>
                {/* {redirect !== undefined ? <Redirect to={redirect} /> : <></>} */}
            </>
        );
    }

    return (
        <>
            {
                Component ? <Component /> : <></>
            }
        </>
    );
}

const App = () => {
    return (
        <Router>
            <Menu mode="horizontal">
                {menus.map((menu) => (
                    <Menu.Item key={menu.path}>
                        <Link to={menu.path}>{menu.text}</Link>
                    </Menu.Item>
                ))}
            </Menu>

            <Switch>
                {/* Route的exact属性需要注意一下，这里设置当有children属性时，exact为false，因为子菜单原因 */}
                {
                    menus.filter((menu) => menu.redirect).map((menu) => (
                        <Route exact path={menu.path} key={menu.path} render={() => <Redirect to={menu.redirect!} push />} />
                    ))
                }
                {
                    menus.map((menu) => (
                        <Route exact={menu.children ? false : true} path={menu.path} key={menu.path}>
                            <RenderContent children={menu.children} Component={menu.Component} path={menu.path} text={menu.text} />
                        </Route>
                    ))
                }
            </Switch>
        </Router>
    );
};

export default App;
