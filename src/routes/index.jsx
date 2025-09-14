
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard.layout";
// import Dashboard from "../pages/Dashboard/Dashboard";
import Inventory from "../pages/Inventory/Inventory";
import Orders from "../pages/Orders";
import Category from "../pages/category";
import Unit from "../pages/productVariant/Unit/Unit";
import { CategoryCreate } from "../pages/category/create";
import { CategoryEdit } from "../pages/category/edit";
import Product from "../pages/products/index";
import { ProductCreate } from "../pages/products/create";
import Brand from "../pages/brand";
import { BrandCreate } from "../pages/brand/create";
import { BrandEdit } from "../pages/brand/edit";
import Color from "../pages/productVariant/color";
import { ColorCreate } from "../pages/productVariant/color/create";
import { ColorEdit } from "../pages/productVariant/color/edit";
import WebSetting from "../pages/webSetting";
import { WebSettingCreate } from "../pages/webSetting/create";
import { WebSettingEdit } from "../pages/webSetting/edit";
import Attribute from "../pages/productVariant/attribute";
import AttributeCreate from "../pages/productVariant/attribute/create";
import AttributeEdit from "../pages/productVariant/attribute/edit";
import ProductVariant from "../pages/productVariant/productvariant";
import ProductVariantCreate from "../pages/productVariant/productvariant/create";
import EditProductVariant from "../pages/productVariant/productvariant/edit";
import CategoryHomepage from "../pages/category/category-to-homepage";
import { ProductEdit } from "../pages/products/edit";
import OrderDetails from "../pages/Orders/order-detail";
import OrderTracking from "../pages/Orders/order-tracking";
import Form from "../pages/form";
import Banner from "../pages/Banner/Index";
import { BannerCreate } from "../pages/Banner/create";
import { BannerEdit } from "../pages/Banner/edit";
import BannerWayProduct from "../pages/Banner/banner-way-product";
import BannerWayProductCreate from "../pages/Banner/banner-way-product/create";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProductBestSelling from "../pages/products/best-selling";
import Division from "../pages/address/division";
import { getToken } from "../utils/helper";
import CreateDivision from "../pages/address/division/create";
import CreateDistrict from "../pages/address/district/create";
// import CreateZone from "../pages/address/zone/create";
import District from "../pages/address/district";
import Upozila from "../pages/address/upozila";
import CreateUpozila from "../pages/address/upozila/create";
import EditDivision from "../pages/address/division/edit";
import EditDistrict from "../pages/address/district/edit";
import EditUpazila from "../pages/address/upozila/edit";
import Invoice from "../components/invoice/Invoice";

const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "", element: <Dashboard /> },
      // order route start
      {
        path: "order",
        element: <Orders />,
      },
      {
        path: "form",
        element: <Form />,
      },
      {
        path: "order/order-details/:id",
        element: <OrderDetails />,
      },
      {
        path: "order/order-tracking/:id",
        element: <OrderTracking />,
      },
      // order route end
      { path: "product", element: <Product></Product> },
      { path: "product/create", element: <ProductCreate /> },
      { path: "product/edit/:id", element: <ProductEdit /> },
      { path: "product/best-selling", element: <ProductBestSelling /> },
      { path: "inventory", element: <Inventory></Inventory> },
      { path: "orders", element: <Orders></Orders> },
      { path: "product-variant", element: <ProductVariant /> },
      { path: "product-variant/create/:id", element: <ProductVariantCreate /> },
      { path: "product-variant/edit/:id", element: <EditProductVariant /> },
      { path: "banner", element: <Banner /> },
      { path: "banner/create", element: <BannerCreate /> },
      { path: "banner/edit/:id", element: <BannerEdit /> },
      { path: "banner/banner-product/:id", element: <BannerWayProduct /> },
      { path: "banner/featured/:id", element: <BannerWayProductCreate /> },
      { path: "category", element: <Category /> },
      { path: "category/create", element: <CategoryCreate /> },
      { path: "category/edit/:id", element: <CategoryEdit /> },
      { path: "category/homepage", element: <CategoryHomepage /> },
      { path: "brand", element: <Brand /> },
      { path: "brand/create", element: <BrandCreate /> },
      { path: "brand/edit/:id", element: <BrandEdit /> },
      { path: "color", element: <Color /> },
      { path: "color/create", element: <ColorCreate /> },
      { path: "color/edit/:id", element: <ColorEdit /> },
      { path: "attribute", element: <Attribute /> },
      { path: "attribute/create", element: <AttributeCreate /> },
      { path: "attribute/edit/:id", element: <AttributeEdit /> },
      { path: "web-setting", element: <WebSetting /> },
      { path: "web-setting/create", element: <WebSettingCreate /> },
      { path: "web-setting/edit/:id", element: <WebSettingEdit /> },
      { path: "unit", element: <Unit /> },
      // assress
      { path: "division", element: <Division/> },
      { path: "division/create", element: <CreateDivision /> },
      { path: "division/edit/:id", element: <EditDivision /> },
      // District
      { path: "district", element: <District/> },
      { path: "district/create", element: <CreateDistrict /> },
      { path: "district/edit/:id", element: <EditDistrict /> },
      // upozila
      { path: "upozila", element: <Upozila/> },
      { path: "upozila/create", element: <CreateUpozila /> },
      { path: "upozila/edit/:id", element: <EditUpazila /> }, 
      // invoice
      { path: "order/order-details/:id/invoice", element: <Invoice /> }, 
    ],
  },
];

/* Generate permitted routes */
export const permittedRoutes = () => {
  const token = getToken();

  if (token) {
    return appRoutes;
  }

  return [];
};
