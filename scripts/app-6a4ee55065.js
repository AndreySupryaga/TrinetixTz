!function(){"use strict";angular.module("trinetixTz",["ngAnimate","ui.bootstrap","toastr"])}(),function(){"use strict";angular.module("trinetixTz").service("confirmDialog",["$uibModal",function(e){return function(a,t){var i=e.open({template:'<div class="modal-header"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body">{{descr}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button></div>',controller:["$scope",function(e){e.title=a,e.descr=t,e.ok=function(){i.close()},e.cancel=function(){i.dismiss("cancel")}}]});return i.result}}])}(),function(){"use strict";function e(e,a,t,i,r,n,l){function s(e){var a=r.open({templateUrl:"editModal.html",controller:["$scope",function(t){t.userModel=angular.copy(e),t.ok=function(){a.close(t.userModel)},t.cancel=function(){a.dismiss("cancel")}}]});a.result.then(function(a){angular.extend(e,a),i.success("Edited","Success")})}function o(a){var t="Delete user",r="You really want to delete "+a.firstName+" "+a.lastName;l(t,r).then(function(){d(a),e.userList=m(),i.success("Deleted","Success")})}function c(){var a="Delete users",t="You really want to delete selected users";l(a,t).then(function(){for(var a=0;a<e.userList.length;a++)e.checkboxes[e.userList[a].id]&&d(e.userList[a]);e.userList=m(),e.isAllSelected=!1,e.checkboxes={},i.success("Selected item deleted","Success")})}function u(a){e.checkboxes[a]?e.checkboxes[a]=!0:delete e.checkboxes[a]}function m(){var a;if(e.ageRange){var t=e.ageRange.split("-");t=t[1]?t:e.ageRange.split("+"),a=n("rangeFilter")(e.userModel,t[0],t[1])}return a=n("filter")(a,e.searchTerm),a=n("orderBy")(a,e.sortType,e.sortReverse),e.pagesLength=a.length,a=n("limitTo")(a,e.limit,1===e.currentPage?0:(e.currentPage-1)*e.limit)}function d(a){e.userModel.splice(e.userModel.indexOf(a),1)}e.limit="10",e.currentPage=1,e.ageRange="all",e.userModel=angular.copy(t),e.userList=t,e.isAllSelected=!1,e.checkboxes={},e.userEdit=s,e.userDelete=o,e.userDeleteSelected=c,e.selectUser=u,a.loader=!1,e.$watch("[currentPage, limit, sortReverse, searchTerm, ageRange]",function(){e.userList=m()},!0),e.editInPlaceSave=function(e){i.success(e.previousValue+" => "+e.value,"Changed")},e.selectAll=function(){e.isAllSelected?angular.forEach(e.userList,function(a){e.checkboxes[a.id]=e.isAllSelected}):e.checkboxes={}},e.isEmptyObject=function(e){return angular.equals({},e)}}e.$inject=["$scope","$rootScope","userList","toastr","$uibModal","$filter","confirmDialog"],angular.module("trinetixTz").controller("gridController",e)}(),function(){"use strict";angular.module("trinetixTz").filter("rangeFilter",function(){return function(e,a,t){var i=[];if(a=parseInt(a),t=parseInt(t)||Number.MAX_VALUE,a){for(var r=0;r<e.length;r++)e[r].age>=a&&e[r].age<=t&&i.push(e[r]);return i}return e}})}(),function(){"use strict";angular.module("trinetixTz").directive("editInPlace",function(){return{restrict:"A",scope:{type:"@",value:"=editInPlace",onSave:"=",onCancelFn:"&onCancel"},template:'<span ng-click="handleClick()" ng-bind="value"></span><input type="{{type || \'text\'}}" ng-model="modelCopy" style="width:100%;">',link:function(e,a){var t,i=angular.element(a.children()[1]);a.addClass("edit-in-place"),e.editing=!1,e.handleClick=function(){e.editing||e.beginEdit()},e.beginEdit=function(){e.editing=!0,e.modelCopy=e.value,t=e.value,a.addClass("active"),i[0].focus()},i.prop("onblur",function(){e.editing&&e.acceptEdits()}),i.prop("onkeyup",function(a){e.editing&&(13===a.keyCode?e.acceptEdits():27===a.keyCode&&e.cancelEdits())}),e.acceptEdits=function(){e.value=e.modelCopy,e.$apply(),e.editing&&(e.editing=!1,a.removeClass("active"),e.modelCopy!==t&&e.onSave({value:e.modelCopy,previousValue:t}))},e.cancelEdits=function(){e.editing&&(e.editing=!1,a.removeClass("active"),e.$apply(function(){e.value=t}),e.onCancelFn({value:e.value}))}}}})}(),function(){"use strict";angular.module("trinetixTz").service("userList",function(){return[{id:1,firstName:"Perkins",lastName:"Bush",email:"perkinsbush@wrapture.com",age:19},{id:2,firstName:"Welch",lastName:"Levine",email:"welchlevine@wrapture.com",age:25},{id:3,firstName:"Collier",lastName:"Mitchell",email:"colliermitchell@wrapture.com",age:34},{id:4,firstName:"Pittman",lastName:"Grant",email:"pittmangrant@wrapture.com",age:38},{id:5,firstName:"Mara",lastName:"Hunt",email:"marahunt@wrapture.com",age:17},{id:6,firstName:"Dalton",lastName:"Richards",email:"daltonrichards@wrapture.com",age:33},{id:7,firstName:"Tami",lastName:"Mcbride",email:"tamimcbride@wrapture.com",age:49},{id:8,firstName:"Duncan",lastName:"Ashley",email:"duncanashley@wrapture.com",age:21},{id:9,firstName:"Whitney",lastName:"Hoover",email:"whitneyhoover@wrapture.com",age:49},{id:10,firstName:"Britt",lastName:"Mooney",email:"brittmooney@wrapture.com",age:15},{id:11,firstName:"Bethany",lastName:"Mccarty",email:"bethanymccarty@wrapture.com",age:43},{id:12,firstName:"Kendra",lastName:"Vang",email:"kendravang@wrapture.com",age:37},{id:13,firstName:"Charmaine",lastName:"Winters",email:"charmainewinters@wrapture.com",age:34},{id:14,firstName:"Savannah",lastName:"Guthrie",email:"savannahguthrie@wrapture.com",age:43},{id:15,firstName:"Howell",lastName:"Ruiz",email:"howellruiz@wrapture.com",age:36},{id:16,firstName:"Alexandria",lastName:"Mcfarland",email:"alexandriamcfarland@wrapture.com",age:58},{id:17,firstName:"Janine",lastName:"Matthews",email:"janinematthews@wrapture.com",age:20},{id:18,firstName:"Luella",lastName:"Jenkins",email:"luellajenkins@wrapture.com",age:45},{id:19,firstName:"Morse",lastName:"Chen",email:"morsechen@wrapture.com",age:46},{id:20,firstName:"Ray",lastName:"Mclean",email:"raymclean@wrapture.com",age:24},{id:21,firstName:"Christi",lastName:"Bishop",email:"christibishop@wrapture.com",age:27},{id:22,firstName:"Greer",lastName:"Lowe",email:"greerlowe@wrapture.com",age:60},{id:23,firstName:"Frye",lastName:"Shepherd",email:"fryeshepherd@wrapture.com",age:25},{id:24,firstName:"Harding",lastName:"Hughes",email:"hardinghughes@wrapture.com",age:18},{id:25,firstName:"Kaitlin",lastName:"Bennett",email:"kaitlinbennett@wrapture.com",age:57},{id:26,firstName:"Sheree",lastName:"Knox",email:"shereeknox@wrapture.com",age:52},{id:27,firstName:"Irwin",lastName:"Koch",email:"irwinkoch@wrapture.com",age:17},{id:28,firstName:"Brandi",lastName:"Johnston",email:"brandijohnston@wrapture.com",age:30},{id:29,firstName:"Shelby",lastName:"Lester",email:"shelbylester@wrapture.com",age:15},{id:30,firstName:"Cervantes",lastName:"Dorsey",email:"cervantesdorsey@wrapture.com",age:27}]})}(),function(){"use strict";function e(e){e.loader=!0}e.$inject=["$rootScope"],angular.module("trinetixTz").run(e)}(),function(){"use strict";function e(e,a,t){e.debugEnabled(!0),t.options({popupDelay:400}),a.allowHtml=!0,a.timeOut=3e3,a.positionClass="toast-bottom-right",a.progressBar=!0}e.$inject=["$logProvider","toastrConfig","$uibTooltipProvider"],angular.module("trinetixTz").config(e)}();
//# sourceMappingURL=../maps/scripts/app-6a4ee55065.js.map
