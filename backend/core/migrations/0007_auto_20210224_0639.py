# Generated by Django 3.1.5 on 2021-02-24 06:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210224_0618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='date_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
