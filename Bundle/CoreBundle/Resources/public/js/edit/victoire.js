$vic(document).ready(function() {
    loading(false);
    enableSortableSlots();
});

//Used to know when user is leaving or page is refreshing
//->when a victoire user is editing or creating a widget and he refresh the page by error, he press ESC. This class allows victoire to know which action to do
$vic(window).on('beforeunload',function() {
    $vic('body').addClass('page-unloading');
});

$vic(document).on("keydown", function (e){
    if (e.altKey) {
        if ($vic('body').attr('role') == 'admin-readonly') {
            $vic('button[data-mode="admin-layout"]').click();
        } else if ($vic('body').attr('role') == 'admin-layout') {
            $vic('button[data-mode="admin-edit"]').click();
        } else if ($vic('body').attr('role') == 'admin-edit') {
            $vic('button[data-mode="admin-style"]').click();
        } else if ($vic('body').attr('role') == 'admin-style') {
            $vic('button[data-mode="admin-readonly"]').click();
        }

    }
});

// Functions
////////////

function trackChange(elem)
{
    if ($vic(elem).val() === 'url') {
        $vic(elem).parent('li').children('.url-type').show();
        $vic(elem).parent('li').children('.page-type').hide();
        $vic(elem).parent('li').children('.route-type').hide();
    } else if ($vic(elem).val() === 'page') {
        $vic(elem).parent('li').children('.page-type').show();
        $vic(elem).parent('li').children('.url-type').hide();
        $vic(elem).parent('li').children('.route-type').hide();
    } else if ($vic(elem).val() === 'route') {
        $vic(elem).parent('li').children('.page-type').hide();
        $vic(elem).parent('li').children('.url-type').hide();
        $vic(elem).parent('li').children('.route-type').show();
    }
}

function enableSortableSlots(){
    $vic(".vic-slot").each(function(){
        $vic(this).sortable({
            handle: '.vic-hover-widget:not(.disabled)',
            items: "> .vic-widget-container:not(.vic-undraggable)",
            placeholder: "vic-ui-state-highlight",
            forcePlaceholderSize: true,
            revert: true,
            start: function(event, ui) {
                $(this).attr('data-previndex', $vic(this).children().filter('div').index($vic(ui.item)));

                if (ui.item.prev().is('new-widget-button')) {
                    ui.item.prev().addClass('disabled');
                }
                if (ui.item.next().next().is('new-widget-button')) {
                    ui.item.next().next().addClass('disabled');
                }

                $vic('.vic-hover-widget').each(function() {
                    $vic(this).addClass('disabled');
                })
            },
            update: function(event, ui) {
                if (ui.item.prev().is('new-widget-button')) {
                    var widgetMapReference = ui.item.prev().attr('widget-map');
                    var position = ui.item.prev().attr('position');
                } else {
                    var widgetMapReference = ui.item.next().attr('widget-map');
                    var position = ui.item.next().attr('position');
                }
                var sorted = {
                    'widgetMapReference': widgetMapReference,
                    'position': position,
                    'slot': ui.item.parents('.vic-slot').first().data('name'),
                    'widgetMap': ui.item.attr('widget-map')
                };

                if (ui.item.prev().is('new-widget-button')) {
                    ui.item.prev().addClass('disabled');
                }
                if (ui.item.next().is('new-widget-button')) {
                    ui.item.next().addClass('disabled');
                }

                if (parseInt($vic(this).children().filter('div').index($vic(ui.item))) != parseInt($(this).attr('data-previndex'))) {
                    updateWidgetPosition(sorted, ui);
                } else {
                    $vic(this).sortable('cancel');
                    $vic('new-widget-button.disabled').each(function(index, el) {
                        $vic(el).removeClass('disabled');
                    });
                }
                $(this).removeAttr('data-previndex');

            }
        });
    });
}


function updateWidgetPosition(sorted, ui) {
    var ajaxCall = $vic.post(
        Routing.generate('victoire_core_widget_update_position', {'viewReference': viewReferenceId}),
        { 'sorted': sorted, '_locale': locale }
    );
    ajaxCall.fail(function() {
        $vic(".vic-slot").each(function(){
            $vic(this).sortable('cancel');
            $vic('new-widget-button.disabled', '.vic-hover-widget.disabled').each(function(index, el) {
                $vic(el).removeClass('disabled');
            });
        });
        return false;
    });
    ajaxCall.success(function(jsonResponse) {
        $vic('new-widget-button.disabled').each(function(index, el) {
            $vic(el).remove();
        });
        var $rootScope = angular.element($vic('body')).scope().$root;
        $rootScope.widgetMaps = jsonResponse.availablePositions;
        $rootScope.$apply();

        var $scope = angular.element($vic('[data-name="'+sorted.slot+'"]')).scope();
        $scope.rebuildActions(jsonResponse.availablePositions);

        $vic('.vic-hover-widget.disabled').each(function() {
            $vic(this).removeClass('disabled');
        })
    });

    return ajaxCall;
}

function loading(value) {
    if (value == undefined) { //Switch mode
        $vic('.vic-topNavbar-logo').toggleClass('vic-loading');
    } else if (value === true) { //Run
        $vic('.vic-topNavbar-logo').addClass('vic-loading');
    } else if (value === false) { //Stop
        $vic('.vic-topNavbar-logo').removeClass('vic-loading');
    }
}

function slideTo(element, duration, effect) {
    if (duration == undefined) { duration = 1500; }
    if (effect == undefined) { effect = 'easeInSine'; }

    //get the top offset of the target anchor
    var target_offset = $vic(element).offset();
    if (target_offset != undefined) {
        var target_top = target_offset.top;

        //goto that anchor by setting the body scroll top to anchor top
        $vic('html, body').animate({scrollTop:target_top}, duration, effect);
    }
}
