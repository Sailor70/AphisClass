# Generated by Django 4.0.5 on 2022-06-08 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AphisClassBack', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='aphis',
            name='cauda_length',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='aphis',
            name='hind_femora_length',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='aphis',
            name='hind_tibia_lenght',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='aphis',
            name='number_of_setae_on_cauda',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='aphis',
            name='date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='aphis',
            name='length_of_body',
            field=models.FloatField(null=True),
        ),
    ]