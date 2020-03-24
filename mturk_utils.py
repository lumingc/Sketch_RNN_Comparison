import boto3
import datetime

def init_client(aws_config):
	sandbox = aws_config["sandbox"]
	url = "https://mturk-requester-sandbox.us-east-1.amazonaws.com" if sandbox else "https://mturk-requester.us-east-1.amazonaws.com"
	return boto3.client('mturk', 
		endpoint_url=url,  
		region_name=aws_config["region"],
		aws_access_key_id=aws_config["awsCred"]["awsAccessKey"],
    	aws_secret_access_key=aws_config["awsCred"]["awsSecretKey"])

def post_hit(client, hit_args):
	return client.create_hit(**hit_args)

def get_all_hits(client):
	return client.list_hits(MaxResults=100)

def pause_hit(client, hit_id):
	return client.update_expiration_for_hit(HITId=hit_id, ExpireAt=0)

def resume_hit(client, hit_id):
	return client.update_expiration_for_hit(HITId=hit_id, 
		ExpireAt=datetime.datetime.now() + datetime.timedelta(days=365))

def get_assignments(client, hit_id):
	return client.list_assignments_for_hit(HITId=hit_id, MaxResults=100)


def accept_hit(client, assignment_id):
	return client.approve_assignment(
	    AssignmentId=assignment_id,
	    RequesterFeedback='Thank you for completing the task, your assignment has been approved.',
	    OverrideRejection=True
	)

def reject_hit(client, assignment_id):
	return client.reject_assignment(
	    AssignmentId=assignment_id,
	    RequesterFeedback='Sorry, unfortunately we cannot accept your work. If you think this decision was made incorrectly, please get in touch with the requester through email.'
	)