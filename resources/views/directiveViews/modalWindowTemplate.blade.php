<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"
     modal-animation-class="fade"
     ng-class="{in: animate}" ng-style="{'z-index': 1050 + index*10, display: 'block'}" ng-click="close($event)">
    <div class="modal-content panel panel-default" modal-transclude> 
    </div>
</div>
