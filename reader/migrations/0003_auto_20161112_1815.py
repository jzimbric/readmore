# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-11-12 18:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reader', '0002_auto_20161112_1807'),
    ]

    operations = [
        migrations.CreateModel(
            name='Body',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('lexile', models.IntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='article',
            name='body',
        ),
        migrations.AddField(
            model_name='body',
            name='article',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reader.Article'),
        ),
    ]
