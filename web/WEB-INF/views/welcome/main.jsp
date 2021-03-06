<%@ include file="/WEB-INF/views/common/include.jsp" %>

<div class="span-24 info last" >
  
  	<div class="prepend-2 span-20 info last">
  		<div style="color:red;font-size: 11px;margin-top:15px;">
  		<!--  
  		Welcome to the beta test site for the CMIP5 distributed archive. 
  		This is <a href="http://devel.esgf.org/wiki/ESGF_Transition">Phase I of IV</a> that transitions away from the ESG gateway-centric system based on gateway version 1.3.4 to the new ESGF peer-to-peer system.  
  		In this phase transition, some of the data may not be accessible due to not all data nodes have upgraded to the new software stack.
  		-->
  		<!--  
  		Welcome to the beta test site for the CMIP5 distributed archive. We are now in the <a href="http://esgf.org/wiki/ESGF_Transition">first of four phases</a> in transitioning from the ESG 1.3.4 gateways 
  		to the new ESGF peer-to-peer (P2P) system.  In this first phase, some of the CMIP5 model output may not be accessible through P2P due to delays 
  		in upgrading some of the data nodes. The old <a href="http://pcmdi3.llnl.gov/esgcet/home.htm">gateways</a> will remain active during the testing of the system and output from all models will continue 
  		to be available from them.  Please send e-mail to <a href="mailto:esgf-support@llnl.gov?subject=ESGF Portal Feedback">esgf-support@llnl.gov</a> to report bugs and provide feedback.  Be sure to indicate that you 
  		are using the beta P2P system.  
  		-->
  		<!--  
  		Welcome to the future of the CMIP5 distributed archive!!!

 		We are now in the transition phase from the ESG 1.3.4 gateways to the new ESGF peer-to-peer (P2P) system.  
 		It is possible that some of the CMIP5 model output may not be accessible through P2P due to delays in upgrading some of the 
 		data nodes. The <a href="http://pcmdi3.llnl.gov/esgcet/home.htm">old gateways</a> will remain active and output from all models will continue to be available from them, until 
 		the transition is complete.  Please send e-mail to <a href="mailto:esgf-support@llnl.gov?subject=ESGF Portal Feedback">esgf-support@llnl.gov</a> to report bugs and provide feedback.  Be sure to 
 		indicate that you are using the beta P2P system.  
  		
        <br/>If you have trouble running wget scripts to download data,
        please consult the <a href="http://devel.esgf.org/wiki/ESGF_wget_FAQ">TABLE OF WORKING DATA NODES</a>.  		
  		-->
  		<!--  
  		Welcome to the new CMIP5 distributed archive. Our new ESGF peer-to-peer
(P2P) enterprise system is now the official site for CMIP5 model output.
The old <a href="http://pcmdi3.llnl.gov/esgcet/home.htm" target="_blank">gateways</a> will remain active and output from all models will continue to be available until the end of July 2012.  
Please send e-mail to <a href="mailto:esgf-user@lists.llnl.gov?subject=ESGF Portal Feedback">esgf-user@lists.llnl.gov</a> to report bugs and provide feedback.
  		-->
  		</div> 
  	</div>
  
	<%@ include file="/WEB-INF/views/welcome/left.jsp" %>
	
	<%@ include file="/WEB-INF/views/welcome/center.jsp" %>
	
	<%@ include file="/WEB-INF/views/welcome/right.jsp" %>
	
</div>
