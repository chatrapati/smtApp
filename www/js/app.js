// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('shopMyTools', ['ionic', 'shopMyTools.controllers', 'shopMyTools.dashboardController',
  'shopMyTools.homeController', 'shopMyTools.categoryPageController',
  'shopMyTools.productDetailPageController', 'shopMyTools.ckeckoutController',
  'shopMyTools.services',
  'shopMyTools.dashboardServices', 'ngCordova', 'shopMyTools.homeService',
  'shopMyTools.categoryService', 'shopMyTools.productDetailPageService',
  'shopMyTools.ckeckoutSerivce', 'shopMyTools.constants', 'shopMyTools.smtdirective',
  '720kb.tooltips', 'ionic-ratings', 'shopMyTools.paymentsuccess'])

  .run(function ($ionicPlatform, $state, $cordovaNetwork, $rootScope, $ionicPopup,$window) {
    $ionicPlatform.registerBackButtonAction(function () {
    //  alert('2')
      if ($state.current.name == "app.home") {
      //  alert('1')
        var confirmPopup = $ionicPopup.confirm({
          title: 'ShopMyTools',
          template: 'Are you sure to exit the App?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            navigator.app.exitApp();
          } else {
            console.log('Not sure!');
          }
        });
      }
      else {
       // $mdSidenav('left').close();
        $window.history.go(-1);
      //  alert($state.current.name)

      }
    }, 100);
  
  })

  .run(function ($ionicPlatform, $state, $cordovaNetwork, $rootScope, $ionicPopup,$window) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }


      

        // var type = $cordovaNetwork.getNetwork()

        // var isOnline = $cordovaNetwork.isOnline()

        // var isOffline = $cordovaNetwork.isOffline()


        // // listen for Online event
        // $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        //   var onlineState = networkState;
        //   alert(onlineState)
        // })

        // // listen for Offline event
        // $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
        //   var offlineState = networkState;
        //   alert(offlineState)
        // })

      
  });
  })

  .config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])

  .config(function ($stateProvider, $urlRouterProvider) {
    
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'menuController'
    })

    // .state('tabs', {
    //   url: '/tabs',
    //   abstract: true,
    //   templateUrl: 'templates/tabs.html',
    //   controller: 'menuController'
    // })

    .state('app.home', {
      url: '/home',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeController'
        }
      }
    })

    .state('welcome', {
      url: '/welcome',
      cache: false,
      templateUrl: 'templates/welcome.html',
      controller: 'welcomeController'
    })


    .state('welcomeSlides', {
      url: '/welcomeSlides',
      cache: false,
      templateUrl: 'templates/welcomeSlides.html',
      controller: 'welcomeController'
    })

    .state('smtLogin', {
      url: '/smtLogin',
      cache: false,
      templateUrl: 'templates/smtLogin.html',
      controller: 'loginController'
    })

    .state('smt_registration', {
      url: '/smt_registration',
      cache: false,
      templateUrl: 'templates/smt_registration.html',
      controller: 'registrationController'
    })

    .state('forgotPassword', {
      url: '/forgotPassword',
      cache: false,
      templateUrl: 'templates/forgotPassword.html',
      controller: 'forgotPasswordCtrl'
    })

    .state('emailSent', {
      url: '/emailSent',
      cache: false,
      templateUrl: 'templates/emailSent.html',
      controller: 'forgotPasswordCtrl'
    })


    .state('myorders', {
      url: '/myorders',
      cache: false,
      templateUrl: 'templates/myorders.html',
      controller: 'myOrderController'
    })


    .state('categoryCartPage', {
      url: '/categoryCartPage',
      cache: false,
      templateUrl: 'templates/categoryCartPage.html',
      controller: 'categoryController'
    })

    .state('filterPageModal', {
      url: '/filterPageModal',
      cache: false,
      templateUrl: 'templates/filterPageModal.html',
      controller: 'filterController'
    })

    .state('whishlist_page', {
      url: '/whishlist_page',
      cache: false,
      templateUrl: 'templates/whishlist_page.html',
      controller: 'wishListDetailsCntrl'
    })

    .state('productDetail_page', {
      url: '/productDetail_page',
      cache: false,
      templateUrl: 'templates/productDetail_page.html',
      controller: 'productDetailController'
    })

    .state('specifications_page', {
      url: '/specifications_page',
      cache: false,
      templateUrl: 'templates/specifications_page.html',
      controller: 'productDetailController'
    })

    .state('relatedProducts_page', {
      url: '/relatedProducts_page',
      cache: false,
      templateUrl: 'templates/relatedProducts_page.html',
      controller: 'productDetailController'
    })

    .state('upsellProducts_page', {
      url: '/upsellProducts_page',
      cache: false,
      templateUrl: 'templates/upsellProducts_page.html',
      controller: 'productDetailController'
    })

    .state('cart_page', {
      url: '/cart_page',
      cache: false,
      templateUrl: 'templates/cart_page.html',
      controller: 'viewCartItemsListCntrl'
    })

    .state('shipping&billing_page', {
      url: '/shipping&billing_page',
      cache: false,
      templateUrl: 'templates/shipping&billing_page.html',
      controller: 'ckeckoutCntrl'
    })

    .state('add_address_page', {
      url: '/add_address_page',
      cache: false,
      templateUrl: 'templates/add_address_page.html'
      // controller: 'welcomeController'
    })

    .state('changePassword', {
      url: '/changePassword',
      cache: false,
      templateUrl: 'templates/changePassword.html',
      controller: 'resetPasswordCntrl'
    })
    .state('search', {
      url: '/search',
      cache: false,
      templateUrl: 'templates/search.html',
      controller: 'searchController'
    })

    .state('payu', {
      url: '/payu',
      templateUrl: 'templates/payu.html'
    })

    .state('success', {
      url: '/success',
      templateUrl: 'templates/success.html',
      controller: 'paymentsuccessCntrl'
    })
    .state('editUserProfile', {
      url: '/editUserProfile',
      cache: false,
      templateUrl: 'templates/editUserProfile.html',
      controller: 'editProfileCntrl'
    })

    .state('myOrdersFilter_page', {
      url: '/myOrdersFilter_page',
      cache: false,
      templateUrl: 'templates/myOrdersFilter_page.html',
      controller: 'myOrderController'
    })

    .state('cancelOrders_page', {
      url: '/cancelOrders_page',
      cache: false,
      templateUrl: 'templates/cancelOrders_page.html',
      controller: 'myOrderController'
    })

    .state('invoiceOrders_page', {
      url: '/invoiceOrders_page',
      cache: false,
      templateUrl: 'templates/invoiceOrders_page.html',
      controller: 'myOrderController'
    })

    .state('couponsPage', {
      url: '/couponsPage',
      cache: false,
      templateUrl: 'templates/couponsPage.html',
      controller: 'couponsController'
    })

    .state('returnPolicy', {
      url: '/returnPolicy',
      cache: false,
      templateUrl: 'templates/returnpolicy.html',
      controller:'menuController'
    })

    .state('faqs', {
      url: '/faqs',
      cache: false,
      templateUrl: 'templates/faqs.html',
      controller:'menuController'
    })

    .state('aboutUs', {
      url: '/aboutUs',
      cache: false,
      templateUrl: 'templates/aboutus.html',
      controller:'menuController'
    })

    .state('imageview', {
      url: '/imageview',
      cache: false,
      templateUrl: 'templates/imageview.html',
      controller:'productDetailController'
    })

    .state('headerSearchbar', {
      url: '/headerSearchbar',
      cache: false,
      templateUrl: 'templates/headerSearchbar.html',
      controller: 'searchController'
    });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcomeSlides');
});


var faqs=[{"question":"Is it safe to give credit card or debit card credentials on ShopMyTools?",
"answer":"ShopMyTools is always operated by sophisticated methodologies and highly secured algorithms which can leave your details strictly secured. However, speaking about the credit card or debit card credentials of customers, it will be stored by our associated parties or third parties with high-end security. "},
{"question":" Is it mandatory to own an account on ShopMyTools to purchase a product?",
"answer":"Well, it’s not that much mandatory. You can purchase product on ShopMyTools with a guest account. However, it is highly recommended to own an account on ShopMyTools to enjoy the specialized features in purchases such as faster checkout, reward points and much more."},
{"question":" What is the process that ShopMyTools follows to deliver a product?",
"answer":"ShopMyTools offers interesting goods transfer methodologies to provide utmost ease to its customers in reaching their order. Whenever you raise an order with us, we select the nearest location dealer proportionate to your address and the concerned dealer will hand over your order in stipulated time intervals. "}]

