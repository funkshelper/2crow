$(function() {

	$('#merchantAddress').click(function() {
		var merchantAdd = $('#inputMerchantBTCAdd').val();
		var amount = $('#inputAmount').val();
		
		if(!merchantAdd && !amount){
			//if both fields are empty
			$('#merchantBTCAdd').addClass('has-error');
			$('#amount').addClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Please fill up the field!');
		}else if(!merchantAdd){
			//if merchant bitcoin address is empty
			$('#merchantBTCAdd').addClass('has-error');
			$('#amount').removeClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Please fill up the address field!');	
		}else if(isNaN(amount)){
			//if entered amount is not a number
			$('#merchantBTCAdd').removeClass('has-error');
			$('#amount').addClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Invalid amount!');	
		}else{
			$('#merchantBTCAdd').removeClass('has-error');
			$('#amount').removeClass('has-error');
			$("#multiSigErrorMsg").css("display", "none");
		}
	});

	
	$('#customerbegin').click(function() {
		alert("hi");
	});

});