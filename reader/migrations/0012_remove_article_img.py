# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-20 21:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reader', '0011_auto_20161120_2122'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='img',
        ),
    ]
