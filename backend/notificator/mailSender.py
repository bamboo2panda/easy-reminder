import os
import smtplib, ssl
from datetime import datetime


def mailSender(receiver_email, message):
    now = datetime.now()
    port = os.environ.get('MAIL_PORT')  # For starttls
    smtp_server = os.environ.get('MAIL_SERVER')
    sender_email = os.environ.get('MAIL_ACCOUNT')
    password = os.environ.get('MAIL_PASSWORD')
    message = f'{message} \n {now}'
    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
