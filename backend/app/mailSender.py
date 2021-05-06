import smtplib, ssl

port = 465  # For starttls
smtp_server = "smtp.protonmail.com"
sender_email = "2dpo@protonmail.com"
receiver_email = "bamboo2panda@gmail.com"
password = input("Type your password and press enter:")
message = """\
Subject: Hi there

This message is sent from Python."""

context = ssl.create_default_context()
with smtplib.SMTP(smtp_server, port) as server:
    server.ehlo()  # Can be omitted
    server.starttls(context=context)
    server.ehlo()  # Can be omitted
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message)
