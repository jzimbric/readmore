# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-20 21:11
from __future__ import unicode_literals

from django.db import migrations, models
import reader.models


class Migration(migrations.Migration):

    dependencies = [
        ('reader', '0008_article_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=reader.models.get_image_path),
        ),
    ]