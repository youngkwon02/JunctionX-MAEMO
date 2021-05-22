import boto3


class NotificationClient:
    class NotificationType:
        SNS = "sns"
        PUSH_NOTIFICATION = "push_notification"
        REGION_NORTHEAST_2 = "ap-northeast-1"

    def __init__(self):
        self.client = boto3.client(
            NotificationClient.NotificationType.SNS,
            aws_access_key_id="AKIAYSFA6KP4ZZPP4N7N",
            aws_secret_access_key="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",
            region_name=NotificationClient.NotificationType.REGION_NORTHEAST_2
        )

    def publish_message(self, phone_number, message):
        self.client.publish(
            PhoneNumber=phone_number,
            Message=message
        )


