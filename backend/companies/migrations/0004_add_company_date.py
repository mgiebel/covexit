# Generated by Django 2.2.11 on 2020-03-28 00:32

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0003_add_company_website'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='company',
            options={'verbose_name': 'Company', 'verbose_name_plural': 'Companies'},
        ),
        migrations.AddField(
            model_name='company',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Created'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='company',
            name='updated',
            field=models.DateTimeField(auto_now=True, verbose_name='Last updated'),
        ),
    ]
