angular.module('shopMyTools.controllers', [])

    .controller('welcomeController', function ($scope, $state) {

        $scope.options = {
            loop: false,
            effect: 'slide', // cube, coverflow
            speed: 1000,
        }

        $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
            // data.slider is the instance of Swiper
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
            console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            // note: the indexes are 0-based
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });

        $scope.gotoLoginPage = function () {
            $state.go('smtLogin');
        };

        if (window.localStorage['welcomeToken']) {
            $state.go('app.home');
        }

        $scope.loginData = {};
        if (window.localStorage['remeberCredentials']) {
            //  window.localStorage['remeberCredentials'] = checked;
            $scope.loginData.username = window.localStorage['remembermeUserName'];
            $scope.loginData.password = window.localStorage['remembermePassword'];
        } else {
            $scope.loginData = {};
        }



    })

    .controller('loginController', function ($scope, $rootScope, $state, loginService, $ionicPopup, $ionicLoading) {

        $scope.loginData = {};

        $scope.user_type = "mobile";
        $scope.ip_address = "mobile";

        $scope.gotoRegistration = function () {
            $state.go('smt_registration');
        };
        $scope.inputType = 'password';

        // Hide & show password function
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password') {
                $scope.inputType = 'text';
            }
            else {
                $scope.inputType = 'password';
            }
        };



        $scope.login = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                loginService.userAuthentication($scope.loginData.username, $scope.loginData.password, $scope.user_type, $scope.ip_address).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'Success') {
                        $rootScope.user_id = data.data.user_id;
                        $rootScope.token = data.data.token;
                        $rootScope.user_name = data.data.username;
                        $rootScope.user_info = data.data.userinfo;
                        $rootScope.mobileNo = data.data.userinfo.user_mobile;
                        if (data.data.billing_address != '') {
                            $rootScope.user_billing_Address = data.data.billing_address;
                        }
                        if (data.data.shipping_address != '') {
                            $rootScope.user_shipping_address = data.data.shipping_address;
                        }
                        window.localStorage['Password'] = $scope.loginData.password;
                        window.localStorage['token'] = data.data.token;
                        window.localStorage['user_id'] = data.data.user_id;
                        window.localStorage['email'] = data.data.userinfo.email;
                        window.localStorage['mobile'] = data.data.userinfo.user_mobile;
                        window.localStorage['user_name'] = data.data.username;
                        window.localStorage['gst_number'] = data.data.GSTnumber;
                        localStorage.setItem('userInfo', JSON.stringify(data.data.userinfo));
                        localStorage.setItem('shippingAddressInfo', JSON.stringify(data.data.shipping_address));
                        localStorage.setItem('billingAddressInfo', JSON.stringify(data.data.billing_address));

                        window.localStorage['welcomeToken'] = data.data.token;

                        window.localStorage['remembermeUserName'] = $scope.loginData.username;
                        window.localStorage['remembermePassword'] = $scope.loginData.password;


                        $state.go('app.home');
                    } else {
                        $ionicPopup.alert({
                            template: data.data.status,
                            title: 'Error!'
                        });
                    }
                });
            }
        };


        $scope.gotoForgotPswd = function () {
            $state.go('forgotPassword');
        };

        $scope.getLoginCredentials = function (checked) {
            window.localStorage['remeberCredentials'] = checked;
            if (checked == true) {

                if ($scope.loginData != '') {
                    window.localStorage['remembermeUserName'] = $scope.loginData.username;
                    window.localStorage['remembermePassword'] = $scope.loginData.password;
                } else {

                    $scope.loginData.username = window.localStorage['remembermeUserName'];
                    $scope.loginData.password = window.localStorage['remembermePassword'];
                }

            } else {
                $scope.loginData = {};
                localStorage.removeItem("remembermeUserName");
                localStorage.removeItem("remembermePassword");
            }

        }
        if (window.localStorage['remeberCredentials']) {
            $scope.loginData.checked = true;
            $scope.loginData.username = window.localStorage['remembermeUserName'];
            $scope.loginData.password = window.localStorage['remembermePassword'];
        } else {
            $scope.loginData.checked = false;
        }




    })

    .controller('registrationController', function ($scope, $rootScope, registrationService, $state, $ionicPopup, $ionicLoading) {

        $scope.registerData = {};
        $scope.registrationData = {};
        $scope.otpData = {};

        $scope.registerData.newsletter = "checked";
        $scope.registerData.gstnumber = "";
        $scope.registerData.user_type = "mobile";


        $scope.getOtp = function (form) {
            if (form.$valid && $scope.registerData.password == $scope.registerData.confirm_password) {

                window.localStorage['Password'] = $scope.registerData.password;
                window.localStorage['email'] = $scope.registerData.email;
                window.localStorage['gstNumber'] = $scope.registerData.gstnumber;
                window.localStorage['mobile'] = $scope.registerData.mobile;

                $rootScope.mobile = $scope.registerData.mobile;

                $ionicLoading.show({
                    template: 'Loading...'
                });

                registrationService.getOtp($scope, $rootScope).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'Data saved successfully') {
                        $rootScope.otp = data.data.otp;
                        $rootScope.myPopup = $ionicPopup.show({
                            templateUrl: 'templates/otpPopup.html',
                            title: 'Enter OTP'
                        });
                    } else {
                        $ionicPopup.alert({
                            template: data.data.status,
                            title: 'Error!'
                        });
                    }

                });
            }
        };


        $scope.verifyOTP = function (form, otpData) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $scope.otp = JSON.stringify(otpData.otp);
                $scope.ip_address = "mobile";
                registrationService.verifyOTP($scope.otp, $rootScope.mobile, $scope.ip_address).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'Data saved successfully') {
                        $rootScope.user_id = data.data.user_id;
                        $rootScope.token = data.data.token;
                        $rootScope.myPopup.close();
                        $ionicPopup.alert({
                            template: 'Registered Successfully',
                            title: 'Success!'
                        });
                        $state.go('smtLogin');
                    } else {

                        $ionicPopup.alert({
                            template: data.data.status,
                            title: 'Error!'
                        });
                    }

                })
            }
        }

        $scope.resendOTP = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            registrationService.resendOTP($rootScope.mobile, $rootScope.otp).then(function (data) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    template: data.data.return,
                    title: 'Success!'
                });

            })
        }

        $scope.gotoLogin = function () {
            $state.go('smtLogin');
            // $state.go('app.home');
        };
    })

    .controller('forgotPasswordCtrl', function ($scope, $rootScope, forgotPaswdService, $state, $ionicPopup, $ionicLoading) {

        $scope.forgetPswdData = {};

        $scope.forgetPswd = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                forgotPaswdService.forgotPassword($scope).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'email sent') {
                        $state.go('emailSent');
                    } else {
                        $ionicPopup.alert({
                            template: data.data.status,
                            title: 'Error!'
                        });
                    }

                })

            }
        };
        $scope.gotoLogin = function () {
            $state.go('smtLogin');
        };
    })


    .controller('menuController', function ($scope, $rootScope, $cordovaInAppBrowser, $state, logoutService, $window, searchProductsService) {

        $scope.gotoRespectivePage = function (page) {
            if (page == 'home') {
                $state.go('app.home');
            } else if (page == 'login') {
                $state.go('smtLogin');
            } else if (page == 'myorders') {
                $state.go('myorders');
                //  $state.go('myOrdersFilter_page');
            } else if (page == 'profile') {
                $state.go('editUserProfile');
            } else if (page == 'wishlist') {
                $state.go('whishlist_page');
            } else if (page == 'cartPage') {
                $state.go('cart_page');
            } else if (page == 'chngpaswd') {
                $state.go('changePassword');
            } else if (page == 'Coupons') {
                $state.go('couponsPage');
            } else if (page == 'policy') {
               // var browser = $cordovaInAppBrowser.open('http://toolsomg.com/returnpolicy.html#!/');
               $state.go('returnPolicy');
                //  window.open('http://toolsomg.com/returnpolicy.html#!/', '_blank');
            } else if (page == 'aboutus') {
              //  window.open('http://toolsomg.com/aboutus.html#!/', '_blank');
              $state.go('aboutUs');
            } else if (page == 'faq') {
                $state.go('faqs');
            } else if (page == 'logout') {

                logoutService.userLogout(window.localStorage['token']).then(function (data) {
                    if (data.data.status == 'success') {
                        // $window.localStorage.clear();
                        // $scope = $scope.$new(true);
                        // $rootScope = $rootScope.$new(true);
                        localStorage.removeItem("welcomeToken");
                        localStorage.removeItem("token");
                        localStorage.removeItem("token");
                        if (!window.localStorage['remeberCredentials']) {
                            localStorage.removeItem("remembermeUserName");
                            localStorage.removeItem("remembermePassword");
                            localStorage.removeItem("remeberCredentials");
                        }
                        $state.go('smtLogin');
                    } else {

                    }
                })
            }
        }

        $scope.search = false;
        $scope.changeval = function (val) {
            if (val) {
                $rootScope.searchDiv = false;
                $scope.searchKey = '';
            }
        }



        $scope.gotoCartPage = function () {
            $state.go('cart_page');
        }

        $scope.changeValue = function (val) {
            alert(val);
        }

        //Load category menu
        $scope.getCategoriesMenu = function () {
            searchProductsService.getCategoriesMenu().then(function (data) {
                if (data.data.status == 'success') {
                    //  alert(data.data.status)
                    $scope.categoryMenu = data.data.categories;
                }
            })

        }

        $scope.getCategoriesMenu();


        $scope.gotoCategoryPage = function (product, type) {
            $rootScope.categoryName = product;
            window.localStorage['categoryType'] = type;
            window.localStorage['categoryName'] = product;
            $state.go('categoryCartPage');
        }

        $scope.faqs = faqs;

	$scope.toggleGroup = function (group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};

	$scope.isGroupShown = function (group) {

		return $scope.shownGroup == group;

	};



        $scope.goback = function () {
            //  $state.go('app.home');
            $window.history.go(-1);
        }

    })


    .controller('resetPasswordCntrl', function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, resetPasswordService) {

        $scope.resetPswdData = {};
        $scope.userId = window.localStorage['user_id'];
        $scope.resetPassword = function (form) {
            if (form.$valid && $scope.resetPswdData.new_password == $scope.resetPswdData.confirm_password) {
                window.localStorage['Password'] = $scope.resetPswdData.new_password;
                resetPasswordService.resetPassword($scope.userId, $scope.resetPswdData.new_password, $scope.resetPswdData.confirm_password).then(function (data) {
                    if (data.data.status == "password changed successfully") {
                        $ionicPopup.alert({
                            template: 'Password Changes successfully!',
                            title: 'Success!'
                        });
                        $state.go('app.home');
                    }

                })
            }
        }

        $scope.goback = function () {
            $state.go('app.home');
            //  $window.history.go(-1);
        }

    })

    .controller('searchController', function ($scope, $rootScope, searchProductsMoreService, searchProductsService, $window, $state, categoryService, $ionicLoading, $ionicPopup, viewCartItemsService) {

        $scope.SearchData = {};

        $scope.search = false;
        $rootScope.searchDiv = false;
        $scope.getSeachProducts = function (searchKey) {
            $scope.search = true;

            $rootScope.searchKey = searchKey;

            //window.localStorage['searchKey'] = searchKey; 

            if (searchKey.length >= 3) {


                searchProductsService.searchProductsMoreMethod(searchKey).then(function (data) {
                    //alert(JSON.stringify(data))
                    if (data.data.status == 'success') {
                        $scope.searchedMoreProducts = data.data.product_info;
                        $rootScope.recommendedList = data.data.recommended;
                    } else {
                        $scope.searchedMoreProducts = [];
                    }
                })
                $rootScope.searchDiv = true;

            } else {
                $rootScope.searchDiv = false;

            }
        }

        $scope.clearSearch = function () {
            $scope.SearchData = {};
            $rootScope.searchDiv = false;
            $scope.search = false;
        }
        $scope.getSearchtDetailsList = function () {
            searchProductsMoreService.searchProductsMoreMethod($rootScope.searchKey).then(function (data) {
                //alert(JSON.stringify(data))
                if (data.data.status == 'success') {
                    $scope.searchedMoreProducts = data.data.product_info;
                }

            })
        }

        $scope.getSearchtDetailsList();

        $scope.getCartItemsList = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            viewCartItemsService.getCartItemsList(window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $rootScope.cartItemsList = data.data.item_list;
                    $rootScope.grand_total = data.data.grand_total;
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                } else if (data.data.status == 'no data available of this user') {
                    $rootScope.cartItemsList = [];
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                }

            })
        }

        $scope.gotoCategoryPage = function (product, type) {
            $rootScope.categoryName = product;
            window.localStorage['categoryType'] = type;
            window.localStorage['categoryName'] = product;
            $state.go('categoryCartPage');
        }

        $scope.getProductDetails = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            $state.go("productDetail_page")
        }

        $scope.addtoCart = function (productData) {

            $scope.productDataList = [];
            $ionicLoading.show({
                template: 'Loading...'
            });
            viewCartItemsService.getCartItemsList(window.localStorage['user_id']).then(function (data) {

                if (data.data.status == 'success') {
                    $rootScope.cartItemsList = data.data.item_list;
                    $rootScope.grand_total = data.data.grand_total;
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                    if ($rootScope.cartItemsList.length > 0) {
                        $scope.productDataList = $rootScope.cartItemsList;
                    }
                    $scope.productDataList.push({ "productdescription": productData.upload_name, "qty": "1" })
                    // $rootScope.CartItemsCount = $scope.productDataList.length;
                    categoryService.addToCartMethod($scope.productDataList, window.localStorage['user_id']).then(function (data) {
                        window.localStorage['orderId'] = data.data.orderid;
                        $ionicLoading.hide();
                        if (data.data.status == 'item added to cart') {
                            $ionicPopup.alert({
                                template: 'Added to Cart Successfully!',
                                title: 'Success!'
                            });
                        } else if (data.data.status == 'item added to cart..') {
                            $ionicPopup.alert({
                                template: 'Added to Cart Successfully!',
                                title: 'Success!'
                            });
                        }
                        else if (data.data.status == 'out off stock') {
                            $ionicPopup.alert({
                                template: 'Out Off Stock!',
                                title: 'Sorry!'
                            });
                        }

                    });
                    $scope.getCartItemsList();
                }

            })




        }

        $scope.addtoWishList = function (productData) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            categoryService.addToWishListMethod(window.localStorage['user_id'], productData.upload_name).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'product saved successfully') {
                    $rootScope.wishListItemsCount = data.data.items_count;

                    $ionicPopup.alert({
                        template: 'Added to Wish List Successfully!!',
                        title: 'Success!'
                    });
                } else {
                    $ionicPopup.alert({
                        template: data.data.status,
                        title: 'Sorry!'
                    });
                }

            })
        }

        $scope.gotoCartPage = function () {
            $state.go('cart_page');
        }

        $scope.getSearchtDetails = function (searchKey) {
            $state.go("search")
        }

        $scope.goback = function () {
            //  $state.go('app.home');
            $window.history.go(-1);
        }
    })


    .controller('editProfileCntrl', function ($scope, $rootScope, $state, $window, $ionicPopup, $ionicLoading, editProfileService) {

        $scope.CustomerProfileData = JSON.parse(localStorage.getItem('CustomerProfileData'));

        $scope.editProfileData = {};
        $scope.editProfileData = $scope.CustomerProfileData;
        $scope.editProfileData.user_mobile = $scope.editProfileData.mobile;

        $scope.editMobile = true;

        $scope.editMobileNo = function () {
            $scope.editMobile = false;
        }

        $scope.updateMobileNo = function () {
            window.localStorage['mobile'] = $scope.editProfileData.user_mobile;
            editProfileService.updateuserData($scope.editProfileData, window.localStorage['user_id']).then(function (data) {
                if (data.data.status == 'details updated successfully') {
                    $ionicPopup.alert({
                        template: 'Updated Successfully!',
                        title: 'Success!'
                    });
                    $state.go('app.home');
                } else {
                    $ionicPopup.alert({
                        template: data.data.status,
                        title: 'Error!'
                    });
                }

            })
        }


        $scope.goback = function () {
            $window.history.go(-1);
        }


    })


    .controller('couponsController', function ($scope, $rootScope, $state, $window, $ionicLoading, $ionicHistory, couponService) {

        $scope.getCoupons = function () {
            $ionicLoading.show();
            couponService.getCoupons().then(function (data) {
                $ionicLoading.hide();
                $scope.couponsList = data.data.coupons;
            })
        }
        $scope.getCoupons();

        $scope.goback = function () {
            $ionicHistory.goBack();
            //  $window.history.go(-1);
        }
    })

    .controller('footerController', function ($scope, $rootScope, $state, $cordovaInAppBrowser) {

        $scope.gotoRespectivePage = function (page) {
            if (page == 'home') {
                alert('ho');
                $state.go('app.home');
            } else if (page == 'tracking') {
                alert('sdf');
              var browser = $cordovaInAppBrowser.open('http://care.shopmytools.com/cust_order_tracking');
               
            }
        }
    });
