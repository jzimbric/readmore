# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-11-12 18:07
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reader', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='content',
            new_name='body',
        ),
    ]