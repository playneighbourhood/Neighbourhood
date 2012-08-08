<?php
	session_start();
	if (isset($_SESSION['nh_uid'])) {
		header('Location: game.php');
	}
?>
<!DOCTYPE html>
<html>
<head>
<title>Neighbourhood</title>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta charset="utf-8">
<style type="text/css">
*{
	margin: 0;
	padding: 0;
	
}
a{
	text-decoration: none;
}
body{
	font-family: "Helvetica Neue", Helvetica, sans-serif;
	background: url(images/index_bg.jpg) no-repeat center center fixed; 
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	list-style: none;
	color: #fff;
	-webkit-font-smoothing:antialiased;
	overflow: hidden;
}
h1{
	font-size: 70px;
	position: absolute;
	top:50%;
	left:50%;
	width:500px;
	margin-top: -300px;
	margin-left: -250px;
	-moz-text-shadow: 0px 5px 3px #888;
		-webkit-text-shadow: 0px 5px 3px #888;
			text-shadow: 0px 5px 3px #888;
}
table.login{
	position: absolute;
	top:50%;
	left:50%;
	width:600px;
	height:400px;
	margin-left: -300px;
	margin-top:-200px;
	font-weight: bold;
	overflow: hidden;

}

table.login  td{
	width:150px;
	height:100px;
	text-align: center;
	background: rgba(0,0,0,.1);
	padding:10px;
	-moz-text-shadow: 0px -1px 0px rgba(0,0,0,0.25);
		-webkit-text-shadow: 0px -1px 0px rgba(0,0,0,0.25);
			text-shadow: 0px -1px 0px rgba(0,0,0,0.25);
}
table.login td:hover:not(.nohover){
	background: rgba(29, 195, 223, 0.1);
	cursor:pointer;
}
table.login td#error {
	background: rgba(255,0,0,.2);
}
table.login td#success {
	background: rgba(0,255,0,.2);
}
input {
	padding: 5px;
	width: 60%;
}
footer{
	width:500px;
	position: absolute;
	bottom:2px;
	left:50%;
	margin-left: -250px;
	text-align: center;
	font-weight: bold;
	font-size: 13px;
	-moz-text-shadow: 0px -1px 0px rgba(0,0,0,0.25);
		-webkit-text-shadow: 0px -1px 0px rgba(0,0,0,0.25);
			text-shadow: 0px -1px 0px rgba(0,0,0,0.25);
}
a {
	color: #fff;
}

#indexinfobtn {
	top: 0px;
	left: 0px;	
	padding-left: 5px;
	padding-top: 5px;
}

#infoBox{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background: rgba(255,255,255,0.75);
	display: none;


}
#infoMenu {
   width: 600px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -300px;
    background: #fff;
    display: none;
    padding-left: 5px;
    border: 1px solid #999;
}
#myModal{
	display: none;
	color:#000;
}

#infodiv{
	padding-left: 5px;
	padding-top: 5px;	
}
    .modal-body {
        line-height: 26px;
        word-spacing: 2px;
    }
</style>
<link type="text/css" href="bootstrap.min.css" rel="stylesheet"/>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="bootstrap.min.js"></script>
</head>
<body>
<h1>Neighbourhood</h1>
<div id="infodiv"><button class="btn" onClick="$('#myModal').modal();">info</button></div>
<form action="backend/auth.php" method="post" id="loginform">
	<table class="login">
		<?php if ($_GET['err']): ?>
			<tr>
				<td colspan="2" id="error" class="nohover">
					User name or password incorrect.
				</td>
			</tr>
		<?php endif; ?>
		<?php if ($_GET['inuse']): ?>
			<tr>
				<td colspan="2" id="error" class="nohover">
					User name already in use.
				</td>
			</tr>
		<?php endif; ?>
		<?php if ($_GET['namereq']): ?>
			<tr>
				<td colspan="2" id="error" class="nohover">
					User name required.
				</td>
			</tr>
		<?php endif; ?>
		<?php if ($_GET['pwshort']): ?>
			<tr>
				<td colspan="2" id="error" class="nohover">
					Password must be at least 8 characters.
				</td>
			</tr>
		<?php endif; ?>
		<?php if ($_GET['out']): ?>
			<tr>
				<td colspan="2" id="success" class="nohover">
					You have successfully logged out.
				</td>
			</tr>
		<?php endif; ?>
		<tr>
			<td colspan="2" id="uname-td">
				<input type="text" name="username" placeholder="User name" id="uname" />
			</td>
		</tr>
		<tr>
			<td colspan="2" id="upass-td">
				<input type="password" name="password" placeholder="Password" id="upass" />
			</td>
		</tr>
		<tr>
			<td id="signin">
				Sign in
				<button type="submit" style="display:none">Sign in</button>
			</td>
			<td id="signup">
				Sign up
			</td>
		</tr>
	</table>
</form>
<footer>A game by Harry, Chris, Hal & Pete for <a href="http://youngrewiredstate.org/">YRS2012</a></footer>
<script>
	$('td#uname-td').click(function(event){
		$('#uname').focus();
	});
	$('td#upass-td').click(function(event){
		$('#upass').focus();
	});
	$('td#signin').click(function(event){
		$('#loginform').submit();
	});
	$('td#signup').click(function(event){
		document.getElementById("loginform").action = "backend/signup.php";
		$('#loginform').submit();
	});
	$('#myModal').modal({show:false});
</script>
<div class="modal hide" id="myModal">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal">×</button>
    <h3>What is Neighbourhood?</h3>
  </div>
  <div class="modal-body">
    <p>Neighbourhood is a civ-style game where you start off owning one of the 12 main areas of Britain.
       Each area has a rating for money, population, population density, crime, and a number of schools and hospitals, all of these have an impact on your happiness and your oppression levels.
       Happiness and oppression are effectively two different ways of ruling your country, if your people are happy they won't want to revolt, if your people are oppressed they won't be able to revolt.
       Your job is to change these values so that you are in a strong enough position to take over neighbouring areas of Britain.
       You can change them by buiding new schools, hospitals and police stations.</p>
  </div>
  <div class="modal-footer">
    <a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>
  </div>
</div>
</body>
</html>