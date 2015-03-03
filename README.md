       2crow
    _          _
   /.)        (.\
  /)\|        |/(\
 //)/          \(\\
/'"^"          "^"`\


Normal commerce has the following three steps:

     1) Merchant prepares an address and sends it to customer

     2) Customer sends coin to the address 

     3) Merchant checks receipt and ships / delivers

 
2Crow seeks to eliminate a failure mode of this process, in which
the merchant does not ship.  It does so by using a 2 of 2 multisig
escrow address controlled by both customer and merchant.  The new flow:

     1) Merchant prepares half a 2crow address and sends to customer as 2crow code.

     2) Customer creates second half of 2crow escrow address and sends funds,
        giving the merchant the address and a new 2crow code.

     3) Merchant checks funds are sent, ships, and prepares a TX
        sending it to customer for finalizing as a new 2crow code.

     4) Customer receives goods and then signs the finalizing TX.
        Funds are now moved from the 2crow escrow to merchant's 
	private account.

Failure Modes:

1) Merchant disappears.

The merchant cannot take the funds before the customer finalizes.  However 
they could still disappear for a variety of reasons.  In this case the 
funds in escrow are lost.  Nobody can touch them unless both parties agree 
and sign a TX moving funds from escrow.  

2) Customer disappears.

The customer commits their funds in step 2.  However if the customer 
disappears before finalizing step 4, all funds are lost.  Nobody can touch them 
unless both parties agree.  The customer has no financial incentive not 
to finalize if the goods are shipped.  However, an addition of a customer 
deposit could help eliminate this failure mode.       

3) Escrow compromised

Some escrow services include control by a third party.  In these cases, 
there is a danger that the third party will disappear with the
funds.  With 2crow this is eliminated.

With 2crow, a third party attacker needs to compromise the secrecy of both the customer 
and the merchant to steal the funds.  This cannot be done by intercepting
the 2crow codes in standard communication.  It could only be accomplished
by taking the private keys of both the customer and the merchant.  This mode
is extremely unlikely, as any attacker who could perform such compromise 
would likely just empty the individual private wallets of customer and merchant and 
not bother with waiting for an escrow transaction to occur.  


Refunds 

As long as the merchant and customer agree, anything they like can happen
to the funds in escrow.  By placing a customer controlled adress in the 
"final address" field of step 3, the merchant can issue a refund before 
finalizing has occured.  

With the exception of the "merchant keeps funds and doesn't ship" failure,
2crow transactions are susceptibe to most all of the other failure modes 
of normal commerce, such as 





