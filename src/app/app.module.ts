import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
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
import { Toast } from '@ionic-native/toast';
import { EmailComposer } from '@ionic-native/email-composer';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import {BrowseSuppliersPage} from '../pages/browse-suppliers/browse-suppliers'
import { environment } from '../environments/environment';

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
    RegisterSupplierPage,
    BrowseSuppliersPage
      ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireOfflineModule,
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
    RegisterSupplierPage,
    BrowseSuppliersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    EmailComposer,
    Toast,
    LoadingController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
