# Generated by Django 2.1.4 on 2019-02-12 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20190207_1606'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pitem',
            name='id',
        ),
        migrations.RemoveField(
            model_name='receipt',
            name='id',
        ),
        migrations.RemoveField(
            model_name='recipe',
            name='id',
        ),
        migrations.AddField(
            model_name='puser',
            name='matching_dict',
            field=models.TextField(default=[]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='pitem',
            name='static_id',
            field=models.CharField(max_length=10, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='receipt',
            name='static_id',
            field=models.CharField(max_length=10, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='static_id',
            field=models.CharField(max_length=10, primary_key=True, serialize=False),
        ),
    ]
