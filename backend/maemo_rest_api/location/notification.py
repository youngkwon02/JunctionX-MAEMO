import boto3


class NotificationClient:
    class NotificationType:
        SNS = "sns"
        PUSH_NOTIFICATION = "push_notification"
        REGION_NORTHEAST_2 = "ap-northeast-1"

    def __init__(self):
        self.client = boto3.client(
            NotificationClient.NotificationType.SNS,
            aws_access_key_id="AKIAYSFA6KP4USZMI77C",
            aws_secret_access_key="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",
            region_name=NotificationClient.NotificationType.REGION_NORTHEAST_2
        )

    def publish_message(self, phone_number, message):
        self.client.publish(
            PhoneNumber=phone_number,
            Message=message
        )



# topic_arn = 'arn:aws:sns:ap-northeast-1:xxxxxxxx:My-Alert'
# client.subscribe(
# TopicArn=topic_arn,
# Protocol='sms',
# Endpoint='+8201012345678'
# )

# client.publish(
# TopicArn=topic_arn ,
# Message="파이썬 코드로 문자 보내기"
# )



