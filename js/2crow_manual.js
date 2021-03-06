$(function() {

	$('#merchantAddress').click(function() {
		// submit pressed on step 1

		var merchantAdd = $('#inputMerchantBTCAdd').val();
		var amount = $('#inputAmount').val();
		// error checking
		
		if(!merchantAdd){
			//if both fields are empty
			
			// lets generate one
			var nPrivKey = coinjs.newPrivkey();
			alert(nPrivKey);
			//$('#merchantBTCAdd').addClass('has-error');
			//$('#amount').addClass('has-error');
			//$("#multiSigErrorMsg").css("display", "block");
			//$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Please enter a key');
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
			//alert(coinjs.pubkeydecompress(merchantAdd));
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
			//alert(codeArray[3]);
			//alert(customer2pubkey);
			//lets build the multisig address!
			//coinjs.pubkeys2MultisigAddress = function(pubkeys, required) {
			var pubkeys = [codeArray[2],customer2pubkey];			
			var tbr = coinjs.pubkeys2MultisigAddress(pubkeys,2);
			$("#step2output").html('Send '+codeArray[3]+ ' BTC to: '+ tbr.address + '\n2crow_2_'+ tbr.redeemScript);
			//alert(tbr.address);	
		}
	});

	$('#step3submit').click(function() {	
		var tx = coinjs.transaction();
		var txID = $('#txID').val();
		var code = $('#step3code').val();
		var address = $('#finalAddress').val();
		var amount = $('#step3amount').val();
		var privkey = $('#privKey').val();
		var codeArray = code.split('_');
		tx.addinput(txID, 0, codeArray[2]);
		//alert("added input /n " + txID + "/n" + txScript + "/n"+ txN);
		tx.addoutput(address, amount*1);
		//alert("added output");
		var rawtx = tx.serialize();
		var tx2 = coinjs.transaction();
		var t = tx2.deserialize(rawtx);
		//alert("serialized");
		//alert(rawtx);
		var signed = t.sign(privkey)
		//alert(signed);
		$("#step3result").html('2crow_3_'+ signed);
	});

	$('#step4submit').click(function() {
		var tx = coinjs.transaction();
		var code = $('#step4code').val();
		var privkey = $('#step4key').val();
		var codeArray = code.split('_');
		//alert(codeArray[2]);
		var t = tx.deserialize(codeArray[2]);
		//alert("added input /n " + txID + "/n" + txScript + "/n"+ txN);
		var signed = t.sign(privkey)
		//alert(signed);
		$("#step4result").html(signed);
	});

	$('#refund1').click(function() {
		alert("refund1");
	});



});
