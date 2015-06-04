/**
 * @ngdoc function
 * @name connectuiApp.role:ProgramController
 * @description
 * # ProgramController
 * Controller of the connectuiApp.program
 */
(function() {
    'use strict';

    angular.module('connectuiApp.program')
        .controller('ProgramController', ProgramController);

    ProgramController.$inject = ['$scope', '$compile', '$state', '$modal','logger', 'moduleHelper',  'ProgramService', '$stateParams', '$rootScope', '$cookieStore','BGXUtil'];

    /* @ngInject */
    function ProgramController($scope, $compile, $state, $modal,logger, moduleHelperProvider,  ProgramService, $stateParams, $rootScope, $cookieStore, BGXUtil) {

        /* jshint validthis: true */
        var vm = this;
        var programModuleConfig = [];
        var programListConfig = [];
        var datasourceConfig = [];
        var httpConfig = [];

        vm.id = $stateParams.id; // program id for edit and view role
        vm.document = [];
        /* Scope variables */
        vm.title = $state.current.title;
        vm.dtOptions = [];
        vm.documentTableInstance = [];
        vm.filter = [];
        vm.sorting = [];
        var selectedCookieValue = $cookieStore.get('program');
        vm.selectedItemsValue = !_.isEmpty(selectedCookieValue) ? selectedCookieValue : [];
        vm.assignmentArr = [];
        vm.currentUserType = '';
        vm.isInternal = isInternal;
        init();
        vm.getPrograms = getPrograms;
        vm.getFilteredPrograms = getFilteredPrograms;
        vm.selectProgram = selectProgram;
        vm.classForSelectedProgram = classForSelectedProgram;
        vm.isRoleAssigned = isRoleAssigned;
        vm.isShipperAssigned = isShipperAssigned;
        vm.isProgramAssigned = isProgramAssigned;
        vm.programSelected = false;
        vm.searchDocuments = false;
        vm.assignRole = assignRole;
        vm.isAllRolesSelected=isAllRolesSelected;
        vm.selectAllRoles=selectAllRoles;
        vm.isAllProgramsSelected=isAllProgramsSelected;
        vm.selectAllPrograms=selectAllPrograms;
        vm.isAllShippersSelected=isAllShippersSelected;
        vm.selectAllShippers=selectAllShippers;
        vm.assignProgram = assignProgram;
        vm.assignShipper = assignShipper;
        vm.search = search;
        vm.showGrid = showGrid;
        vm.back = back;
        vm.sort = sort;
        vm.getViewDocument = getViewDocument;
        vm.getEditDocument = getEditDocument;
        vm.createDocument = createDocument;
        vm.updateDocument = updateDocument;
        vm.getUploadDocument = getUploadDocument;
        vm.allRoles =  [];
        vm.allPrograms =  [];
        vm.allShippers =  [];
        vm.document={};
        vm.document.assignedRoles = [];
        vm.document.assignedPrograms = [];
        vm.document.assignedShippers = [];
        vm.loadMasterData = loadMasterData;
        vm.documentModel = new Object();
        vm.downloadXls = downloadXls;
        vm.dtInstanceCallback = dtInstanceCallback;
        if ($cookieStore.get('programId') != null && $cookieStore.get('programId') != undefined && $cookieStore.get('programId') != '') {
            vm.programId = $cookieStore.get('programId');
        }

        if ($cookieStore.get('documentBack') == 'true') {
            vm.programSelected = true;
            vm.searchDocuments = true;
        }

        $cookieStore.put('documentBack', 'false');

        if (vm.selectedItemsValue.length > 0) {
            vm.search(vm.selectedItemsValue);
        } else {
            vm.search([]);
        }

        /* ///////////////// Function Area /////////////////// */
        function showGrid() {
            return vm.programSelected || vm.searchDocuments;
        }

        function search(selectedItems) {
            //vm.programId='';
            //$cookieStore.put('programId','');
            vm.programSelected = false;
            vm.searchDocuments = true;
            vm.selectedItemsValue = selectedItems;
            programListConfig.ajax.data.filter = angular.toJson(selectedItems);
            vm.getPrograms();
            //programListConfig.ajax.data.id=vm.programId;			
            programListConfig.ajax.data.id = vm.programId;
        }

        function back() {
            $cookieStore.put('documentBack', 'true');
            $state.go('root.program.list');
        }

        /* Start - AJAX call for server-side sorting */
        function sort(selectedItems) {
                programListConfig.ajax.data.sort = angular.toJson(selectedItems);
            }
            /* End - AJAX call for server-side sorting */

        function isInternal() {
                return angular.lowercase(vm.currentUserType) == 'internal';
            }
            /********** Private Function Area *****************/
        function init() {
            programModuleConfig = moduleHelperProvider.getTableConfig('program');
            datasourceConfig = moduleHelperProvider.getDataSource('program');
            httpConfig = moduleHelperProvider.getHttpConfig()
            programListConfig = programModuleConfig.list;
            vm.currentUserType = $rootScope.globals.currentUser.usertype;
            vm.sorting = programModuleConfig.sorting;
            var filterList = programModuleConfig.filter;
            vm.filter = [];
            _.each(filterList, function(value, key, list) {
                if (vm.currentUserType == 'Internal') {
                    vm.filter.push(value);
                } else if (vm.currentUserType == 'Shipper') {
                    if (value.name != 'shipper') {
                        vm.filter.push(value);
                    }

                }
            });

            addFilterConfiguration();
            getDocumentList();
        }

        function getDocumentList() {
            var checkIfColumnExist = false;
            var columns = programListConfig.aoColumns;
            _.each(columns, function(value, key, list) {
                if (value.sTitle == 'Document') {
                    checkIfColumnExist = true;
                    return checkIfColumnExist;
                }
            });

            if (!checkIfColumnExist) {
                columns.splice(0, 0, {
                    "mData": "name",
                    "sTitle": "Document",
                    //"className": "dt-body-center dt-head-center",
                    "render": function(data, type, row) {
                        return '<a href="#" class="ng-scope" ui-sref="root.program.view({id: ' + row.id + '})" >' + row.name + '</a>';
                    }
                });
            }
            programListConfig.createdRow = tblEventCreatedRow;
            vm.dtOptions = programListConfig;
            colReorder: {
                order: [6, 1, 2, 3, 4, 5]
            }

            return vm.dtOptions;
        }

        function dtInstanceCallback(dtInstance) {
            vm.documentTableInstance = dtInstance;
        }

        /* Add shipper filter in filterlist*/
        function addFilterConfiguration() {
                var list = {
                    method: datasourceConfig.masterlist.method,
                    url: datasourceConfig.masterlist.url,
                    timeout: httpConfig.timeout
                };
                ProgramService.getObject(list).then(function(response) {
                	if(response.errorCode=='success'){
                		 var roleData = [];
                         _.each(response.result.roleList, function(obj, key) {
                             roleData.push(obj.name);
                         });
                         var shipperData = [];
                         _.each(response.result.shipperList, function(obj, key, list) {
                             shipperData.push(obj.name);
                         });

                         var programData = [];
                         _.each(response.result.programList, function(obj, key, list) {
                             programData.push(obj.name);
                         });

                         _.each(vm.filter, function(value, key, list) {
                             var filterType = value.name;
                             if (filterType === 'program') {
                                 value.data = programData;
                             } else if (filterType === 'role') {
                                 value.data = roleData;
                             } else if (filterType === 'shipper') {
                                 value.data = shipperData;
                             }

                         });
                	}else{
                		 logger.error("fetch programs error ", error);
                	}
                   

                }, function(error) {
                    logger.error("fetch programs error ", error);
                });

            }
            /*Check if shipper already exist in filter list */
        function checkShipperExistinArray(name) {
            if (vm.filter == undefined || vm.filter.length == 0) return false;
            return $.grep(vm.filter, function(n, i) {
                return (n.name == name);
            })[0];
        }

        /* compile datatable html for each row with angular */
        function tblEventCreatedRow(row, data, index) {
            $compile(angular.element(row).contents())($scope);
        }

        function getFilteredPrograms() {
            vm.filteredPrograms = [];
            var selectedProgams = [];
            _.each(vm.selectedItemsValue, function(selectedItem, key) {
                if (selectedItem.key == 'program') {
                    selectedProgams.push(selectedItem.value);
                }

            });
            if (selectedProgams.length > 0) {
                _.each(vm.allPrograms, function(program, key) {
                    if (selectedProgams.indexOf(program.name) != -1) {
                        vm.filteredPrograms.push(program);
                    }

                });
            } else {
                vm.filteredPrograms = vm.allPrograms;
            }

            if (vm.filteredPrograms.length > 0) {
                var matchFound = false;
                if (vm.programId != undefined && vm.programId != '') {
                    _.forEach(vm.filteredPrograms, function(obj) {
                        if (obj.id == $cookieStore.get('programId')) {
                            matchFound = true;
                            vm.programId = obj.id;
                            $cookieStore.put('programId', vm.programId);
                            vm.programSelected = true;

                        }
                    });

                }
                if (!matchFound) {
                    vm.programId = vm.filteredPrograms[0].id;
                    $cookieStore.put('programId', vm.programId);
                    vm.programSelected = true;
                }

            } else {
                vm.programId = '';
                $cookieStore.put('programId', '');
                vm.programSelected = false;
            }
            return vm.filteredPrograms;

        }

        function getPrograms() {
            if (vm.allPrograms == undefined || vm.allPrograms.length == 0) {
                var list = {
                    method: datasourceConfig.listPrograms.method,
                    url: datasourceConfig.listPrograms.url,
                    timeout: httpConfig.timeout
                };
                ProgramService.getList(list).then(function(response) {
                    vm.allPrograms = response.aoData;
                    vm.filteredPrograms = vm.allPrograms;
                    vm.filteredPrograms = vm.getFilteredPrograms();
                }, function(error) {
                    logger.error("fetch programs error ", error);
                });
            } else {
                vm.filteredPrograms = vm.getFilteredPrograms();
            }

            return vm.filteredPrograms;
        }

        //code for edit document		
        function getEditDocument(id) {
            var list = {
                method: datasourceConfig.masterlist.method,
                url: datasourceConfig.masterlist.url,
                timeout: httpConfig.timeout
            };
            ProgramService.getObject(list).then(function(response) {
                if (response.errorCode  == "success") {
                    vm.allRoles = response.result.roleList;
                    vm.allPrograms = response.result.programList;
                    vm.allShippers = response.result.shipperList;
                    var dataObj = {
                        "id": id
                    };
                    var viewDoc = {
                        method: datasourceConfig.viewDocument.method,
                        url: datasourceConfig.viewDocument.url,
                        timeout: httpConfig.timeout,
                        data: dataObj
                    };
                    ProgramService.getObject(viewDoc).then(function(response) {
                        if ((response.errorCode == 'success')) {
                            vm.document = response.result;      
                        }else{
                        	logger.error("Document not found");
                        }
     
                    }, function(error) {
                        logger.error("Error while fetching document ", error);
                    });

                }else{
                	logger.error("Error While feching tag list ");
                }

            }, function(error) {
                logger.error("Error While feching tag list ", error);
            });


        }

        //code for view role		
        function getViewDocument(id) {
                var dataObj = {
                    "id": id
                };
                var list = {
                    method: datasourceConfig.viewDocument.method,
                    url: datasourceConfig.viewDocument.url,
                    timeout: httpConfig.timeout,
                    data: dataObj
                };
                ProgramService.getObject(list).then(function(response) {
                    if ((response.errorCode == 'success')) {
                        vm.document = response.result;                         
                    }else{
                    	logger.error("Document not found");
                    }
 
                }, function(error) {
                    logger.error("Error while fetching document ", error);
                });


            }
            //code for upload document add url
        function createDocument(isDocUpload) {
            var valid = true;
            if (isDocUpload == 'true') {
                if (document.getElementById('documentFile').value == "") {
                    logger.error("Please select document to upload.");
                    valid = false;
                }
            } else {
                document.getElementById('urlTitle').value = document.getElementById('urlTitle').value.trim();
                document.getElementById('url').value = document.getElementById('url').value.trim();

                if (document.getElementById('urlTitle').value == "") {
                    logger.error("Please entrer url title.");
                    valid = false;
                } else if (document.getElementById('url').value == "") {
                    logger.error("Please entrer url.");
                    valid = false;
                }
            }

            if (_.isEmpty(vm.document.assignedRoles)) {
                logger.error("Please select atleast one role.");
                valid = false;
            }

            if (_.isEmpty(vm.document.assignedPrograms)) {
                logger.error("Please select atleast one program.");
                valid = false;
            }

            if (valid == false) {
                return false;
            }
            if (vm.uploadDocumentForm.$valid) {
                var dataObj = vm.document;
                if (isDocUpload == 'true') {
                    dataObj.type = 'file'
                    dataObj.name = document.getElementById('documentFile').value.replace(/^.*[\\\/]/, '');
                } else {
                    dataObj.type = 'url'
                    dataObj.name = document.getElementById('urlTitle').value;
                    dataObj.url = document.getElementById('url').value;
                }
    			
                var list = {
                    method: datasourceConfig.create.method,
                    url: datasourceConfig.create.url,
                    timeout: httpConfig.timeout,
                    params: dataObj
                };
                
                if (isDocUpload == 'true') {
                	var formData=new FormData();
        			formData.append("file",document.getElementById('documentFile').files[0]);
                    list.data = formData;                    
                    list.headers = {
                        'Content-type': 'multipart/form-data'
                    };
                }

                ProgramService.saveDocument(list, isDocUpload).then(function(response) {
                	BGXUtil.handleResponse(response,vm.title);
                	BGXUtil.goToListPage(response,'root.program.list');  
                }, function(error) {
                    logger.error("Document is not created ", error);
                });
                

            }
        }
        
        vm.openDialog = function (size,id) {
  		    var modalInstance = $modal.open({		     
  		      templateUrl: 'scripts/program/confirmation.html',
  		      controller: 'ProgramDialogController',
  		      controllerAs: 'vm',
  		      size: size,
  		       resolve: {
  		         documentId:  function () {
  		    	   return vm.id;
  		       }
  		     }
  		    });
  			 
  		  }; 
        
            //code for upload document add url
        function updateDocument() {
            var valid = true;
            if (vm.document.assignedRoles.length == 0) {
                logger.error("Please select atleast one role.");
                valid = false;
            }

            if (vm.document.assignedPrograms.length == 0) {
                logger.error("Please select atleast one program.");
                valid = false;
            }
            if (valid == false) {
                return false;
            }
            if (vm.uploadDocumentForm.$valid) {
                var dataObj = vm.document;
                var list = {
                    method: datasourceConfig.update.method,
                    url: datasourceConfig.update.url,
                    timeout: httpConfig.timeout,
                    data: dataObj
                };

                ProgramService.getObject(list).then(function(response) {
                	BGXUtil.handleResponse(response,vm.title);
                	BGXUtil.goToListPage(response,'root.program.list');  
                }, function(error) {
                    logger.error("Document is not updated ", error);
                });

            }
        }

        function loadMasterData() {
            var list = {
                method: datasourceConfig.masterlist.method,
                url: datasourceConfig.masterlist.url,
                timeout: httpConfig.timeout
            };
            ProgramService.getObject(list).then(function(response) {
                if ((response.errorCode == 'success')) {
                    vm.allRoles = response.result.roleList;
                    vm.allPrograms = response.result.programList;
                    vm.allShippers = response.result.shipperList;
                }else{
                	 logger.error("Error: Master Data not loaded.");
                }

            }, function(error) {
                logger.error("Error: Master Data not loaded ", error);
            });

        }

        function getUploadDocument() {
            vm.loadMasterData();
            
        }

        function isAssigned(list, id) {
            var result = false;
            _.each(list, function(obj, key) {
                if (obj.id == id) {
                    result = true;
                }
            });

            return result;
        }

        function isRoleAssigned(roleid) {

            if (vm.document != undefined) {
                return isAssigned(vm.document.assignedRoles, roleid);
            } else {
                return false;
            }

        }

        function isAllRolesSelected(){
        	 return (vm.document.assignedRoles.length ===vm.allRoles.length);
        } 
        function selectAllRoles(){
        	var isAllRolesSelected = !vm.isAllRolesSelected();
        	if(isAllRolesSelected){
        		vm.document.assignedRoles=vm.allRoles;
           	}else{
           		vm.document.assignedRoles=[]
           	}
        	 
        }
        function isAllProgramsSelected(){
       	  return (vm.document.assignedPrograms.length ===vm.allPrograms.length);
       } 
       function selectAllPrograms(){
       	var isAllProgramsSelected = !vm.isAllProgramsSelected();
       	if(isAllProgramsSelected){
       		vm.document.assignedPrograms=vm.allPrograms;
          	}else{
          		vm.document.assignedPrograms=[]
          	}
       	 
       }
       function isAllShippersSelected(){
        	 return (vm.document.assignedShippers.length ===vm.allShippers.length);
        } 
        function selectAllShippers(){
        	var isAllShippersSelected = !vm.isAllShippersSelected();
        	if(isAllShippersSelected){
        		vm.document.assignedShippers=vm.allShippers;
           	}else{
           		vm.document.assignedShippers=[]
           	}
        	 
        }
        function assignRole(roleid, roleName) {
            var result = false;
            _.each(vm.document.assignedRoles, function(obj, key) {
                if (obj.id == roleid) {
                    result = true;
                }
            });
            if (!result) {
                if (vm.document.assignedRoles == undefined) {
                    vm.document.assignedRoles = [];
                }
                vm.document.assignedRoles.push(new Object({
                    id: roleid,
                    name: roleName
                }));
            } else {
                var removedList = _.reject(vm.document.assignedRoles, function(obj) {
                    if (obj.id == roleid) {
                        return true;
                    }
                });
                vm.document.assignedRoles = removedList;

            }
            return result;
        }

        function assignShipper(id, name, item) {
            var result = false;
            _.each(vm.document.assignedShippers, function(obj, key) {
                if (obj.id == id) {
                    result = true;
                }
            });
            if (!result) {
                if (vm.document.assignedShippers == undefined) {
                    vm.document.assignedShippers = [];
                }
                vm.document.assignedShippers.push(new Object({
                    id: id,
                    name: name
                }));
            } else {
                var removedList = _.reject(vm.document.assignedShippers, function(obj) {
                    if (obj.id == id) {
                        return true;
                    }
                });
                vm.document.assignedShippers = removedList;

            }
            return result;
        }

        function assignProgram(id, name, item) {
            var result = false;
            _.each(vm.document.assignedPrograms, function(obj, key) {
                if (obj.id == id) {
                    result = true;
                }
            });
            if (!result) {
                if (vm.document.assignedPrograms == undefined) {
                    vm.document.assignedPrograms = [];
                }
                vm.document.assignedPrograms.push(new Object({
                    id: id,
                    name: name
                }));
            } else {
                var removedList = _.reject(vm.document.assignedPrograms, function(obj) {
                    if (obj.id == id) {
                        return true;
                    }
                });
                vm.document.assignedPrograms = removedList;

            }
            return result;
        }

        function isShipperAssigned(shipperid) {

            if (vm.document != undefined) {
                return isAssigned(vm.document.assignedShippers, shipperid);
            } else {
                return false;
            }

        }

        function isProgramAssigned(programId) {
            if (vm.document != undefined) {
                return isAssigned(vm.document.assignedPrograms, programId);
            } else {
                return false;
            }

        }

        function selectProgram(id) {
            vm.programSelected = true;
            vm.searchDocuments = false;
            vm.programId = id;
            $cookieStore.put('programId', id);
            programListConfig.ajax.data.id = id;
            vm.dtOptions = programListConfig;
            //vm.selectedItemsValue = [];
            programListConfig.ajax.data.filter = angular.toJson(vm.selectedItemsValue);

        }

        function classForSelectedProgram(id) {
            return (vm.programSelected && vm.programId == id) ? "fa fa-angle-right pull-right font18" : "";
        }

        //download Xls file from nomation list
        function downloadXls() {
            document.getElementById("downloadForm").action = datasourceConfig.download.method;
            document.getElementById("filterId").value = angular.toJson(vm.selectedItemsValue);
            document.getElementById("downloadForm").submit();
        }
    } /* close controller */

})();