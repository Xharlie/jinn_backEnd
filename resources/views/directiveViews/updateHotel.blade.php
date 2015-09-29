<div id="wholeModal">
  <!-- Modal -->
    <div class="panel-heading">
        <h4 class="panel-title">
            <span class="icon-users-outline"></span>
            <label>服务调整</label>
            <span class="pull-right close" ng-click="cancel()">&#x2715</span>
        </h4>
    </div>
                    <div class="modal-body">
                        <div>
                            <form>                        
                                <div class="modal-left">

                                        <!-- 酒店表格 --> 
                                        <div class="input-group input-customized">
                                            <label>酒店名称</label>
                                            <input ng-model="hotelInfoDated.HTL_NM"></input>
                                        </div>
                                        <div class="input-group input-customized">
                                            <label>联系人</label>
                                            <input ng-model="hotelInfoDated.HTL_PRM_CNTCT_NM"></input>                                
                                        </div>
                                        <div class="input-group input-customized">
                                            <label>第二联系人</label>
                                            <input ng-model="hotelInfoDated.HTL_SCD_CNTCT_NM"></input>                                
                                        </div>                                        
                                        <div class="input-group input-customized">
                                            <label>城市</label>
                                            <input ng-model="hotelInfoDated.HTL_CT"></input>   
                                        </div>
                                        <div class="input-group input-customized">
                                            <label>房间数</label>
                                            <input ng-model="hotelInfoDated.HTL_NM_OF_RM"></input>                                   
                                        </div>                                                               
                                       <div class="input-group input-customized">
                                            <label>旅馆地理编号</label>
                                            <input ng-model="hotelInfoDated.HTL_GEO_ID"></input>                                    
                                        </div>                                        
                                </div>
                                <div class="modal-right">                        
                                        <!-- 酒店表格 --> 
                                        <div class="input-group input-customized">
                                            <label>酒店类型</label>
                                            <select ng-model="hotelInfoDated.HTL_TP"
                                                    ng-options="hotelType.HTL_TP_NM as hotelType.HTL_TP_NM for hotelType in hotelTypes " />
                                        </div>
                                        <div class="input-group input-customized">
                                            <label>联系电话</label>
                                            <input ng-model="hotelInfoDated.HTL_PRM_CNTCT_PHN"></input>                                    
                                        </div>
                                       <div class="input-group input-customized">
                                            <label>第二联系电话</label>
                                            <input ng-model="hotelInfoDated.HTL_SCD_CNTCT_PHN"></input>                                    
                                        </div>                                        
                                        <div class="input-group input-customized">
                                            <label>地址</label>
                                            <input ng-model="hotelInfoDated.HTL_ADDRSS"></input>    
                                        </div>  
                                       <div class="input-group input-customized">
                                            <label>公司编号</label>
                                            <input ng-model="hotelInfoDated.CRP_ID"></input>                                    
                                        </div> 
                                       <div class="input-group input-customized">
                                            <label>酒店合同编号</label>
                                            <input ng-model="hotelInfoDated.HTL_CNTRCT_ID"></input>                                    
                                        </div>                                                                                                                                                                              
                                </div>  
                            </form> 
                        </div>
                    
                    </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-customized" ng-click="update(hotelID,hotelInfoDated,selected)">更新</button>                                          
        </div>
      </div>
      
    </div>
  </div>    