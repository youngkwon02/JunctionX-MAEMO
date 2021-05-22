import boto3


class NotificationType:
    SNS = "sns"
    PUSH_NOTIFICATION = "push_notification"
    REGION_NORTHEAST_2 = "ap-northeast-1"


client = boto3.client(
    NotificationType.SNS,
        aws_access_key_id="AKIAYSFA6KP44AFYGKJK",
        aws_secret_access_key="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",
        region_name=NotificationType.REGION_NORTHEAST_2
    )

        


