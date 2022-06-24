/*! http://mths.be/placeholder v2.1.2 by @mathias */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function(jQuery) {

    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
    var valHooks = jQuery.valHooks;
    var propHooks = jQuery.propHooks;
    var hooks;
    var placeholder;
    var settings = {};

    if (isInputSupported && isTextareaSupported) {

        placeholder = jQuery.fn.placeholder = function() {
            return this;
        };

        placeholder.input = true;
        placeholder.textarea = true;

    } else {

        placeholder = jQuery.fn.placeholder = function(options) {

            var defaults = {customClass: 'placeholder'};
            settings = jQuery.extend({}, defaults, options);

            return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.'+settings.customClass)
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {

                var jQueryelement = jQuery(element);
                var jQuerypasswordInput = jQueryelement.data('placeholder-password');

                if (jQuerypasswordInput) {
                    return jQuerypasswordInput[0].value;
                }

                return jQueryelement.data('placeholder-enabled') && jQueryelement.hasClass(settings.customClass) ? '' : element.value;
            },
            'set': function(element, value) {

                var jQueryelement = jQuery(element);
                var jQueryreplacement;
                var jQuerypasswordInput;

                if (value !== '') {

                    jQueryreplacement = jQueryelement.data('placeholder-textinput');
                    jQuerypasswordInput = jQueryelement.data('placeholder-password');

                    if (jQueryreplacement) {
                        clearPlaceholder.call(jQueryreplacement[0], true, value) || (element.value = value);
                        jQueryreplacement[0].value = value;

                    } else if (jQuerypasswordInput) {
                        clearPlaceholder.call(element, true, value) || (jQuerypasswordInput[0].value = value);
                        element.value = value;
                    }
                }

                if (!jQueryelement.data('placeholder-enabled')) {
                    element.value = value;
                    return jQueryelement;
                }

                if (value === '') {
                    
                    element.value = value;
                    
                    // Setting the placeholder causes problems if the element continues to have focus.
                    if (element != safeActiveElement()) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }

                } else {
                    
                    if (jQueryelement.hasClass(settings.customClass)) {
                        clearPlaceholder.call(element);
                    }

                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return jQueryelement;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }

        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        jQuery(function() {
            // Look for forms
            jQuery(document).delegate('form', 'submit.placeholder', function() {
                
                // Clear the placeholder values so they don't get submitted
                var jQueryinputs = jQuery('.'+settings.customClass, this).each(function() {
                    clearPlaceholder.call(this, true, '');
                });

                setTimeout(function() {
                    jQueryinputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        jQuery(window).bind('beforeunload.placeholder', function() {
            jQuery('.'+settings.customClass).each(function() {
                this.value = '';
            });
        });
    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+jQuery/;

        jQuery.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });

        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        
        var input = this;
        var jQueryinput = jQuery(input);
        
        if (input.value === jQueryinput.attr('placeholder') && jQueryinput.hasClass(settings.customClass)) {
            
            input.value = '';
            jQueryinput.removeClass(settings.customClass);

            if (jQueryinput.data('placeholder-password')) {

                jQueryinput = jQueryinput.hide().nextAll('input[type="password"]:first').show().attr('id', jQueryinput.removeAttr('id').data('placeholder-id'));
                
                // If `clearPlaceholder` was called from `jQuery.valHooks.input.set`
                if (event === true) {
                    jQueryinput[0].value = value;

                    return value;
                }

                jQueryinput.focus();

            } else {
                input == safeActiveElement() && input.select();
            }
        }
    }

    function setPlaceholder(event) {
        var jQueryreplacement;
        var input = this;
        var jQueryinput = jQuery(input);
        var id = input.id;

        // If the placeholder is activated, triggering blur event (`jQueryinput.trigger('blur')`) should do nothing.
        if (event && event.type === 'blur') {
            
            if (jQueryinput.hasClass(settings.customClass)) {
                return;
            }

            if (input.type === 'password') {
                jQueryreplacement = jQueryinput.prevAll('input[type="text"]:first');
                if (jQueryreplacement.length > 0 && jQueryreplacement.is(':visible')) {
                    return;
                }
            }
        }

        if (input.value === '') {
            if (input.type === 'password') {
                if (!jQueryinput.data('placeholder-textinput')) {
                    
                    try {
                        jQueryreplacement = jQueryinput.clone().prop({ 'type': 'text' });
                    } catch(e) {
                        jQueryreplacement = jQuery('<input>').attr(jQuery.extend(args(this), { 'type': 'text' }));
                    }

                    jQueryreplacement
                        .removeAttr('name')
                        .data({
                            'placeholder-enabled': true,
                            'placeholder-password': jQueryinput,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);

                    jQueryinput
                        .data({
                            'placeholder-textinput': jQueryreplacement,
                            'placeholder-id': id
                        })
                        .before(jQueryreplacement);
                }

                input.value = '';
                jQueryinput = jQueryinput.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', jQueryinput.data('placeholder-id')).show();

            } else {
                
                var jQuerypasswordInput = jQueryinput.data('placeholder-password');

                if (jQuerypasswordInput) {
                    jQuerypasswordInput[0].value = '';
                    jQueryinput.attr('id', jQueryinput.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
                }
            }

            jQueryinput.addClass(settings.customClass);
            jQueryinput[0].value = jQueryinput.attr('placeholder');

        } else {
            jQueryinput.removeClass(settings.customClass);
        }
    }

    function safeActiveElement() {
        // Avoid IE9 `document.activeElement` of death
        try {
            return document.activeElement;
        } catch (exception) {}
    }
}));

jQuery(document).ready(function() {
	//radio button
	var radioInput=jQuery(':radio');
	jQuery(document).on('click', '.comboBox', function(){
		var thisNum = jQuery('.comboBox').index(this);
		var thisRadio = jQuery('.comboBox').children(':radio');
		var thisDesign = jQuery('.comboBox').children('label');

		for(i=0; i< jQuery('.comboBox').length; i++){

			if(thisDesign.eq(i).prev(':radio').is(':checked')){
				thisDesign.eq(i).addClass('check');
			}else{
				thisDesign.eq(i).removeClass('check');
			}
		}
	});
	jQuery(':radio:checked').click();
	jQuery('input').placeholder();
	
	//slelct	
	jQuery('.selBox .txtValue').each(function(){
		var defaultVal = jQuery(this).next('.selList').find('input[checked]').next('label').text();
		jQuery(this).append(defaultVal);
	});
		
	jQuery('.selBox input[type=radio]').on('focusin',':checked',function(){
		jQuery(this).parent().addClass('on');
		jQuery(this).parent().parent().find('.txtValue').addClass('on');
		var val= jQuery(this).next().text();
		jQuery(this).parent().parent().find('.txtValue').text('').append(val);
	});
	
	jQuery('.selList input[type=radio]').on('focusout',function(){
		jQuery(this).parent().removeClass('on');
		jQuery(this).parent().parent().find('.txtValue').removeClass('on');
	});
	
	jQuery('.selBox .txtValue').bind('click keyup', function(){
		/*20160503 남향선 추가 시작*/
		var thisTxtValue = jQuery('.selBox .txtValue').index(this);
		jQuery('.productDeposit_Form').css('overflow','visible'); 		
		jQuery('.selBox .txtValue').each(function(index){
			if((thisTxtValue != index) && jQuery(this).hasClass('on')){
				jQuery(this).toggleClass('on').next().toggleClass('on');
			}
		});
		/*20160503 남향선 추가 끝*/
		jQuery(this).toggleClass('on').next().toggleClass('on');
		jQuery('.selList input[type=radio]').on('click',function(){	
			var val = jQuery(this).next().text();
			jQuery(this).parent().parent().find('.txtValue').text('').append(val);
			jQuery(this).parent().removeClass('on');
			jQuery(this).parent().parent().find('.txtValue').removeClass('on');
		});
	});	
})

/* new form */
jQuery(function(jQuery){

	var linkVal = '';
	
	// Common
	var select_root = jQuery('div.select');
	var select_value = jQuery('.myValue');
	var select_a = jQuery('div.select>ul>li>a');

	
	//Anchor Focus Out
	jQuery('*:not("div.select a")').focus(function(){
		jQuery('.optionList').parent('.select').removeClass('open');
	});

	
	select_value.on('click', function(){
		jQuery(this).parents('div.select').toggleClass('open')	
	});
	
	select_root.mouseleave(function(){jQuery(this).removeClass('open')});

	// Line
	select_value.bind('focusin',function(){jQuery(this).addClass('outLine')});
	select_value.bind('focusout',function(){jQuery(this).removeClass('outLine')});
	
 
	select_a.on('click', function(){		
		linkVal = jQuery(this).attr('href');		
		select_root.removeClass('open');		
		var txt = jQuery(this).text();
		jQuery(this).parents('.select').find('.myValue').text('').append(txt).addClass('selected');			
		
		return false;
	});
	

    jQuery('.btnSmall').on('click', function(){    	
    	location.href = linkVal;
    });

});
