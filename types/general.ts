export interface IMenu {
    menu_item_id: {
        name: string;
        page: string;
        slug: string;
        sub_items: Array<{ name: string; page: string; slug: string }>;
    };
}

export interface IHomePage {
    home: {
        name: string;
        home_banners: any;
        home_products: any;
        home_services: any;
    };
    news: any;
}
