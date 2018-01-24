import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StockPage } from '../pages/stock/stock';
import { SuppliersPage } from '../pages/suppliers/suppliers';
import { PurchasesPage } from '../pages/purchases/purchases';
import { SalesPage } from '../pages/sales/sales';
import { GoodsReturnedPage } from '../pages/goods-returned/goods-returned';
import { ReportsPage } from '../pages/reports/reports';
import { MyDetailsPage } from '../pages/my-details/my-details';
import { HelpPage } from '../pages/help/help';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { AddStockPage } from '../pages/add-stock/add-stock';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { ReturnGoodsPage } from '../pages/return-goods/return-goods';
import { RegisterSupplierPage } from '../pages/register-supplier/register-supplier';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StockPage,
    SuppliersPage,
    PurchasesPage,
    SalesPage,
    GoodsReturnedPage,
    ReportsPage,
    MyDetailsPage,
    HelpPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AddStockPage,
    EditProductPage,
    ReturnGoodsPage,
    RegisterSupplierPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StockPage,
    SuppliersPage,
    PurchasesPage,
    SalesPage,
    GoodsReturnedPage,
    ReportsPage,
    MyDetailsPage,
    HelpPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AddStockPage,
    EditProductPage,
    ReturnGoodsPage,
    RegisterSupplierPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}