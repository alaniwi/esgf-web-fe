<%@ include file="/WEB-INF/views/common/include.jsp" %>
<style>
.accountbutton {
	font-size: 13px;
	color: white;
	border: 1px solid #9c9c9c;
	background: #838943;
	cursor: pointer;
}

p {
	margin: .8em 0 .8em 0
}	
</style>

<!--  header info -->
<div class="container">
	<div class="prepend-3 span-18 append-3">
     <div class="userInfo">
		<fieldset style="background: #F5F5E0">
			<legend>About</legend>
			<p>
				<label for="username">Username:</label>
				${accounts_userinfo.userName}			
			</p>
			<p>
				<label for="lastname">Last Name:</label>
				${accounts_userinfo.lastName}
				&nbsp;
				<label for="middleaame">Middle Name:</label>
				${accounts_userinfo.middleName}
				&nbsp;
				<label for="firstname">First Name:</label>
				${accounts_userinfo.firstName}				
			</p>
			<p>
				<label for="email">Email Address:</label>
				${accounts_userinfo.emailAddress}
			</p>
			<p>
				<label for="organization">Organization:</label>	
				${accounts_userinfo.organization}
			</p>		
			<p>
				<label for="city">City:</label>	
				${accounts_userinfo.city}
			</p>
			<p>
				<label for="state">State:</label>				
				${accounts_userinfo.state}
			</p>
			<p>
				<label for="country">Country:</label>				
				${accounts_userinfo.country}
			</p>
			<p>			
				<label for="openid">Openid:</label>
				${accounts_userinfo.openId}
			</p>
			<p>
				<label for="DN">Domain Name:</label>
				${accounts_userinfo.DN}
			</p>
      <input id="userUpdate" type="submit" value="Edit" class="button" onclick="javascript:editUserInfo()"/> 
		</fieldset>
    </div>
      
    <div class="editUserInfo" style="display:none">
    <fieldset style="background: #F5F5E0">
			<legend>About</legend>
      <p> 
        Last Name: <input type="text" class="text" id="lastName" value="${accounts_userinfo.lastName}"/> <br/>
        Middle Name: <input type="text" class="text" id="middleName" value="${accounts_userinfo.middleName}"/><br/>
        First Name: <input type="text" class="text" id="firstName" value="${accounts_userinfo.firstName}"/><br/>
        Email: <input type="text" class="text" id="email" value="${accounts_userinfo.emailAddress}"/><br/>
        Organization: <input type="text" class="text" id="organization" value="${accounts_userinfo.organization}"/><br/>
        City: <input type="text" class="text" id="city" value="${accounts_userinfo.city}"/><br/>
        State: <input type="text" class="text" id="state" value="${accounts_userinfo.state}"/><br/>
        Country: <input type="text" class="text" id="country" value="${accounts_userinfo.country}"/><br/>
			</p>
      <input id="userUpdate" type="submit" value="Submit" class="button" onclick="javascript:submitUserInfo()"/> 
      <input id="cancelUpdate" type="submit" value="Cancel" class="button" onclick="javascript:cancelUserInfo()"/> 
		</fieldset>

    </div>

    <div class="top" id="top"> </div>  

		<fieldset style="background: #F5F5E0">
			<legend>Groups Registered</legend>
			<p>
				<table id="groups_admin_table_id">
					<thead>
						<tr>
							<th>Group Name</th>
							<th>Description</th>
							<th>Role</th>
              <th>UnRigister</th>
						</tr>
					</thead>
					<tbody class="updatable">
          </tbody>					
				</table>
				        <c:set var="j" value="0"/>
				        <c:forEach var="group" items="${accounts_groupinfo}">
                  <script language="javascript">
                    var className = "${accounts_groupinfo[j].name}";
                    var classId = className.replace(/\s/g,"");
                    var group = "${accounts_groupinfo[j].name}";
                    var info = "${accounts_groupinfo[j].description}";
                    var role = "${accounts_roleinfo[j]}";
                    var autoReg = "t";
                    if(group != "wheel"){
                      $('.updatable').append('<tr class="' + classId + '"><td>' + group + '</td><td>' + info + '</td><td>' + role + '</td><td><input id="' + group + '" type="submit" value="Leave" class="button" onclick="javascript:unregister(\'' + group + '\', \'' + info + '\', \'' + role + '\', \'' + autoReg + '\')"/></td></tr>');
                    }
                  </script>

				          <c:set var="j" value="${j+1}"/>
						</c:forEach>
					
			</p>
      <p>
      <div class="loading"> <input id='showMore' type="submit" value="Show All" class="button" onclick="javascript:showmore()"/> </div>
      <div class="loaded" style="display: none"> <input id='showMore' type="submit" value="Show All" class="button" onclick="javascript:showmoregroups()"/> </div>
      </p>
		</fieldset>

    <div class="middle" id="middle"></div>

    <div class="error" style="display: none"></div>
		<div class="success" style="display: none"></div>
    
    <div class="groups" style="display: none">
    <fieldset style="background: #F5F5E0">
      <legend>Groups Available</legend>
      <p class="grouping"> 
        <strong>Local Groups</strong> 
        <table id="groups_table_id">
         <thead><tr><th>Group Name</th><th>Description</th><th>Role</th><th>Register</th></tr></thead>
         <tbody class="allgroups">
         </tbody>
        </table>
      </p>
<!--
      <p>
      <strong>Federation Groups</strong>
      

      </p>
-->
      <p>
        <input id="showMore" type="submit" value="Hide" class="button" onclick="javascript:showless()"/> 
         &nbsp; Need help registering for other groups? Check the ESGF
         <a href="http://www.esgf.org/wiki/ESGF_Data_Download">Wiki</a>
      </p>
    </fieldset>
  </div>

  <div class="bottom" id="bottom"> </div>

  <fieldset style="background: #F5F5E0">
			<legend>Change Password</legend>
			<p>
				<label for="oldpasswd">Old password:</label>
				<input id="oldpasswd" name="oldpasswd" type="password"/>
 			</p>
 			<p>
 				<label for="password1">New password:</label>
 				<input id="password1" name="password1" type="password"/>
 			</p>
 			<p>
 				<label for="password2">Confirm password:</label>
 				<input id="password2" name="password2" type="password"/>
 			</p>
			<p>
				<input id="changepwd" value="Change password" class="button" type="button"/>
			</p> 			
		</fieldset>
		 
	</div>
</div>
 
<script language="javascript">

  function unregister(name, desc, role, auto){
    hideAll();
    var groupName = name;
    var groupDesc = desc;
    var groupRole = role;
    var groupAuto = auto;
    var userName = "${accounts_userinfo.userName}";
     
    var jsonObj = new Object;
		jsonObj.userName = userName;
		jsonObj.group = groupName;
		jsonObj.role = groupRole;

    var jsonStr = JSON.stringify(jsonObj);
		var userinfo_url = '/esgf-web-fe/leavegroupproxy';
		$.ajax({
	    type: "POST",
	    url: userinfo_url,
			async: true,
			cache: false,
	    data: {query:jsonStr},
	    dataType: 'json',
	    success: function(data) {
	      if (data.EditOutput.status == "success") {
          var classId = groupName.replace(/\s/g,"");
          $('.' + classId).hide();
          if(groupAuto == "t"){
            $('.allgroups').append('<tr class="' + classId + '"><td>' + groupName + '</td><td>' + groupDesc + '</td><td>' + groupRole + '</td><td><input id="' + groupName + '" type="submit" value="Join" class="button" onclick="javascript:register(\'' + groupName + '\', \'' + groupDesc + '\', \'' + groupRole + '\', \'' + groupAuto + '\')"/></td></tr>');
          }
          else if(groupAuto == "f"){
            $('.allgroups').append('<tr class="' + classId + '"><td>' + groupName + '</td><td>' + groupDesc + '</td><td>' + groupRole + '</td><td><input id="' + groupName + '" type="submit" value="Request" class="button" onclick="javascript:register(\'' + groupName + '\', \'' + groupDesc + '\', \'' + groupRole + '\', \'' + groupAuto + '\')"/></td></tr>');
          }
          $("div .success").html(data.EditOutput.comment);
          $("div .middle").append($("div .success"));
          $("div .success").show();
        } else {
	    	  $("div .error").html(data.EditOutput.comment);
          $("div .middle").append($("div .error"));
	    		$("div .error").show();
	    	}
	    },
			error: function(request, status, error) {
			  $("div .error").html(request + " " + status + " " + error);
        $("div .bottom").append($("div .error"));
				$("div .error").show();
			}
		});
  }

  function register(type, desc, role, auto){
    hideAll();
    var userName = "${accounts_userinfo.userName}";
    var group = type;
    var info = desc;
    var role = role;
    var autoReg = auto;
    var jsonObj = new Object;
		jsonObj.userName = userName;
		jsonObj.group = group;
		jsonObj.role = role;
			
		var jsonStr = JSON.stringify(jsonObj);
		var userinfo_url = '/esgf-web-fe/addgroupproxy';
		$.ajax({
	    type: "POST",
	    url: userinfo_url,
			async: true,
			cache: false,
	    data: {query:jsonStr},
	    dataType: 'json',
	    success: function(data) {
	      if (data.EditOutput.status == "success") {
          var classId = group.replace(/\s/g,"");
          $('.' + classId).hide();
          $('.updatable').append('<tr class="' + classId + '"><td>' + group + '</td><td>' + info + '</td><td>' + role + '</td><td><input id="' + group + '" type="submit" value="Leave" class="button" onclick="javascript:unregister(\'' + group + '\', \'' + info + '\', \'' + role + '\', \'' + autoReg + '\')"/></td></tr>');
		      $("div .success").html(data.EditOutput.comment);
          $("div .middle").append($("div .success"));
          $("div .success").show();
        } else {
	    	  $("div .error").html(data.EditOutput.comment);
          $("div .middle").append($("div .error"));
	    		$("div .error").show();
	    	}
	    },
			error: function(request, status, error) {
			  $("div .error").html(request + " " + status + " " + error);
        $("div .middle").append($("div .error"));
				$("div .error").show();
			}
		});	
  }

  function showmore(){
    $("div .loading").hide();
    $("div .loaded").hide();
    hideAll();
    
    var Parent = document.getElementById('groups_table_id');
    for(var i = Parent.rows.length - 1; i > 0; i--){
      Parent.deleteRow(i);
    }

    var userName = "${accounts_userinfo.userName}";
    var jsonObj = new Object;
		jsonObj.userName = userName;
			
		var jsonStr = JSON.stringify(jsonObj);
		var userinfo_url = '/esgf-web-fe/showallgroupsproxy';
		$.ajax({
	    type: "POST",
	    url: userinfo_url,
			async: true,
			cache: false,
	    data: {query:jsonStr},
	    dataType: 'json',
	    success: function(data) {
	      if (data.EditOutput.status == "success") {
          var output = data.EditOutput.comment;
          var rows = output.split("][");
          var name = "";
          var desc = "";
          var role = "user";
          if(rows.length > 2){
            for(var i = 0; i < rows.length; i++){
              var groupInfo = rows[i].split(", ");
              var classId = groupInfo[1];
              classId = classId.replace(/\s/g,"");
              if(groupInfo[1] == "wheel"){
                //logic?
              }
              else if(groupInfo[4] == "t"){
                $('.allgroups').append('<tr class ="' + classId + '"><td>' + groupInfo[1] + '</td><td>' + groupInfo[2] + '</td><td>' + role  + '</td><td><input id="' + groupInfo[1] + '" type="submit" value="Join" class="button" onclick="javascript:register(\'' + groupInfo[1] + '\', \'' + groupInfo[2] + '\', \'' + role + '\', \'' + groupInfo[4] + '\')"/></td></tr>');
              }
              //todo change Z to f when logic is in place
              else if (groupInfo[4] == "Z"){
                $('.allgroups').append('<tr class ="' + classId + '"><td>' + groupInfo[1] + '</td><td>' + groupInfo[2] + '</td><td>' + role + '</td><td><input id="' + groupInfo[1] + '" type="submit" value="Request" class="button" onclick="javascript:register(\'' + groupInfo[1] + '\', \'' + groupInfo[2] + '\', \'' + role + '\', \'' + groupInfo[4] +'\')"/></td></tr>');
              }
            }
            $("div .groups").show();
          }
          else{
            $("div .error").html("You are already a member of all groups on this node.");
            $("div .bottom").append($("div .error"));
	    		  $("div .error").show();
            $("div .loading").hide();
            $("div .loaded").hide();
          }
        } else {
	    	  $("div .error").html(data.EditOutput.comment);
          $("div .middle").append($("div .error"));
	    		$("div .error").show();
	    	}
	    },
			error: function(request, status, error) {
			  $("div .error").html(request + " | " + status + " | " + error);
				$("div .middle").append($("div .error"));
        $("div .error").show();
			}
		});	

  }

  function showless(){
    hideAll();
    $("div .loaded").show();
    $("div .groups").hide();
  }

  function showmoregroups(){
    hideAll();
    $("div .groups").show();
    $("div .loaded").hide();
  }

  function editUserInfo(){
    hideAll();
    $("div .userInfo").hide();
    $("div .editUserInfo").show();
  }
  
  function submitUserInfo(){
    hideAll();
    var lastName = $("input[id=lastName]").val();
    var firstName = $("input[id=firstName]").val();
    var middleName = $("input[id=middleName]").val();
    var email = $("input[id=email]").val();
    var organization = $("input[id=organization]").val();
    var city = $("input[id=city]").val();
    var state = $("input[id=state]").val();
    var country = $("input[id=country]").val();

    if (lastName == "" || firstName == "" || email == ""){
      $("div .error").html("First Name, Last Name, Email Can not be blank");
      $("div .top").append($("div .error"));
      $("div .error").show();
    }
    else{
      var jsonObj = new Object;
			jsonObj.userName = "${accounts_userinfo.userName}";
			jsonObj.lastName = lastName;
			jsonObj.middleName = middleName;
			jsonObj.firstName = firstName;
      jsonObj.email = email;
			jsonObj.organization = organization;
      jsonObj.city = city;
      jsonObj.state = state;
      jsonObj.country = country;
			
			var jsonStr = JSON.stringify(jsonObj);
			var userinfo_url = '/esgf-web-fe/updateuserinfoproxy';
			$.ajax({
	    	  type: "POST",
	    	  url: userinfo_url,
				  async: true,
				  cache: false,
	    		data: {query:jsonStr},
	    		dataType: 'json',
	    		success: function(data) {
	    			if (data.EditOutput.status == "success") {
		    			$("div .success").html(data.EditOutput.comment);
		    			$("div .top").append($("div .success"));
              $("div .success").show();
	    			  $("div .editUserInfo").hide();
              $("div .userInfo").show();
              setTimeout(function(){window.location="accountsview"},1000);

            } else {
	    				$("div .error").html("Updating your account has failed! " + data.EditOutput.comment);
              $("div .top").append($("div .error"));
	    				$("div .error").show();
	    			}
	    		},
				error: function(request, status, error) {
					$("div .error").html(request + " | " + status + " | " + error);
          $("div .top").append($("div .error"));
					$("div .error").show();
				}
			});
    } 
  }  

  function cancelUserInfo(){
    hideAll();
    $("div .editUserInfo").hide();
    $("div .userInfo").show();
  }

  function hideAll(){
    $("div .error").hide();
    $("div .success").hide();
  }

  function errorCheck(){
    var error = "${accounts_error}";
    if (error == "false"){
      //do nothing page will load normal
    }
    else{
      window.location="/"
    }
  }

  window.onload = errorCheck;
</script>  

<script>
$(document).ready(function(){
	$("#changepwd").click(function() {
    hideAll();
		var oldpassword = $("input[name=oldpasswd]").val();
		var password1 = $("input[name=password1]").val();
		var password2 = $("input[name=password2]").val();
		var error = false;
		var errorMessage = "error";

    if(password1 != password2){
      error = true;
      errorMessage = "Passwords did not match";
    }
    else if(password1.length < 6){
      error = true;
      errorMessage = "Password not long enough";
    }
    else if(password1.search(/\d/) == -1) {
      error = true;
      errorMessage = "You must use atleast one number in your password";
    }
    else if(password1.search(/[a-zA-Z]/) == -1) {
      error = true;
      errorMessage = "You must use atleast one letter in your password";
    }

		if(error) {
			$("div .error").html(errorMessage);
      $("div .bottom").append($("div .error"));
			$("div .error").show();
			return;
    } 
    else {
			var jsonObj = new Object;
			jsonObj.userName = "${accounts_userinfo.userName}";
			jsonObj.type = "editUserInfo";
			jsonObj.oldpasswd = oldpassword;
			jsonObj.newpasswd = password1;
			jsonObj.verifypasswd = password2;
			
      //TODO new password must conform to our rules
			var jsonStr = JSON.stringify(jsonObj);
			var userinfo_url = '/esgf-web-fe/edituserinfoproxy';
			$.ajax({
	    	  type: "POST",
	    	  url: userinfo_url,
				  async: true,
				  cache: false,
	    		data: {query:jsonStr},
	    		dataType: 'json',
	    		success: function(data) {
	    			if (data.EditOutput.status == "success") {
		    			$("div .success").html("Your password has been reset successfully!");
		    			document.getElementById("oldpasswd").value="";
              document.getElementById("password1").value="";
              document.getElementById("password2").value="";
              $("div .bottom").append($("div .success"));
              $("div .success").show();
	    			} else {
	    				$("div .error").html("The password reset is failed! " + data.EditOutput.comment);
              $("div .bottom").append($("div .error"));
	    				$("div .error").show();
	    			}
	    		},
				error: function(request, status, error) {
					$("div .error").html("The password reset has failed!");
          $("div .bottom").append($("div .error"));
					$("div .error").show();
				}
			});			
		}
		
	});
	
});
</script>
