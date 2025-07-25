from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='user',
            index=migrations.Index(fields=['email'], name='idx_user_email'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=migrations.Index(fields=['username'], name='idx_user_username'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=migrations.Index(fields=['is_active'], name='idx_user_is_active'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=migrations.Index(fields=['date_joined'], name='idx_user_date_joined'),
        ),
        migrations.AddIndex(
            model_name='userprofile',
            index=migrations.Index(fields=['user'], name='idx_userprofile_user'),
        ),
        migrations.AddIndex(
            model_name='userprofile',
            index=migrations.Index(fields=['phone_number'], name='idx_userprofile_phone'),
        ),
        migrations.AddIndex(
            model_name='userprofile',
            index=migrations.Index(fields=['emergency_contact'], name='idx_userprofile_emergency'),
        ),
        migrations.AddIndex(
            model_name='activity',
            index=migrations.Index(fields=['user'], name='idx_activity_user'),
        ),
        migrations.AddIndex(
            model_name='activity',
            index=migrations.Index(fields=['activity_type'], name='idx_activity_type'),
        ),
        migrations.AddIndex(
            model_name='activity',
            index=migrations.Index(fields=['timestamp'], name='idx_activity_timestamp'),
        ),
        migrations.AddIndex(
            model_name='healthrecord',
            index=migrations.Index(fields=['user'], name='idx_healthrecord_user'),
        ),
        migrations.AddIndex(
            model_name='healthrecord',
            index=migrations.Index(fields=['record_type'], name='idx_healthrecord_type'),
        ),
        migrations.AddIndex(
            model_name='healthrecord',
            index=migrations.Index(fields=['date'], name='idx_healthrecord_date'),
        ),
        migrations.AddIndex(
            model_name='medication',
            index=migrations.Index(fields=['user'], name='idx_medication_user'),
        ),
        migrations.AddIndex(
            model_name='medication',
            index=migrations.Index(fields=['name'], name='idx_medication_name'),
        ),
        migrations.AddIndex(
            model_name='medication',
            index=migrations.Index(fields=['start_date'], name='idx_medication_start'),
        ),
        migrations.AddIndex(
            model_name='medication',
            index=migrations.Index(fields=['end_date'], name='idx_medication_end'),
        ),
        migrations.AddIndex(
            model_name='appointment',
            index=migrations.Index(fields=['user'], name='idx_appointment_user'),
        ),
        migrations.AddIndex(
            model_name='appointment',
            index=migrations.Index(fields=['doctor'], name='idx_appointment_doctor'),
        ),
        migrations.AddIndex(
            model_name='appointment',
            index=migrations.Index(fields=['date'], name='idx_appointment_date'),
        ),
        migrations.AddIndex(
            model_name='appointment',
            index=migrations.Index(fields=['status'], name='idx_appointment_status'),
        ),
    ] 