!function(){"use strict";angular.module("trinetixTz",["ngAnimate","ui.bootstrap","ngRoute","toastr"])}(),function(){"use strict";angular.module("trinetixTz").service("userEditDialog",["$uibModal",function(e){return function(t){var i=e.open({templateUrl:"app/services/dialog/userEdit/user.edit.dialog.html",controller:["$scope",function(e){e.userModel=angular.copy(t),e.ok=function(){angular.equals(t,e.userModel)?i.close():i.close(e.userModel)},e.cancel=function(){i.dismiss("cancel")}}]});return i.result}}])}(),function(){"use strict";angular.module("trinetixTz").service("confirmDialog",["$uibModal",function(e){return function(t,i){var n=e.open({templateUrl:"app/services/dialog/confirm/confirm.dialog.html",controller:["$scope",function(e){e.title=t,e.descr=i,e.ok=function(){n.close()},e.cancel=function(){n.dismiss("cancel")}}]});return n.result}}])}(),function(){"use strict";function e(e,t,i,n,s,o){function l(e){return angular.element(e)[0]}function a(e){o(e).then(function(t){t&&(angular.extend(e,t),i.success("Edited","Success"))})}function r(e){var t="Delete user",n="You really want to delete "+e.firstName+" "+e.lastName;s(t,n).then(function(){p(e),u(),i.success("Deleted","Success")})}function c(){var t="Delete users",n="You really want to delete selected users";s(t,n).then(function(){for(var t=0;t<e.userList.length;t++)e.checkboxes[e.userList[t].id]&&p(e.userList[t]);u(),e.isAllSelected=!1,e.checkboxes={},i.success("Selected item deleted","Success")})}function d(t){e.checkboxes[t]?e.checkboxes[t]=!0:delete e.checkboxes[t]}function u(){var t;if(e.ageRange){var i=e.ageRange.split("-");i=i[1]?i:e.ageRange.split("+"),t=n("rangeFilter")(e.userModel,i[0],i[1])}return t=n("filter")(t,e.searchTerm),t=n("orderBy")(t,e.sortType,e.sortReverse),e.pagesLength=t.length,t=n("limitTo")(t,e.limit,1===e.currentPage?0:(e.currentPage-1)*e.limit),e.userList=t,e.userList}function p(t){e.userModel.splice(e.userModel.indexOf(t),1)}e.limit="10",e.currentPage="1",e.ageRange="all",e.userModel=[],e.isPagination=!0,e.isAllSelected=!1,e.checkboxes={},e.userEdit=a,e.userDelete=r,e.userDeleteSelected=c,e.selectUser=d;var g;e.selectType=function(){e.isPagination?e.limit=g:(g=e.limit,e.limit="25"),u()},angular.element(window).on("scroll",function(){!e.isPagination&&l(window).scrollY+l(window).innerHeight+150>l(document).scrollingElement.clientHeight&&e.limit<=e.userModel.length&&(e.limit=+e.limit+5,u(),!e.$$phase&&e.$apply())}),t.get("app/userList.json").then(function(t){e.userModel=t.data,u(),e.loader=!1}),e.$watch("[currentPage, limit, sortReverse, searchTerm, ageRange]",function(){u()},!0),e.editInPlaceSave=function(e){i.success(e.previousValue+" => "+e.value,"Changed")},e.selectAll=function(){e.isAllSelected?angular.forEach(e.userList,function(t){e.checkboxes[t.id]=e.isAllSelected}):e.checkboxes={}},e.isEmptyObject=function(e){return angular.equals({},e)}}e.$inject=["$scope","$http","toastr","$filter","confirmDialog","userEditDialog"],angular.module("trinetixTz").controller("userGridCtrl",e)}(),function(){"use strict";angular.module("trinetixTz").filter("rangeFilter",function(){return function(e,t,i){var n=[];if(t=parseInt(t),i=parseInt(i)||Number.MAX_VALUE,t){for(var s=0;s<e.length;s++)e[s].age>=t&&e[s].age<=i&&n.push(e[s]);return n}return e}})}(),function(){"use strict";angular.module("trinetixTz").directive("editInPlace",function(){return{restrict:"A",scope:{type:"@",value:"=editInPlace",onSave:"="},template:'<span ng-click="handleClick()" ng-bind="value"></span><input type="{{type || \'text\'}}" ng-model="modelCopy" style="width:100%;">',link:function(e,t){var i,n=angular.element(t.children()[1]);t.addClass("edit-in-place"),e.editing=!1,e.handleClick=function(){e.editing||e.beginEdit()},e.beginEdit=function(){e.editing=!0,e.modelCopy=e.value,i=e.value,t.addClass("active"),n[0].focus()},n.prop("onblur",function(){e.editing&&e.acceptEdits()}),n.prop("onkeyup",function(t){e.editing&&(13===t.keyCode?e.acceptEdits():27===t.keyCode&&e.cancelEdits())}),e.acceptEdits=function(){e.value=e.modelCopy,e.$apply(),e.editing&&(e.editing=!1,t.removeClass("active"),e.modelCopy!==i&&e.onSave({value:e.modelCopy,previousValue:i}))}}}})}(),function(){"use strict";angular.module("trinetixTz").config(["$routeProvider",function(e){e.when("/",{templateUrl:"app/components/user/user.grid.html",controller:"userGridCtrl"}).otherwise({redirectTo:"/"})}])}(),function(){"use strict";function e(e){e.loader=!0}e.$inject=["$rootScope"],angular.module("trinetixTz").run(e)}(),function(){"use strict";function e(e,t){t.options({popupDelay:400}),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-bottom-right",e.progressBar=!0}e.$inject=["toastrConfig","$uibTooltipProvider"],angular.module("trinetixTz").config(e)}(),angular.module("trinetixTz").run(["$templateCache",function(e){e.put("app/components/user/user.grid.html",'<div><div class=loader-container ng-show=loader><div class=loader></div></div><div class="jumbotron text-center"><div class=container><div class=row><div ng-show=!isEmptyObject(checkboxes) class=pull-left style="padding: 20px 15px"><button class="btn btn-danger btn-circle" ng-click=userDeleteSelected() uib-tooltip="Remove all checked users">Remove checked</button></div><div ng-show=isPagination><div class=pull-right><ul uib-pagination total-items=pagesLength items-per-page=limit ng-model=currentPage max-size=maxSize class=pagination-sm boundary-links=true></ul></div><div class=pull-right style="padding: 20px 15px"><select ng-model=limit class=form-control><option value=5>5</option><option value=10>10</option><option value=25>25</option><option value=all>all</option></select></div></div><div class=pull-right><div class=radio style="margin-left: -10px"><label><input ng-model=isPagination type=radio name=optradio checked ng-value=true ng-change=selectType()> Pagination</label></div><div class=radio><label><input ng-model=isPagination type=radio name=optradio ng-value=false ng-change=selectType()> Infinity scroll</label></div></div></div></div><div class=container><table class="table table-bordered table-striped"><thead><tr><th><input type=checkbox ng-model=isAllSelected ng-change=selectAll()></th><th ng-click="sortType = \'id\'; sortReverse = !sortReverse">Id <span ng-show="sortType == \'id\' && !sortReverse">+</span> <span ng-show="sortType == \'id\' && sortReverse">-</span></th><th ng-click="sortType = \'firstName\'; sortReverse = !sortReverse">First Name <span ng-show="sortType == \'firstName\' && !sortReverse">+</span> <span ng-show="sortType == \'firstName\' && sortReverse">-</span></th><th ng-click="sortType = \'lastName\'; sortReverse = !sortReverse">Last Name <span ng-show="sortType == \'lastName\' && !sortReverse">+</span> <span ng-show="sortType == \'lastName\' && sortReverse">-</span></th><th ng-click="sortType = \'email\'; sortReverse = !sortReverse">Email <span ng-show="sortType == \'email\' && !sortReverse">+</span> <span ng-show="sortType == \'email\' && sortReverse">-</span></th><th ng-click="sortType = \'age\'; sortReverse = !sortReverse">Age <span ng-show="sortType == \'age\' && !sortReverse">+</span> <span ng-show="sortType == \'age\' && sortReverse">-</span></th><th></th></tr></thead><tbody><tr><td></td><td><input ng-model=searchTerm.id class=form-control></td><td><input ng-model=searchTerm.firstName class=form-control></td><td><input ng-model=searchTerm.lastName class=form-control></td><td><input ng-model=searchTerm.email class=form-control></td><td style="width: 120px"><select ng-model=ageRange class=form-control><option value=10-20>10-20</option><option value=21-30>21-30</option><option value=31-40>31-40</option><option value=40+>40+</option><option value=all>all</option></select></td><td></td></tr><tr ng-repeat="user in userList"><td><input type=checkbox ng-model=checkboxes[user.id] ng-change=selectUser(user.id)></td><td>{{ user.id }}</td><td><div edit-in-place=user.firstName on-save=editInPlaceSave></div></td><td><div edit-in-place=user.lastName on-save=editInPlaceSave></div></td><td><div edit-in-place=user.email on-save=editInPlaceSave></div></td><td><div edit-in-place=user.age on-save=editInPlaceSave type=number></div></td><td><button class="btn btn-info btn-circle" ng-click=userEdit(user) uib-tooltip=Edit>e</button> <button class="btn btn-danger btn-circle" ng-click=userDelete(user) uib-tooltip=Remove>d</button></td></tr></tbody></table></div></div></div>'),e.put("app/services/dialog/confirm/confirm.dialog.html",'<div class=modal-header><h3 class=modal-title>{{title}}</h3></div><div class=modal-body>{{descr}}</div><div class=modal-footer><button class="btn btn-primary" type=button ng-click=ok()>OK</button> <button class="btn btn-warning" type=button ng-click=cancel()>Cancel</button></div>'),e.put("app/services/dialog/userEdit/user.edit.dialog.html",'<div class=modal-header><h3 class=modal-title>Edit item</h3></div><div class=modal-body><form><div class=form-group><label for=firstName>First Name</label><input ng-model=userModel.firstName class=form-control id=firstName placeholder="First Name"></div><div class=form-group><label for=lastName>Last Name</label><input ng-model=userModel.lastName class=form-control id=lastName placeholder="Last Name"></div><div class=form-group><label for=email>Email address</label><input ng-model=userModel.email class=form-control id=email placeholder=Email></div><div class=form-group><label for=age>Age</label><input ng-model=userModel.age class=form-control id=age placeholder=Age type=number></div></form></div><div class=modal-footer><button class="btn btn-primary" type=button ng-click=ok()>OK</button> <button class="btn btn-warning" type=button ng-click=cancel()>Cancel</button></div>')}]);
//# sourceMappingURL=../maps/scripts/app-443439b371.js.map
