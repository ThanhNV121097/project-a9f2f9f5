DELETE FROM greetings WHERE id = 1;
DROP TABLE IF EXISTS greetings;
DELETE FROM schema_migrations WHERE version = '202508180001_create_greetings';
