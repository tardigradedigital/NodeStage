(function () {
    'use strict';

    /*
     * AngularJS ng-Font
     * Version: 0.0.1
     *
     * Copyright 2015 Muhammed Tanrıkulu.  
     * All Rights Reserved.  
     * Use, reproduction, distribution, and modification of this code is subject to the terms and 
     * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
     *
     * Author: Muhammed Tanrıkulu
     */



    angular.module('ngFont', ['angularLoad'])
            .constant('ngFontConfig', {
            })
            .service('ngFont', ['$rootScope', 'ngFontConfig', function ($rootScope, ngFontConfig) {

                }])
            .directive('ngFont', ['$parse', '$rootScope', '$interval', '$sce', 'ngFontConfig', 'ngFont', 'angularLoad',
                function ($parse, $rootScope, $interval, $sce, ngFontConfig, ngFont, angularLoad) {

                    return {
                        scope: {
                            font: '@font',
                            size: '@size',
                            opacity: '@opacity'
                        },
                        link: function (scope, element, attributes) {

                            if (attributes.hasOwnProperty('bold'))
                                attributes.bold = "bold";
                            if (attributes.hasOwnProperty('italic'))
                                scope.style = "italic";
                            if (attributes.hasOwnProperty('oblique'))
                                scope.style = "oblique";
                            if (attributes.hasOwnProperty('shadow')) {
                                scope.shadowVals = attributes.shadow.split("/\s+/");
                                console.log(scope.shadowVals[0] + " " + scope.shadowVals[1] + " " + scope.shadowVals[2]);
                            }
                            if (attributes.hasOwnProperty('center'))
                                scope.align = "center";
                            if (attributes.hasOwnProperty('right'))
                                scope.align = "right";
                            if (attributes.hasOwnProperty('left'))
                                scope.align = "left";
//                            if (attributes.hasOwnProperty('opacity'))




                            var link = attributes.font.split(' ').join('+');
                            angularLoad.loadCSS('http://fonts.googleapis.com/css?family=' + link).then(function () {
                            }).catch(function () {
                            });
                        },
                        restrict: "A",
                        transclude: true,
                        template: "<div style='text-align: {{align}};'><span style=' \n\
                                    font-family: {{font}}, cursive; \n\
                                    font-size: {{size}};  \n\
                                    font-weight: {{bold}}; \n\
                                    font-style: {{style}}; \n\
                                    text-shadow: {{shadowVals[0]}} {{shadowVals[1]}} {{shadowVals[2]}} {{shadowVals[3]}};\n\
                                    opacity: {{opacity}};' \n\
                                    ng-transclude></span></div>"
                    };
                }]);
})(window, document);
