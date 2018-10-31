<?php
// include_once "../../startsession.php";
include "inc/functions.php";
$problem = one_problem_array(1);
?>
<!DOCTYPE HTML>
<html>

<head>
	<title>PM: Strategy</title>
	<meta name="description" content="tbd" />
	<link rel="stylesheet" type="text/css" href="css/main.css?v=3">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
	<script src="inc/general.js"></script>
	<!-- <link rel="stylesheet" type="text/css" href="/pm/pm.css">
    <script src="/js/bootstrap.js"></script>
    <script src="/pm/drills/js/questionProcess-v2.js"></script>
    <script src="/pm/common-v2.js"></script>
    <script src="/pm/drills/js/formatting-v2.js"></script>	
	 -->

</head>

<body>
	<div class="space50"></div>
	<div class="space25"></div>
	<div class="container">

		<div id="problems-container-1">

			<div class="row">
				<!--prompt-->
				<div class="col-sm-10 col-sm-offset-1">
					<div class="row">
						<div class="col-sm-11">
							<p>
								<span class="prob-title prob-font-color" id="problem-title">
									<?php echo $problem["title"]; ?></span><br>
								<span id="problem-category" class="small grey">Category:
									<?php echo $problem["category"]; ?></span>
							</p>
						</div>
						<div class="col-sm-1">
							<div class="pull-right"><span id="timer" class="grey"></span>&nbsp;<span class="glyphicon glyphicon-time grey"></span></div>
						</div>
					</div>
					<div class="line"></div>
					<!--dividing line-->
					<p id="problem-prompt" class="prob-text prob-font-color">
						<?php echo $problem["prob"]; ?>
					</p>
					<p class="small grey" id="problem-source">
						<?php echo $problem["source"]; ?>
					</p>
					<div class="space25"></div>


				</div>
				<!--column prompt-->
			</div>
			<!--problem title, category, prompt-->

			<!--Problem navigator-->
			<table class="table">
				<thead class="user-answer-heading">
					<tr>
						<th>Enter Answers</th>
					</tr>
				</thead>
				<tr>
					<td class="user-answer">
						<div class="row prob-text">
							<div class="col-sm-10 col-sm-offset-1" id="problem-navigator">
								<div class="response-template">
									<form>
										<input type="text" name="category[0]" value="Category">
										<div class="answer-template">
											<input type="text" name="answer[0]" value="Enter your insight/step/answer here...">
										</div>
										<div class="answer-holder">
										</div>
										<div class="col-sm-12"><button class="answer-add">add answer</button></div>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12"><button class="btn btn-default pull-left skip" id="category-add">add</button></div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
			</table>
			<div class="row prob-text">
				<div class="col-sm-10 col-sm-offset-1" id="problem-navigator">

				</div>
			</div>

			<!--Problem assets-->
			<div class="row prob-text">
				<div class="col-sm-10 col-sm-offset-1" id="problem-assets-1">
					Some test text
				</div>
			</div>

			<!--Answer collection-->
			<div class="row" id="answer-collection-1">
				<!--displays-->
				Some test text
			</div>
			<!--mock displays-->

			<div class="space25"></div>
			<!--space after mock-->

			<div class="row">
				<div class="col-sm-10 col-sm-offset-1 prob-text" id="followup-container">
					Some test text
				</div>
				<!--col-->
			</div>
			<!--followup container-->

		</div>
		<!--problems-container-->

		<div class="row">
			<div id="nav-buttons" class="col-sm-10 col-sm-offset-1">
				<div class="row">
					<div class="col-sm-12" id="next-submit"><button class="btn btn-success pull-right" id="submitAnswers">Submit
							answer</button></div>
				</div>
				<div class="space10"></div>
				<div class="row">
					<div class="col-sm-12"><button class="btn btn-default pull-right skip" href="strategy.php">Skip problem</button></div>
				</div>
				<div class="space10"></div>
				<div class="row">
					<div class="col-sm-12"><a class="pull-right" href="/pm/main.php"><small>Exit module</small></a></div>
				</div>
			</div>
			<!--col-->
		</div>
		<!--nav-buttons-->
		<div id="response-id" class="hidden"></div>
		<div id="problem-id" class="hidden"></div>
	</div>
	<!--container-->
	<?php include_once "../../a/footer.php"?>
</body>

</html>