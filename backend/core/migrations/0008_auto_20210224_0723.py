# Generated by Django 3.1.5 on 2021-02-24 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_auto_20210224_0639'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='name',
            field=models.CharField(default='Event', max_length=255),
            preserve_default=False,
        ),
    ]