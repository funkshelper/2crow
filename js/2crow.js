$(function() {

	$('#merchantAddress').click(function() {
		// submit pressed on step 1

		var merchantAdd = $('#inputMerchantBTCAdd').val();
		var amount = $('#inputAmount').val();
		// error checking
		
		if(!merchantAdd){
			//if both fields are empty
			$('#merchantBTCAdd').addClass('has-error');
			$('#amount').addClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Please enter a key');
		}else if(!amount){
			//if merchant bitcoin address is empty
			$('#merchantBTCAdd').addClass('has-error');
			$('#amount').removeClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Please enter an ');	
		//}else if(!) {
			//$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Invalid public key!');	
		
		}else if(isNaN(amount)){
			//if entered amount is not a number
			$('#merchantBTCAdd').removeClass('has-error');
			$('#amount').addClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Invalid amount!');	
		}else if(coinjs.pubkeydecompress(merchantAdd)) {
		// now we are going to make the code
			$('#merchantBTCAdd').removeClass('has-error');
			$('#amount').removeClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			var code1 = "2crow_1_";
			code1=code1+merchantAdd+"_"+amount;
			alert(coinjs.pubkeydecompress(merchantAdd));
			$("#multiSigErrorMsg").html('Here is your step 1 code: '+ code1);
		}else {
			$('#merchantBTCAdd').removeClass('has-error');
			$('#amount').addClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Invalid key!');		// fail

		}
	});

	
	$('#customerbegin').click(function() {
		var step2code = $('#step2code').val();
		var customer2pubkey = $('#customer2pubkey').val();
		if(!step2code | !customer2pubkey){
			//if one field is empty
			//alert("both buttons empty");	
			$('#merchantBTCAdd').addClass('has-error');
			$('#amount').addClass('has-error');
			$("#multiSigErrorMsg").css("display", "block");
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> One or more field is empty');
		}else if(coinjs.pubkeydecompress(customer2pubkey)) {		
			//lets suppose we are ok to continue
			var codeArray = step2code.split('_');
			//alert(codeArray[2]);
			//lets build the multisig address!
			//coinjs.pubkeys2MultisigAddress = function(pubkeys, required) {
			var pubkeys = [coinjs.pubkeydecompress(customer2pubkey),codeArray[2]];			
			var tbr = coinjs.pubkeys2MultisigAddress(pubkeys,2);
			$("#step2output").html('Escrow address: '+ tbr.address);
			alert(tbr.address);	
		}
	});

	$('#step3submit').click(function() {
		alert("step 3");
	});

	$('#step4submit').click(function() {
		alert("step 4");
	});

	$('#refund1').click(function() {
		alert("refund1");
	});



});
