<div id="wholeModal">
  <!-- Modal -->
    <div ng-init="init()">
    </div>  
    <div class="panel-heading">
        <h4 class="panel-title">
            <span class="icon-users-outline"></span>
            <label>服务调整</label>
            <span class="pull-right close" ng-click="cancel()">&#x2715</span>
        </h4>
    </div>
        <div class="panel-body">
                        <form>                        
                            <div class="modal-left">

                                    <!-- 服务表格 --> 
<!--                                     <div class="input-group input-customized">
                                        <label>提供商</label>
                                        <input ng-model="merchantInfo.MRCHNT_NM"></input> 
                                        <p class="btn btn-customized" ng-click="queryInfo(serviceInfo.MRCHNT_NM)">
                                            <label>查询</label>  
                                        </p>                                                                    
                                    </div>  -->
                                    <div class="input-group input-customized">
                                        <label>服务名称</label>
                                        <input ng-model="serviceInfoDated.CMB_NM"></input>
                                    </div>                                    
                                    <div class="input-group input-customized">
                                        <label>提供商</label>
                                        <input type="text" ng-model="serviceInfoDated.MRCHNT_NM"/>
                                    </div>                                                                        
                                    <div class="input-group input-customized">
                                        <label>覆盖范围</label>
                                        <select ng-model="serviceInfoDated.MRCHNT_CVR"
                                        ng-options="area.name as area.name for area in areacategories"></select>   
                                    </div>
                                    <div class="input-group input-customized">
                                        <label>原价</label>
                                        <input ng-model="serviceInfoDated.CMB_ORGN_PRC"></input>                                   
                                    </div>                                     
                                    <div class="input-group input-customized">
                                        <label>单价</label>
                                        <input ng-model="serviceInfoDated.CMB_PRC"></input>                                   
                                    </div>
                                    <div class="input-group input-customized">
                                        <label>转移价格</label>
                                        <input ng-model="serviceInfoDated.CMB_TRANS_PRC"></input>                                   
                                    </div>    
                                    <div class="input-group input-customized">
                                        <label>提供方式</label>
                                        <input ng-model="serviceInfoDated.CMB_PRVD_MTHD"></input>                                                                                               
                                    </div> 
                                    <div class="input-group input-customized">
                                        <label>介绍</label>
                                        <input ng-model="serviceInfoDated.CMB_DSCRPT"></input>
                                    </div>                                    
                                   <div class="input-group input-customized">
                                        <label>细节介绍</label>
                                        <input ng-model="serviceInfoDated.CMB_DTL"></input>
                                    </div>                                                                 
                            </div>
                            <div class="modal-right">                        
                                    <!-- 服务表格 --> 
                                    <div class="input-group input-customized">
                                        <label>服务类型</label>

                                       <select ng-model="serviceInfoDated.MRCHNT_TP"
                                                ng-options="serviceType.SRVC_TP_NM as serviceType.SRVC_TP_NM for serviceType in serviceTypes "
                                                ng-blur="queryServiceID()"/>
                                    </div>
                                    <div class="input-group input-customized">
                                        <label>联系电话</label>
                                        <input ng-model="serviceInfoDated.MRCHNT_PHN"></input>                                    
                                    </div>
                                    <div class="input-group input-customized">
                                        <label>服务方式</label>
                                        <select ng-model="serviceInfoDated.CMB_MTHD"
                                        ng-options="service.option as service.option for service in servicecategories">                                         
                                        </select>    
                                    </div>
                                    <div class="input-group input-customized">
                                        <label>链接</label>
                                        <input ng-model="serviceInfoDated.CMB_LNK"></input>
                                    </div>                                    
                                    <label>标签</label>   
                                        <div ng-repeat= "tag in allTags">
                                            <td> <input type="checkbox" id={{tag.TAG_ID}} ng-checked="isSelected(tag.TAG_ID)" ng-click="updateSelection($event,tag.TAG_ID)"/>{{tag.TAG_NM}} 
                                            </td>  
                                        </div> 
                                    <label>标签</label>   
                                        <div ng-repeat= "method in allPaymentMethods">
                                            <td> <input type="checkbox" id={{method.PAY_MTHD_ID}} ng-checked="isSelectedPayment(method.PAY_MTHD_ID)" ng-click="updateSelectionPayment($event,method.PAY_MTHD_ID)"/>{{method.PAY_MTHD_NM}} 
                                            </td>  
                                        </div>                                                          
                            </div>
                        </form>

                         <div>
                            <form name="myForm" action="fileupload" class="dropzone" id="modal-dropzone" method="post" class = "form single-dropzone" enctype="multipart/form-data">
                              <br>
                              <input type="hidden" name="_token" value="{{ csrf_token() }}">
                              <button id="modalupload" class="btn btn-default margin-t-5" ><i class="fa fa-upload" ></i> 上传图片</button>                                                                                                    
                            </form>
                        </div>   

                         <div>
                            <form name="myForm" action="fileupload" class="dropzone" id="modalthumb-dropzone" method="post" class = "form single-dropzone" enctype="multipart/form-data">
                              <br>
                              <input type="hidden" name="_token" value="{{ csrf_token() }}">
                              <button id="modaluploadthumb" class="btn btn-default margin-t-5" ><i class="fa fa-upload" ></i> 上传小图片</button>                                                                                                    
                            </form> 
                        </div> 

                        </form>
                            <div class="input-group input-customized">
                                <label>备注</label>
                                <textarea rows="3" ng-model="serviceInfoDated.CMB_RMRK"></textarea>
                            </div>  
                        </form>      
 

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-customized" ng-click="update(serviceID,serviceInfoDated,selected,selectedPayment)">更新</button>                                          
        </div>
      </div>
      
    </div>
  </div>    