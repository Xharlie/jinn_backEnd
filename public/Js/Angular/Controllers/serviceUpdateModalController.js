app.controller('serviceUpdateModalController', function($scope, $http, $modalInstance, serviceFactory,serviceID){


	    /********************************************       utility       ****************************************************/
		//we want to manually init the dropzone.
		Dropzone.autoDiscover = false;

	    $scope.areacategories = [
		    		{id:1,name:"西安高新区"},
		    		{id:2,name:"西安雁塔区"},
		    		{id:3,name:"西安莲湖区"},
		    		{id:4,name:"西安未央区"}
	    ];

	     $scope.servicecategories=[
	     		{id:1,option:"上门服务"},
	     		{id:2,option:"快递取件"}
	     ];
	     $scope.selected = [];
	     $scope.serviceID = serviceID;
	 
	    $scope.cancel = function () {
	        $modalInstance.dismiss('cancel');
	        parent.location.reload();
	    };	 

	     var updateSelected = function(action,id){
	         if(action == 'add' && $scope.selected.indexOf(id) == -1){
	             $scope.selected.push(id);
	         }
	         if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
	             var idx = $scope.selected.indexOf(id);
	             $scope.selected.splice(idx,1);
	         }
	     }
	 
	     $scope.updateSelection = function($event, id){
	      	 var checkbox = $event.target;
	         var action = (checkbox.checked?'add':'remove');
	         updateSelected(action,id);
	     }
	 
	    $scope.isSelected = function(id){
	        return $scope.selected.indexOf(id)>=0;
	     }	    


    /****************************************** selected paymethod ************************************************************/
     $scope.selectedPayment = [];

     var updateSelectedPayment = function(action,id){
         if(action == 'add' && $scope.selectedPayment.indexOf(id) == -1){
             $scope.selectedPayment.push(id);
         }
         if(action == 'remove' && $scope.selectedPayment.indexOf(id)!=-1){
             var idx = $scope.selectedPayment.indexOf(id);
             $scope.selectedPayment.splice(idx,1);
         }
     }
 
     $scope.updateSelectionPayment = function($event, id){
         var checkbox = $event.target;
         var action = (checkbox.checked?'add':'remove');
         updateSelectedPayment(action,id);
     }
 
    $scope.isSelectedPayment = function(id){
        return $scope.selectedPayment.indexOf(id)>=0;
     } 
	    /********************************************      initial function     *****************************************/
	    var fileName=null;
	    var thumbfileName=null;
		var getServiceInfo=function(serviceID){
	        serviceFactory.getServiceInfo(serviceID).success(function(data){
	            $scope.serviceInfoDated = data[0];         
	        });				
		}

	    function getServiceTypes(){
	        serviceFactory.getServiceTypes().success(function(data){
	            $scope.serviceTypes = data;
	        });
	    };

		var getHotelRelation = function (serviceID) {
	        serviceFactory.getHotelRelation(serviceID).success(function(data){
	            $scope.hotelRelations = data;
	            for (i=0;i<data.length;i++)
	            {
	            	$scope.selected[i]=data[i].HTL_ID;
	            }
	        });					
		}

		var getAllHotel = function (){
			serviceFactory.getAllHotel().success(function(data){
				$scope.allhotels=data;
			});
		}

		var getAllTags = function (){
			serviceFactory.getAllTags().success(function(data){

				$scope.allTags=data;
			});
		}	

		var getTags = function(serviceID){
			serviceFactory.getTags(serviceID).success(function(data){
				$scope.Tags=data;
				if(data[0].CMB_TAGS!=null)
				{
					str=data[0].CMB_TAGS.split(",");
					for (i=0;i<str.length;i++)
					{
						$scope.selected[i]=parseInt(str[i]);
					}					
				}

			});
		}

    var getAllPaymentMethods = function(){
      serviceFactory.getAllPaymentMethods().success(function(data){
          $scope.allPaymentMethods=data;
      });
    }

		var getPaymethods = function(serviceID){
			serviceFactory.getPaymethods(serviceID).success(function(data){
				$scope.Paymethods=data;
				if(data[0].CMB_PAY_MTHD!=null)
				{
					paystr=data[0].CMB_PAY_MTHD.split(",");
					for (i=0;i<str.length;i++)
					{
						$scope.selectedPayment[i]=parseInt(paystr[i]);
					}					
				}

			});
		}			
	    /********************************************     common initial setting     *****************************************/
	    $scope.serviceInfoDated=null;

	    getServiceInfo(serviceID);
	    getServiceTypes();
		getAllHotel();	    
	    getHotelRelation(serviceID);
	    getAllTags();
	    getTags(serviceID);
	    getPaymethods(serviceID);
		getAllPaymentMethods();

	    setInterval(
	        function(){
			    getServiceInfo(serviceID);
			    getServiceTypes();
			    getAllHotel();
			    getHotelRelation(serviceID); 
			    getAllTags();
			    getTags(serviceID);   
	    		getPaymethods(serviceID);	
				getAllPaymentMethods();	    				             
	        }
	        ,600000
	    );
    /************** ********************************** update  ********************************** *************/
    var serviceTypeID=null;

		$scope.update=function(id,serviceInfoDated,selected,selectedPayment){
        	var now = dateUtil.tstmpFormat(new Date());	
        	str = selected.toString();
        	paystr = selectedPayment.toString();


        	if(serviceTypeID==null)
        	{
        		serviceTypeID=serviceInfoDated.SRVC_TP_ID;
        	}

        	if(thumbfileName==null)
        	{
        		thumbfileName=serviceInfoDated.CMB_THMBNL;
        	}

        	if(fileName==null)
        	{
        		fileName=serviceInfoDated.CMB_PIC;
        	}


	        var service = {
	            CMB_NM:serviceInfoDated.CMB_NM,
	            MRCHNT_TP:serviceInfoDated.MRCHNT_TP,
	            MRCHNT_NM:serviceInfoDated.MRCHNT_NM,
	            MRCHNT_PHN:serviceInfoDated.MRCHNT_PHN,
	            MRCHNT_CVR:serviceInfoDated.MRCHNT_CVR,
	            CMB_MTHD:serviceInfoDated.CMB_MTHD, 
	            CMB_PRC:serviceInfoDated.CMB_PRC,  
	            CMB_RMRK:serviceInfoDated.CMB_RMRK,         
				CMB_UPDT_TSTMP:now,	                        
            	CMB_PIC:fileName,  
            	CMB_TAGS:str,
            	CMB_ORGN_PRC:serviceInfoDated.CMB_ORGN_PRC,
            	CMB_TRANS_PRC:serviceInfoDated.CMB_TRANS_PRC,
            	CMB_THMBNL:thumbfileName,
            	SRVC_TP_ID:serviceTypeID,
            	CMB_PAY_MTHD:paystr,
            	CMB_DSCRPT:serviceInfoDated.CMB_DSCRPT,
            	CMB_DTL:serviceInfoDated.CMB_DTL,
            	CMB_PRVD_MTHD:serviceInfoDated.CMB_PRVD_MTHD,
            	CMB_LNK:serviceInfoDated.CMB_LNK

	        } 

	        serviceFactory.updateServiceInfo(id,service).success(function(data){
	             $modalInstance.close();
				parent.location.reload();	             
	        }); 			
		};  

    $scope.queryServiceID = function(){
      serviceFactory.queryServiceID($scope.serviceInfoDated.MRCHNT_TP).success(function(data){
            serviceTypeID=data[0].SRVC_TP_ID;
      });
    };

		$scope.change=function(id,selected){
	        serviceFactory.postNewRelation(id,selected).success(function(data){
	            $modalInstance.close();
				parent.location.reload();	            
	        });
	     };

	     $scope.deleteService=function(id){
	     	serviceFactory.deleteService(id).success(function(data){
	     		$modalInstance.close();
				parent.location.reload();	     		
	     	});
	     };

    $scope.init = function() {
		if ($('#modal-dropzone').length) {
				  //Dropzone.js Options - Upload an image via AJAX.
				 url: "fileupload",

				  Dropzone.options.modalDropzone = {
				    uploadMultiple: false,
				    // previewTemplate: '',
				    addRemoveLinks: false,
				    // maxFiles: 1,
				    acceptedFiles: "image/*",

			        sending: function(file, xhr, formData) {
			            // Pass token. You can use the same method to pass any other values as well such as a id to associate the image with for example.
			            formData.append("_token", $('[name=_token]').val()); // Laravel expect the token post value to be named _token by default
			        },

			        uploadprogress: function(progress, bytesSent) {
			            console.log(progress);
			        },

				    dictDefaultMessage: '',
				    init: function() {
				      this.on("addedfile", function(file) {
				        // console.log('addedfile...');
				      });
				      this.on("thumbnail", function(file, dataUrl) {
				        // console.log('thumbnail...');
				        $('.dz-image-preview').hide();
				        $('.dz-file-preview').hide();
				      });
				      this.on("success", function(file, res) {
				        console.log('upload success...');
				        $('#img-thumb').attr('src', res.path);
				        $('input[name="pic_url"]').val(res.path);
		            	fileName=file.name;		        
				      });
				    }
				  };
				  var modalDropzone = new Dropzone("#modal-dropzone");
				  
				  $('#modalupload').on('click', function(e) {
				    e.preventDefault();
				    //trigger file upload select
				    $("#modal-dropzone").trigger('click');
				  });
		}

		if ($('#modalthumb-dropzone').length) {
				  //Dropzone.js Options - Upload an image via AJAX.
				 url: "fileupload",

				  Dropzone.options.modalthumbDropzone = {
				    uploadMultiple: false,
				    // previewTemplate: '',
				    addRemoveLinks: false,
				    // maxFiles: 1,
				    acceptedFiles: "image/*",

			        sending: function(file, xhr, formData) {
			            // Pass token. You can use the same method to pass any other values as well such as a id to associate the image with for example.
			            formData.append("_token", $('[name=_token]').val()); // Laravel expect the token post value to be named _token by default
			        },

			        uploadprogress: function(progress, bytesSent) {
			            console.log(progress);
			        },

				    dictDefaultMessage: '',
				    init: function() {
				      this.on("addedfile", function(file) {
				        // console.log('addedfile...');
				      });
				      this.on("thumbnail", function(file, dataUrl) {
				        // console.log('thumbnail...');
				        $('.dz-image-preview').hide();
				        $('.dz-file-preview').hide();
				      });
				      this.on("success", function(file, res) {
				        console.log('upload success...');
				        $('#img-thumb').attr('src', res.path);
				        $('input[name="pic_url"]').val(res.path);
		            	thumbfileName=file.name;		        
				      });
				    }
				  };
				  var modalthumbDropzone = new Dropzone("#modalthumb-dropzone");
				  
				  $('#modaluploadthumb').on('click', function(e) {
				    e.preventDefault();
				    //trigger file upload select
				    $("#modalthumb-dropzone").trigger('click');
				  });
		}		
	}
	$modalInstance.opened.then($scope.init);


		 
	     
	
	}
)