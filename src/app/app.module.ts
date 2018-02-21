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
import { AddSPage } from '../pages/add-s/add-s';
import { ProfilePage } from '../pages/profile/profile';
import { UprofilePage } from '../pages/uprofile/uprofile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import {BrowseSuppliersPage} from '../pages/browse-suppliers/browse-suppliers'
import { environment } from '../environments/environment';
import { StockSearchPage } from '../pages/stock-search/stock-search';
import { PurchaseSearchPage } from '../pages/purchase-search/purchase-search';
import { SaleSearchPage } from '../pages/sale-search/sale-search';
import { AddPPage } from '../pages/add-p/add-p';
import { AddQPage } from '../pages/add-q/add-q';
import { RemoveQPage } from '../pages/remove-q/remove-q';

import { CallNumber } from '@ionic-native/call-number';

import { FCM } from '@ionic-native/fcm';

import { ChartsModule } from 'ng2-charts';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

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
    HelpPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AddStockPage,
    EditProductPage,
    ReturnGoodsPage,
    RegisterSupplierPage,
    BrowseSuppliersPage,
    StockSearchPage,
    PurchaseSearchPage,
    SaleSearchPage,
    AddPPage,
    AddQPage,
    RemoveQPage,
    AddSPage,
    ProfilePage,
    UprofilePage
      ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireOfflineModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    AngularFireAuthModule

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
    HelpPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AddStockPage,
    EditProductPage,
    ReturnGoodsPage,
    RegisterSupplierPage,
    BrowseSuppliersPage,
    StockSearchPage,
    PurchaseSearchPage,
    SaleSearchPage,
    AddPPage,
    AddQPage,
    RemoveQPage,
    AddSPage,
    ProfilePage,
    UprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    EmailComposer,
    Toast,
    LoadingController,
    CallNumber,
    FCM,
    File,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
