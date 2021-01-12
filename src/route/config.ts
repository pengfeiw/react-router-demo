import Home from "../components/home";
import ProductionOne from "../components/productionOne";
import ProductionTwo from "../components/productionTwo";
import ProductionMain from "../components/productionMain";
export interface Menu {
    text: string;
    path: string;
    redirect?: string;
    Component?: React.FC<any>;
    children?: Menu[]; // 如果有children，优先渲染children
}

interface Config {
    menus: Menu[];
}

const config: Config = {
    menus: [
        {
            text: "首页",
            path: "/",
            Component: Home
        },
        {
            text: "产品",
            path: "/production",
            redirect: "/production/productionMain",
            children: [
                {
                    text: "主产品",
                    path: "/production/productionMain",
                    Component: ProductionMain
                },
                {
                    text: "产品一",
                    path: "/production/production1",
                    Component: ProductionOne
                },
                {
                    text: "产品二",
                    path: "/production/production2",
                    Component: ProductionTwo
                }
            ]
        },
        {
            text: "服务",
            path: "/service"
        },
        {
            text: "解决方案",
            path: "/case-soolution"
        },
        {
            text: "案例",
            path: "/case"
        },
        {
            text: "新闻中心",
            path: "/news-center"
        }
    ]
};

export default config;
