import boto3


class NotificationClient:
    class NotificationType:
        SNS = "sns"
        PUSH_NOTIFICATION = "push_notification"
        REGION_NORTHEAST_2 = "ap-northeast-1"

    def __init__(self):
        self.client = boto3.client(
            NotificationClient.NotificationType.SNS,
            aws_access_key_id="",
            aws_secret_access_key="",
            region_name=NotificationClient.NotificationType.REGION_NORTHEAST_2
        )

    def publish_message(self, phone_number, message):
        self.client.publish(
            PhoneNumber=phone_number,
            Message=message
        )


