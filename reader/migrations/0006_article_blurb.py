# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-19 21:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reader', '0005_auto_20161114_0107'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='blurb',
            field=models.CharField(default='This is the blurb', max_length=135),
            preserve_default=False,
        ),
    ]
