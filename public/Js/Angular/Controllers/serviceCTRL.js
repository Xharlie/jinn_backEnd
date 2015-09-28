/**
 * Created by waylon on 9/8/15.
 */

app.controller('serviceCTRL', function($scope,serviceFactory) {

    /********************************************     validation       ***************************************************/

    /********************************************       utility       ****************************************************/
    var fileName=null;

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



    $scope.iconAndAction = {"serviceIconAction":util.serviceIconAction};
    
    $scope.openModal = function(){
        $("#serviceModal").modal({backdrop: true});
    }

     $scope.selected = [];

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

    /********************************************      initial function     *****************************************/

    function getService(){
        serviceFactory.getService().success(function(data){
            $scope.services = data;
        });
    };

    function getServiceTypes(){
        serviceFactory.getServiceTypes().success(function(data){
            $scope.serviceTypes = data;
        });
    };

    var getAllTags = function (){
        serviceFactory.getAllTags().success(function(data){
            $scope.allTags=data;
        });
    }
    /********************************************     common initial setting     *****************************************/
    $scope.serviceInfo=null;
    getService();
    getServiceTypes();
    getAllTags();

    setInterval(
        function(){
            getService();
            getServiceTypes(); 
            getAllTags();           
        }
        ,600000
    );

    /************** ********************************** submit  ********************************** *************/
    $scope.submit = function(serviceInfo,merchantInfo,selected){


        var now = dateUtil.tstmpFormat(new Date());
        str = selected.toString();

        var combo = {
            CMB_NM:serviceInfo.CMB_NM,
            CMB_MTHD:serviceInfo.CMB_MTHD, 
            CMB_PRC:serviceInfo.CMB_PRC,
            CMB_RMRK:serviceInfo.CMB_RMRK,           
            CMB_STATUS:'开通',
            CMB_INPT_TSTMP:now,  
            CMB_PIC:fileName,
            CMB_TAGS:str        
        } 

        var merchant={
            MRCHNT_NM:merchantInfo.MRCHNT_NM,
            MRCHNT_PHN:merchantInfo.MRCHNT_PHN,
            MRCHNT_CVR:merchantInfo.MRCHNT_CVR,
            MRCHNT_TP:merchantInfo.MRCHNT_TP            
        }

            serviceFactory.postServiceInfo(combo,merchant).success(function(data){
                $("#serviceModal").modal('hide');
            });             
            
    };

     // $scope.queryInfo=function(merchantName){
     //    serviceFactory.queryMerchant(merchantName).success(function(data){
     //        $scope.merchantInfo = data[0];
     //    });
     // };

     $scope.queryInfo=function(){

        serviceFactory.queryMerchant($scope.merchantInfo.MRCHNT_NM).success(function(data){
            var tmp = $scope.merchantInfo.MRCHNT_NM;

            if(data[0]==null)
            {
                $scope.merchantAlreadyExist = false;
                if($scope.merchantInfo.MRCHNT_CVR!=null)
                {
                    $scope.merchantInfo.MRCHNT_CVR=null;
                }
                if($scope.merchantInfo.MRCHNT_TP!=null)
                {
                    $scope.merchantInfo.MRCHNT_TP=null;
                }
                if($scope.merchantInfo.MRCHNT_PHN!=null)
                {
                    $scope.merchantInfo.MRCHNT_PHN=null;
                }
            }
            else
            {
                $scope.merchantAlreadyExist = true;
                $scope.merchantInfo = data[0];                
            }

        });

     };

     $scope.uploadPic=function(uploadPic){
        show('guess');
     };    


    $scope.checkUsername = function() {
        if ($scope.username === 'hellobug') {
            $scope.usernameAlreadyExist = true;
            }
        else
        {
            $scope.usernameAlreadyExist = false;
        }
    }


    $(document).ready(function() {
     
             var date = new Date();
      //Dropzone.js Options - Upload an image via AJAX.
      Dropzone.options.myDropzone = {
         url: "fileupload",

        uploadMultiple: false,
        // previewTemplate: '',
        addRemoveLinks: false,
        // maxFiles: 1,
        dictDefaultMessage: '',

        acceptedFiles: "image/*",

        headers: {
            'X-CSRF-Token': $('meta[name="token"]').attr('content')
        },


        sending: function(file, xhr, formData) {
            // Pass token. You can use the same method to pass any other values as well such as a id to associate the image with for example.
            formData.append("_token", $('[name=_token]').val()); // Laravel expect the token post value to be named _token by default
        },

        uploadprogress: function(progress, bytesSent) {
            console.log(progress);
        },

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

      var myDropzone = new Dropzone("#my-dropzone");
     
      $('#upload-submit').on('click', function(e) {
        e.preventDefault();
        //trigger file upload select
        $("#my-dropzone").trigger('click');
      });
     
    });
     
    //we want to manually init the dropzone.
    Dropzone.autoDiscover = false;     
});